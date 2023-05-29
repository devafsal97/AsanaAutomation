const firestore = require("../services/firestoreCrud");

class User {
  constructor({ name, email, phoneNumber, role }) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }

  async save() {
    const newUser = { ...this };
    const userByEmail = await User.findUserByEmail(newUser.email);
    console.log(userByEmail);
    if (userByEmail == null) {
      const response = await firestore.db.collection("Users").add({ ...this });
      console.log(response, "res");
      return User.findById(response._path.segments[1]);
    } else {
      throw new Error("user already exist");
    }
  }

  static async update(data) {
    const userData = await firestore.db.collection("Users").doc(data.id).get();
    if (userData.exists) {
      const { id, ...dataToUpdate } = data;
      await userData.ref.update(dataToUpdate);
      return User.findById(data.id);
    } else {
      throw new Error("no data found to update");
    }
  }

  static async findById(id) {
    console.log("id", id);
    const userDoc = await firestore.db.collection("Users").doc(id).get();
    if (userDoc.exists) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      throw new Error("user not found");
    }
  }

  static async getAll(keyword) {
    try {
      if (!keyword) {
        const snapShot = await firestore.db.collection("Users").get();

        const usersData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return usersData;
      } else {
        const snapShot = await firestore.db
          .collection("Users")
          .where("name", ">=", keyword)
          .where("name", "<=", keyword + "\uf8ff")
          .get();
        const usersData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return usersData;
      }
    } catch (error) {
      console.log(error);
      return "Error retrieving tasks";
    }
  }
  static async findUserByEmail(email) {
    const userDoc = await firestore.db
      .collection("Users")
      .where("email", "==", email)
      .get();

    if (userDoc.docs.length != 0) {
      const doc = userDoc.docs[0];
      const userData = { id: doc.id, ...doc.data() };
      return userData;
    } else {
      return null;
    }
  }
}

module.exports = User;
