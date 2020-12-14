import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.styles.js';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Header.styles';
import {signOut} from '../redux_store/auth_store/authActions';


const useStyles = makeStyles(styles);

const Header = () => {

  const classes = useStyles();

  const renderLinksNew = () => {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Food Manager
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Info
            </Link>
          </nav>
          <Button to="/signin" component={RouterLink} color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

    </React.Fragment>
    );
  }

  return renderLinksNew();
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    // profile: state.firebase.profile
  }
}

export default connect(mapStateToProps, {signOut})(Header);
