import React from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import config from '../config/config.json';
class LAB extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: [],
            Assetsamt:null,
            Liabilitiesamt:null
        }
    }

componentDidMount() {
        axios.get(config.config.balance)
        .then(res => {
         this.setState({ balance: res.data })
            })
    }
    getresults(){
        return this.state.balance.map(result=>{
            if(result.account.fullname=="Assets"||result.account.fullname=="Assets:Checking"||result.account.fullname=="Assets:Checking:Business"||result.account.fullname=="Assets:Savings"||result.account.fullname=="Liabilities")
            { 
                return(
                <Table.Row>
                <Table.Cell> {result.total.amount} </Table.Cell>  
                <Table.Cell> {result.account.fullname} </Table.Cell>
              </Table.Row>
                )
            }
            else{}
        })
    }

    calculateresults(){
        this.state.balance.map(result=>{
           
         if(result.account.fullname=="Assets")
         {
             console.log('here');
             var sum1=result.total.amount;
          
         }
         if(result.account.fullname=="Liabilities")
         {
             var sum2=result.total.amount;
            
         }
         console.log(sum1);
         console.log(sum2);
        if(sum1!=undefined&&sum2!=undefined)
        {
            return(

                <Table.Row>
                <Table.Cell>  {sum1+sum2} </Table.Cell>  
              </Table.Row>
            )
        }
        })    
    }

    
render() {
return (
            <div>
                <h3>Ledger-cli -Liability Assets Balance</h3>
        
               <h3 align="center">Ledger-cli - Balance</h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.getresults()}
          {this.calculateresults()}
          </Table.Body>
        </Table>
            </div>
        )
    }
}

export default LAB;