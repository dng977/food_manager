import React, { useEffect } from 'react';
import { Button, Grid, Tooltip, Dialog, DialogTitle, DialogActions, Snackbar } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import MUIDataTable, { } from 'mui-datatables';
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { styles as muiStyles } from '../Receipts.styles';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReceiptItemsToFoodStock, deleteReceipt, editReceiptItem, fetchReceiptImage, fetchReceiptItems } from '../../../../store/actions/receiptsActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { compose, bindActionCreators } from 'redux';
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'; import { CLEAR_MESSAGE } from '../../../../store/actions/types';
import { Lightbox } from "react-modal-image";
import { getReceiptItems } from '../selectors.js';
import { DeleteAlertDialog, EmptyTable } from '../shared_components';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { FoodTypeCell } from './components';
import { itemStatus } from './constants';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
const ReceiptPage = (props) => {
  console.log("Rendering ReceiptPage...")
  const getMuiTheme = createMuiTheme(muiStyles);

  const [ openDeleteDialog, setOpenDeleteDialog ] = React.useState(false);
  const [ openViewImage, setOpenViewImage ] = React.useState(false);
  const [ toggleConfirmButton ] = React.useState(false);

  const { path, params } = useRouteMatch();

  useEffect(() => {
    props.fetchReceiptItems(parseInt(params.id, 10));
  }, [])

  const history = useHistory();
  const columns = [
    {
      name: 'Item reference',
    },
    {
      name: 'Food Type',
      options: {
        customBodyRender: (foodList, { rowIndex, rowData }) => {
          // console.log("value: ", foodList);
          // console.log(foodList)
          let status = rowData[ 2 ];
          return (
            <FoodTypeCell cellState={status} foodList={foodList} rowIndex={rowIndex}
              onConfirm={
                (selectedFoodItem) => {
                  props.editReceiptItem(rowIndex, selectedFoodItem)

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
      history.push(path.replace('/:id', ''));
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


  return (
    <React.Fragment>
      {
        openViewImage &&
        <Lightbox
          medium={`data:image/jpeg;base64,${props.imageData}`}
          hideDownload
          hideZoom
          alt="Use double-click to zoom in/out."
          onClose={onViewImageClose}
        />}
      <MuiThemeProvider theme={getMuiTheme}>
        <Grid container direction="column" justify="space-between" spacing={2}>
          <Grid item>
            <Grid container spacing={2} alignItems="center" justify="space-between">
              <Grid item>
                <Grid container spacing={2} alignItems="center" justify="flex-start">
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
                <Grid container spacing={2} alignItems="center" justify="flex-end">
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
      </MuiThemeProvider>

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