const express = require("express");
const Airtable = require("airtable");
const router = express.Router();

// Airtable setup
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// Get all orders
router.get("/", async (req, res) => {
  try {
    const records = await base("Orders").select().all();

    const orders = records.map((record) => ({
      id: record.id,
      productId: record.get("ProductID"),
      buyerName: record.get("BuyerName"),
    }));
    console.log("Orders data");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders from Airtable: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Place a new order
router.post("/", async (req, res) => {
  const { productId, buyerName, shippingAddress, quantity, contactNumber } =
    req.body;
  console.log(productId, buyerName, shippingAddress, quantity, contactNumber);

  if (
    !productId ||
    !buyerName ||
    !shippingAddress ||
    !quantity ||
    !contactNumber
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log("orders creating Api..");

  base("Orders").create(
    [
      {
        fields: {
          ProductID: [productId],
          BuyerName: buyerName,
          Quantity: quantity,
          ShippingAddress: shippingAddress,
          ContactNumber: contactNumber,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.log("Error creating product in Airtable: ", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: records[0].id,
        productId: records[0].get("ProductID"),
        buyerName: records[0].get("BuyerName"),
      });
    }
  );
});

module.exports = router;
