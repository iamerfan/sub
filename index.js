const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to fetch V2Ray subscription link
app.get("/:url", async (req, res) => {
  const url = req.params.url;
  if (!url) {
    return res.status(400).send("Subscription URL parameter is missing");
  }

  try {
    const link1 = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/auto`;

    // Fetch the main link
    const response1 = await axios.get(link1);
    const data1 = response1.data;

    res.send(data1);
  } catch (error) {
    console.error("Error fetching V2Ray subscription:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
