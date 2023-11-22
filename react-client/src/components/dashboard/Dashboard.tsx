import React, { useEffect } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import requireAuth from '../requireAuth';
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { signOut } from '../../redux_store/auth_store/authActions';
import { bindActionCreators, compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Copyright } from '../shared/renderMaterial';
import { ListItemLink } from '../shared/ListItemLink';
import { fetchReceipts } from '../../redux_store/receipt_store/receiptsActions';
import { fetchFoodStock, fetchMeals, fetchFoodHistory } from '../../redux_store/food_store/foodActions';
import { getPathRegex, dashboardRoutes } from '../../routes';
import { fetchNutritionRda, fetchNutritionState } from '../../redux_store/nutrition_store/nutritionActions';
import { getReceipts } from './pages/selectors';
import { CLEAR_MESSAGE, PAGE_LOADING } from '../../redux_store/feedback_store/feedbackTypes';
import { AccountCircle, ChevronRight, MeetingRoom, MenuOpen, Person } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Snackbar, Menu, MenuItem } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [ theme.breakpoints.up('sm') ]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create([ 'width', 'margin' ], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mapStateToProps = (state) => {
  const [ receipts ] = getReceipts(state);

  return {
    hasUserDetails: state.nutrition.userDetails,
    receipts: receipts,
    message: state.feedback.message,
    loading: state.feedback.loading

    // firebase: state.firebase

  };
};
const mapDispatchToProps = dispatch => {
  return {
    pageLoading: () => dispatch({ type: PAGE_LOADING }),
    clearError: () => dispatch({ type: CLEAR_MESSAGE }),
    ...bindActionCreators({ signOut, fetchReceipts, fetchFoodStock, fetchNutritionRda, fetchNutritionState, fetchMeals, fetchFoodHistory }, dispatch)
  }
}

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof reduxConnector>;
type DashboardProps = { routes: Array<any> } & PropsFromRedux & RouteComponentProps & { theme: Theme };
type DashboardState = {
  anchorEl: any;
  open: boolean;
  init: boolean;
}

const Dashboard = (props: DashboardProps) => {
  const dashboardRoutesSliced: any = dashboardRoutes.slice(0, 5);
  const theme = useTheme();
  const [ state, setState ] = React.useState<DashboardState>({ anchorEl: null, open: false, init: true });

  useEffect(() => {
    console.log("GET DERIVED STATE - DASHBOARD: ", props, state);
    if (state.init) {
      if (Object.keys(props.receipts).length === 0 || !props.location.pathname.match(/receipts\/\d/)) {
        props.fetchReceipts();
      }
      props.fetchNutritionRda();
      props.fetchNutritionState();
      props.fetchFoodStock();
      props.fetchMeals();
      props.fetchFoodHistory(5);
    }
    setState({...state, init: false});
  }, [props])


  const handleClick = (event) => {
    setState({ ...state, anchorEl: event.currentTarget });
    //setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    //setAnchorEl(null);
    setState({ ...state, anchorEl: null });

  };

  //{ url } = useRouteMatch();
  const handleDrawerOpen = () => {
    // setOpen(true);
    setState({ ...state, open: true });
  };
  const handleDrawerClose = () => {
    //  setOpen(false);
    setState({ ...state, open: false });
  };


  const makeTitle = () => {
    let route = props.routes.find((route) => {
      console.log(route.path, props.location.pathname)
      return getPathRegex(route.path).exec(props.location.pathname);
    });

    console.log("route: ", route)
    console.log(props.receipts)
    if (route) {
      if (route.path.includes("/receipts/:id")) {
        let receiptId = props.location.pathname.match(/.*\/receipts\/(\d+)/i)[ 1 ]
        if (Object.keys(props.receipts).length) {
          let receipt = props.receipts[ receiptId ]
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

  const receiptsWarning = () => {
    const receiptsArray = Object.values(props.receipts);
    for (let index = 0; index < receiptsArray.length; index++) {
      if (receiptsArray[ index ].warning === 1) {
        return true;
      }
    }
    return false;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.message !== ''}
        onClose={(event, reason) => {
          if (reason === "timeout") {
            props.clearError()
          }
        }}
        autoHideDuration={2000}
        message={props.message}
      />
      <AppBar position="fixed" open={state.open} >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(state.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {makeTitle()}
          </Typography>
          <div>
            <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={state.anchorEl}
              keepMounted
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(state.anchorEl)}
              onClose={handleClose}
            // onMouseOut={(event) => {
            //   var e = event.toElement || event.relatedTarget;
            //   handleClose();
            // }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Manage Account" />
              </MenuItem>
              <MenuItem onClick={props.signOut}>
                <ListItemIcon>
                  <MeetingRoom />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={state.open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {dashboardRoutesSliced.map(({ path, Icon, title }) => {
            return (
              <div key={title}>
                {title === 'Settings' ? <Divider key="divider" light /> : null}
                <ListItemLink selected={props.location.pathname === path} icon={
                  title === 'Receipts' && receiptsWarning() ?
                    <Tooltip title="Unrecognized food items.">
                      <Badge
                        badgeContent="!" color="error"
                      // variant="dot"
                      >
                        <Icon />
                      </Badge>
                    </Tooltip>
                    :
                    <Icon />}
                  primary={title} to={path} />
              </div>
            );
          })}
        </List>
        {/* <List >
            <ListItemLink icon={<SettingsIcon />} primary="Settings" to={`${props.match.url}/settings`} />
          </List> */}
        <Divider light={false} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.loading ?
          <div>Loading...</div>
          :
          <Switch>
            {!props.hasUserDetails ? <Redirect from="/dashboard/nutrition" to={{ pathname: "/bodydetails", state: { from: "/dashboard/nutrition" } }} /> : null}
            <Redirect exact from={'/dashboard'} to={'/dashboard/foodstock'} />

            {props.routes.map((route, key) => {
              return <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={key}
              />
            })}
          </Switch>
        }
        <Box pt={4}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}

export default compose(
  requireAuth,
  withRouter,
  reduxConnector,
)(Dashboard);


