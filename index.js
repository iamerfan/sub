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
  function filterConfigs(data, unwantedDomains) {
    return data
      .split("\n")
      .filter(
        (config) => !unwantedDomains.some((domain) => config.includes(domain))
      )
      .join("\n");
  }
  try {
    const bpb =
      "vless://89b3cbba-e6ac-485a-9481-976a0415eab9@free.iamerfan.ir:443?encryption=none&security=tls&sni=freE.IameRFAn.IR&alpn=h2%2Chttp%2F1.1&fp=randomized&type=ws&host=fRee.IamErFaN.iR&path=%2FHyfp8xkYsyYSSSKR%3Fed%3D2560#☁️ Cloudflare Server";
    const link1 = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/auto`;

    // Fetch the main link
    const response1 = await axios.get(link1);
    let data1 = response1.data;

    // Combine the main link data with the bpb server links
    const mixedData = `${data1}\n${bpb}`;

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
