const express = require("express");
const Airtable = require("airtable");
const router = express.Router();

// Airtable setup
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// Get all products
router.get("/", (req, res) => {
  base("Products")
    .select()
    .all()
    .then((records) => {
      res.json(
        records.map((record) => ({
          id: record.id,
          name: record.get("Name"),
          description: record.get("Description"),
          price: record.get("Price"),
        }))
      );
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Create a new product
router.post("/", (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  console.log("initializing product adding api...");

  // Check if required fields are present
  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  base("Products").create(
    [
      {
        fields: {
          Name: name,
          Description: description,
          Price: parseFloat(price),
          ImageURL: imageUrl, // Include the imageUrl field
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
        name: records[0].get("Name"),
        description: records[0].get("Description"),
        price: records[0].get("Price"),
        imageUrl: records[0].get("ImageUrl"), // Return the ImageUrl
      });
    }
  );
});

// Update product
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, imageUrl } = req.body;
//   console.log(name, description, price, imageUrl);

//   base("Products").update(
//     id,
//     {
//       Name: name,
//       Description: description,
//       Price: price,
//       ImageURL: imageUrl, // Include the imageUrl field
//     },
//     (err, record) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         id: record.id,
//         name: record.get("Name"),
//         description: record.get("Description"),
//         price: record.get("Price"),
//       });
//     }
//   );
// });
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;

  console.log("Updating Product:", { id, name, description, price, imageUrl });

  base("Products").update(
    [
      {
        id,
        fields: {
          Name: name,
          Description: description,
          Price: parseFloat(price),
          ImageURL: imageUrl, // Make sure this matches Airtable field name
        },
      },
    ],
    (err, records) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ error: err.message });
      }

      if (!records || records.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      const record = records[0];

      res.json({
        id: record.id,
        name: record.get("Name"),
        description: record.get("Description"),
        price: record.get("Price"),
        imageUrl: record.get("ImageUrl"),
      });
    }
  );
});

// Delete product
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  base("Products").destroy(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(204).send();
  });
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  base("Products").find(id, (err, record) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!record) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    console.log(record);

    res.status(200).json({
      id: record.id,
      name: record.get("Name"),
      description: record.get("Description"),
      price: record.get("Price"),
      imageUrl: record.get("ImageURL"),
    });
  });
});

module.exports = router;
