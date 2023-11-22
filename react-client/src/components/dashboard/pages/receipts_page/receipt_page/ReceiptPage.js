import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tooltip } from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import MUIDataTable, { } from 'mui-datatables';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import { themeOptions as muiStyles } from '../../../../shared/styles';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReceiptItemsToFoodStock, deleteReceipt, editReceiptItem, fetchReceiptImage, fetchReceiptItems } from '../../../../../redux_store/receipt_store/receiptsActions';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { compose, bindActionCreators } from 'redux';
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';
 import { CLEAR_MESSAGE } from '../../../../../redux_store/feedback_store/feedbackTypes';
import { Lightbox } from "react-modal-image";
import { getReceiptItems } from '../../selectors';
import { DeleteAlertDialog, EmptyTable } from '../../shared_components';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { FoodTypeCell } from './components';
import { itemStatus } from './constants';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { ThemeProvider } from '@emotion/react';
const ReceiptPage = (props) => {
  console.log("Rendering ReceiptPage...")

  const [ openDeleteDialog, setOpenDeleteDialog ] = React.useState(false);
  const [ openViewImage, setOpenViewImage ] = React.useState(false);
  const [ toggleConfirmButton ] = React.useState(false);

  const { path, params } = useRouteMatch();



  useEffect(() => {
    props.fetchReceiptItems(parseInt(params.id, 10), navigateToDashboardOnError);
  }, [])

  const history = useHistory();

  const navigateToDashboardOnError = () => {
    console.log("Exec on error!")
    history.push('/dashboard');
  }
  const columns = [
    {
      name: 'Item reference',
    },
    {
      name: 'Food Type',
      options: {
        customBodyRender: ({ id, foodList }, { rowIndex, rowData }) => {
          // console.log("value: ", foodList);
          // console.log(foodList)
          let status = rowData[ 2 ];
          return (
            <FoodTypeCell cellState={status} foodList={foodList} rowIndex={rowIndex}
              onConfirm={
                (selectedFoodItem) => {
                  props.editReceiptItem(id, selectedFoodItem)

                }
              }
            />
          );
        }
      }
    },
    {
      name: 'Status',
      options: {
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, { }) => {
          // let foodList = rowData[1]
          return value === itemStatus.UNRECOGNIZED ? <Tooltip title="This receipt item is not recognized. Search for the corresponding food item."><WarningRoundedIcon color="error" /></Tooltip>
            :
            value === itemStatus.UNSURE ? <Tooltip title="Please confirm the selected variety."><WarningRoundedIcon color="error" /></Tooltip>
              :
              value === itemStatus.RECOGNIZED ? <Tooltip title="Item is ready to be added to Food Stock. "><CheckRoundedIcon color="primary" /></Tooltip>
                :
                value === itemStatus.INSTOCK ? <DoneAllRoundedIcon color="primary" />
                  :
                  alert("ERROR: itemStatus")

        },

      }
    }
  ];



  const onDeleteClick = () => {
    setOpenDeleteDialog(true);
  };
  const onDeleteDialogNo = () => {
    setOpenDeleteDialog(false);
    if (props.message) {
      props.clearError();
    }
  };
  const onDeleteDialogYes = () => {
    console.log("on delete")
    props.deleteReceipt(params.id, () => {
      history.replace(path.replace('/:id', ''));
    })

  };


  const onViewImage = () => {
    console.log(" On view image")
    props.fetchReceiptImage(params.id);
    setOpenViewImage(true);
  }
  const onViewImageClose = () => {
    setOpenViewImage(false);
  }
  const options = {
    // sortOrder: {
    //   name: "Status",
    //   direction: 'desc'
    // },
    rowsPerPage: 20,
    rowsPerPageOptions: [],
    filterType: "dropdown",
    responsive: "standard",
    tableBodyHeight: "600px",
    tableBodyMaxHeight: "800px",
    selectableRows: "none",
    selectableRowsHeader: false,
    customToolbar: null,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    filter: false,
    expandableRowsOnClick: true,
    onRowClick: (rowData, { }) => {
      // history.push(`${url}/${dataIndex}`);
    },

  };

  // `data:image/jpeg;base64,${props.imageData}`

  return (
    <React.Fragment>
      {
        <Dialog
          open={openViewImage}
          onClose={() => setOpenViewImage(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
           <img id="mealImage" src={`data:image/jpeg;base64,${props.imageData}`} width="85%" style={{margin: "auto", display: "block", borderRadius: "5%"}}/>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      }
        <Grid container direction="column" justifyContent="space-between" spacing={2}>
          <Grid item>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                  <Grid item>
                    {toggleConfirmButton ?
                      <Button variant="contained" color="primary" startIcon={<CheckCircleOutlineRoundedIcon />} onClick={() => { }}>
                        Confirm Changes
                      </Button>
                      :
                      <Button variant="contained" color="primary" startIcon={<PlaylistAddCheckRoundedIcon />} onClick={() => { props.addReceiptItemsToFoodStock() }}>
                        Add to Food Stock
                        </Button>
                    }

                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                  <Grid item>
                    <Button variant="contained" color="primary" startIcon={<ImageSearchRoundedIcon />} onClick={onViewImage}>
                      View Image
                  </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<DeleteRoundedIcon />} onClick={onDeleteClick}>
                      Delete Receipt
              </Button>
                    <DeleteAlertDialog
                      dialogTitle="Are you sure you want to delete this receipt?"
                      error={props.message}
                      loading={props.loading}
                      onDeleteDialogNo={onDeleteDialogNo}
                      onDeleteDialogYes={onDeleteDialogYes}
                      openDeleteDialog={openDeleteDialog}

                    />
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          <Grid item>

            <MUIDataTable
              text="Loading"
              data={props.receiptItems}
              columns={columns}
              options={options}
              components={
                props.loading ? {
                  TableBody: (props) => <EmptyTable {...props} text="Loading..." />
                } : {}
              }

            />
          </Grid>

        </Grid>
    </React.Fragment >
  );
}
const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch({ type: CLEAR_MESSAGE }),
    dispatch,
    ...bindActionCreators({ addReceiptItemsToFoodStock, deleteReceipt, editReceiptItem, fetchReceiptItems, fetchReceiptImage }, dispatch)
  }
}
const mapStateToProps = (state) => {
  // console.log(state.receipts.currentReceipt.receiptItems)
  return {
    loading: state.feedback.loading,
    message: state.feedback.message,
    imageData: state.receipts.currentReceipt.imageData,
    receiptItems: getReceiptItems(state)
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps))
  (ReceiptPage);