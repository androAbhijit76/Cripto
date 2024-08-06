import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { IoReload } from "react-icons/io5";
import { getAssets } from "../functions/CryptoSlice";
import { useNavigate } from "react-router-dom";
export default function CryptoList() {
  const dispatch = useDispatch();
  const { assets } = useSelector((state) => state?.crypto); 

  const [rowData, setRowData] = useState([]);
  const pagination = true;

  const paginationPageSize = 10;

    const paginationPageSizeSelector = [10, 20, 50, 100];
const navigate = useNavigate()

  const [colDefs] = useState([
    { field: "name", headerName: "Name", sortable: true, filter: true },
    { field: "symbol", headerName: "Symbol", sortable: true, filter: true },
    {
      field: "rank",
      headerName: "Rank",
      sortable: true,
      filter: true,
      minWidth: 70,
      maxWidth: 90,
    },
    {
      field: "priceUsd",
      headerName: "Price (USD)",
      sortable: true,
      filter: true,
    },
    {
      field: "changePercent24Hr",
      headerName: "Change (%)",
      sortable: true,
      filter: false,
    },
    {
      field: "marketCapUsd",
      headerName: "Market Cap (USD)",
      sortable: true,
      filter: true,
    },
    {
      field: "volumeUsd24Hr",
      headerName: "Volume (USD 24H)",
      sortable: true,
      filter: true,
    },

    { field: "supply", headerName: "Supply", sortable: true, filter: true },
  ]);

  useEffect(() => {
    dispatch(getAssets());
  }, [dispatch]);

  useEffect(() => {
    if (assets && assets.length > 0) {
      setRowData(assets);
    }
  }, [assets]);
  function refreshAssets() {
    dispatch(getAssets());
    setRowData(assets);
    }
     const handleRowClick = (event) => {
       const rowData = event.data; 
       const cryptoId = rowData.id;

      navigate(`/crypto/${cryptoId}`);
     };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1 style={{ textAlign: "center", flexGrow: 1 }}>Crypto Currencies</h1>
        <button
          style={{
            marginLeft: "auto",
            marginRight: "3rem",
            border: "none",
            background: "transparent",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          onClick={() => refreshAssets()}
        >
          <IoReload />
        </button>
      </div>
      <div
        className="ag-theme-quartz-dark"
        style={{ height: "80vh", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  );
}
