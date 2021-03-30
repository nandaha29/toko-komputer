import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { base_url } from "../Config";

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            productsCount: 0,
            customersCount: 0,
            transactionsCount: 0,
            adminsCount: 0
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

    getProduct = () => {
        let url = base_url + "/product"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({productsCount: response.data.length})
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

    getCustomer = () => {
        let url = base_url + "/customer"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({customersCount: response.data.length})
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

    getTransactions = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({transactionsCount: response.data.length})
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

    getAdmins = () => {
        let url = base_url + "/admin"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({adminsCount: response.data.length})
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

    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({adminName: admin.name})
    }

    componentDidMount(){
        this.getCustomer()
        this.getAdmins()
        this.getProduct()
        this.getTransactions()
        this.getAdmin()
    }


    render(){
        return (
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.adminName}</strong>
                    </h3>
                    <div className="row">
                        {/* products count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Products Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.productsCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* customer count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-dark">
                                        <strong>Customers Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.customersCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* transactions count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Transactions Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.transactionsCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* admins count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>Admins Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.adminsCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
