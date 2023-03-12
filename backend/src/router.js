const express = require("express");

const router = express.Router();

const upload = require("./upload");

const { ItemController } = require("./controllers");
const { authorization } = require("./controllers/ItemController");

router.post(
  "/upload_images",
  upload.single("photo"),
  ItemController.declaration
);
router.post("/login", ItemController.login);
router.get("/compteuser", authorization, ItemController.read);

// router.get("/items", ItemController.browse);
// router.put("/items/:id", ItemController.edit);
// router.post("/items", ItemController.add);
// router.delete("/items/:id", ItemController.delete);

module.exports = router;
