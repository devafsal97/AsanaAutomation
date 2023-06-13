const firestore = require("../services/firestoreCrud");

class Author {
  constructor({ userId, startTime, endTime }) {
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  async save() {
    const author = { ...this };
    const authorById = await Author.findByUserId(author.userId);
    if (authorById == null) {
      const response = await firestore.db.collection("Authors").add(author);
      return Author.findById(response._path.segments[1]);
    } else {
      throw new Error("author already exist");
    }
  }

  static async delete(id) {
    const response = await firestore.db.collection("Authors").doc(id).delete();
    return response;
  }

  static async update(data) {
    const authorData = await firestore.db
      .collection("Authors")
      .doc(data.id)
      .get();
    if (authorData.exists) {
      const { id, ...dataToUpdate } = data;
      const response = authorData.ref.update(dataToUpdate);
      return response;
    } else {
      throw new Error("no document found to update");
    }
  }

  static async findById(id) {
    const authorDoc = await firestore.db.collection("Authors").doc(id).get();
    if (authorDoc.exists) {
      return { id, ...authorDoc.data() };
    } else {
      throw new Error("no author data found to update");
    }
  }

  static async getAll() {
    console.log("get author called");
    const snapShot = await firestore.db.collection("Authors").get();
    if (!!snapShot.docs.length) {
      const authorsData = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("author data", authorsData);
      return authorsData;
    } else {
      throw new Error("author's list empty");
    }
  }

  static async findByUserId(userId) {
    const authorDoc = await firestore.db
      .collection("Authors")
      .where("userId", "==", userId)
      .get();
    if (authorDoc.docs.length == 0) {
      return null;
    } else {
      throw new Error("author already exist");
    }
  }
}

module.exports = Author;
