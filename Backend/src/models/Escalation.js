class Escalation {
  constructor({ userId, priority }) {
    this.userId = userId;
    this.priority = priority;
  }

  async save() {
    try {
      const response = await firestore.db.collection("escalation").add(this);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async update(data) {
    try {
      const escalationData = await firestore.db
        .collection("escalation")
        .doc(data.id)
        .get();
      if (escalationData.exists) {
        const { id, ...dataToUpdate } = data;
        const response = escalationData.ref.update(dataToUpdate);
        return response;
      } else {
        return "no data found to update";
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    const escalationDoc = await firestore.db
      .collection("escalation")
      .doc(id)
      .get();
    if (escalationDoc.exists) {
      return authorDoc.data();
    } else {
      return null;
    }
  }

  static async getAll(offset, limit, keyword) {
    try {
      if (!keyword) {
        const snapShot = await db
          .collection("escalation")
          .limit(parseInt(limit))
          .offset(parseInt(offset))
          .get();

        const escalationData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return escalationData;
      } else {
        const snapShot = await db
          .collection("users")
          .where("name", ">=", keyword)
          .where("name", "<=", keyword + "\uf8ff")
          .get();
        const escalationData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return escalationData;
      }
    } catch (error) {
      console.log(error);
      return "Error retrieving tasks";
    }
  }
}

export default Escalation;
