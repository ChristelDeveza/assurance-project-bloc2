const express = require("express");

const router = express.Router();

const upload = require("./upload");

const { ItemController } = require("./controllers");
// const { authorization } = require("./controllers/ItemController");

// Route post declaration
router.post(
  "/declaration/:id",
  upload.single("photo"),

  ItemController.declaration
);
// Route login
router.post("/login", ItemController.login);
// Route user details
router.get("/compteuser/:id", ItemController.read);
// Route read declaration
router.get("/getdeclaration/:id", ItemController.readDecl);
// Route logout
router.get("/logout", ItemController.logout);

module.exports = router;
