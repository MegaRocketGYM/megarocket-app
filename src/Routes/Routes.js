import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Home';
import Login from 'Components/Login';
import SuperAdminRoutes from './superAdmin';
import AdminRoutes from './admin';
import MemberRoutes from './member';
import { useDispatch } from 'react-redux';
import { tokenListener } from 'Helper/firebase';
import { getAuth } from 'Redux/auth/thunks';
const Routes = () => {
  const dispatch = useDispatch();

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/super-admin" component={SuperAdminRoutes} />
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/member" component={MemberRoutes} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
};
export default Routes;
