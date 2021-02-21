import { Avatar, Button, createMuiTheme, Divider, Grid, Icon, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, makeStyles, MuiThemeProvider, Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import React, { } from 'react';
import LabelRoundedIcon from '@material-ui/icons/LabelRounded';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { styles as muiStyles } from '../../../shared/styles';
import { RootState } from '../../../../redux_store/rootReducer';
import { deleteMeal, editMeal } from '../../../../redux_store/food_store/foodActions';
import { FoodActionTypes } from '../../../../redux_store/food_store/foodTypes';
import { ClearMessageAction, CLEAR_MESSAGE } from '../../../../redux_store/feedback_store/feedbackTypes';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styles from './MealPage.styles';
import { MealDto } from '../../../../apis/dtos/serverDtos';
import { DeleteAlertDialog } from '../shared_components';
import { AddEditMealDialog } from './meals_components';

const mapDispatchToProps = (dispatch: Dispatch<FoodActionTypes | ClearMessageAction>) => {
  return {
    clearMessage: () => dispatch({ type: CLEAR_MESSAGE }),
    dispatch,
    ...bindActionCreators({ deleteMeal, editMeal }, dispatch)
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    meals: state.food.meals,
    dialogLoading: state.feedback.dialogLoading,
    loading: state.feedback.loading,
    message: state.feedback.message
  };
}

interface StylesProps extends WithStyles<typeof styles> { };

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof reduxConnector>

type MealProps = PropsFromRedux & RouteComponentProps & StylesProps;

type MealState = {
  openDeleteDialog: boolean;
  editMealDialogOpened: boolean;
}

class MealPage extends React.Component<MealProps, MealState> {
  getMuiTheme: any;
  mealId: number;
  classes: Record<"avatarSize" | "ingredients" | "@global", string>;

  constructor(props: MealProps) {
    super(props);
    this.mealId = props.match.params[ "id" ];
    this.classes = props.classes;
    this.getMuiTheme = createMuiTheme(muiStyles);
    this.state = {
      editMealDialogOpened: false,
      openDeleteDialog: false
    }
  }

  getMeal = (): MealDto => {
    return this.props.meals[ this.mealId ];
  }

  goToMeals = () => {
    this.props.history.replace(this.props.match.path.replace('/meal/:id', ''));
  }

  openEditMealDialog = (open: boolean) => { this.setState({ editMealDialogOpened: open }) };

  onDeleteClick = () => {
    this.setState({ openDeleteDialog: true });
  };
  onDeleteDialogNo = () => {
    this.setState({ openDeleteDialog: false });
    if (this.props.message) {
      this.props.clearMessage();
    }
  };
  onDeleteDialogYes = () => {
    console.log("on delete")
    this.props.deleteMeal(this.getMeal().id, this.goToMeals);
  };

  render() {
    console.log("MEALPAGE RENDER!");

    return (
      <MuiThemeProvider theme={this.getMuiTheme}>
        <React.Fragment>
          <Grid container direction="column" justify="space-between" spacing={2}>
            <Grid item>
              <Button onClick={this.goToMeals} variant="text" color="primary" startIcon={<KeyboardBackspaceRoundedIcon />}>
                Meals
              </Button>
            </Grid>
            <Grid item>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item>
                  <Typography variant="h4">
                    {this.getMeal().name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={2} alignItems="center" justify="flex-end">
                    <Grid item>
                      <Button onClick={() => this.openEditMealDialog(true)} variant="contained" color="primary" startIcon={<EditRoundedIcon />}>
                        Edit
                      </Button>
                      <AddEditMealDialog
                        openDialog={this.state.editMealDialogOpened}
                        error={this.props.message}
                        onCancel={() => this.openEditMealDialog(false)}
                        onConfirm={(mealDto) => this.props.editMeal(mealDto, () => this.openEditMealDialog(false))}
                        mealDto={this.getMeal()}
                        title="Edit Meal"
                      />
                    </Grid>
                    <Grid item>
                      <Button onClick={this.onDeleteClick} variant="contained" color="secondary" startIcon={<EditRoundedIcon />}>
                        Delete
                      </Button>
                      <DeleteAlertDialog
                        dialogTitle="Are you sure you want to delete this meal?"
                        error={""}
                        loading={this.props.dialogLoading}
                        onDeleteDialogNo={this.onDeleteDialogNo}
                        onDeleteDialogYes={this.onDeleteDialogYes}
                        openDeleteDialog={this.state.openDeleteDialog}

                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid item>
              <Grid container spacing={2} alignItems="flex-start" justify="space-between">
                <Grid container item xs={12} md={6} justify="flex-start" spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="body1" align="center">
                      {this.getMeal().servings} servings
                    </Typography>
                    <Divider light />

                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Typography variant="body1" >
                      Igredients
                    </Typography>
                    <List className={this.classes.ingredients} dense>
                      {this.getMeal().ingredients.map(ingredient => {
                        return (
                          <ListItem key={"ing-" + ingredient.foodItemDto.id} divider disableGutters>
                            <ListItemIcon >
                              <LabelRoundedIcon fontSize="small" />
                            </ListItemIcon>
                            {/* <ListItemAvatar>
                                <Avatar  className={this.classes.avatarSize} alt="Ingredient" src="">I</Avatar>
                              </ListItemAvatar> */}
                            <ListItemText primaryTypographyProps={{ variant: "body2" }} primary={ingredient.foodItemDto.name + ": " + ingredient.quantity + "g"} />
                          </ListItem>
                        );
                      }
                      )}
                    </List>
                  </Grid>
                  <Divider light variant="middle" orientation="vertical" flexItem />
                  <Grid item xs={12} md={5}>
                    <Typography variant="body1">
                      Description
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "16px" }}>
                      {this.getMeal().description}
                    </Typography>
                  <Divider light variant="middle" orientation="vertical" flexItem />

                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>

                  <img src="/res/banitsa.jpg" width="85%" style={{margin: "auto", display: "block", borderRadius: "5%"}}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
export default compose(withRouter, reduxConnector, withStyles(styles))(MealPage);