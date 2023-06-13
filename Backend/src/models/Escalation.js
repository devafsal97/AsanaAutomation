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
    const escalationById = await Escalation.findByUserId(data.userId);
    console.log(escalationById, "esca");
    if (escalationById == null) {
      const escalationData = await firestore.db
        .collection("EscalationContacts")
        .doc(data.id)
        .get();
      if (escalationData.exists) {
        const { id, ...dataToUpdate } = data;
        const response = await escalationData.ref.update(dataToUpdate);
        const docRef = await escalationData.ref.get();
        const updatedDta = { id: data.id, ...docRef.data() };
        console.log(updatedDta);
        return updatedDta;
      }
    }
  }

  static async findById(id) {
    const escalationDoc = await firestore.db
      .collection("EscalationContacts")
      .doc(id)
      .get();
    if (escalationDoc.exists) {
      console.log("dataaa", escalationDoc.data());
      return escalationDoc.data();
    } else {
      return null;
    }
  }

  static async getAll() {
    const snapShot = await firestore.db.collection("EscalationContacts").get();
    if (!!snapShot.docs.length) {
      const escalationData = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return escalationData;
    } else {
      throw new Error("no escalation data found");
    }
  }

  static async findByUserId(userId) {
    console.log(userId, "fsfgsfbs");
    const escalationDoc = await firestore.db
      .collection("EscalationContacts")
      .where("userId", "==", userId)
      .get();
    if (escalationDoc.docs.length == 0) {
      return null;
    } else {
      throw new Error("escalation contact already exist");
    }
  }
}

module.exports = Escalation;
