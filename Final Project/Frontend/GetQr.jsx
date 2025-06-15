import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

function GetQr() {
  const [qrlinks, setQrLinks] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState(true);
  const navigate = useNavigate();

  const fetchQrLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setQrLinks(res.data);
      setLoadingMsg(false);
    } catch (error) {
      console.log(error);
      setLoadingMsg(false);
    }
  };

  useEffect(() => {
    fetchQrLinks();
  }, []);

  const editQr = (qr) => {
    navigate("/linkqr", { state: { qrData: qr } });
  };

  const deleteQr = async (qrid) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:3000/deleteqr/${qrid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.msg);

      fetchQrLinks();
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingMsg) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          The QR Links
        </h2>

        <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">QR LINKS</th>
                <th className="py-3 px-6 text-left">QR COLOR</th>
                <th className="py-3 px-6 text-left" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {qrlinks.map((qr, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <div className="bg-white p-2 rounded-b-lg shadow-lg">
                      <QRCodeCanvas
                        value={qr.link}
                        fgColor={qr.color}
                        size={100}
                        includeMargin={true}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">{qr.color}</td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-indigo-700 text-white px-4 py-2 hover:bg-indigo-900 cursor-pointer"
                      onClick={() => editQr(qr)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-red-700 text-white px-4 py-2 hover:bg-red-900 cursor-pointer"
                      onClick={() => deleteQr(qr._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default GetQr;
