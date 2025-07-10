import './App.css';
import { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom'

import Login from './components/Login'
import Signup from './components/Signup'

import Admin from './components/Admin'
import StoreOwner from './components/StoreOwner'
import NormalUser from './components/NormalUser'
import AddNewStore from './components/AddNewStore'
import AddNewUser from './components/AddNewUser'
import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/admin" component={Admin} />
          <ProtectedRoute exact path="/store-owner" component={StoreOwner} />
          <ProtectedRoute exact path="/user" component={NormalUser} />
          <ProtectedRoute exact path="/admin/add-store" component={AddNewStore} />
          <ProtectedRoute exact path="/admin/add-user" component={AddNewUser} />
          <Redirect  to="/login" />
        </Switch>
      </BrowserRouter>
    )
  }
}



export default App;