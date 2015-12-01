import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Box from './Box.jsx';

let tutorial  = React.createClass({
	mixins:[LinkedStateMixin],
	getInitialState(){
		return{
			username : "pradeep",
			age : 50
		}
	},

	updateName(event){
		this.setState({
			username : event.target.value
		});
	},

	updateComp(){
		console.log(this.state.age);
		this.forceUpdate();
	},

	render : function(){
		console.log("render");

		return (<div>
				<input style={{'height':10}} type="text" name="username" value={this.state.username} onChange={this.updateName} />

				<input type="text" name="age" valueLink={this.linkState('age')} />
				<button onClick={this.updateComp}>Click</button>

				<Box />
			</div>);
	}
});


export default tutorial;