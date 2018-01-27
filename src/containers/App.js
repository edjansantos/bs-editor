import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import '../assets/styles/form.css';
import axios from 'axios';

import Layout from '../components/Layout/Layout';
import Login from '../containers/Login/Login';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
      token: ''
    }

    this.setLogged = this.setLogged.bind(this);
  }

  componentDidMount() {
    const bsToken = localStorage.getItem('bs-token');

    if (bsToken) {
      this.setState({
        token: bsToken,
        logged: true
      })
    }
    const _this = this;

    axios.interceptors.request.use(function (config) {
      const bsToken = localStorage.getItem('bs-token');
      if (bsToken) {
        config.headers['x-access-token'] = bsToken;
      }
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
      return response;
    }, function (error) {
      if (error.request.responseURL.indexOf('/auth') < 0) {
        if (error.response.status === 401) {
          console.log('EXPIROU');
          _this.setState({
            token: '',
            logged: false
          })
        }
      }
      return Promise.reject(error);
    });
  }

  setLogged(token) {
    localStorage.setItem('bs-token', token);
    this.setState({
      logged: true
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {
            !this.state.logged ?
              (<Login onLogin={this.setLogged} />) :
              (
                <Layout />
              )
          }


        </div>
      </BrowserRouter>
    );
  }
}

export default App;
