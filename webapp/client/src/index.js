import React, { Component } from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import Layout from "./layout";
import "./variables.scss";
import "./bootstrap.scss";
import "./styles.css";

class App extends Component {
  render() {
    return (
        <Layout>
          <Routes />
        </Layout>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
