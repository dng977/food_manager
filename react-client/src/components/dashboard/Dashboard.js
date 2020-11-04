import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import requireAuth from '../requireAuth';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Menu, MenuItem, Tooltip, Badge, Snackbar } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import styles from './Dashboard.styles';
import PersonIcon from '@material-ui/icons/Person';
import { Copyright } from '../shared/renderMaterial';
import { ListItemLink } from '../shared/ListItemLink';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import { fetchReceipts } from '../../store/actions/receiptsActions';
import { fetchFoodStock } from '../../store/actions/foodActions';
import { getPathRegex } from '../../routes';
import { CLEAR_MESSAGE, START_BATCH_LOADING, STOP_BATCH_LOADING } from '../../store/actions/types';
import {startBatchLoading, stopBatchLoading} from '../../store/actions/feedbackActions';
import {fetchNutritionRda,fetchNutritionState} from '../../store/actions/nutritionActions';

class Dashboard extends React.Component {

  constructor(props) {
    super();
    this.state = { anchorEl: null, open: true };
  }
  componentDidMount() {
    this.props.startBatchLoading();
    if (Object.keys(this.props.receipts).length === 0 || !this.props.location.pathname.match(/receipts\/\d/))
      this.props.fetchReceipts();
      this.props.fetchNutritionRda();
      this.props.fetchNutritionState();
      this.props.fetchFoodStock({actionsOnSuccess: [stopBatchLoading()]});
    
  }


  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    //setAnchorEl(event.currentTarget);
  };

  handleClose = () => {
    //setAnchorEl(null);
    this.setState({ anchorEl: null });

  };

  //{ url } = useRouteMatch();
  handleDrawerOpen = () => {
    // setOpen(true);
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    //  setOpen(false);
    this.setState({ open: false });
  };


  makeTitle = () => {
    let route = this.props.routes.find((route) => {
      console.log(route.path, this.props.location.pathname)
      return getPathRegex(route.path).exec(this.props.location.pathname);
    });

    console.log("route: ", route)
    console.log(this.props.receipts)
    if (route) {
      if (route.path.includes("/receipts/:id")) {
        let receiptId = this.props.location.pathname.match(/.*\/receipts\/(\d+)/i)[ 1 ]
        if (Object.keys(this.props.receipts).length) {
          let receipt = this.props.receipts[ receiptId ]
          if (receipt) {
            console.log(receipt)
            let receiptTitle = receipt.storeName + " " + receipt.date

            return "Receipt: " + receiptTitle
          }
        }

      }
      return route.title;

    }
    else
      return 'Dashboard';
  }

  receiptsWarning = () => {
    const receiptsArray = Object.values(this.props.receipts);
    for (let index = 0; index < receiptsArray.length; index++) {
      if (receiptsArray[ index ].warning === 1) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { classes } = this.props;
    console.log('Rendering dashboard...');
    console.log("message:", this.props.message)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.message !== ''}
          onClose={(event, reason) => {
            if (reason === "timeout") {
              this.props.clearError()
            }
          }}
          autoHideDuration={2000}
          message={this.props.message}
        />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {this.makeTitle()}
            </Typography>
            <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            // onMouseOut={(event) => {
            //   var e = event.toElement || event.relatedTarget;
            //   handleClose();
            // }}
            >
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Account" />
              </MenuItem>
              <MenuItem onClick={this.props.signOut}>
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItemLink icon={<FastfoodIcon />} primary="Food Stock" to={`${this.props.match.url}/foodstock`} />
            <ListItemLink
              icon={this.receiptsWarning() ?
                <Tooltip title="Unrecognized food items.">
                  <Badge
                    badgeContent="!" color="error"
                  // variant="dot"
                  >
                    <ReceiptIcon />
                  </Badge>
                </Tooltip>
                :
                <ReceiptIcon />
              }
              primary="Receipts"
              to={`${this.props.match.url}/receipts`}
            />
            <ListItemLink icon={<AssessmentIcon />} primary="Nutrition State" to={`${this.props.match.url}/nutrition`} />
          </List>
          <Divider />
          <List>
            <ListItemLink icon={<SettingsIcon />} primary="Settings" to={`${this.props.match.url}/settings`} />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {this.props.batchLoading ?
              <div>Loading...</div>
              :
              <Switch>
                <Redirect exact from={'/dashboard'} to={'/dashboard/foodstock'} />

                {this.props.routes.map((route, key) => {
                  return (
                    <Route
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                      key={key}
                    />
                  );
                })}
              </Switch>
            }
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  }

}

const mapStateToProps = (state) => {

  return {
    receipts: state.receipts.receipts,
    message: state.feedback.message,
    batchLoading: state.feedback.batchLoading

    // firebase: state.firebase

  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch({ type: CLEAR_MESSAGE }),
    ...bindActionCreators({ signOut, fetchReceipts, fetchFoodStock, startBatchLoading, fetchNutritionRda, fetchNutritionState}, dispatch)
  }
}

export default compose(
  requireAuth,
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);


