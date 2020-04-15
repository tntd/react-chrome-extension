## chrome storage
1、选择的菜单：selectNav；

2、代办列表：todoList,结构如下；
```
const todoList = [
	{
		title: "一键切换pass模式",
		isChecked: false,
		isImportance: true,
		gmtCreate: 1578465054000,
		gmtModify: 1578465054000,
		group: "today"
	},
	{
		title: "内部业务场景积累，每个人都要对其他业务有基本的了解，以便以后遇到相似情况，能够及时借鉴。",
		isChecked: true,
		isImportance: false,
		gmtCreate: 1578465054000,
		gmtModify: 1578465054000,
		group: "calendar"
	}
;
```

3、添加事项的map：addInputMap；
```
const addInputMap = {
	today:"这是输入的信息",
	calendar:"这是输入的信息",
};
```
