import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
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

function DeleteP(props) {
  const { classes } = props;
  return (
    <div>
      <MuiThemeProvider theme={theme}>
      <IconButton className={classes.button} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      </MuiThemeProvider>
    </div>
  );
}

DeleteP.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteP);