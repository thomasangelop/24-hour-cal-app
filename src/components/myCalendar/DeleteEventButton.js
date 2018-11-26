import React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

//setup redux state for global usage of information 
const mapReduxStateToProps = reduxState => ({
  reduxState
});


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 30,
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#d60e58',
      },
    secondary: {
      main: '#6ec95c',
    },
  },
});

class DeleteEventButton extends React.Component {
  state = {}

  handleCloseCancel = () => {
    console.log('edit form was canceled');
  };

  handleCloseSave = (id) => {
    this.setState({ open: false });
    console.log('what is id?:', id);

  };

  //DELETE button funciton
  handleRemove = (id) => {
    console.log('deleting pref id:', id);
    // axios({
    //   method: 'DELETE',
    //   url: `/api/delete/${id}`
    // })
    // .then( (response) => {
    //   this.getPreferences();
    //   console.log(`deleted pref id: ${id} successfully`);
    // })
    // .catch( (error) => {
    //   console.log(`error deleting pref id: ${id}`);
    // })
  }

  render() {
    const { classes } = this.props;
  return(
  <div>
            {/* Delete button div below */}
            <div>
              <MuiThemeProvider theme={theme}>
                <IconButton className={classes.button} aria-label="Delete" onClick={() => this.handleRemove()}>
                  <DeleteIcon />
                </IconButton>
              </MuiThemeProvider>
            </div>
    </div>
  )
  }
}

DeleteEventButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(DeleteEventButton));
