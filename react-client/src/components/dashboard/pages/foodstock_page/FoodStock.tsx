import React, { } from 'react';
import { Button, Grid, Tabs, Tab, Paper } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { styles as muiStyles } from '../../../shared/styles';
import { withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { eatFoodStockItem, addFoodStockItem, editFoodStockItem, deleteFoodStockItems, deleteMeals, fetchMeals, editMeal, addMeal } from '../../../../redux_store/food_store/foodActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { ClearMessageAction, CLEAR_MESSAGE } from '../../../../redux_store/feedback_store/feedbackTypes';
import { getFoodStock, getMeals } from '../selectors';
import { DeleteAlertDialog } from '../shared_components';
import { AddNewFoodDialog, FoodTable } from './components';
import { AddMealDialog, MealsTable } from './meals_components';
import { FoodActionTypes } from '../../../../redux_store/food_store/foodTypes';
import { RootState } from '../../../../redux_store/rootReducer';

const mapDispatchToProps = (dispatch: Dispatch<FoodActionTypes | ClearMessageAction>) => {
  return {
    clearMessage: () => dispatch({ type: CLEAR_MESSAGE }),
    dispatch,
    ...bindActionCreators({ editFoodStockItem, deleteFoodStockItems, addFoodItem: addFoodStockItem, eatFoodStockItem, deleteMeals, fetchMeals, editMeal, addMeal }, dispatch)
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
    meals
  };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof reduxConnector>
type FoodStockState = {
    openDeleteDialog: boolean;
    openAddFoodDialog: boolean;
    openAddMealDialog: boolean;
    rowsSelected: number[];
    tableNumber: number;
}
class FoodStock extends React.Component<PropsFromRedux, FoodStockState> {
  getMuiTheme: any;
  paperElevation: number;
  onViewImageClose: any;

  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      openAddFoodDialog: false,
      openAddMealDialog: false,
      rowsSelected: [],
      tableNumber: 0,
    }
    // this.path = this.props.match.path;
    // this.params = this.props.match.params;
    // this.history = this.props.history
    this.getMuiTheme = createMuiTheme(muiStyles);
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
  closeAddMealDialog = () => { this.setState({ openAddMealDialog: false }) };


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
        <MuiThemeProvider theme={this.getMuiTheme}>
          {/* Buttons */}
          <Grid container direction="column" justify="space-between" spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item>
                  <Grid container spacing={2} alignItems="center" justify="flex-start">
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
                          <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => { this.setState({ openAddMealDialog: true }) }}>
                            Add a new Meal
                    </Button>
                          <AddMealDialog
                            openDialog={this.state.openAddMealDialog}
                            error={this.props.message}
                            onCancel={this.closeAddMealDialog}
                            onConfirm={(mealDto) => this.props.addMeal(mealDto, this.closeAddMealDialog)}
                          />
                        </>
                      }
                    </Grid>
                  </Grid>
                </Grid>
                {this.state.tableNumber === 0 ?
                  <Grid item>
                    <Grid container spacing={2} alignItems="center" justify="flex-end">
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
                <FoodTable paperElevation={this.paperElevation} eatFoodStockItem={this.props.eatFoodStockItem} editFoodStockItem={this.props.editFoodStockItem} foodStockItems={this.props.foodStockItems} indexToKey={this.props.indexToKeyFS} setRowsSelected={(rowsSelected) => { this.setState({ rowsSelected }) }} />
              </Grid>
              :
              <Grid item>
                <MealsTable
                  paperElevation={this.paperElevation}
                  eatMeal={() => { }}
                  editMeal={this.props.editMeal}
                  meals={this.props.meals}
                  indexToKey={this.props.indexToKeyMeals}
                  setRowsSelected={(rowsSelected) => { this.setState({ rowsSelected }) }}
                />

              </Grid>
            }

          </Grid>
        </MuiThemeProvider>

      </React.Fragment >
    );
  }

}


export default compose(withRouter, reduxConnector)(FoodStock);