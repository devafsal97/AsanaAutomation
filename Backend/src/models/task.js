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
        .collection("Users")
        .where("name", ">=", keyword)
        .where("name", "<=", keyword + "\uf8ff")
        .get();
      if (!snapShot.isEmpty) {
        const taskData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return taskData;
      } else {
        throw new Error(`no tasks related to keyword ${keyword}`);
      }
    }
  }
}
