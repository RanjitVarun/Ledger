import React from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react'

class Balance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: [],
      total:[]

    }
  }

  componentDidMount() {
    axios.get('http://172.24.177.135:3001/balance')
      .then(res => {
        var length=res.data.length;
        
        this.setState({ balance: res.data, total:res.data[length-1].total })
      })
  }
  checknegative(data){

if(data>0)
{
return <Table.Cell>{data}</Table.Cell>
}
else
{
  return <Table.Cell style={{color: "red"}}>{data}</Table.Cell>
}
  }

  renderTableData() {
    return this.state.balance.map((result) => {
      return (
        <Table.Row>
          <Table.Cell>{result.account.fullname}</Table.Cell>
          <Table.Cell>{result.account.shortname}</Table.Cell>
          <Table.Cell>{result.account.depth}</Table.Cell>
          <Table.Cell>{result.total.currency}</Table.Cell>
              {this.checknegative(result.total.amount)}
          <Table.Cell>{result.total.formatted}</Table.Cell>
        </Table.Row>
      )
    })
  }

  totalbalance(){

var x=this.state.total;

return (x.formatted)

  }

  render() {
//console.log(this.state.total);
    return (
      <div>
        <h3 align="center">Ledger-cli - Balance</h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Full Name</Table.HeaderCell>
              <Table.HeaderCell>Short Name</Table.HeaderCell>
              <Table.HeaderCell>Depth</Table.HeaderCell>
              <Table.HeaderCell>Currency</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Formatted</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderTableData()}
            <Table.Row>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>{this.totalbalance()}</Table.Cell>
        </Table.Row>
          </Table.Body>
         
        </Table>
       
    
      </div>
    )
  }
}

export default Balance;