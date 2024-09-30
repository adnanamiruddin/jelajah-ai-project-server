import { formatDate } from "../helpers/helper.js";

class User {
  constructor(userUID, firstName, lastName) {
    this.userUID = userUID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = "student";
    this.isOnQuizId = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toObject() {
    return {
      userUID: this.userUID,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      isOnQuizId: this.isOnQuizId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static getData(doc) {
    const data = doc.data();
    const user = new User(data.userUID, data.firstName, data.lastName);
    user.id = doc.id;
    user.role = data.role;
    user.isOnQuizId = data.isOnQuizId;
    user.password = undefined;
    user.createdAt = formatDate(data.createdAt);
    user.updatedAt = formatDate(data.updatedAt);
    return user;
  }
}

export default User;
