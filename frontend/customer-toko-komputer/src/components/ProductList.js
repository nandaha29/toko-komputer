import React from "react"

class ProductList extends React.Component{
    render(){
        return (
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        {/* menampilkan Gambar / cover */}
                        <div className="col-5">
                            <img src={this.props.image} className="img"
                            height="200" width="200" alt={this.props.name}/>
                        </div>

                        {/* menampilkan deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                                { this.props.name }
                            </h5>
                            <h6 className="text-danger">
                                Price: { this.props.price}
                            </h6>
                            <h6 className="text-dark">
                                Stock: { this.props.stock}
                            </h6>

                            {/*button untuk menambah ke keranjang belanja*/}
                            <button className="btn btn-sm btn-success m-1"
                            onClick={this.props.onCart}>
                                Tambahkan ke keranjang belanja
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductList;
