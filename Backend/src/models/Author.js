const firestore = require("../services/firestoreCrud");

class Author {
  constructor({ userId, time }) {
    this.userId = userId;
    this.time = time;
  }

  async save() {
    try {
      const response = await firestore.db.collection("authors").add(this);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async update(data) {
    try {
      const authorData = await firestore.db
        .collection("authors")
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
    const authorDoc = await firestore.db.collection("authors").doc(id).get();
    if (authorDoc.exists) {
      return authorDoc.data();
    } else {
      return null;
    }
  }

  static async getAll(offset, limit, keyword) {
    try {
      if (!keyword) {
        const snapShot = await db
          .collection("authors")
          .limit(parseInt(limit))
          .offset(parseInt(offset))
          .get();

        const authorsData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return authorsData;
      } else {
        const snapShot = await db
          .collection("users")
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

export default Author;
