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

function EditP(props) {
  const { classes } = props;
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="secondary" className={classes.button}>
            Edit
        </Button>
      </MuiThemeProvider>
    </div>
  );
}

EditP.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditP);