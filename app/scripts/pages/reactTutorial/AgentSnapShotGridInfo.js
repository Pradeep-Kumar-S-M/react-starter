import React from 'react';

var AgentSnapShotGridInfo = {
	classNames :{
		headerRowClass : "heading",
		tbodyRowClass : "agentSnapShotGridRow",
		tbodyColClass : "agentSnapShotGridCol",
		tableName : "AgentSnapShotGrid"
	},
	
	columnDetails() {
		return { 
			"Agent ID":{
				serverDataKey : "id"
			},
			"Status":{
				renderColumn: this.renderStatusColumn
			},
			"Modified On":{
				renderColumn: this.renderModifiedOn
			},
			"Action":{
				renderColumn: this.renderForceLogoutButton
			},
			"Session Details":{
				renderColumn: this.renderSessionDetails,
				columnClass: "sessionDetails"
			}
		}
	}
}

export default AgentSnapShotGridInfo;