import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles({
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
    cursor: "pointer",
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
            <div className={classes.iconContainer}>
              <Icon className={classes.icon} onClick={toggleEditMode}>
                edit
              </Icon>
              <TextField
                value={rowData.price}
                InputProps={{ disableUnderline: !state.editMode }}
                onChange={(e) => null}
              />
            </div>
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

  const toggleEditMode = () => {
    console.log(state.editMode)
    setState((prevState) => {
      const editMode = !prevState.editMode;
      return { ...prevState, editMode };
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
