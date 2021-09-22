import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

import  PrivateRoute from './components/PrivateRoute';

import PrivateScreen from "./components/PrivateScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
const App = ()=> {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen}/>
          <Route exact path="/login" component={LoginScreen}/>
          <Route exact path ="/register" component={RegisterScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
