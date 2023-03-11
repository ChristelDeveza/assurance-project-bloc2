const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findByMail(email) {
    return this.connection.query(`select * from ${this.table} where Email=?`, [
      email,
    ]);
  }
}

module.exports = UserManager;
