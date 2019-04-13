import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './hoc/Layout/Layout';
import Sale from './containers/Sale/Sale';
import Inventory from './containers/Inventory/Inventory';
class App extends Component {
  render() {
    return (
      <div>
          <Layout>                       
              <Switch>
                  <Route path="/Sale" component={Sale} />
                  <Route path="/inventory" component={Inventory} />
              </Switch>         
          </Layout>
      </div>
    );
  }
}

export default App;
