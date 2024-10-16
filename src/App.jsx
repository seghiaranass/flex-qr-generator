import React, { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 320,
  height: 320,
  type: "png", // We'll generate a PNG
  data: "", // This will be dynamically updated based on the URL input
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  },
  backgroundOptions: {
    color: "#e9ebee"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
});

function App() {
  const [url, setUrl] = useState(""); // State specifically for URL input
  const qrCodeRef = useRef(null);

  useEffect(() => {
    qrCode.append(qrCodeRef.current); // Append the QR code to the div
  }, []);

  const handleGenerateQR = () => {
    // Only generate QR if the input is a valid URL
    if (url.trim() !==  "" && isValidUrl(url)) {
      qrCode.update({ data: url }); // Update the QR code with the entered URL
    } else {
      alert("Please enter a valid URL.");
    }
  };

  const handleDownloadQR = () => {
    qrCode.download({ name: "qr-code", extension: "png" }); // Download the QR code as PNG
  };

  const isValidUrl = (string) => {
    try {
      new URL(string); // Check if the input is a valid URL
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="bg-purple-700 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 w-full max-w-5xl p-8 rounded-lg shadow-lg">
        <div className="flex">
          {/* Left Side */}
          <div className="w-1/2">
            <div className="mb-4">
              <input
                type="text"
                className="w-full text-left bg-white p-4 rounded-lg shadow-md"
                placeholder="Enter URL for QR code"
                value={url}
                onChange={(e) => setUrl(e.target.value)} // Update input state for URL
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-1/2 flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              {/* Placeholder for the QR Code */}
              <div ref={qrCodeRef} className="w-80 h-80"></div>
            </div>
            <div className="mt-4 flex justify-center w-full">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                onClick={handleGenerateQR}
              >
                Generate QR Code
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 ml-4"
                onClick={handleDownloadQR}
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
