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
      `insert into ${ItemManager.table} (date_sinister, description_sinister, photo) values (?, ?, ?)`,
      [
        declaration.date_sinister,
        declaration.description_sinister,
        declaration.photo,
      ]
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
