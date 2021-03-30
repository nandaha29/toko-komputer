import React from "react"
import Navbar from "../components/Navbar"
import TransactionList from "../components/TransactionList"
import { base_url, product_image_url } from "../Config";
import $ from "jquery"
import axios from "axios"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            transaction: [],
            selectedItem: null
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/" //ke login page
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getTransaction = () => {
        let url = base_url + "/transaksi"

        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({transaction: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/")
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


