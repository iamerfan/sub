const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Utility function to filter unwanted configurations
function filterConfigs(data, unwantedDomains) {
  return data
    .split("\n")
    .filter(
      (config) => !unwantedDomains.some((domain) => config.includes(domain))
    )
    .join("\n");
}

// Endpoint to fetch and process V2Ray subscriptions
app.get("/:url", async (req, res) => {
  const url = req.params.url;
  if (!url) {
    return res.status(400).send("Subscription URL parameter is missing");
  }

  try {
    const link1 = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/auto`;
    const link2 = `https://tr.iamerfan.ir:2054/sub/${url}`;

    // Fetch data from link1
    const response1 = await axios.get(link1);
    let data1 = response1.data;

    // Fetch data from link2
    const response2 = await axios.get(link2);
    const data2 = response2.data;

    // Remove unwanted configurations
    const unwantedDomains = ["nl.iamerfan.ir", "nl.iamerfan2.ir"];
    data1 = filterConfigs(data1, unwantedDomains);

    // Combine the filtered data1 with data2
    const result = `${data1}\n${data2}`;

    // Send the final result
    res.send(result);
  } catch (error) {
    console.error("Error fetching V2Ray subscription:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
