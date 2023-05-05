const fs = require('firebase-admin');
const tatCaculator = require("./tatCalculator")
const axios = require('axios');

const serviceAccount = require('../../asana-automation-6fa38-firebase-adminsdk-a1lfm-0067f1ffb4.json');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 

exports.addTask =async (gid,name,created_at,currentAuthor) => {
        const task = {
            gid:gid,
            name:name,
            created_at:created_at,
            inProgressTime: "",
            taskCompletedTime: "",
            turnAroundTime:"",
            escalationProcess:[],
            taskUrl: "",
            currentAuthor:currentAuthor,
            currentAuthotCallStatus: {}
        };
    
        const usersColl = db.collection('Tasks')
        usersColl.add(task);
    
};

exports.updateCurrentAuthor = (name,phoneNumber) => {
    const currentAuthor = {
        name: name,
        phoneNumber: phoneNumber
    }

    const authorCollection = db.collection('CurrentAuthor');
    authorCollection.add(currentAuthor)
}

exports.getCurrentAuthor = async () => {
    try {
        const querySnapshot = await db.collection('CurrentAuthor').limit(1).get();
        const doc = querySnapshot.docs[0];
        return doc.data();
      } catch (error) {
        console.log('Error getting document:', error);
        return null;
      }
}

exports.getEscalationContacts = async () => {
    try {
        const querySnapshot = await db.collection('EscalationContacts').get();
        const doc = querySnapshot.docs[0];
        return doc.data();   
      } catch (error) {
        console.log('Error getting document:', error);
        return null;
      }
}
exports.updateTask =async (gid,data) => {
        console.log("update task",gid,data)
        const query = db.collection('Tasks').where('gid', '==', gid);
        query.get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
            // Get a reference to the document you want to update
            const docRef = querySnapshot.docs[0].ref;
            const docData = querySnapshot.docs[0].data()
            docData.escalationProcess.push(data)
            const fieldToUpdate = 'escalationProcess';
            const newValue = docData.escalationProcess;
            docRef.update({ [fieldToUpdate]: newValue })
                .then(() => {
                console.log('Field updated successfully');
                })
                .catch((error) => {
                console.error('Error updating field:', error);
                });
            } else {
            console.log('No documents found that match the query');
            }
        })
        .catch((error) => {
            console.error('Error getting documents:', error);
        });

}
exports.updateTaskProgress = async (gid,progress,value) => {
    const query = db.collection('Tasks').where('gid', '==', gid);
    query.get()
    .then(async (querySnapshot) => {
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            let fieldToUpdate;
            if(progress == "Doing"){
                fieldToUpdate = {["inProgressTime"]:value}
            }
            else if(progress == "Done"){
                const docData = querySnapshot.docs[0].data()
                const inProgressTime = docData.inProgressTime;
                const turnaroundtime = tatCaculator.tatCaculator(inProgressTime,value);
                fieldToUpdate = {
                    taskCompletedTime:value,
                    turnAroundTime:turnaroundtime
                } 
                console.log(fieldToUpdate)
                const comment = "This is being published without approval since this needs to go live ASAP. Thanks"
                await this.addComment(gid,comment);
            }
        
        docRef.update(fieldToUpdate)
            .then(() => {
            console.log('Field updated successfully');
            })
            .catch((error) => {
            console.error('Error updating field:', error);
            });
        } else {
        console.log('No documents found that match the query');
        }
    })
    .catch((error) => {
        console.error('Error getting documents:', error);
    });
}

exports.addComment =async (gid,comment) => {
    const accessToken = '1/1204345610389960:556ef6643e0becdad45d82a6a77dae98';

    // The task ID of the task to add comments to
    const taskId = gid;
    
    // The comment to add
    const commentText = comment;
    
    // Set the request headers
    const requestHeaders = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const requestBody = {
        data: {
          text: commentText
        }
      };

    axios.post(`https://app.asana.com/api/1.0/tasks/${gid}/stories?opt_fields=`, requestBody, { headers: requestHeaders })
  .then(response => {
    console.log('Comment added:', response.data.data.text);
  })
  .catch(error => {
    console.error('Error adding comment:', error.response.data.errors);
  });
}

exports.getTaskUrl = async (gid) => {
    console.log("task id from getTaskUrl",gid)
    const accessToken = '1/1204345610389960:556ef6643e0becdad45d82a6a77dae98';
    const taskId = gid;

    // Set the request headers
    const requestHeaders = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    };

    // Make the HTTP GET request to get the task details
    axios.get(`https://app.asana.com/api/1.0/tasks/${taskId}?opt_fields=permalink_url`, { headers: requestHeaders })
    .then((response) => {
        const taskUrl = response.data.data.permalink_url;
        console.log("taskurl",taskUrl);
        const query = db.collection('Tasks').where('gid', '==', gid);
        query.get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
            // Get a reference to the document you want to update
            const docRef = querySnapshot.docs[0].ref;
            const fieldToUpdate = 'taskUrl';
            docRef.update({ [fieldToUpdate]: taskUrl })
                .then(() => {
                console.log('Field updated successfully');
                })
                .catch((error) => {
                console.error('Error updating field:', error);
                });
            } else {
            console.log('No documents found that match the query');
            }
        })
        .catch((error) => {
            console.error('Error getting documents:', error);
        });
    })
    .catch(error => {
        console.error('Error getting task URL:', error.response.data.errors);
    });
}

exports.updateAuthorCallData =async (gid,data) => {
    console.log("gid.....",gid);
    const query = db.collection('Tasks').where('gid', '==', gid);
    query.get()
    .then((querySnapshot) => {
        if (!querySnapshot.empty) {
        // Get a reference to the document you want to update
        const docRef = querySnapshot.docs[0].ref;
        const fieldToUpdate = 'currentAuthotCallStatus';
        const newValue = data
        docRef.update({ [fieldToUpdate]: newValue })
            .then(() => {
            console.log('Field updated successfully');
            })
            .catch((error) => {
            console.error('Error updating field:', error);
            });
        } else {
        console.log('No documents found that match the query');
        }
    })
    .catch((error) => {
        console.error('Error getting documents:', error);
    });

}
