import Blog from './Components/Homepage/Blog';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PublicRoute from './Components/Routes/PublicRoute';
import PrivateRoute from './Components/Routes/PrivateRoute';
import ccp from './Components/Content-control/ccp';
import Login from './Components/Content-control/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/" component={Blog} exact />
          <PublicRoute path="/CCP-Login" component={Login} exact/>
          <PrivateRoute path="/content-control" component={ccp} exact/>
          <PrivateRoute path="/content-control/:page/:id?" component={ccp} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
