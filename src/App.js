import * as React from "react";
import "./styles.css";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

// pages
import users from "./pages/users";
// 메인 pr테스트

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" {...users} />
  </Admin>
);

export default App;
