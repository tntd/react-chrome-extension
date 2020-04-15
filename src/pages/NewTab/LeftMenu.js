import React, { PureComponent } from "react";
import Icon from "../../components/Icon";

import { majorNavList } from "./constant";

export default class Root extends PureComponent {

	render() {
		const { selectNav, onChange } = this.props;

		return (
			<div className="left-menu">
				<ul className="filter-list">
					{
						majorNavList.map((item, index) => {
							return (
								<li
									className={selectNav === item.name ? "current" : ""}
									key={index}
									onClick={() => {
										onChange(item.name);
									}}
								>
									<span className="item-icon">
										<img src={item.icon} />
									</span>
									<span className="item-content">
										{item.title}
									</span>
								</li>
							);
						})
					}
				</ul>
				{/* <div className="project-panel">
					<div className="panel-header">
						<Icon type="icon-project" />
						<span>项目列表</span>
					</div>
					<div className="panel-body">
						<ul className="project-list">
							<li className="current">
								<span className="item-icon color1">
									<Icon type="icon-todo-list" />
								</span>
								<span className="item-content">司南</span>
							</li>
							<li>
								<span className="item-icon color2">
									<Icon type="icon-todo-list" />
								</span>
								<span className="item-content">统一登录</span>
							</li>
							<li>
								<span className="item-icon color3">
									<Icon type="icon-todo-list" />
								</span>
								<span className="item-content">交易反欺诈</span>
							</li>
						</ul>
					</div>
				</div> */}
			</div>
		);
	}
}
