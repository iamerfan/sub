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
    const [response1, response2] = await axios.all([
      axios.get(link1),
      axios.get(link2),
    ]);
    const data1 = response1.data;
    const data2 = response2.data;
    const mixedData = `${data1}\n${data2}`;

    res.send(mixedData);
  } catch (error) {
    console.error("Error fetching V2Ray subscription:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/sub/:url", async (req, res) => {
  const url = req.params.url;
  try {
    const iamerfan = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/singbox`;
    const nl = `https://nl.iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/singbox`;
    if (!url) {
      return res.status(400).send("Subscription URL parameter is missing");
    }

    // Make requests to both links concurrently
    const [response1, response2] = await axios.all([
      axios.get(iamerfan),
      axios.get(nl),
    ]);
    const iamerfanObj = response1.data;
    const nlObj = response2.data;
    const lastThreeOutbounds = iamerfanObj.outbounds.slice(-3);
    nlObj.outbounds = nlObj.outbounds.concat(lastThreeOutbounds);

    res.send(nlObj);
  } catch (error) {
    console.error("Error fetching V2Ray subscription:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
