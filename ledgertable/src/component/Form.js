import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {
    Form,
    Input
} from 'semantic-ui-react';
import config from '../config/config.json';

class LedgerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            effectiveDate: null,
            payee: null,
            cleared: false,
            pending: false,
            Postingaccount1: null,
            Commodityamount1: null,
            Postingaccount2: null,
            Commodityamount2: null,
            comments: null
        }
    }

    handlecomments = (e) => {
        console.log('comments')
        var comments = {
            "formula": this.state.comments
        };
        axios.post(config.config.comments, { comments })
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    console.log('Posted')
                }
            })
            .catch((err) => {
                console.log(err);
            })
        console.log(comments);
    }


    handleChange = (e) => {
        //console.log(e.target);
        const input = e.target;
        const name = input.name;
        //console.log(name)
        this.setState({ [name]: e.target.value });
    };

    handleFormSubmit = (e) => {
        var formDetails = {
            "date": this.state.date,
            "effectiveDate": this.state.effectiveDate,
            "payee": this.state.payee,
            "Postingaccount1": this.state.Postingaccount1,
            "Commodityamount1": this.state.Commodityamount1 + '.00',
            "Postingaccount2": this.state.Postingaccount2,
            "Commodityamount2": "-" + this.state.Commodityamount2 + '.00'

        }
        console.log(formDetails);
        axios.post(config.config.form, { formDetails })
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    console.log('Posted')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    report = async () => {
        axios(config.config.report, {
            method: "GET",
            responseType: "blob"
        })
            .then(response => {
                const file = new Blob([response.data], {
                    type: "application/pdf"
                });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h3 align="center">Posting Form</h3>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Field
                        control={Input}
                        name='date'
                        label='Date'
                        placeholder='Date'
                        type='date'
                        value={this.state.date}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Input}
                        name='effectiveDate'
                        label='Effective Date'
                        placeholder='Effective Date'
                        type='date'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Input}
                        name='payee'
                        label='Payee'
                        placeholder='Payee'
                        value={this.state.payee}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Input}
                        name='Postingaccount1'
                        label='Posting Account1'
                        onChange={this.handleChange}

                    />
                    <Form.Field
                        control={Input}
                        name='Commodityamount1'
                        label='Commodity Amount1'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Input}
                        name='Postingaccount2'
                        label='Posting Account2'
                        onChange={this.handleChange}

                    />
                    <Form.Field
                        control={Input}
                        name='Commodityamount2'
                        label='Commodityamount2'
                        onChange={this.handleChange}

                    />
                    <Form.Field >  <button type="submit">Send</button></Form.Field>
                    <Form.Field
                        control={Input}
                        name='comments'
                        label='comments'
                        onChange={this.handleChange}
                    />
                    <Form.Field >  <button onClick={this.handlecomments}>Add Comment</button></Form.Field>
                    <button onClick={this.report}>Download Report</button>
                    <Link to="/balance"> <button onClick={this.balancetable}>View balance table</button></Link>
                    <Link to="/register"> <button onClick={this.balancetable}>View Register table</button></Link>
                </Form>
            </div>
        )
    }
}
export default LedgerForm