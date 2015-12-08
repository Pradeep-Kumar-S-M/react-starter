import React from 'react';


let flow = React.createClass({
	getInitialState(){
		console.log('state');
		return{
			changeColor : (this.props.color ? this.props.color : "red")
		}
	},

	getDefaultProps() {
		console.log('defaultProps');
	},

	componentWillMount(){
		console.log('will mount - ' + this.isMounted());
		
	},

	componentDidMount(){
		console.log('did mount - ' + this.isMounted());
		this.setState({
			changeColor : "orange"
		});
	},

	componentWillReceiveProps(nextProps){
		console.log("receiev");
		this.setState({
			changeColor : nextProps.color
		});
	},

	shouldComponentUpdate(nextProps, nextState) {
	    console.log("should") ;

	    return true; 
	},

	componentWillUpdate(nextProps, nextState) {
	    console.log('willUpdate') ;
	},

	componentDidUpdate(prevProps, prevState) {
	      console.log('didUpdate');
	},

	componentWillUnmount() {
	    console.log('unmount');
	},

	render(){
		console.log('render');

		return (
			<div style={{color : this.state.changeColor}}>React</div>
			);
	}
});


export default flow;