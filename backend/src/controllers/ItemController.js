// const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

class ItemController {
  static declaration = (req, res) => {
    const { date, description } = req.body;
    const photoPath = req.file.path;
    // Permet de récupérer l'ID utilisateur à partir du cookie / un token JWT
    const { userId } = req;

    const item = {
      date_sinister: date,
      description_sinister: description,
      photo: photoPath,
      userId,
    };

    models.declaration
      .insert(item)
      .then(([result]) => {
        res.status(201).send({ ...item, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  // user login
  static login = (req, res) => {
    const { email, password } = req.body;
    // if email or password field is empty
    if (!email || !password) {
      res
        .status(400)
        .send({ error: "Error, email and password must been specified" });
    }
    // if email and password are not empty
    models.user
      .findByMail(email)
      .then(async ([rows]) => {
        if (rows[0] == null) {
          res.status(401).send({
            error: "Invalid email",
          });
        } else {
          const { id } = rows[0];

          if (password) {
            const token = jwt.sign({ id }, process.env.JWT_AUTH_SECRET, {
              expiresIn: "1h",
            });

            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                domain: "lighthearted-stroopwafel-baa966.netlify.app",
              })
              .status(200)
              .send({
                id,
                email,
              });
          } else {
            res.status(401).send({
              error: "Invalid password",
            });
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  };

  // get user details
  static read = (req, res) => {
    const id = req.userId;

    models.user
      .find(id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  // get declaration details
  static readDecl = (req, res) => {
    const id = req.userId;

    models.declaration
      .findDecl(id)
      .then(([rows]) => {
        if (rows.length == null) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  // // Middleware - vérify token
  static authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_AUTH_SECRET);
      req.userId = data.id;
      return next();
    } catch {
      return res.sendStatus(401);
    }
  };

  // User logout
  static logout = (req, res) => {
    return res.clearCookie("access_token").sendStatus(200);
  };

  static edit = (req, res) => {
    const item = req.body;

    // TODO validations (length, format...)

    item.id = parseInt(req.params.id, 10);

    models.item
      .update(item)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const item = req.body;

    // TODO validations (length, format...)

    models.item
      .insert(item)
      .then(([result]) => {
        res.status(201).send({ ...item, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.item
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = ItemController;
