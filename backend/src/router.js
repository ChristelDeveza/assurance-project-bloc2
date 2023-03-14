const express = require("express");

const router = express.Router();

const upload = require("./upload");

const { ItemController } = require("./controllers");
const { authorization } = require("./controllers/ItemController");

// Route post declaration
router.post(
  "/upload_images",
  upload.single("photo"),
  authorization,
  ItemController.declaration
);
// Route login
router.post("/login", ItemController.login);
// Route user details
router.get("/compteuser", authorization, ItemController.read);
// Route read declaration
router.get("/upload_images", authorization, ItemController.readDecl);
// Route logout
router.get("/logout", authorization, ItemController.logout);

// router.get("/items", ItemController.browse);
// router.put("/items/:id", ItemController.edit);
// router.post("/items", ItemController.add);
// router.delete("/items/:id", ItemController.delete);

module.exports = router;
