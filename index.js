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
  const link2 = `https://tr.iamerfan.ir:2054/subscrption/${url}`;
  const bpb =
    "vless://89b3cbba-e6ac-485a-9481-976a0415eab9@free.iamerfan.ir:443?encryption=none&security=tls&sni=freE.IameRFAn.IR&alpn=h2%2Chttp%2F1.1&fp=randomized&type=ws&host=fRee.IamErFaN.iR&path=%2FHyfp8xkYsyYSSSKR%3Fed%3D2560#☁️ Cloudflare Server";

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
    const result = `${data1}\n${data2}\n${bpb}`;

    // Send the final result
    res.send(result);
  } catch (error) {
    console.error("Error fetching V2Ray subscription:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/sub/:url", async (req, res) => {
  const url = req.params.url;

  if (!url) {
    return res.status(400).send("Subscription URL parameter is missing");
  }

  try {
    const link1 = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/singbox`;
    const response1 = await axios.get(link1);
    const iamerfanObj = response1.data;

    // Define the new servers
    const trServer1 = {
      tag: "🇹🇷 MCI - Wifi 1 § 443 16",
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

    const trServer2 = {
      tag: "🇹🇷 MCI - Wifi 2 § 443 14",
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
    const bpbServer1 = {
      type: "vless",
      server: "free.iamerfan.ir",
      server_port: 443,
      uuid: "89b3cbba-e6ac-485a-9481-976a0415eab9",
      domain_strategy: "prefer_ipv6",
      packet_encoding: "",
      tls: {
        alpn: ["http/1.1"],
        enabled: true,
        insecure: false,
        server_name: "fREe.IAmerfAN.IR",
        utls: {
          enabled: true,
          fingerprint: "randomized",
        },
      },
      transport: {
        early_data_header_name: "Sec-WebSocket-Protocol",
        max_early_data: 2560,
        headers: {
          Host: "FreE.IaMeRfAn.IR",
        },
        path: "/qP6znQLdDJDnFPQK",
        type: "ws",
      },
      tag: "☁️ Cloudflare Server",
    };

    // Add new servers to the outbounds array
    iamerfanObj.outbounds.push(trServer1, trServer2, bpbServer1);
    iamerfanObj.outbounds[0].outbounds.push(
      trServer1.tag,
      trServer2.tag,
      bpbServer1.tag
    );
    iamerfanObj.outbounds[1].outbounds.push(
      trServer1.tag,
      trServer2.tag,
      bpbServer1.tag
    );
    iamerfanObj.outbounds[0].outbounds =
      iamerfanObj.outbounds[0].outbounds.filter(
        (server) =>
          server !== "🇹🇷 Server 2 § 443 14" &&
          server !== "🇹🇷 Server1 § 80 14" &&
          server !== "🇹🇷 Backup Server § 443 16"
      );
    iamerfanObj.outbounds[1].outbounds =
      iamerfanObj.outbounds[1].outbounds.filter(
        (server) =>
          server !== "🇹🇷 Server 2 § 443 14" &&
          server !== "🇹🇷 Server1 § 80 14" &&
          server !== "🇹🇷 Backup Server § 443 16"
      );
    iamerfanObj.outbounds = iamerfanObj.outbounds.filter(
      (config) =>
        config.server !== "nl.iamerfan.ir" &&
        config.server !== "nl.iamerfan2.ir"
    );

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
