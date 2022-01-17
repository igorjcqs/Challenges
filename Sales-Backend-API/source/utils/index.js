const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const maxAge = 3 * 24 * 60 * 60;

function createToken(id) {
  return jwt.sign({ id }, "Martins Websites", {
    expiresIn: maxAge,
  });
}

function firstUpper(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function newError(res, errorMessage) {
  const fixed = errorMessage
    .replace(/[^\w\s]/gi, "")
    .replace("productName", "Name")
    .replace("productDesc", "Description")
    .replace("productPrice", "Price")
    .replace("productSize", "Size")
    .replace("productColor", "Color")
    .replace("productMaterial", "Material")
    .replace("productSection", "Section")
    .replace("productStock", "Stock")
    .replace("firstName", "First name")
    .replace("lastName", "Last name")
    .replace("email", "Email")
    .replace("password", "Password");
  return res.status(400).json({ error: fixed });
}

const storageTypes = {
  local: multer.diskStorage({
    destination: "./temp",
    filename: function (req, file, callBack) {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);
        file.key =
          req.params.productId +
          "-" +
          hash.toString("hex") +
          "-" +
          file.originalname;
        callBack(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: "martins-upload-images",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, callBack) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);
        file.key =
          req.params.productId +
          "-" +
          hash.toString("hex") +
          "-" +
          file.originalname;
        callBack(null, file.key);
      });
    },
  }),
};

const upload = multer({
  storage: storageTypes["s3"],
  limits: { fieldSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image."));
    }
  },
}).single("imageUploadField");

module.exports = {
  firstUpper,
  newError,
  createToken,
  maxAge,
  upload,
};
