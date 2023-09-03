const firestore = require("../services/firestoreCrud");

class Task {
  constructor({
    name,
    createdAt,
    author,
    authorCallStatus,
    escalationProcess,
    gid,
    inProgressTime,
    completedTime,
    turnArroundTime,
    url,
  }) {
    this.name = name;
    this.createdAt = createdAt;
    this.author = author;
    this.authorCallStatus = authorCallStatus;
    this.escalationProcess = escalationProcess;
    this.gid = gid;
    this.inProgressTime = inProgressTime;
    this.completedTime = completedTime;
    this.turnArroundTime = turnArroundTime;
    this.url = url;
  }

  async save() {
    const response = await firestore.db.collection("Tasks").add({ ...this });
    return Task.findById(response._path.segments[1]);
  }

  static async update(data) {
    const taskData = await firestore.db.collection("Tasks").doc(data.id).get();
    if (taskData.exists) {
      const { id, ...dataToUpdate } = data;
      const response = taskData.ref.update(dataToUpdate);
      return response;
    } else {
      throw new Error("no task found to update");
    }
  }

  static async findById(id) {
    const taskDoc = await firestore.db.collection("Tasks").doc(id).get();
    if (taskDoc.exists) {
      return { id: taskDoc.id, ...taskDoc.data() };
    } else {
      throw new Error("task not found");
    }
  }

  static async getAll(limit, offset, keyword) {
    if (!keyword) {
      const snapShot = await firestore.db
        .collection("Tasks")
        .limit(parseInt(limit))
        .offset(parseInt(offset))
        .get();
      if (!snapShot.isEmpty) {
        const taskData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return taskData;
      } else {
        throw new Error("no tasks found");
      }
    } else {
      const snapShot = await firestore.db
        .collection("Tasks")
        .where("name", "==", keyword)
        .limit(1)
        .get();
      if (snapShot.docs.length != 0) {
        console.log(snapShot.docs.length);
        const data = snapShot.docs[0];
        const taskData = { id: data.id, ...data.data() };
        console.log(taskData);

        return [taskData];
      } else {
        throw new Error(`no task found for the keyword ${keyword}`);
      }
    }
  }
  static async getByDate(startDate, endDate, limit, offset) {
    const tasksRef = await firestore.db
      .collection("Tasks")
      .where("createdAt", ">=", new Date(startDate))
      .where("createdAt", "<=", new Date(endDate))
      .limit(parseInt(limit))
      .offset(parseInt(offset))
      .get();
    if (!tasksRef.empty) {
      console.log("data doc", tasksRef.docs);
      const data = tasksRef.docs.map((doc) => {
        console.log("data", doc.data());
        return doc.data();
      });
      return data;
    } else {
      throw new Error("no task found for the selected dates");
    }
  }

  static async getByGid(gid) {
    const snapShot = await firestore.db
      .collection("Tasks")
      .where("gid", "==", gid)
      .get();

    if (!!snapShot.docs.length) {
      const data = snapShot.docs[0];
      const taskData = { id: data.id, ...data.data() };
      return taskData;
    }
  }

  static async getInprogressTaskCount() {
    console.log("hitted");
    const querySnapshotProgress = await firestore.db
      .collection("Tasks")
      .where("inProgressTime", ">", "")
      .orderBy("inProgressTime")
      .get();

    let newData = querySnapshotProgress.docs.filter((item) => {
      const newItem = item.data().completedTime == "";
      return newItem;
    });
    console.log("newItem", newData.length);

    const querySnapshot = await firestore.db.collection("Tasks").get();
    let totalTurnaroundTime = 0;
    let documentCount = 0;

    const newTaskArray = querySnapshot.docs.filter((item) => {
      const newItem =
        item.data().inProgressTime == "" && item.data().completedTime == "";
      return newItem;
    });

    const completedCountArray = querySnapshot.docs.filter((item) => {
      const newItem = item.data().completedTime != "";
      return newItem;
    });
    console.log("completedCountArray", completedCountArray.length);

    querySnapshot.docs.forEach((doc) => {
      const turnaroundTime = doc.data().turnArroundTime;
      const minutes = parseInt(turnaroundTime.replace(/[^0-9]/g, ""));
      console.log("tat", minutes);
      if (minutes) {
        totalTurnaroundTime += minutes;
        documentCount++;
      }
    });
    const averageTurnaroundTime = totalTurnaroundTime / documentCount;
    console.log("datataaa", {
      activeTask: newData.length,
      averageTat: averageTurnaroundTime,
      completedTask: completedCountArray.length,
    });
    return [
      { title: "newTask", value: newTaskArray.length },
      { title: "activeTask", value: newData.length },
      { title: "averageTat", value: averageTurnaroundTime },
      { title: "completedTask", value: completedCountArray.length },
    ];
  }

  static async getNewTaskData() {
    const querySnapshot = await firestore.db.collection("Tasks").get();
    const newTaskArray = querySnapshot.docs.filter((item) => {
      const newItem =
        item.data().inProgressTime == "" && item.data().completedTime == "";
      return newItem;
    });
    const data = newTaskArray.map((item) => item.data());
    return data;
  }
  static async getActiveTask() {
    const querySnapshotProgress = await firestore.db
      .collection("Tasks")
      .where("inProgressTime", ">", "")
      .orderBy("inProgressTime")
      .get();

    let newData = querySnapshotProgress.docs.filter((item) => {
      const newItem = item.data().completedTime == "";
      return newItem;
    });
    const data = newData.map((item) => item.data());
    return data;
  }
}

module.exports = Task;
