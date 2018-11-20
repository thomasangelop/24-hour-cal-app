import React from 'react';
import CreateNewP from './CreateNewP';
import EditP from './EditP';
import DeleteP from './DeleteP';
import { connect } from 'react-redux';


//import paper information from material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//setup redux state for global usage of information 
const mapReduxStateToProps = reduxState => ({
  reduxState
});

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 30,
  },
});

class PreferencesPage extends React.Component {
  // when the page loads run this database call
  componentDidMount() {
    this.getPreferences();
  }
  //get the preferences from the database
  getPreferences = () => {
    //Dispatch action to get the preferences from the server
    //This is picked up by the watcherSaga in index.js
    this.props.dispatch( { type: 'FETCH_PREF', payload: this.state} );
  }

  render() {
    const { classes } = this.props;
  return(
  <div>
    <h3>Preferences</h3>
    <p>
    Create or delete a new preference type.
    </p>
    <CreateNewP />
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Work
        </Typography>
        <EditP /><DeleteP />
      </Paper>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Hobby
        </Typography>
        <EditP /><DeleteP />
      </Paper>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Fitness
        </Typography>
        <EditP /><DeleteP />
      </Paper>
    </div>
  </div>
  )
  }
}

PreferencesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(PreferencesPage));
