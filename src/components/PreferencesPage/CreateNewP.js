import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
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

function CreateNewP(props) {
  const { classes } = props;
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.button}>
            Create New Preference
        </Button>
      </MuiThemeProvider>
    </div>
  );
}

CreateNewP.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateNewP);