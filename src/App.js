import React from "react";
import { useState } from "react";

import TextField from "./components/TextField";
import MaterialTable from "material-table";

export default function MaterialTableDemo() {
  const [state, setState] = useState({
    columns: [
      { title: "Vendor", field: "vendor" },
      {
        title: "Price",
        field: "price",
        render: (rowData) => {
          return <TextField editTable={editTable} rowData={rowData} />;
        },
      },
      { title: "Place", field: "place" },
    ],
    data: [
      { vendor: "ExpressVPN", price: 6.67, place: 1 },
      { vendor: "Surfshark", price: 5.99, place: 2 },
      { vendor: "NordVPN", price: 6.99, place: 3 },
      { vendor: "IPVanish", price: 5.2, place: 4 },
    ],
  });

  const editTable = (price, index) => {
    setState((prevState) => {
      const data = [...prevState.data];
      data[index] = { ...data[index], price };
      return { ...prevState, data };
    });
  };

  return (
    <MaterialTable
      title={"Best 4 vpn"}
      options={{ paging: false, search: false }}
      columns={state.columns}
      data={state.data}
      editable={{
        isEditable: (rowData) => rowData.vendor !== "ExpressVPN",
        isDeletable: (rowData) => rowData.vendor !== "ExpressVPN",
        isEditHidden: (rowData) => true,
        isDeleteHidden: (rowData) => true,
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
              resolve();
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              setState((prevState) => {
                resolve();
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
