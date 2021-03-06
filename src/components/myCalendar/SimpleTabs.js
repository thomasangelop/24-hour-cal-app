import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MonthlyView from './MonthlyView';
import WeeklyView from './WeeklyView';
// import PreferencesPage from '../PreferencesPage/PreferencesPage';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    margin: 30,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="My Calendar: Weekly View" />
            <Tab label="My Calendar: Monthly View" />
            {/* <Tab label="My Calendar: Preferences" /> */}
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><WeeklyView /></TabContainer>}
        {value === 1 && <TabContainer><MonthlyView /></TabContainer>}
        {/* {value === 1 && <TabContainer><PreferencesPage /></TabContainer>} */}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);