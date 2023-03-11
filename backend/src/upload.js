const multer = require("multer");

// Définir le stockage des fichiers pour Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/assets/images");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

// Configurer l'upload avec Multer
const upload = multer({ storage });

module.exports = upload;
