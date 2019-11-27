import React from 'react';
import { Route } from 'react-router-dom';
import Register from './component/RegisterTable';
import Balance from './component/BalanceTable';
import Account from './component/AccountTable';
import LAB from './component/LAB';
import LedgerForm from './component/Form';

class App extends React.Component {

  render() {
    return (
      <div >
        <Route path="/" exact component={Account}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/balance" exact component={Balance}></Route>
        <Route path="/LAB" exact component={LAB}></Route>
        <Route path="/LedgerForm" exact component={LedgerForm}></Route>
      </div>
    );
  }
}

export default App;