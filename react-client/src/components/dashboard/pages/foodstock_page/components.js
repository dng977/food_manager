import { IconButton, Tooltip, Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, createMuiTheme, ThemeProvider, } from '@material-ui/core';

import React, { useEffect, useMemo, useState } from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { connect, useSelector } from 'react-redux';
import { editFoodStockItem } from '../../../../store/actions/foodActions';
import { Fraction } from 'fractional';
import PropTypes from 'prop-types';
import { EmptyTable, FoodLookUp } from "../shared_components";
import MUIDataTable from 'mui-datatables';

const theme = createMuiTheme({
  overrides: {
    MuiDialogTitle: {
      root: {
        textAlign: 'center'
      }
    },
    MuiDialogActions: {
      root: {
        justifyContent: 'space-between'
      },
      spacing: {

      }
    }
  }
})

export const AddNewFoodDialog = ({ dialogTitle, onCancel, onConfirm, error, openDialog }) => {
  console.log("render add dialog: ", openDialog)
  const loading = useSelector(state => state.feedback.dialogLoading);
  const [ selectedFood, setSelectedFood ] = useState('');
  const [ servingUnits, setServingUnits ] = React.useState(new Fraction(1, 1));
  const [ servingInGrams, setServingInGrams ] = React.useState(0)
  const [ emptyInput, setEmptyInput] = useState(true);

  useEffect(() => {
    if (selectedFood) {
      setServingInGrams(selectedFood.servingSize);
      setServingUnits(new Fraction(1, 1));
      setEmptyInput(false);

    }else{
      setEmptyInput(true)
    }

  }, [ selectedFood ])
  const onPortionChange = (servingUnits, servingInGrams) => {
    setServingUnits(servingUnits)
    setServingInGrams(servingInGrams)
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={openDialog}
        onClose={onCancel}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >{
          loading ?

            <DialogTitle>Adding...</DialogTitle> :
            error ?
              <>
                <DialogTitle>{`${error}`}</DialogTitle>
                <DialogActions>
                  <Button variant="outlined" onClick={onCancel} color="primary">
                    Close
                </Button>
                </DialogActions>
              </>
              : openDialog ?
                <>
                  <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                  <DialogContent dividers>
                    <Grid container direction="column" alignItems="center" justify="center" spacing={3}>
                      <FoodLookUp
                        width={250}

                        rowIndex={0}
                        hasConfirmButton={false}
                        onChange={(selectedFood) => setSelectedFood(selectedFood)}
                        loading={loading}
                      />
                      {selectedFood ?
                        <Grid item>
                          <FoodPortionControl
                            basePortion={selectedFood.servingSize}
                            countable={selectedFood.countable}
                            onPortionChange={onPortionChange}
                            portionInGrams={servingInGrams}
                            portionUnits={servingUnits}
                          />
                        </Grid>
                        :
                        null
                      }

                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button fullWidth variant="outlined" onClick={onCancel} color="primary">
                      Cancel
                  </Button>
                    <Button fullWidth disabled={emptyInput} variant="contained" onClick={() => { onConfirm(selectedFood.id, servingInGrams); setSelectedFood(''); }} color="primary" autoFocus>
                      Add
                  </Button>
                  </DialogActions>
                </> : <></>
        }
      </Dialog>
    </ThemeProvider>

  );
}

AddNewFoodDialog.propTypes = {
  dialogTitle: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}


//TABLE

export class FoodTable extends React.Component {
  constructor(props) {
    super(props);
  }

  options = {
    rowsPerPage: 20,
    rowsPerPageOptions: [],
    filterType: "dropdown",
    responsive: "standard",
    tableBodyHeight: "600px",
    tableBodyMaxHeight: "800px",
    selectableRows: "multiple",
    selectableRowsHeader: true,
    selectToolbarPlacement: 'none',
    customToolbar: null,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    filter: false,
    rowsSelected: [],
    onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
      console.log(rowsSelected)
      this.props.setRowsSelected(rowsSelected)
      //setRowsSelected(rowsSelected)

    },
    expandableRowsOnClick: true,
    onRowClick: (rowData, { }) => {
      // history.push(`${url}/${dataIndex}`);
    },

  };
  columns = [
    {
      name: 'Food Name',
    },
    {
      name: 'Quantity',
      options: {
        customBodyRender: (value, { rowIndex }) => {
          return <QuantityCell
            value={value}
            submitEdit={(newQuantity) => {
              this.props.editFoodStockItem(this.props.indexToKey[ rowIndex ], { quantity: newQuantity })
            }} />;
        }
      }
    },
    {
      name: '',
      options: {
        customBodyRender: (value) => {
          return <EatCell value={value} />;
        }
      }
    }
  ];

  render() {
    return (
      <MUIDataTable
        text="Loading"
        data={this.props.foodStockItems}
        columns={this.columns}
        options={this.options}
        components={
          this.props.loading ? {
            TableBody: (props) => <EmptyTable {...props} text="Loading..." />
          } : {}
        }

      />
    );
  }
}

FoodTable.propTypes = {
  setRowsSelected: PropTypes.func.isRequired,
  foodStockItems: PropTypes.array.isRequired

}


export const EatCell = ({ value }) => {
  const [ servingUnits, setServingUnits ] = React.useState(new Fraction(1, 1));
  const [ servingInGrams, setServingInGrams ] = React.useState(value.servingSize)
  //eval(servingUnits)
  const onPortionChange = (servingUnits, servingInGrams) => {
    setServingUnits(servingUnits)
    setServingInGrams(servingInGrams)
  }
  const onEat = () => {

  }

  return (
    <Grid container alignItems="center" justify="flex-start" spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={onEat}>
          Eat
      </Button>
      </Grid>
      <Grid item>
        <FoodPortionControl countable={value.countable} basePortion={value.servingSize} portionUnits={servingUnits} portionInGrams={servingInGrams} onPortionChange={onPortionChange} />
      </Grid>
    </Grid>
  );
}

export const QuantityCell = React.memo(({ submitEdit, value }) => {
  console.log("LOAD QUANTITY CELL", value)
  //console.log("before", currentQuantity);
  const [ currentQuantity, setCurrentQuantity ] = useState({ grams: value.quantity, units: new Fraction(value.quantity / value.servingSize) });
  const [ editMode, setEditMode ] = useState(false)
  const [ quantityInGrams, setQuantityInGrams ] = useState(currentQuantity.grams === null || currentQuantity.grams === 0 ? value.servingSize : currentQuantity.grams)
  const [ quantityUnits, setQuantityUnits ] = useState(currentQuantity.units.numerator === 0 ? new Fraction(1) : currentQuantity.units);
  console.log("after", currentQuantity, quantityInGrams);

  useEffect(() => {
    console.log("QUANTITY CELL USE EFFECT")
    if (value !== currentQuantity.grams) {
      let grams = value.quantity;
      let units = new Fraction(value.quantity / value.servingSize);
      setCurrentQuantity({ grams, units });
      setQuantityInGrams(grams === null || grams === 0 ? value.servingSize : grams);
      setQuantityUnits(units.numerator === 0 ? new Fraction(1) : units);
    }
  }, [ value ]);

  const onPortionChange = (servingUnits, servingInGrams) => {
    setQuantityUnits(servingUnits)
    setQuantityInGrams(servingInGrams)
  }
  const handleSubmit = (event) => {
    setEditMode(false);
    setCurrentQuantity({ units: quantityUnits, grams: quantityInGrams })
    submitEdit(quantityInGrams)
  }
  const handleCancel = event => {
    setEditMode(false)
  }

  return (
    <Grid container alignItems="center" justify="flex-start" spacing={2}>
      {editMode ?
        <Grid item>
          <Grid container direction="column" alignItems="center" justify="center" spacing={0}>
            <Grid item xs>
              <FoodPortionControl
                countable={value.countable}
                basePortion={value.servingSize}
                portionUnits={quantityUnits}
                portionInGrams={quantityInGrams}
                onPortionChange={onPortionChange} />
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={handleSubmit}>
                <CheckRoundedIcon />
              </IconButton>
              <IconButton size="small" onClick={handleCancel}>
                <CloseRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        :
        <>
          <Grid item>
            {currentQuantity.grams === null ?
              <Tooltip title="Not specified"><div>-</div></Tooltip> :
              <Typography >{
                `${currentQuantity.units} ${value.countable ? '' : 'cup'} (${currentQuantity.grams} g)`}
              </Typography>}
          </Grid>
          <Grid item>
            <IconButton onClick={() => { setEditMode(true); }} size='small'>
              <Tooltip title="Edit"><EditRoundedIcon color="primary" fontSize="small" /></Tooltip>
            </IconButton>
          </Grid>
        </>
      }
    </Grid>
  );
})

const FoodPortionControl = ({ countable, basePortion, portionUnits, portionInGrams, onPortionChange }) => {


  const changeServing = (plus) => {
    if (plus) {
      if (portionUnits.numerator <= portionUnits.denominator) {
        let newUnits = portionUnits.multiply(new Fraction(2, 1));
        if (portionUnits.numerator < portionUnits.denominator && newUnits.numerator > newUnits.denominator) {
          newUnits = new Fraction(1)
        }
        onPortionChange(newUnits, portionInGrams * 2)
      }
      else
        onPortionChange(portionUnits.add(new Fraction(1, 1)), portionInGrams + basePortion)
    }
    else {
      if (portionUnits.numerator <= portionUnits.denominator)
        onPortionChange(portionUnits.divide(new Fraction(2, 1)), portionInGrams / 2)
      else
        onPortionChange(portionUnits.subtract(new Fraction(1, 1)), portionInGrams - basePortion)
    }
  }
  return (
    <Grid container alignItems="center" justify="flex-start" spacing={1}>
      <Grid item>
        <IconButton size="small" color="primary" onClick={() => changeServing(false)}>
          <RemoveRoundedIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography >{
          `${portionUnits} ${countable ? '' : 'cup'} (${portionInGrams} g)`}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton size="small" color="primary" onClick={() => changeServing(true)}>
          <AddRoundedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

FoodPortionControl.propTypes = {
  countable: PropTypes.bool,
  basePortion: PropTypes.number,
  portionUnits: PropTypes.instanceOf(Fraction),
  portionInGrams: PropTypes.number,
  onPortionChange: PropTypes.func
}
