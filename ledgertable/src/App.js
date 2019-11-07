import React from 'react';
import {Route} from 'react-router-dom';
import Register from './component/RegisterTable';
import Balance from './component/BalanceTable';
import Account from './component/AccountTable';



class App extends React.Component {
 
  render() {
    return (
    
        <div >
  
          <Route path="/" exact component={Account}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/balance" exact component={Balance}></Route>
         
  
        </div>
    );
  }
}


export default App;