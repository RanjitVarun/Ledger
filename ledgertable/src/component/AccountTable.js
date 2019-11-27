import React from 'react';
import axios from 'axios';
import config from '../config/config.json';
class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account: []
        }
    }

componentDidMount() {
        axios.get(config.config.account)
        .then(res => {
         this.setState({ account: res.data })
            })
    }

renderTableData() {
        return this.state.account.map((result) => {
            return (
                <tr >
                <td>{result}</td>
                </tr>
            )
        })
    }
    
render() {

return (
            <div>
                <h3>Ledger-cli - Accounts</h3>
                <table>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Account;