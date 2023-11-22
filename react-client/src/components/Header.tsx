import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.styles.js';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {signOut} from '../redux_store/auth_store/authActions';

const Header = () => {

  const renderLinksNew = () => {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0}>
        <Toolbar >
          <Typography variant="h6" color="inherit" noWrap>
            Food Manager
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" >
              Info
            </Link>
          </nav>
          <Button to="/signin" component={RouterLink} color="primary" variant="outlined" >
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
