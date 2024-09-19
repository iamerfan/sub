const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to fetch V2Ray subscription link
app.get("/:url", async (req, res) => {
  const url = req.params.url;
  try {
    const link1 = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/auto`;
    const link2 = `https://nl.iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/auto`;
    if (!url) {
      return res.status(400).send("Subscription URL parameter is missing");
    }

    // Make requests to both links concurrently
    const [response1] = await axios.all([axios.get(link1)]);
    const data1 = response1.data;
    const mixedData = `${data1}`;

    res.send(mixedData);
  } catch (error) {
    console.error("Error fetching V2Ray subscription:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
