const firestore = require("../services/firestoreCrud");

class Escalation {
  constructor({ userId, priority }) {
    this.userId = userId;
    this.priority = priority;
  }

  async save() {
    try {
      const response = await firestore.db
        .collection("EscalationContacts")
        .add(this);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async update(data) {
    try {
      const escalationData = await firestore.db
        .collection("EscalationContacts")
        .doc(data.id)
        .get();
      if (escalationData.exists) {
        const { id, ...dataToUpdate } = data;
        const response = await escalationData.ref.update(dataToUpdate);
        const docRef = await escalationData.ref.get();
        const updatedDta = { id: data.id, ...docRef.data() };
        return updatedDta;
      } else {
        return "no data found to update";
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    const escalationDoc = await firestore.db
      .collection("EscalationContacts")
      .doc(id)
      .get();
    if (escalationDoc.exists) {
      return escalationDoc.data();
    } else {
      return null;
    }
  }

  static async getAll() {
    try {
      const snapShot = await firestore.db
        .collection("EscalationContacts")
        .get();

      const escalationData = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return escalationData;
    } catch (error) {
      console.log(error);
      return "Error retrieving tasks";
    }
  }
}

module.exports = Escalation;
