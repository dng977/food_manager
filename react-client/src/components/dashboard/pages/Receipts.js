import React, { useEffect } from 'react';
import { Paper, AppBar, Toolbar, Button, Grid, IconButton, Tooltip, Switch, Snackbar } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import MaterialTable from 'material-table';
import MUIDataTable, { TableBodyCell, TableBody as MuiTableBody } from 'mui-datatables';
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import EditIcon from '@material-ui/icons/Edit';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { styles } from './Receipts.styles';
import { Route, useRouteMatch, Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadReceipt, fetchReceiptItems, setCurrentReceipt } from '../../../store/actions/receiptsActions';
import { EmptyTable } from './components';
import { getReceipts } from './selectors';
import { useState } from 'react';
import { useRef } from 'react';
import { CLEAR_ERROR } from '../../../store/actions/types';
import { bindActionCreators } from 'redux';


const Receipts = (props) => {
  const fileInput = useRef();
  useEffect(() => {
    // props.setCurrentReceipt('');
    console.log("use effect receipts trigggered");
  }, []);

  const getMuiTheme = () => createMuiTheme(styles);
  const { url } = useRouteMatch();
  const history = useHistory();
  const columns = [
    {
      name: 'Store',
    },
    {
      name: 'Date',
    },
    {
      name: 'Status',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowData[ 2 ] == false ?
            <PlaylistAddCheckRoundedIcon color="primary" />
            :
            <Tooltip title='There are unrecognized foods in this receipt.'><WarningRoundedIcon color="error" /></Tooltip>;
        },

      }
    }
  ];

  const handleUpload = event => {
    console.log("onchangetriggered");
    console.log(event.target.files[ 0 ]);

    const data = new FormData();
    data.append('file', event.target.files[ 0 ]);
    props.uploadReceipt(data);
    event.target.value = null;
  }
  const onUploadClick = () => {

    //props.uploadReceipt(data);
  }
  const options = {
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
    onRowClick: (rowData, { dataIndex, rowIndex }) => {
      history.push(`${url}/${props.indexToKey[ dataIndex ]}`);
      // props.fetchReceiptItems(props.indexToKey[ dataIndex ]);
    },

  };

  console.log("Rendering receipts...");
  console.log("receipts: ", props.receipts);

  return (
    <React.Fragment>
      <Grid container direction="column" justify="space-evenly" spacing={3}>
        <Grid item>
          <Grid container spacing={2} alignItems="center" justify="flex-end">
            <Grid item>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleUpload}
              />
              <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={() => fileInput.current.click()}>
                Upload Receipt
              </Button>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={props.error!==''}
                onClose={(event, reason) => {
                  if(reason=="timeout"){
                    props.clearError()
                  }
                }}
                autoHideDuration={2000}
                message={"Receipt upload failed."}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              text="Loading"
              data={props.receipts}
              columns={columns}
              options={options}
              components={
                props.loading ? {
                  TableBody: (props) => <EmptyTable {...props} text="Loading..." />
                } : props.receipts.length == 0 ? {
                  TableBody: (props) => <EmptyTable {...props} text="You haven't got any receipts." />
                } : {}
              }
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch({ type: CLEAR_ERROR }),
    dispatch,
    ...bindActionCreators({ uploadReceipt, fetchReceiptItems, setCurrentReceipt }, dispatch)
  }
}
const mapStateToProps = (state) => {
  const [ receipts, indexToKey ] = getReceipts(state);
  return {
    receipts,
    indexToKey,
    // receipts: [],
    loading: state.receipts.loading,
    error: state.receipts.error
  };
};


export default connect(mapStateToProps, mapDispatchToProps )(Receipts);