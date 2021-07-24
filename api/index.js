const express = require("express");
const app = express();
const dotenv = require("dotenv"); // doing configuration.(read bout dis later)
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer"); //for uploading files
const path = require("path");

dotenv.config();
app.use(express.json()); //to enable our application to send json data

// making images folder in API "PUBLIC" (middleware and serving static assets to the server thingy. idk this yet, not for long tho.)
app.use("/images", express.static(path.join(__dirname, "/images")));

//connecting to mongoDB using mongoose:

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("connected to mongoDB"))
  .catch((err) => {
    console.log(err);
  });

//multer smjh nhi aya bancho..

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file is up!");
});

// ughh.

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("running on mentioned port");
});
