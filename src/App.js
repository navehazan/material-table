import React from "react";
import MaterialTable from "material-table";
import { useState } from "react";

export default function MaterialTableDemo() {
  const [state, setState] = useState({
    columns: [
      { title: "Vendor", field: "vendor" },
      { title: "Price", field: "price" },
      { title: "Place", field: "place" },
    ],
    data: [
      { vendor: "ExpressVPN", price: 6.67, place: 1 },
      { vendor: "Surfshark", price: 5.99, place: 2 },
      { vendor: "NordVPN", price: 6.99, place: 3 },
      { vendor: "IPVanish", price: 5.2, place: 4 },
    ],
  });
  return (
    <MaterialTable
      title={"Best 4 vpn"}
      options={{ paging: false, search: false }}
      columns={state.columns}
      data={state.data}
      editable={{
        isEditable: (rowData) => rowData.vendor !== "ExpressVPN",
        isDeletable: (rowData) => rowData.vendor !== "ExpressVPN",
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(
              () => {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
                resolve();
              },

              600
            );
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
