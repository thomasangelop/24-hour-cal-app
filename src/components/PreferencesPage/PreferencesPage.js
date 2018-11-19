import React from 'react';
import CreateNewP from './CreateNewP';
import EditP from './EditP';
import DeleteP from './DeleteP';

//import paper information from material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

export default withStyles(styles)(PreferencesPage);
