import React from "react";
import Navbar from "../components/Navbar";
import { base_url } from "../Config";
import axios from "axios";
import TransactionList from "../components/TransactionList";


export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            customer: null,
            transaction: [],
        }


        if (localStorage.getItem("token") && localStorage.getItem("customer")) {
            this.state.token = localStorage.getItem("token")
            this.state.customer = JSON.parse(localStorage.getItem("customer"))
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getTransaction = () => {
        let url = base_url + "/transaksi/" + this.state.customer.customer_id

        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({transaction: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getTransaction()
    }


    render(){
        return (
            <div>
                <Navbar />

                <div className="container">
                    <h3 className="text-bold text-info mt-2">Transactions List</h3>
                    { this.state.transaction.map(item => (
                        <TransactionList
                        key = {item.transaksi_id}
                        transaction_id = {item.transaksi_id}
                        customer_name = {item.customer.name}
                        customer_address = {item.customer.address}
                        time = {item.waktu}
                        products = {item.detail_transaksi}
                         />
                    )) }
                </div>
            </div>
        )
    }

}
