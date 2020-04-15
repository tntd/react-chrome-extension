export default {
	namespace: "global",
	state: {
		pageName: "sinan todo 123"
	},
	effects: {
	},

	reducers: {
		setAttrValue(state, { payload }) {
			return {
				...state,
				...payload
			};
		}
	}
};
