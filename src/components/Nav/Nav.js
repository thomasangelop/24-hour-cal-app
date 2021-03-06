import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
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

const Nav = (props) => (
  <div className="nav">
  <MuiThemeProvider theme={theme}>
    <Link to="/myCalendar">
      <h2 className="nav-title">24 Hour Cal</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/myCalendar">
        {/* Show this link if they are logged in or not,
        but call this link 'myCalendar' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'My Calendar' : 'Login / Register'}
      </Link>
      {/* Always show this link since the about page is not protected */}
      {/* <Link className="nav-link" to="/about">
        About 24 Hour Cal
      </Link> */}
      {/* Show the link to the preferences page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          {/* <Link className="nav-link" to="/preferences">
            Preferences
          </Link> */}
          <LogOutButton className="nav-link"/>
        </>
      )}
    </div>
  </MuiThemeProvider>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
