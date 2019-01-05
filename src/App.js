import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './hoc/Layout/Layout';
import Overview from './containers/Overview/Overview';
import Inventory from './containers/Inventory/Inventory';
import Charts from './containers/Charts/Charts';
class App extends Component {
  render() {
    return (
      <div>
          <Layout>                       
              <Switch>
                  <Route path="/overview" component={Overview} />
                  <Route path="/inventory" component={Inventory} />
                  <Route path="/Charts" component={Charts} />
              </Switch>         
          </Layout>
      </div>
    );
  }
}

export default App;
