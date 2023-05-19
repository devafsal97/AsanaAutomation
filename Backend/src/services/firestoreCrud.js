const fs = require("firebase-admin");
const tatCaculator = require("./tatCalculator");
const axios = require("axios");

const serviceAccount = require("../../asana-automation-6fa38-firebase-adminsdk-a1lfm-0067f1ffb4.json");

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();

exports.addTask = async (gid, name, created_at, currentAuthor, url) => {
  const task = {
    gid: gid,
    name: name,
    created_at: created_at,
    inProgressTime: "",
    taskCompletedTime: "",
    turnAroundTime: "",
    escalationProcess: [],
    taskUrl: url,
    currentAuthor: currentAuthor,
    currentAuthotCallStatus: {},
  };

  const usersColl = db.collection("Tasks");
  usersColl.add(task);
};

exports.updateCurrentAuthor = async (name, PhoneNumber, id) => {
  const fieldToUpdate = {
    Name: name,
    PhoneNumber: PhoneNumber,
  };
  try {
    const docRef = db.collection("CurrentAuthor").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return null;
    }
    await docRef.update(fieldToUpdate);
    const updatedDoc = await docRef.get();
    console.log({ id: updatedDoc.id, ...updatedDoc.data() });
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error("Error updating document: ", error);
    return null;
  }
};

exports.getCurrentAuthor = async () => {
  try {
    const querySnapshot = await db.collection("CurrentAuthor").limit(1).get();
    const doc = querySnapshot.docs[0];
    const id = doc.id;
    const data = doc.data();
    const response = { id: id, Name: data.Name, PhoneNumber: data.PhoneNumber };
    return response;
  } catch (error) {
    console.log("Error getting document:", error);
    return null;
  }
};

exports.getEscalationContacts = async () => {
  try {
    const querySnapshot = await db
      .collection("EscalationContacts")
      .limit(1)
      .get();
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    const id = doc.id;
    const response = {
      id: id,
      FirstContact: data.FirstContact,
      SecondContact: data.SecondContact,
      ThirdContact: data.ThirdContact,
    };
    return response;
    console.log(response);
  } catch (error) {
    console.log("Error getting document:", error);
    return null;
  }
};
exports.updateTask = async (gid, data) => {
  console.log("update task", gid, data);
  const query = db.collection("Tasks").where("gid", "==", gid);
  query
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        // Get a reference to the document you want to update
        const docRef = querySnapshot.docs[0].ref;
        const docData = querySnapshot.docs[0].data();
        docData.escalationProcess.push(data);
        const fieldToUpdate = "escalationProcess";
        const newValue = docData.escalationProcess;
        docRef
          .update({ [fieldToUpdate]: newValue })
          .then(() => {
            console.log("Field updated successfully");
          })
          .catch((error) => {
            console.error("Error updating field:", error);
          });
      } else {
        console.log("No documents found that match the query");
      }
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};
exports.updateTaskProgress = async (gid, progress, value) => {
  const query = db.collection("Tasks").where("gid", "==", gid);
  query
    .get()
    .then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        let fieldToUpdate;
        if (progress == "In Progress") {
          fieldToUpdate = { ["inProgressTime"]: value };
        } else if (progress == "Published") {
          const docData = querySnapshot.docs[0].data();
          const inProgressTime = docData.inProgressTime;
          const turnaroundtime = tatCaculator.tatCaculator(
            inProgressTime,
            value
          );
          fieldToUpdate = {
            taskCompletedTime: value,
            turnAroundTime: turnaroundtime,
          };
          console.log(fieldToUpdate);
          const comment =
            "This is being published without approval since this needs to go live ASAP. Thanks";
          await this.addComment(gid, comment);
        }

        docRef
          .update(fieldToUpdate)
          .then(() => {
            console.log("Field updated successfully");
          })
          .catch((error) => {
            console.error("Error updating field:", error);
          });
      } else {
        console.log("No documents found that match the query");
      }
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};

exports.addComment = async (gid, comment) => {
  const accessToken = "1/1204345610389960:556ef6643e0becdad45d82a6a77dae98";

  // The task ID of the task to add comments to
  const taskId = gid;

  // The comment to add
  const commentText = comment;

  // Set the request headers
  const requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const requestBody = {
    data: {
      text: commentText,
    },
  };

  axios
    .post(
      `https://app.asana.com/api/1.0/tasks/${gid}/stories?opt_fields=`,
      requestBody,
      { headers: requestHeaders }
    )
    .then((response) => {
      console.log("Comment added:", response.data.data.text);
    })
    .catch((error) => {
      console.error("Error adding comment:", error.response.data.errors);
    });
};

exports.getTaskUrl = async (gid) => {
  console.log("task id from getTaskUrl", gid);
  const accessToken = "1/1204569739108552:c7540c050a75c47debbebec51aaab986";
  const taskId = gid;

  // Set the request headers
  const requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Make the HTTP GET request to get the task details
  const taskUrl = await axios.get(
    `https://app.asana.com/api/1.0/tasks/${taskId}?opt_fields=permalink_url`,
    { headers: requestHeaders }
  );
  return taskUrl;
};

exports.updateAuthorCallData = async (gid, data) => {
  console.log("gid.....", gid);
  const query = db.collection("Tasks").where("gid", "==", gid);
  query
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        // Get a reference to the document you want to update
        const docRef = querySnapshot.docs[0].ref;
        const fieldToUpdate = "currentAuthotCallStatus";
        const newValue = data;
        docRef
          .update({ [fieldToUpdate]: newValue })
          .then(() => {
            console.log("Field updated successfully");
          })
          .catch((error) => {
            console.error("Error updating field:", error);
          });
      } else {
        console.log("No documents found that match the query");
      }
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
};

exports.getAllTask = async (limit, offset, keyword) => {
  console.log("limit", limit, "offset", offset);
  try {
    if (!keyword) {
      const snapshot = await db
        .collection("Tasks")
        .limit(parseInt(limit))
        .offset(parseInt(offset))
        .get();
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return tasks;
    } else {
      console.log(keyword);
      const snapshot = await db
        .collection("Tasks")
        .where("name", ">=", keyword)
        .where("name", "<=", keyword + "\uf8ff")
        .get();
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return tasks;
    }
  } catch (error) {
    console.log(error);
    return "Error retrieving tasks";
  }
};

exports.getSearchTask = async (searchKey) => {
  try {
    const keyword = searchKey.trim();
    const snapshot = await db
      .collection("Tasks")
      .where("name", ">=", keyword)
      .where("name", "<=", keyword + "\uf8ff")
      .get();
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(tasks);
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

exports.getSelectedTask = async (id) => {
  try {
    const docref = db.collection("Tasks").doc(id);
    const data = await docref.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
      }
      console.log(data);
      return data;
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateEscalationData = async (data) => {
  const fieldToUpdate = {
    FirstContact: data.escalationData.FirstContact,
    SecondContact: data.escalationData.SecondContact,
    ThirdContact: data.escalationData.ThirdContact,
  };
  try {
    const docRef = db
      .collection("EscalationContacts")
      .doc(data.escalationData.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return null;
    }
    await docRef.update(fieldToUpdate);
    const updatedDoc = await docRef.get();
    console.log({ id: updatedDoc.id, ...updatedDoc.data() });
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error("Error updating document: ", error);
    return null;
  }
};

exports.findUserByEmail = async (email) => {
  try {
    console.log("user email", email);
    const userDoc = await db
      .collection("Users")
      .where("email_id", "==", email)
      .get();

    console.log("userdoc", userDoc.docs[0].data());

    if (!userDoc.empty) {
      const user = userDoc.docs[0].data();
      const id = userDoc.docs[0].id;
      const userData = {
        id: id,
        name: user.name,
        email: user.email_id,
        role: user.role,
      };
      return userData;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

exports.findUserById = async (id) => {
  try {
    console.log("id", id);
    // Get the user document from the "Users" collection
    const userDoc = await db.collection("Users").doc(id).get();

    // Check if the user document exists
    if (userDoc.exists) {
      console.log(userDoc.data());
      // Access the user data
      const user = userDoc.data();
      const id = userDoc.id;
      const userData = {
        id: id,
        name: user.name,
        email: user.email_id,
        role: user.role,
      };
      return userData;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};
