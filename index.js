const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to fetch and process V2Ray subscriptions using Promises
app.get("/:url", async (req, res) => {
  // Utility function to filter unwanted configurations
  function filterConfigs(data, unwantedDomains) {
    return data
      .split("\n")
      .filter(
        (config) => !unwantedDomains.some((domain) => config.includes(domain))
      )
      .join("\n");
  }
  const url = req.params.url;
  if (!url) {
    return res.status(400).send("Subscription URL parameter is missing");
  }

  const link1 = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/auto`;
  const link2 = `https://tr.iamerfan.ir:2054/sub/${url}`;

  try {
    // Make both requests simultaneously using Promise.all
    const [response1, response2] = await Promise.all([
      axios.get(link1),
      axios.get(link2),
    ]);

    let data1 = response1.data;
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
app.get("/sub/:url", async (req, res) => {
  const url = req.params.url;
  try {
    const link1 = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/singbox`;
    const link2 = `https://tr.iamerfan.ir:2054/json/${url}`;
    if (!url) {
      return res.status(400).send("Subscription URL parameter is missing");
    }

    // Fetch data from the first iamerfan link
    const response1 = await axios.get(link1);
    let iamerfanObj = response1.data;

    // Filter out servers with "nl.iamerfan.ir" or "nl.iamerfan2.ir"
    if (iamerfanObj.outbounds) {
      iamerfanObj.outbounds = iamerfanObj.outbounds.filter(
        (server) =>
          server.server !== "nl.iamerfan.ir" &&
          server.server !== "nl.iamerfan2.ir"
      );
    } else {
      iamerfanObj.outbounds = [];
    }

    // Define the servers
    const trServer1 = {
      tag: "🇹🇷 | Mci - Wifi 1-erfan",
      type: "vless",
      server: "tr.iamerfan.ir",
      server_port: 80,
      uuid: url.toString(),
      tls: {
        enabled: false,
        server_name: "tr.iamerfan.ir",
        utls: {
          enabled: false,
          fingerprint: "",
        },
        insecure: true,
        alpn: [],
      },
      packet_encoding: "xudp",
      transport: {
        type: "ws",
        path: "/SxRCMb5XHHDtjBbeavohSEQAcZA",
        early_data_header_name: "Sec-WebSocket-Protocol",
        headers: {
          Host: "tr.iamerfan.ir",
        },
      },
    };

    const trServer2 = {
      tag: "🇹🇷 | Mci - Wifi 2-erfan-backup",
      type: "vless",
      server: "tr.iamerfan.ir",
      server_port: 443,
      uuid: url.toString(),
      tls: {
        enabled: true,
        server_name: "tr.iamerfan.ir",
        utls: {
          enabled: true,
          fingerprint: "chrome",
        },
        insecure: false,
        alpn: ["http/1.1"],
      },
      packet_encoding: "xudp",
      transport: {
        type: "ws",
        path: "/SxRCMb5XHHDtjBbeavohSEQAcZA",
        early_data_header_name: "Sec-WebSocket-Protocol",
        headers: {
          Host: "tr.iamerfan.ir",
        },
      },
    };

    // Add the new servers to the filtered outbounds array
    iamerfanObj.outbounds.push(trServer1, trServer2);

    // Send the modified iamerfanObj
    res.send(iamerfanObj);
  } catch (error) {
    console.error("Error fetching V2Ray subscription:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
