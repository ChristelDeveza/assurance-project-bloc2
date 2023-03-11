const express = require("express");

const router = express.Router();

const upload = require("./upload");
// const sharp = require("sharp");
const { ItemController } = require("./controllers");

// const upload = multer({
//   limits: {
//     fileSize: 10000000,
//   },
//   // eslint-disable-next-line consistent-return
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error("Please upload a valid image file"));
//     }
//     cb(undefined, true);
//   },
// });

// router.post("/upload_images", upload.single("upload"), async (req, res) => {
//   try {
//     await sharp(req.file.buffer)
//       .resize({ width: 250, height: 250 })
//       .png()
//       .toFile(`${__dirname}/images/${req.file.originalname}`);
//       console
//     res.status(201).send("Image uploaded succesfully");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

router.post(
  "/upload_images",
  upload.single("photo"),
  ItemController.declaration
);

router.post("/login", ItemController.login);
router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

module.exports = router;
