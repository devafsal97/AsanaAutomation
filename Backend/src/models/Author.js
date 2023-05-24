const firestore = require("../services/firestoreCrud");

class Author {
  constructor({ userId, startTime, endTime }) {
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  async save() {
    try {
      const response = await firestore.db
        .collection("Authors")
        .add({ ...this });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(id) {
    console.log("iddddd", id);
    const response = await firestore.db.collection("Authors").doc(id).delete();
    return response;
  }

  static async update(data) {
    try {
      const authorData = await firestore.db
        .collection("Authors")
        .doc(data.id)
        .get();
      if (authorData.exists) {
        const { id, ...dataToUpdate } = data;
        const response = authorData.ref.update(dataToUpdate);
        return response;
      } else {
        return "no data found to update";
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    const authorDoc = await firestore.db.collection("Authors").doc(id).get();
    if (authorDoc.exists) {
      return authorDoc.data();
    } else {
      return null;
    }
  }

  static async findById(id) {
    const authorDoc = await firestore.db.collection("Authors").doc(id).get();
    if (authorDoc.exists) {
      return authorDoc.data();
    } else {
      return null;
    }
  }

  static async getAll(keyword) {
    console.log("keyword", keyword);
    try {
      if (!keyword) {
        const snapShot = await firestore.db.collection("Authors").get();

        console.log("doc", snapShot.docs[0]);

        const authorsData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return authorsData;
      } else {
        const snapShot = await firestore.db
          .collection("Authors")
          .where("name", ">=", keyword)
          .where("name", "<=", keyword + "\uf8ff")
          .get();
        const authorsData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return authorsData;
      }
    } catch (error) {
      console.log(error);
      return "Error retrieving tasks";
    }
  }
}

module.exports = Author;
