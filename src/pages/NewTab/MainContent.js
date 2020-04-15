import React, { Component } from "react";
import { Tooltip, Input } from "antd";
import Icon from "../../components/Icon";
import { majorNavList } from "./constant";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

const { TextArea } = Input;
export default class Root extends Component {

    state = {
        todayText: null,
        inboxText: null,
        calendarText: null
    }
    constructor() {
        super();
    };

    render() {
        const { todayText, inboxText, calendarText } = this.state;
        const { selectNav, todoList, onChange, changeAddInput } = this.props;
        const currentList = todoList.filter(todo => {
            if (selectNav === "today" || selectNav === "calendar") {
                return todo.group === selectNav;
            } else if (selectNav === "inbox") {
                return todo.isImportance || todo.group === selectNav;
            }
        });
        let currentInputText = this.state[selectNav + "Text"];
        const currentNav = majorNavList.find(nav => nav.name === selectNav) || majorNavList[0];

        console.log(this.state);

        return (
            <div className="main-content">
                <div className="todo-editor">
                    <div className="editor-header">
                        <h2>
                            {currentNav.title}
                        </h2>
                        <div className="actions">
                            {
                                selectNav === "today" &&
                                <a>
                                    <Icon type="icon-light" />
                                    <span>今天</span>
                                </a>
                            }
                            <a>
                                <Icon type="icon-sort" />
                                <span>排序</span>
                            </a>
                        </div>
                    </div>
                    <div className="today-date">
                        {moment().format("llll")}
                    </div>
                    <div className="editor-body">
                        <ul className="todo-list">
                            {
                                currentList.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={`todo-item ${item.isChecked ? "checked" : "default"}`}
                                        >
                                            <span
                                                className="checkbox"
                                                onClick={() => {
                                                    item.gmtModify = moment().valueOf();
                                                    item.isChecked = !item.isChecked;
                                                    onChange(item, "modify");
                                                }}
                                            >
                                                <Icon
                                                    type={item.isChecked ? "icon-todo-active" : "icon-todo-default"}
                                                />
                                            </span>
                                            <span className="name">
                                                <TextArea
                                                    value={item.title}
                                                    autoSize={{
                                                        minRows: 1,
                                                        maxRows: 2
                                                    }}
                                                    onChange={(e) => {
                                                        item.gmtModify = moment().valueOf();
                                                        item.title = e.target.value;
                                                        onChange(item, "modify");
                                                    }}
                                                />
                                            </span>
                                            <Tooltip
                                                title="移除"
                                                placement="left"
                                            >
                                                <div className="delete-btn">
                                                    <Icon
                                                        type="icon-delete"
                                                        onClick={() => {
                                                            onChange(item, "delete");
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip title={item.isImportance ? "取消重要" : "设为重要"}>
                                                <div className={item.isImportance ? "importance-btn checked" : "importance-btn"}>
                                                    <Icon
                                                        type={item.isImportance ? "icon-collect-on" : "icon-collect-off"}
                                                        onClick={() => {
                                                            item.gmtModify = moment().valueOf();
                                                            item.isImportance = !item.isImportance;
                                                            onChange(item, "modify");
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <div className="add-task-handle">
                            <Icon type="icon-add" />
                            <Input
                                placeholder="添加任务"
                                value={currentInputText || undefined}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.state[selectNav + "Text"] = value;

                                    this.setState({
                                        ...this.state
                                    });
                                }}
                                onPressEnter={(e) => {
                                    const todo = {
                                        title: currentInputText,
                                        isChecked: false,
                                        isImportance: false,
                                        gmtCreate: moment().valueOf(),
                                        gmtModify: moment().valueOf(),
                                        group: selectNav
                                    };
                                    onChange(todo, "add");

                                    // 清空input state
                                    this.state[selectNav + "Text"] = null;
                                    this.setState({
                                        ...this.state
                                    });
                                }}
                            />
                            <Icon type="icon-enter" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
