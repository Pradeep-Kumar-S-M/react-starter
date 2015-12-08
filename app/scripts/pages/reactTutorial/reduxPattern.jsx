import React from 'react';

import { createStore } from 'redux'

let counter = function( state = 0,action) {
		  switch (action.type) {
		  case 'INCREMENT':
		    return state + 1
		  case 'DECREMENT':
		    return state - 1
		  default:
		    return state
		  }
	}


let store = createStore(counter);


const reduxPattern = React.createClass({
	getInitialState(){
		return{
			counter : 0
		}
	},

	componentWillMount() {
			store.subscribe(() => {
					console.log(store.getState());

					this.setState({
						counter : store.getState()
					});
				}
			);
			
	},

	increment(){
		store.dispatch({ type: 'INCREMENT'});
	},

	decrement(){
		store.dispatch({ type: 'DECREMENT' });
	},

	render(){
		return(	
				<div>
					<div>{this.state.counter}</div>
					<button onClick={this.increment}>INCREMENT </button>
					<button onClick={this.decrement}>DECREMENT</button>
				</div>
			);
	}
});

export default reduxPattern;
