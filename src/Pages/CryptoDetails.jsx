
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 

import "./CryptoDetails.css"; 

function CryptoDetails() {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [editableData, setEditableData] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${id}`
        );
        setCryptoData(response.data.data);
        setEditableData(response.data.data); 
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`https://api.coincap.io/v2/assets/${id}`, editableData);
      setCryptoData(editableData);
      console.log("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (!cryptoData) {
    return <div className="loading">Loading...</div>;
  }

  const {
    name,
    symbol,
    rank,
    marketCapUsd,
    volumeUsd24Hr,
    supply,
    maxSupply,
    vwap24Hr,
    explorer,
  } = cryptoData;

  return (
    <div className="crypto-details">
      <h1 className="crypto-name">
        {name} ({symbol})
      </h1>
      <ul className="crypto-info">
        <li>
          <strong>Rank:</strong> {rank}
        </li>
        <li>
          <strong>Price (USD):</strong>{" "}
          <input
            type="text"
            name="priceUsd"
            value={editableData.priceUsd}
            onChange={handleInputChange}
            onBlur={handleSaveChanges}
          />
        </li>
        <li>
          <strong>Change (24H):</strong>{" "}
          <input
            type="text"
            name="changePercent24Hr"
            value={editableData.changePercent24Hr}
            onChange={handleInputChange}
            onBlur={handleSaveChanges}
          />
          %
        </li>
        <li>
          <strong>Market Cap (USD):</strong> ${marketCapUsd}
        </li>
        <li>
          <strong>Volume (USD 24H):</strong> ${volumeUsd24Hr}
        </li>
        <li>
          <strong>Supply:</strong> {supply}
        </li>
        <li>
          <strong>Max Supply:</strong> {maxSupply}
        </li>
        <li>
          <strong>VWAP (USD 24H):</strong> ${vwap24Hr}
        </li>
        <li>
          <strong>Explorer:</strong>{" "}
          <a href={explorer} target="_blank" rel="noopener noreferrer">
            {explorer}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default CryptoDetails;
