const express = require("express");

const router = express.Router();

const upload = require("./upload");

const { ItemController } = require("./controllers");

router.post(
  "/upload_images",
  upload.single("photo"),
  ItemController.declaration
);
router.get("/compteuser/:id", ItemController.read);
router.post("/login", ItemController.login);
// router.get("/items", ItemController.browse);
// router.put("/items/:id", ItemController.edit);
// router.post("/items", ItemController.add);
// router.delete("/items/:id", ItemController.delete);

module.exports = router;
