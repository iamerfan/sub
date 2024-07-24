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
    const bpbServers = [
      "vless://89b3cbba-e6ac-485a-9481-976a0415eab9@bpb.iamerfan.ir:443?encryption=none&security=tls&sni=BpB.iAmERFan.ir&alpn=h2%2Chttp%2F1.1&fp=randomized&type=ws&host=BPb.IamerFAn.iR&path=%2FQhIwIIl7BsKopQd9%3Fed%3D2560#%F0%9F%92%A6%20BPB%20-%20Domain_1%20%3A%20443",
      "vless://89b3cbba-e6ac-485a-9481-976a0415eab9@www.speedtest.net:443?encryption=none&security=tls&sni=BPB.iAmErFan.ir&alpn=h2%2Chttp%2F1.1&fp=randomized&type=ws&host=BpB.IAMErFAN.iR&path=%2FYBaAdTvWZDnAbEuM%3Fed%3D2560#%F0%9F%92%A6%20BPB%20-%20Domain_2%20%3A%20443",
      "vless://89b3cbba-e6ac-485a-9481-976a0415eab9@188.114.96.3:443?encryption=none&security=tls&sni=BPB.iAmeRFan.IR&alpn=h2%2Chttp%2F1.1&fp=randomized&type=ws&host=Bpb.IaMerfaN.Ir&path=%2F0R2BErQNzKb5NHd5%3Fed%3D2560#%F0%9F%92%A6%20BPB%20-%20IPv4_1%20%3A%20443",
      "vless://89b3cbba-e6ac-485a-9481-976a0415eab9@188.114.97.3:443?encryption=none&security=tls&sni=BPB.iAmERfan.Ir&alpn=h2%2Chttp%2F1.1&fp=randomized&type=ws&host=BPb.IAMERFAn.Ir&path=%2FyeYDz5XrFYLNePI4%3Fed%3D2560#%F0%9F%92%A6%20BPB%20-%20IPv4_2%20%3A%20443",
      "vless://89b3cbba-e6ac-485a-9481-976a0415eab9@104.16.13.139:443?encryption=none&security=tls&sni=BPb.IAmErfAn.iR&alpn=h2%2Chttp%2F1.1&fp=randomized&type=ws&host=bPB.IaMERfAn.Ir&path=%2FqHWbKrAphGAyuar6%3Fed%3D2560#%F0%9F%92%A6%20BPB%20-%20Clean%20IP_1%20%3A%20443",
    ];

    const link1 = `https://iamerfan.ir/h8fK6YW30DpswBcb9IqMmIU/${url}/auto`;

    // Fetch the main link
    const response1 = await axios.get(link1);
    const data1 = response1.data;

    // Combine the main link data with the bpb server links
    const mixedData = `${data1}\n${bpbServers.join("\n")}`;

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
