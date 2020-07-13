import React from "react";
import MaterialTable from "material-table";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

export default function MaterialTableDemo() {
  const classes = useStyles();

  const [state, setState] = useState({
    columns: [
      { title: "Vendor", field: "vendor" },
      {
        title: "Price",
        field: "price",
        render: (rowData) => {
          return (
            <TextField
              value={rowData.price}
              InputProps={{ classes }}
              onChange={(e) => null}
            />
          );
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
    editMode: false,
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
        isEditHidden: (rowData) => true,
        isDeleteHidden: (rowData) => true,
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
