import React, { useEffect } from 'react';
import { Button, Grid, Tooltip, Dialog, DialogTitle, DialogActions, Select, MenuItem, Box } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import MUIDataTable, { } from 'mui-datatables';
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { styles as muiStyles } from '../Receipts.styles';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteReceipt, editReceiptItem, fetchReceiptImage, fetchReceiptItems } from '../../../../store/actions/receiptsActions';
import { useRef } from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { compose, bindActionCreators } from 'redux';
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'; import { CLEAR_ERROR } from '../../../../store/actions/types';
import { Lightbox } from "react-modal-image";
import { getReceiptItems } from '../selectors.js';
import { EmptyTable } from '../shared_components';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import { FoodTypeCell } from './components';
import { itemStatus } from './constants';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
const ReceiptPage = (props) => {
  console.log("Rendering ReceiptPage...")
  const getMuiTheme = createMuiTheme(muiStyles);

  const [ openDeleteDialog, setOpenDeleteDialog ] = React.useState(false);
  const [ openViewImage, setOpenViewImage ] = React.useState(false);
  const [ toggleConfirmButton, setToggleConfirmButton ] = React.useState(false);

  const { url, path, params } = useRouteMatch();

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
        customBodyRender: (foodList, { rowIndex, rowData }, updateValue) => {
          // console.log("value: ", foodList);
          // console.log(foodList)
          let status = rowData[ 2 ];
          return (
            <FoodTypeCell cellState={status} foodList={foodList}
              onConfirm={
                (selectedFoodItem) => {
                  let selectedReceiptItem = props.rece
                  props.editReceiptItem(rowIndex,selectedFoodItem)

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
        customBodyRender: (value, { rowData }, updateValue) => {
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
    if (props.error) {
      props.clearError();
    }
  };
  const onDeleteDialogYes = () => {
    console.log("on delete")
    props.deleteReceipt(params.id, () => {
      history.push(path.replace('/:id', ''));
    })

  };
  const deleteAlertDialog = () => {
    console.log("render Dialog: ", openDeleteDialog)
    return (
      <Dialog
        open={openDeleteDialog}
        onClose={onDeleteDialogNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >{
          props.loading ?

            <DialogTitle>Deleting...</DialogTitle> :
            props.error ?
              <>
                <DialogTitle>{`${props.error}`}</DialogTitle>
                <DialogActions>
                  <Button variant="outlined" onClick={onDeleteDialogNo} color="primary">
                    Close
              </Button>
                </DialogActions>
              </>
              : openDeleteDialog ?
                <>
                  <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this receipt?"}</DialogTitle>
                  <DialogActions>
                    <Button variant="outlined" onClick={onDeleteDialogNo} color="primary">
                      No
          </Button>
                    <Button variant="contained" onClick={onDeleteDialogYes} color="secondary" autoFocus>
                      Yes
          </Button>
                  </DialogActions>
                </> : <></>
        }
      </Dialog>
    );
  }

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
    onRowClick: (rowData, { dataIndex }) => {
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
                      <Button variant="contained" color="primary" startIcon={<PlaylistAddCheckRoundedIcon />} onClick={() => { }}>
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
                    {deleteAlertDialog()}
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
    clearError: () => dispatch({ type: CLEAR_ERROR }),
    dispatch,
    ...bindActionCreators({ deleteReceipt, editReceiptItem, fetchReceiptItems, fetchReceiptImage }, dispatch)
  }
}
const mapStateToProps = (state) => {
  // console.log(state.receipts.currentReceipt.receiptItems)
  return {
    loading: state.receipts.loading,
    error: state.receipts.error,
    imageData: state.receipts.currentReceipt.imageData,
    receiptItems: getReceiptItems(state)
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps))
  (ReceiptPage);