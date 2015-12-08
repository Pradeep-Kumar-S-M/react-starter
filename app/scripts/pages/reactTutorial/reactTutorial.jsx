import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Box from './Box.jsx';
import Flow from './reactFlow.jsx';
import ReactRouter from './reactRouter.jsx';
import ReduxPattern from './reduxPattern.jsx';

let tutorial  = React.createClass({
	mixins:[LinkedStateMixin],
	getInitialState(){
		return{
			username : "pradeep",
			age : 50,
			color : ""
		}
	},

	updateName(event){
		this.setState({
			username : event.target.value
		});
	},

	updateComp(){
		console.log(this.state.age);
		this.setState({
			color: "blue"
		});
	},

	render : function(){

		return (<div>
				<input style={{'height':25}} type="text" name="username" value={this.state.username} onChange={this.updateName} />

				<input type="text" name="age" valueLink={this.linkState('age')} />
				<button onClick={this.updateComp}>Click</button>

				<Box />
				<ReactRouter />

				<ReduxPattern />
				<ReduxPattern />
				<ReduxPattern />
				{/*<Flow color = {this.state.color}/>*/}
			</div>);
	}
});


export default tutorial;