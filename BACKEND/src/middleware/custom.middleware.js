import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const whitelist = ["http://localhost:5173", "http://localhost:5174"];

app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173' ,
//   credentials: true
// }));


//ex : scheme://hostname:port
//Scheme (protocol) → http, https, ftp, etc.
// Hostname (domain / IP) → like example.com, localhost, 192.168.0.5.
// Port (optional) → like :3000, :8080.
// If omitted, defaults are assumed (80 for HTTP, 443 for HTTPS).


// origin tell us to only allowed this requests when we write this :
// origin: 'http://example.com'  this request only allowed



app.use(
  cors({
    origin: function (origin, callback) {   // origin containe a request url // callback(error, result)
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed bt CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
