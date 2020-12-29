import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Boarders from './components/Home';
import Rooms from './components/Rooms';
import Reps from './components/Reps';
import Header from './components/Header';
import "antd/dist/antd.css";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
class App extends Component {

  render() {
    return (
    <Router history={history}>
        <div>
          <Header history={history}/>
          <Switch>
              <Route exact path='/' component={Boarders} />
              <Route path='/rooms' component={Rooms} />
              <Route path='/reps' component={Reps} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;