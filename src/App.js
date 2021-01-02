import * as React from "react";
import "./styles.css";
import { Admin, ListGuesser, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

// pages
import users from "./pages/users";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" {...users} />
  </Admin>
);

export default App;
