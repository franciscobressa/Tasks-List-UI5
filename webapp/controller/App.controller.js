sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
	'use strict'

	return Controller.extend('sap.ui.demo.walkthrough.controller.App', {
		onInit: async function () {
			let oModel
			await fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'GET',
			})
				.then(response => response.json())
				.then(result => {
					oModel = result
				})

			this.getView().setModel(new sap.ui.model.json.JSONModel(oModel), 'listData')
			this.getView().setModel(new sap.ui.model.json.JSONModel(oModel), 'filteredListData')
		},

		onChange: async function (oEvent) {
			let task = oEvent.getSource().getBindingContext('filteredListData').getObject()

			let list = this.getView().getModel('listData').getData()

			list[task.id - 1] = {
				...list[task.id - 1],
				completed: true,
			}

			this.getView().setModel(new sap.ui.model.json.JSONModel(list), 'listData')
			this.getView().setModel(new sap.ui.model.json.JSONModel(list), 'filteredListData')
		},
		onSearch: async function (oEvt) {
			let list = this.getView().getModel('listData').getData()
			let sQuery = oEvt.getSource().getValue()
			if (sQuery) {
				list = await list.filter(item => item.title === sQuery)
			}
			console.log(list)

			this.getView().setModel(new sap.ui.model.json.JSONModel(list), 'filteredListData')
		},

		onPressMoreInfos: function (oEvent) {
			let task = oEvent.getSource().getBindingContext('filteredListData').getObject()

			var oRouter = this.getOwnerComponent().getRouter()

			oRouter.navTo('detail', {
				id: task.id,
			})
		},
	})
})
