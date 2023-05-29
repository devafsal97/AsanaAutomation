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
    } catch (err) {}
  }

  static async findById(id) {
    const authorDoc = await firestore.db.collection("Authors").doc(id).get();
    if (authorDoc.exists) {
      return { id, ...authorDoc.data() };
    } else {
      return null;
    }
  }

  static async getAll() {
    const snapShot = await firestore.db.collection("Authors").get();

    const authorsData = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return authorsData;
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
