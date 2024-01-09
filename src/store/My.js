import { getAddersslist, getAddressedit } from "@/api/My";

export default defineStore('useMy', {
	state: () => ({
		companyName: "全部",
		companyNum: "356142",
	}),
	getters: {},
	actions: {
		SET_COMPANY_NAME(data) {
			this.companyName = data;
		},
		SET_COMPANY_NUM(data) {
			this.companyNum = data;
		},
	},
});
