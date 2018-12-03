import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import myCalendar from '../myCalendar/myCalendar';
import PreferencesPage from '../PreferencesPage/PreferencesPage';

import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#d60e58',
      },
    secondary: {
      main: '#54a543',
    },
  },
});

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
        <MuiThemeProvider theme={theme}>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/myCalendar */}
            <Redirect exact from="/" to="/myCalendar" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/myCalendar will show the myCalendar if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/myCalendar */}
            <ProtectedRoute
              exact
              path="/myCalendar"
              component={myCalendar}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            {/* <ProtectedRoute
              exact
              path="/preferences"
              component={PreferencesPage}
            /> */}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
          </MuiThemeProvider>
        </div>
      </Router>
  )}
}

export default connect()(App);
