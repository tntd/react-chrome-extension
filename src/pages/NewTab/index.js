import React, { Component } from "react";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import MainContent from "./MainContent";

import "./index.less";

export default class Root extends Component {
    state = {
        selectNav: "today",
        todoList: []
    }

    componentDidMount() {
        this.initData();
        this.storageListener();
    }

    storageListener = () => {
        chrome.storage.onChanged.addListener((changes, namespace) => {
            for (let key in changes) {
                let storageChange = changes[key];
                // console.log("key", key);
                // console.log("storageChange.namespace", namespace);
                // console.log("storageChange.oldValue", storageChange.oldValue);
                // console.log("storageChange.newValue", storageChange.newValue);

                if (key === "selectNav") {
                    this.setState({
                        selectNav: storageChange.newValue
                    });
                }
            }
        });
        chrome.storage.onChanged.addListener((changes, namespace) => {
            for (let key in changes) {
                let storageChange = changes[key];

                if (key === "todoList") {
                    this.setState({
                        todoList: storageChange.newValue
                    });
                }
            }
        });
    }
    initData = () => {
        chrome.storage.local.get("selectNav", (obj) => {
            console.log("obj===========================", obj);
            let selectNav = obj.selectNav;
            if (selectNav) {
                this.setState({
                    selectNav: selectNav
                });
            } else {
                chrome.storage.local.set({ "selectNav": "today" });
            }
        });
        chrome.storage.local.get("todoList", (obj) => {
            console.log("obj===========================", obj);

            let todoList = obj.todoList;
            if (todoList) {
                this.setState({
                    todoList: todoList
                });
            } else {
                chrome.storage.local.set({ "todoList": [] });
            }
        });
    }

    onChange = (item, type) => {
        const { todoList = [] } = this.state;

        if (type === "add") {
            // add
            todoList.push(item);
        } else if (type === "modify") {
            // modify
            let todoIndex = todoList.findIndex(todo => todo.gmtCreate === item.gmtCreate);
            // 找到指定元素替换
            if (todoIndex > -1) {
                todoList.splice(todoIndex, 1, item);
            }
        } else if (type === "delete") {
            // delete
            const index = todoList.findIndex(todo => todo.gmtCreate === item.gmtCreate);
            todoList.splice(index, 1);
        }

        this.setState({
            todoList: todoList
        });
        // 写入数据
        chrome.storage.local.set({ "todoList": todoList });
    }

    render() {
        const { selectNav, todoList = [] } = this.state;

        return (
            <div className="todo-container">
                <Header />
                <div className="todo-body">
                    <div className="body-wrapper">
                        <LeftMenu
                            selectNav={selectNav}
                            onChange={(name) => {
                                this.setState({
                                    selectNav: name
                                });
                                chrome.storage.local.set({ "selectNav": name });
                            }}
                        />
                        <MainContent
                            selectNav={selectNav}
                            todoList={todoList}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
