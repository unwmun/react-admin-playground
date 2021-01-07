import * as React from "react";
import "./styles.css";
import { Admin, ListGuesser, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

// pages
import users from "./pages/users";
import photos from "./pages/photos";
// 메인 pr테스트

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" {...users} />
    <Resource name="posts" list={ListGuesser} />
    <Resource name="comments" list={ListGuesser}  />
    <Resource name="albums"  list={ListGuesser}  />
    <Resource name="photos" {...photos} />
    <Resource name="todos"  list={ListGuesser}  />
  </Admin>
);

export default App;
