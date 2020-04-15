import React from "react";
import ReactDOM from "react-dom";
import Popup from "../../src/pages/Popup";

chrome.storage.sync.get("state", (obj) => {
    const { state } = obj;
    const initialState = JSON.parse(state || "{}");

    // const createStore = require("../../src/store/configureStore");

    ReactDOM.render(
        <Popup />,
        document.querySelector("#root")
    );
});
