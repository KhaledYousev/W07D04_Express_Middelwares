const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

let users = ["John", "Mark"];

const logUsers = (req, res, next) => {
  console.log(users);
  next();
};
app.use(logUsers);

const logMethod = (req, res, next) => {
  console.log(req.method);
  next();
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/////////////////////////// Pulse Q5//////////////////////////////////////////////

app.get("/users", logMethod, (req, res, next) => {
  if (users.length === 0) {
    const err = new Error("No users");
    err.status = 500;
    next(err);
  } else {
    res.json(users);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status);
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});