import React, { PureComponent } from "react";
import logo from "../../resource/images/logo.svg";

export default class Root extends PureComponent {

	render() {

		return (
			<div className="todo-header">
				<div className="header-inner">
					<div className="logo">
						<a href="https://sinan.tongdun.me" target="_blank">
							<img src={logo} />
							<span>司南<em>TODO</em></span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
