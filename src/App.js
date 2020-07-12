import React from "react";
import MaterialTable from "material-table";

export default function MaterialTableDemo() {
  return (
    <MaterialTable
      options={{ paging: false, search: false }}
      columns={[
        { title: "Vendor", field: "vendor" },
        { title: "Price", field: "price" },
        { title: "Place", field: "place" },
      ]}
      data={[
        { vendor: "ExpressVPN", price: 6.67, place: 1 },
        { vendor: "Surfshark", price: 5.99 ,place: 2},
        { vendor: "NordVPN", price: 6.99 ,place: 3},
        { vendor: "IPVanish", price: 5.20 ,place: 4},
      ]}
    />
  );
}
