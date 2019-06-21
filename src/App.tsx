// import { Rate } from 'antd';
import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.scss';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Index from './components/Index'

// import logo from './logo.svg';

class App extends React.Component {
/*   public render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Rate character="6"/>
      </div>
    );
  } */
  render(){
    return(
      <Router>
        <div>
          <Route exact={true} path='/' component={Index}/>
          <Route path='/login' component={Login}/>
          <Route path='/signUp' component={SignUp}/>
        </div>
      </Router>
    )
  }
}

export default App;