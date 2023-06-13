const firestore = require("../services/firestoreCrud");

class Comment {
  constructor({ name, comment }) {
    this.name = name;
    this.comment = comment;
  }

  async save() {
    const comment = { ...this };
    const response = await firestore.db.collection("Comments").add(comment);
    return Comment.findById(response._path.segments[1]);
  }

  static async update(data) {
    try {
      const commentData = await firestore.db
        .collection("Comments")
        .doc(data.id)
        .get();
      if (commentData.exists) {
        const { id, ...dataToUpdate } = data;
        const response = await commentData.ref.update(dataToUpdate);
        return response;
      } else {
        return "no data found to update";
      }
    } catch (err) {}
  }

  static async findById(id) {
    const commentDoc = await firestore.db.collection("Comments").doc(id).get();
    if (commentDoc.exists) {
      return { id, ...commentDoc.data() };
    } else {
      return null;
    }
  }

  static async getAll() {
    const snapShot = await firestore.db.collection("Comments").get();
    const commentData = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return commentData;
  }

  static async getByName(name) {
    const snapShot = await firestore.db
      .collection("Comments")
      .where("name", "==", name)
      .get();
    if (!!snapShot.docs.length) {
      const comment = snapShot.docs[0].data();
      return comment;
    }
  }
}

module.exports = Comment;
