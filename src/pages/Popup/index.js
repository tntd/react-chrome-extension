import React, { PureComponent } from "react";
import "./index.less";

export default class Popup extends PureComponent {
	state = {
		userInfo: {}
	}
	componentDidMount() {
		// const todoList = [
		// 	{
		// 		title: "一键切换pass模式",
		// 		isChecked: false,
		// 		isImportance: true,
		// 		gmtCreate: 1578465054000,
		// 		gmtModify: 1578465054000,
		// 		group: "today"
		// 	},
		// 	{
		// 		title: "内部业务场景积累，每个人都要对其他业务有基本的了解，以便以后遇到相似情况，能够及时借鉴。",
		// 		isChecked: true,
		// 		isImportance: false,
		// 		gmtCreate: 1578465054000,
		// 		gmtModify: 1578465054000,
		// 		group: "calendar"
		// 	}
		// ];

		// // 往存储中写入数据
		// chrome.storage.local.set({ "todoList": todoList }, () => {
		// 	console.log("保存成功");
		// });
	}
	render() {
		console.log(this.state.userInfo);
		return (
			<div>
				popup
				<a
					onClick={() => {
						// 从存储中读取数据
						chrome.storage.local.get("userInfo", (result) => {
							this.setState({
								userInfo: result.userInfo
							});
						});
					}}
				>
					显示数据
				</a>
				{
					JSON.stringify(this.state.userInfo)
				}
			</div>
		);
	}
}
