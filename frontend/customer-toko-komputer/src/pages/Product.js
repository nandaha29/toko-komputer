import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList"
import { base_url, product_image_url } from "../Config";
import axios from "axios"

export default class Product extends React.Component{
    constructor(){
        super()
        this.state = {
            products: [],
            token: "",
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/" //login page
        }

        this.headerConfig.bind(this)
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
            this.setState({products: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/") //login page
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getProduct()
    }
    
    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []

        // cek eksistensi dari data cart pada localStorage
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }

        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.product_id === selectedItem.product_id)

        if(existItem){
            // jika item yang dipilih ada pada keranjang belanja
            window.alert(`Anda telah memilih ${selectedItem.name}`)
        }else{
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang beli`,"")
            if(promptJumlah !== null && promptJumlah !== ""){
                // jika user memasukkan jumlah item yg dibeli

                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.qty = promptJumlah
                
                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)

                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    render(){
        return (
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold text-info mt-2">Product List</h3>
                   <div className="row">
                       { this.state.products.map( item => (
                           <ProductList
                           key = {item.product_id}
                           name = {item.name}
                           price = {item.price}
                           stock = {item.stock}
                           image = { product_image_url + "/" + item.image}
                           onCart = {() => this.addToCart(item)}
                            />
                       )) }
                   </div>
                </div>
            </div>
        )
    }

}
