import React, { } from 'react';
import { Button, Grid, Tabs, Tab, Paper, createTheme, ThemeProvider } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { themeOptions } from '../../../shared/styles';
import { RouteChildrenProps, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { eatFoodStockItem, addFoodStockItem, editFoodStockItem, deleteFoodStockItems, deleteMeal, fetchMeals, editMeal, eatMeal, addMeal } from '../../../../redux_store/food_store/foodActions';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { ClearMessageAction, CLEAR_MESSAGE } from '../../../../redux_store/feedback_store/feedbackTypes';
import { getFoodStock, getMeals } from '../selectors';
import { DeleteAlertDialog } from '../shared_components';
import { AddNewFoodDialog, FoodTable } from './components';
import { AddEditMealDialog, MealsTable } from './meals/meals_components';
import { FoodActionTypes } from '../../../../redux_store/food_store/foodTypes';
import { RootState } from '../../../../redux_store/rootReducer';
import FoodCard from '../../../shared/FoodCard';

const mapDispatchToProps = (dispatch: Dispatch<FoodActionTypes | ClearMessageAction>) => {
  return {
    clearMessage: () => dispatch({ type: CLEAR_MESSAGE }),
    dispatch,
    ...bindActionCreators({ editFoodStockItem, deleteFoodStockItems, addFoodItem: addFoodStockItem, eatFoodStockItem, deleteMeal, fetchMeals, eatMeal, editMeal, addMeal }, dispatch)
  }
}
const mapStateToProps = (state: RootState) => {
  const [ foodStockItems, indexToKeyFS ] = getFoodStock(state);
  const [ meals, indexToKeyMeals ] = getMeals(state);
  // console.log("Meals", ['asd'].concat(meals))
  // console.log(state.receipts.currentReceipt.receiptItems)
  return {
    loading: state.feedback.loading,
    message: state.feedback.message,
    foodStockItems,
    indexToKeyFS,
    indexToKeyMeals,
    meals: state.food.meals
  };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
interface MatchParams {
  name: string;
}
type PropsFromRedux = ConnectedProps<typeof reduxConnector>
type FoodStockProps = PropsFromRedux & RouteComponentProps;

type FoodStockState = {
  openDeleteDialog: boolean;
  openAddFoodDialog: boolean;
  openAddEditMealDialog: boolean;
  rowsSelected: number[];
  tableNumber: number;
}
class FoodStock extends React.Component<FoodStockProps, FoodStockState> {
  getMuiTheme: any;
  paperElevation: number;
  onViewImageClose: any;

  constructor(props: FoodStockProps) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      openAddFoodDialog: false,
      openAddEditMealDialog: false,
      rowsSelected: [],
      tableNumber: 1,
    }
    // this.path = this.props.match.path;
    // this.params = this.props.match.params;
    // this.history = this.props.history
    this.getMuiTheme = createTheme(themeOptions);
    this.onDeleteDialogNo = this.onDeleteDialogNo.bind(this);
    this.onDeleteDialogYes = this.onDeleteDialogYes.bind(this);
    this.handleChangeTable = this.handleChangeTable.bind(this);
    this.paperElevation = 4;


  }

  handleChangeTable = (event, newValue) => {
    this.setState({ tableNumber: newValue });
  };

  shouldComponentUpdate(nextProps, nextState) {
    //Don't rerender when new items are selected
    let newLength = nextState.rowsSelected.length;
    let oldLength = this.state.rowsSelected.length;
    console.log(newLength, oldLength)
    if ((newLength - oldLength == 1 && newLength > 1) || (newLength - oldLength == -1 && newLength > 0))
      return false
    return true
  }

  closeAddFoodDialog = () => { this.setState({ openAddFoodDialog: false }) };
  closeAddEditMealDialog = () => { this.setState({ openAddEditMealDialog: false }) };


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

    this.props.deleteFoodStockItems(this.state.rowsSelected.map(row => this.props.indexToKeyFS[ row ]))
    this.setState({ openDeleteDialog: false, rowsSelected: [] });

  };

  render() {
    console.log("Rendering FOOD STOCK...")
    return (
      <React.Fragment>
        <ThemeProvider theme={this.getMuiTheme}>
          {/* Buttons */}
          <Grid container direction="column" justifyContent="space-between" spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                    <Grid item>
                      {this.state.tableNumber === 0 ?
                        <>
                          <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => { this.setState({ openAddFoodDialog: true }) }}>
                            Add
                      </Button>
                          <AddNewFoodDialog
                            openDialog={this.state.openAddFoodDialog}
                            dialogTitle={"Add a new food"}
                            error={this.props.message}
                            onCancel={this.closeAddFoodDialog}
                            onConfirm={(foodItemId, quantity) => this.props.addFoodItem(foodItemId, quantity, this.closeAddFoodDialog)}
                          />
                        </>
                        :
                        <>
                          <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => { this.setState({ openAddEditMealDialog: true }) }}>
                            Add a new Meal
                    </Button>
                          <AddEditMealDialog
                            title="Add a new meal"
                            openDialog={this.state.openAddEditMealDialog}
                            error={this.props.message}
                            onCancel={this.closeAddEditMealDialog}
                            onConfirm={(mealDto, mealImage) => this.props.addMeal(mealDto, mealImage, this.closeAddEditMealDialog)}
                          />
                        </>
                      }
                    </Grid>
                  </Grid>
                </Grid>
                {this.state.tableNumber === 0 ?
                  <Grid item>
                    <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                      <Grid item>
                        <Button variant="contained" color="secondary" disabled={this.state.rowsSelected.length == 0} startIcon={<DeleteRoundedIcon />} onClick={this.onDeleteClick}>
                          Delete selected items
                      </Button>
                        <DeleteAlertDialog
                          dialogTitle="Are you sure you want to delete these items?"
                          error={this.props.message}
                          onDeleteDialogNo={this.onDeleteDialogNo}
                          onDeleteDialogYes={this.onDeleteDialogYes}
                          openDeleteDialog={this.state.openDeleteDialog}

                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  :
                  null
                }

              </Grid>
            </Grid>
            <Grid item>
              <Paper square elevation={this.paperElevation}>
                <Tabs
                  value={this.state.tableNumber}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChangeTable}
                  aria-label="disabled tabs example"
                  variant="fullWidth"
                >
                  <Tab label="Whole Foods" />
                  <Tab label="Meals" />
                </Tabs>
              </Paper>
            </Grid>
            {this.state.tableNumber === 0 ?
              <Grid item>
                <FoodTable loading={this.props.loading} paperElevation={this.paperElevation} eatFoodStockItem={this.props.eatFoodStockItem} editFoodStockItem={this.props.editFoodStockItem} foodStockItems={this.props.foodStockItems} indexToKey={this.props.indexToKeyFS} setRowsSelected={(rowsSelected) => { this.setState({ rowsSelected }) }} />
              </Grid>
              :
              <Grid item>
                <Grid container spacing={3}>
                  {
                    Object.values(this.props.meals).map((meal, ind) => {
                      return (
                        <Grid item key={"meal" + ind}>
                          {/* <FoodCard name={meal.name} description={meal.description} quantityLeft={meal.quantityLeft}/> */}
                          <FoodCard
                            name={meal.name}
                            imageBytes={meal.imageBytes}
                            meal={meal}
                            eatMeal={this.props.eatMeal}
                            editMeal={(mealDto, mealImage) => this.props.editMeal(mealDto, mealImage, () => { })}
                            history={this.props.history}
                            locationPath={this.props.location.pathname}
                          />
                        </Grid>);
                    })
                  }
                </Grid>
                {/* <MealsTable
                  history={this.props.history}
                  locationPath={this.props.location.pathname}
                  loading={this.props.loading}
                  paperElevation={this.paperElevation}
                  eatMeal={this.props.eatMeal}
                  editMeal={(mealDto, mealImage) => this.props.editMeal(mealDto, mealImage, () => {})}
                  meals={this.props.meals}
                  indexToKey={this.props.indexToKeyMeals}
                  setRowsSelected={(rowsSelected) => { this.setState({ rowsSelected }) }}
                /> */}

              </Grid>
            }

          </Grid>
        </ThemeProvider>

      </React.Fragment >
    );
  }

}


export default compose(withRouter, reduxConnector)(FoodStock);