const path = require("path");
const express = require("express");

const publicDirPath = path.join(__dirname, "../public");

const app = express();
app.listen(3000, () => {
  console.log("app is started on port 3000");
});

app.use(express.static(publicDirPath));

// app.get("", (req, res) => {
//   res.send("<h1>Hello Express!</h1>");
// });

// app.get("/about", (req, res) => {
//   res.send([
//     {
//       name: "sunder",
//       age: 25,
//     },
//     {
//       name: "bhavik",
//       age: 4,
//     },
//   ]);
// });

// app.get("/help", (req, res) => {
//   res.send("how can we help you");
// });

app.get("/weather", (req, res) => {
  res.send("You are on weather Page");
});
