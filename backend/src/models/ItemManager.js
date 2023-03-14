const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  static table = "declaration";

  // insert(item) {
  //   return this.connection.query(
  //     `insert into ${ItemManager.table} (title) values (?)`,
  //     [item.title]
  //   );
  // }

  insert(declaration) {
    return this.connection.query(
      `insert into ${ItemManager.table} (date_sinister, description_sinister, photo, userId) values (?, ?, ?, ?)`,
      [
        declaration.date_sinister,
        declaration.description_sinister,
        declaration.photo,
        declaration.userId,
      ]
    );
  }

  findDecl(id) {
    return this.connection.query(
      `select * from  ${this.table} where userId = ?`,
      [id]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${ItemManager.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = ItemManager;
