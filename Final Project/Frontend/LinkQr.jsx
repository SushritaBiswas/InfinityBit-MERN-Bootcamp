import axios from "axios";
import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation } from "react-router-dom";

function LinkQr() {
  const location = useLocation();
  const qrData = location.state?.qrData || null;

  const [qrLink, setQrLink] = useState(qrData ? qrData.link : "");
  const [qrColor, setQrColor] = useState(qrData ? qrData.color : "#0000");

  const qrReference = useRef();

  const qrDownload = () => {
    const canvas = qrReference.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  const qrSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const payload = { link: qrLink, color: qrColor };
      let res;

      if (qrData && qrData._id) {
        res = await axios.post(
          `http://localhost:3000/editqr/${qrData._id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post("http://localhost:3000/add", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert("QR Saved Successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Failed to save QR:", error);
      alert("Failed to save QR code");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">QR GENERATOR AND MANAGER</h1>

      <input
        type="text"
        placeholder="Enter your url"
        className="mb-2 p-2 border rounded w-80"
        onChange={(e) => setQrLink(e.target.value)}
      />

      <input
        type="color"
        className="mb-4 p-2 border rounded w-30 cursor-pointer"
        value={qrColor}
        onChange={(e) => setQrColor(e.target.value)}
      />

      <div ref={qrReference} className="bg-white p-2 rounded-b-lg shadow-lg">
        <QRCodeCanvas
          value={qrLink}
          fgColor={qrColor}
          size={200}
          includeMargin={true}
        />
      </div>

      <div className="mt-4 flex gap-4">
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-900 transition cursor-pointer"
          onClick={qrSave}
        >
          Save QR
        </button>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-900 transition cursor-pointer"
          onClick={qrDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default LinkQr;
