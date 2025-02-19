// var Airtable = require("airtable");
// var base = new Airtable({
//   apiKey:
//     "pati9vwgFrFBUmZTi.f48ab74abc3a697b4f959a5115aad790ea25042f808f9becabab954956f7e0ed",
// }).base("appEeRvdZgo2KIzvH");

// base("Products")
//   .select({
//     // Selecting the first 3 records in Grid view:
//     maxRecords: 3,
//     view: "Grid view",
//   })
//   .eachPage(
//     function page(records, fetchNextPage) {
//       records.forEach(function (record) {
//         console.log("Retrieved", record.get("Name"));
//       });
//       fetchNextPage();
//     },
//     function done(err) {
//       if (err) {
//         console.error(err);
//         return;
//       }
//     }
//   );

// base("Products").create(
//   [
//     {
//       fields: {
//         Name: "Ravi",
//         Description: "ksdc i",
//         Price: 520,
//       },
//     },
//   ],
//   function (err, records) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     records.forEach(function (record) {
//       console.log("Record ID:", record.getId());
//     });
//   }
// );
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
console.log("every this request");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
