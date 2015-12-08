/* global __DEV__ */
import React from 'react';
import { render } from 'react-dom';
import RedBox from 'redbox-react';
import StackTrace from './stacktrace';


const App = React.createClass({
  getInitialState() {
    return {
      route: window.location.hash.substr(1)
    }
  },

  componentWillMount() {
    window.addEventListener('hashchange', () => {
      this.changePath();
    });  



      var callback = function(stackframes) {
        var stringifiedStack = stackframes.map(function(sf) {
          return sf.toString();
        }).join('\n');
        console.log(stringifiedStack);
      };

      var errback = function(err) { console.log(" ERRORRRRR - " + err.message); };

      
      
      

    //   // StackTrace.fromError(error).then(callback).catch(errback);
       window.onerror = function(msg, file, line, col, error) {
    // callback is called with an Array[StackFrame]
          StackTrace.fromError(error).then(callback).catch(errback);
        };


      
      var error = new Error('BOOM!');

      StackTrace.fromError(error).then(callback).catch(errback);


      StackTrace.get().then(callback).catch(errback);

      // var stackValue = StackTrace.get().then(callback).catch(errback);

         // Promise(stackframes, "sample");
      StackTrace.generateArtificially().then(callback).catch(errback);

    
    },


  changePath(){
     this.setState({
        route: window.location.hash.substr(1)
      });
  },

  render() {

    var elem;

      try {
       elem =  <div /> ;
      } catch (e) {
       elem =  <RedBox error={e} /> ;
      }
  

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/info">{elem}</a></li>
          <li><a href="#/inbox">Inbox</a></li>
        </ul>
      </div>
    )
  }
});


export default App;

