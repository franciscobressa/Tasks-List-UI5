sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
	'use strict'

	return Controller.extend('sap.ui.demo.walkthrough.controller.Detail', {
		onInit: async function () {
			let oRouter = this.getOwnerComponent().getRouter()
			oRouter.getRoute('detail').attachPatternMatched(this._onObjectMatched, this)
		},
		_onObjectMatched: function (oEvent) {
			let id = window.decodeURIComponent(oEvent.getParameter('arguments').id)
			let list = this.getView().getModel('listData').getData()
			this.getView().setModel(
				new sap.ui.model.json.JSONModel([list[id - 1]]),
				'filteredListData'
			)
		},
	})
})
