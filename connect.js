import bodyParser  from "body-parser";

const express = require("express");
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const { createPool } = require("mysql");
  const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "grand_horizon",
    connectioLimit: 10,
  });

  bmwi = [];
  x = [];
  m = [];
  series = [];
  delears = [];

  pool.query(
    `select * from bmwi`,
    (err, result, field) => {
      
      bmwi = result;
      //   return result;
    }
  );
  
  // pool.query(
  //   `select * from x`,
  //   (err, result, field) => {
      
  //     x = result;
  //     //   return result;
  //   }
  // );

  // pool.query(`select * from m`, (err, result, field) => {
  //   m = result;
  //   //   return result;
  // });
  
  // pool.query(`select * from series`, (err, result, field) => {
  //   series = result;
  //   //   return result;
  // });
  
  // pool.query(`select * from delears`, (err, result, field) => {
  //   delears = result;
  //   //   return result;
  // });

  res.send(bmwi)
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(10000);
      
      console.log(`${PORT} i am conneccted`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();