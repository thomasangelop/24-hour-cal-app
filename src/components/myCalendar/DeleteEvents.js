//imports for stuff on the page that is being used
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


//setup redux state for global usage of information 
const mapReduxStateToProps = reduxState => ({
  reduxState
});

//styles preferences for material ui
const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 4,
  },
  icon: {
    color: theme.palette.text.primary,
  },
});

 class DeleteEvents extends React.Component{

     // when the page loads run this database call
     componentDidMount() {
        this.getEvent();
      }
      //get the preferences from the database
      getEvent = () => {
       //Dispatch action to get the preferences from the server
       //This is picked up by the watcherSaga in index.js
       this.props.dispatch( { type: 'FETCH_EVENT', payload: this.state} );
      }

      handleRemove = (id) => {
        console.log('deleting event', id);
        axios({
          method: 'DELETE',
          url: `/api/deleteevent/${id}`
        })
        .then( (response) => {
          this.getEvent();
          console.log(`deleted event: ${id} successfully`);
        })
        .catch( (error) => {
          console.log(`error deleting event: ${id}`);
        })
      }

  render() {
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <div>
          {this.props.reduxState.event.map(events => 
          <Paper className={classes.root} key={events.id}>
          <Grid container spacing={16}>
            <Grid item>
                <Typography>{events.text}</Typography>
                <Typography>{events.start}</Typography> 
                <Typography>{events.end}</Typography>   
                <IconButton variant="contained" color="primary" className={classes.button} aria-label="Delete" 
                  onClick={() => this.handleRemove(events.id)}>
                  <DeleteIcon />
                </IconButton>          
            </Grid>
          </Grid>
        </Paper>
        )}
      </div>
    </div>
  );
}
}

DeleteEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(DeleteEvents));