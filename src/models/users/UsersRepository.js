import db from "../../database/index.js";

export default class UsersRepository {
  constructor() {
    this.db = db;
  }

  async getUsers() {
    const allUsers = await this.db.manyOrNone("SELECT * FROM users");
    // console.log(allUsers);
    return allUsers;
  }

  async getUserById(id) {
    const user = await this.db.oneOrNone(
      "SELECT * FROM users WHERE id = $1",
      id
    );
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      email
    );
    return user;
  }

  async createUser(user) {
    await this.db.none(
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)",
      [user.id, user.name, user.email, user.password]
    );
    return user;
  }

  async updateUser(id, name, email, password) {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }

    const updatedUser = await this.db.one(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    );

    return updatedUser;
  }

  async deleteUser(id) {
    await this.db.none("DELETE FROM users WHERE id = $1", id);
  }
}
