import React from "react";
import axios from "axios";
import { base_url } from "../Config";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: "",
      logged: true,
    };
  }
  Login = (event) => {
    event.preventDefault();
    let sendData = {
      username: this.state.username,
      password: this.state.password,
    };

    let url = base_url + "/customer/auth";

    axios.post(url, sendData)
      .then((response) => {
        this.setState({ logged: response.data.logged });
        if (this.state.logged) {
          let customer = response.data.data;
          let token = response.data.token;
          localStorage.setItem("customer", JSON.stringify(customer));
          localStorage.setItem("token", token);
          this.props.history.push("/");

          window.location = "/product"; //biar ke page product
        } else {
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="container d-flex h-100 justify-content-center align-items-center">
        <div className="col-sm-6 card my-5">
          <div className="card-header bg-success text-white text-center">
            <h4>Computer Store</h4>
            <strong className="text-warning">Customer Sign In</strong>
          </div>
          <div className="card-body">
            {!this.state.logged ? (
              <div className="alert alert-danger mt-1">
                {this.state.message}
              </div>
            ) : null}
            <form onSubmit={(ev) => this.Login(ev)}>
              <input
                type="text"
                className="form-control mb-1"
                value={this.state.username}
                onChange={(ev) => this.setState({ username: ev.target.value })}
              />
              <input
                type="password"
                className="form-control mb-1"
                value={this.state.password}
                onChange={(ev) => this.setState({ password: ev.target.value })}
                autoComplete="false"
              />

              <button className="btn btn-block btn-primary mb-1" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
