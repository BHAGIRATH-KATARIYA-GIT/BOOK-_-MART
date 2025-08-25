import express from "express";
import databaseConnection from "./src/db/db.js";
import bookRoute from "./src/routes/book.routes.js";
import userRoute from "./src/routes/user.routes.js";
import customeMiddleware from "./src/middleware/custom.middleware.js";

const app = express();

const PORT = process.env.PORT || 3000;

databaseConnection();



app.use(customeMiddleware);
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

