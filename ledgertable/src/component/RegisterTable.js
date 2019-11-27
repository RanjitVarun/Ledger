import React from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react'
import config from '../config/config.json';
class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      register: [],
      postings: [],
      temp:null
    }
  }

  componentDidMount() {
    axios.get(config.config.register)
    .then(res => {
    this.setState({ register: res.data })
      })
  }

  setpostings(result) {
    //console.log(result);
    var array = [];
    result.map((x) => {
    array.push(x.account + " ");
    })
    return array;
  }

  setcommodities(result) {
    //console.log(result);
    var arraycomm = [];
    result.map((x) => {
      arraycomm.push(x.commodity.amount + ",");
    })
    return arraycomm;
  }
  sliceresult(date){
    if(date==null)
    {

    }
    else{
var date=date;
var result=date.slice(0,10);
return result
  }
}

  renderTableData() {
    return this.state.register.map((result) => {
      return (
        <Table.Row>
          <Table.Cell>{this.sliceresult(result.date)}</Table.Cell>
          <Table.Cell>{this.sliceresult(result.effectiveDate)}</Table.Cell>
          <Table.Cell>{result.payee}</Table.Cell>
          <Table.Cell>{result.postings.length}</Table.Cell>
          <Table.Cell>{this.setpostings(result.postings)}</Table.Cell>
          <Table.Cell>$</Table.Cell>
          <Table.Cell>{this.setcommodities(result.postings)}</Table.Cell>
        </Table.Row>
      )
    })
  }
  changeContents=()=>{
    
    if(this.state.temp==null)
    {
    var config='http://172.24.177.135:3001/register/test'
    this.setState({temp:1})
  }
  else{
    var config='http://172.24.177.135:3001/register/file'
    this.setState({temp:null})
  }
    axios.get(config)
      .then(res => {
        console.log(res);
        var length=res.data.length;
        
        this.setState({ register: res.data })
      })
      
  }
  

  render() {
    return (
      <div>
        <h3 align="center">Ledger-cli - Register</h3>
        <button onClick={this.changeContents}>Change DAT file</button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Effective date</Table.HeaderCell>
              <Table.HeaderCell>Payee</Table.HeaderCell>
              <Table.HeaderCell>Postings</Table.HeaderCell>
              <Table.HeaderCell>Accounts</Table.HeaderCell>
              <Table.HeaderCell>Commodity Currency</Table.HeaderCell>
              <Table.HeaderCell>Commodity Account</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderTableData()}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default Register;