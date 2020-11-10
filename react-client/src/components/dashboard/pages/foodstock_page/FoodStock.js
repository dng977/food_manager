import React, { } from 'react';
import { Button, Grid, Dialog, DialogTitle, DialogActions, Tabs, Tab, Paper, Container, Typography, CssBaseline } from '@material-ui/core';
import MUIDataTable, { } from 'mui-datatables';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { styles as muiStyles } from '../receipts_page/Receipts.styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {eatFoodStockItem, addFoodItem,editFoodStockItem, deleteFoodStockItems } from '../../../../store/actions/foodActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { compose, bindActionCreators } from 'redux';
import { CLEAR_MESSAGE } from '../../../../store/actions/types';
import { Lightbox } from "react-modal-image";
import { getFoodStock } from '../selectors.js';
import { DeleteAlertDialog, EmptyTable } from '../shared_components';
import { EatCell, QuantityCell, AddNewFoodDialog, FoodTable } from './components';

class FoodStock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      openAddFoodDialog: false,
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
  
  closeAddFoodDialog = () => {this.setState({openAddFoodDialog: false})};

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

    this.props.deleteFoodStockItems(this.state.rowsSelected.map(row => this.props.indexToKey[ row ]))
    this.setState({ openDeleteDialog: false, rowsSelected: [] });

  };

  render() {
    console.log("Rendering FOOD STOCK...")
    return (
      <React.Fragment>
        {
          this.state.openViewImage &&
          <Lightbox
            medium={`data:image/jpeg;base64,${this.props.imageData}`}
            hideDownload
            hideZoom
            alt="Use double-click to zoom in/out."
            onClose={this.onViewImageClose}
          />}
        <MuiThemeProvider theme={this.getMuiTheme}>
          {/* Buttons */}
          <Grid container direction="column" justify="space-between" spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item>
                  <Grid container spacing={2} alignItems="center" justify="flex-start">
                    <Grid item>
                      <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => {this.setState({openAddFoodDialog: true}) }}>
                        Add
                      </Button>
                      <AddNewFoodDialog
                        openDialog={this.state.openAddFoodDialog}
                        dialogTitle={"Add a new food"}
                        error={this.props.message}
                        onCancel={this.closeAddFoodDialog}
                        onConfirm={(foodItemId, quantity) => this.props.addFoodItem(foodItemId, quantity, this.closeAddFoodDialog) } 
                      />
                    </Grid>
                  </Grid>
                </Grid>
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
              <FoodTable paperElevation={this.paperElevation} eatFoodStockItem={this.props.eatFoodStockItem} editFoodStockItem={this.props.editFoodStockItem} foodStockItems={this.props.foodStockItems} indexToKey={this.props.indexToKey} setRowsSelected={(rowsSelected) => {this.setState({rowsSelected})}}/>
              </Grid>
              :
              <Grid item>
              <Paper variant="outlined" ><Typography align="center" gutterBottom variant="h5">Meals table coming soon...</Typography>         </Paper>

              </Grid>
              }

          </Grid>
        </MuiThemeProvider>

      </React.Fragment >
    );
  }

}
const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch({ type: CLEAR_MESSAGE }),
    dispatch,
    ...bindActionCreators({ editFoodStockItem, deleteFoodStockItems, addFoodItem, eatFoodStockItem }, dispatch)
  }
}
const mapStateToProps = (state) => {
  const [ foodStockItems, indexToKey ] = getFoodStock(state);
  // console.log(state.receipts.currentReceipt.receiptItems)
  return {
    loading: state.feedback.loading,
    message: state.feedback.message,
    foodStockItems,
    indexToKey
  };
};

export default compose(withRouter,
  connect(mapStateToProps, mapDispatchToProps))
  (FoodStock);