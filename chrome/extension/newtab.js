import React from "react";
import ReactDOM from "react-dom";
import NewTab from "../../src/pages/NewTab";

chrome.storage.sync.get("state", (obj) => {
	const { state } = obj;

	if (document.querySelector("#root")) {
		ReactDOM.render(
			<NewTab />,
			document.querySelector("#root")
		);
	}
});
