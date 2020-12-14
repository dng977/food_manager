import { IconButton, Tooltip, Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, createMuiTheme, ThemeProvider, RadioGroup, FormControlLabel, Radio, Box, DialogContentText, TextField, Paper, Divider, } from '@material-ui/core';

import React, { useEffect, useMemo, useState } from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

import { connect, useSelector } from 'react-redux';
import { editFoodStockItem } from '../../../../redux_store/food_store/foodActions';
import { Fraction } from 'fractional';
import PropTypes from 'prop-types';
import { EmptyTable, FoodLookUp } from "../shared_components";
import MUIDataTable from 'mui-datatables';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import _ from 'lodash';
export const dialogTheme = createMuiTheme({
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
  const [ servingInGrams, setServingInGrams ] = React.useState(0)
  const [ emptyInput, setEmptyInput ] = useState(true);

  useEffect(() => {
    if (selectedFood) {
      setServingInGrams(selectedFood.servingSize);
      setEmptyInput(false);

    } else {
      setEmptyInput(true)
    }

  }, [ selectedFood ])
  const onPortionChange = (servingInGrams) => {
    setServingInGrams(servingInGrams)
  }

  return (
    <ThemeProvider theme={dialogTheme}>
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
                            servingDesc={selectedFood.servingDesc}
                            baseServing={selectedFood.servingSize}
                            onPortionChange={onPortionChange}
                            servingInGrams={servingInGrams}
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
    rowHover: true,
    elevation: this.props.paperElevation,
    rowsPerPage: 5,
    rowsPerPageOptions: [],
    filterType: "dropdown",
    responsive: "standard",
    // tableBodyHeight: "600px",
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
    sort: false,
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
      name: '',
      options: {
        customBodyRender: (value, tableMeta) => {
          return <EatCell value={value} onEat={(eatFoodStockDto) => this.props.eatFoodStockItem(eatFoodStockDto)} />;
        }
      }
    },
    {
      name: 'Quantity',
      options: {
        customBodyRender: (value, { rowIndex, rowData }) => {
          return <QuantityCell
            value={value}
            submitEdit={(newQuantity) => {
              console.log(value, rowData);
              let newFoodStockDto = {...rowData, quantity: newQuantity};//rowData or Value
              this.props.editFoodStockItem(newFoodStockDto);
            }} />;
        },
        sortCompare: (order) => {
          return (obj1, obj2) => {
            console.log(order);
            let val1 = obj1.data.quantity;
            let val2 = obj2.data.quantity;
            return (val1 - val2) * (order === 'asc' ? 1 : -1);
          }
        }
      }
    },
    {
      name: 'Expiry Date',
      options: {
        customBodyRender: (value) => {
          return <Typography variant="caption">-</Typography>;
        }
      }
    },
    {
      name: 'Info',
      options: {
        customBodyRender: (value) => {
          return <InfoRoundedIcon color="action" />;
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
  foodStockItems: PropTypes.array.isRequired,
  indexToKey: PropTypes.array.isRequired,
  editFoodStockItem: PropTypes.func,
  eatFoodStockItem: PropTypes.func,
  paperElevation: PropTypes.number,

}


export const EatCell = ({ value, onEat, onPrepare }) => {
  const [ servingUnits, setServingUnits ] = React.useState(new Fraction(1, 1));
  const [ servingInGrams, setServingInGrams ] = React.useState(value.servingSize)
  const [ condition, setCondition ] = React.useState(value.hasRaw ? "raw" : "cooked");
  //eval(servingUnits)
  const onPortionChange = (servingInGrams) => {
    setServingInGrams(servingInGrams)
    setServingUnits(getServingInUnits(servingInGrams, value.servingSize));
  }

  useEffect(() => {
    setServingUnits(new Fraction(1, 1));
    setServingInGrams(value.servingSize);
    setCondition(value.hasRaw ? "raw" : "cooked");
  }, [ value ])
  const handleOnEatClick = () => {
    let eatFoodStockDto = {
      foodItemId: value.foodItemId,
      quantity: servingInGrams,
      cooked: condition === "cooked"
    }
    onEat(eatFoodStockDto);
  }

  return (
    value.quantity !== 0 ?
      <Grid container wrap="nowrap" alignItems="center" justify="flex-start" spacing={2}>
        <Grid item>
          <FoodPortionControl servingDesc={value.servingDesc} baseServing={value.servingSize} portionUnits={servingUnits} servingInGrams={servingInGrams} onPortionChange={onPortionChange} />
        </Grid>
        {onPrepare ? null : <Grid item>
          <RadioGroup aria-label="gender" name="condition" value={condition} onChange={event => { setCondition(event.target.value) }}>
            <FormControlLabel value="raw" disabled={!value.hasRaw} control={<Radio size="small" color="primary" />} label="Raw" />
            <FormControlLabel value="cooked" disabled={!value.hasCooked} control={<Radio size="small" color="primary" />} label="Cooked" />
          </RadioGroup>
        </Grid>}
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleOnEatClick}>
            Eat
         </Button>
        </Grid>
      </Grid>
      :
      <Grid container wrap="nowrap" alignItems="center" justify="center" spacing={2}>

        <Grid item>
          {onPrepare ?

            <Button variant="contained" color="secondary" onClick={onPrepare}>
              Prepare
            </Button>
            :
            <Tooltip title="No more quantiy left of this item.">
              <div>
                <Button variant="contained" disabled color="primary">
                  Eat
            </Button>
              </div>
            </Tooltip>
          }
        </Grid>
      </Grid>
  );
}
EatCell.propTypes = {
  value: PropTypes.object,
  onEat: PropTypes.func,
  onPrepare: PropTypes.func

}


export const QuantityCell = React.memo(({ submitEdit, value, hasEditMode }) => {
  //console.log("before", currentQuantity);
  const [ currentQuantity, setCurrentQuantity ] = useState({ grams: value.quantity, units: new Fraction(value.quantity, value.servingSize) });

  const [ editMode, setEditMode ] = useState(false)
  const [ quantityInGrams, setQuantityInGrams ] = useState(currentQuantity.grams === null || currentQuantity.grams === 0 ? value.servingSize : currentQuantity.grams)

  useEffect(() => {
    if (value.quantity !== currentQuantity.grams) {
      let grams = value.quantity;
      let units = new Fraction(value.quantity, value.servingSize);
      setCurrentQuantity({ grams, units });
      setQuantityInGrams(grams === null || grams === 0 ? value.servingSize : grams);
    }
  }, [ value ]);

  const onPortionChange = (servingInGrams) => {
    setQuantityInGrams(servingInGrams)

  }
  const handleSubmit = (event) => {
    setEditMode(false);
    setCurrentQuantity({ units: getServingInUnits(quantityInGrams, value.servingSize), grams: quantityInGrams })
    submitEdit(quantityInGrams)
  }
  const handleCancel = event => {
    setEditMode(false)
  }

  return (
    editMode ?
      <Grid container direction="column" alignItems="center" justify="center" spacing={0}>
        < Grid item xs >
          <FoodPortionControl
            servingDesc={value.servingDesc}
            baseServing={value.servingSize ? value.servingSize : quantityInGrams}
            servingInGrams={quantityInGrams}
            onPortionChange={onPortionChange} />
        </Grid >
        <Grid item>
          <IconButton size="small" onClick={handleSubmit}>
            <CheckRoundedIcon />
          </IconButton>
          <IconButton size="small" onClick={handleCancel}>
            <CloseRoundedIcon />
          </IconButton>
        </Grid>
      </Grid >
      :
      <Grid container direction="column" alignItems="center" justify="center" spacing={0}>
        <Grid item container wrap="nowrap" alignItems="center" justify="center" spacing={1}>
          <Grid item>
            {currentQuantity.grams === null ?
              <Tooltip title="Not specified"><div>-</div></Tooltip> :
              <Typography noWrap>{
                `${currentQuantity.units} (${currentQuantity.grams} g)`}
              </Typography>}
          </Grid>
          {
            hasEditMode ?
              <Grid item>
                <IconButton onClick={() => { setEditMode(true); }} size='small'>
                  <Tooltip title="Edit"><EditRoundedIcon color="primary" fontSize="small" /></Tooltip>
                </IconButton>
              </Grid>
              :
              currentQuantity.grams !== 0 ?

                <Grid item>
                  <Tooltip title="Empty">
                  <IconButton color="primary">
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
                  </Tooltip>
                </Grid>
                :
                null
          }

        </Grid>
        {value.servingDesc ?
          <Grid item>
            <Typography variant="caption">
              {`/${value.servingDesc.toLowerCase()}/`}
            </Typography>
          </Grid>
          :
          null
        }
      </Grid>
  );
});
QuantityCell.propTypes = {
  hasEditMode: PropTypes.bool
}
QuantityCell.defaultProps = {
  hasEditMode: true
}

const getServingInUnits = (servingInGrams, baseServing) => {
  if (baseServing === 0)
    return new Fraction(0, 1);
  return new Fraction(servingInGrams, baseServing);
}

export const FoodPortionControl = ({ servingDesc, baseServing, servingInGrams, onPortionChange }) => {
  // console.log("SERVING DESC", servingDesc)
  const changeServing = (plus) => {
    if (plus) {
      if (servingInGrams < baseServing) {
        let newservingInGrams = servingInGrams * 2;
        if (servingInGrams < baseServing && newservingInGrams > baseServing) {
          onPortionChange(baseServing)
        }
        else {
          onPortionChange(newservingInGrams)
        }
      }
      else
        onPortionChange(servingInGrams + baseServing)
    }
    else {
      if (servingInGrams <= baseServing)
        onPortionChange(servingInGrams / 2)
      else
        onPortionChange(servingInGrams - baseServing)
    }
  }
  return (
    <Grid container direction="column" alignItems="center" justify="center" spacing={0}>
      <Grid item container wrap="nowrap" alignItems="center" justify="flex-start" spacing={1}>
        <Grid item>
          <IconButton size="small" color="primary" onClick={() => changeServing(false)}>
            <RemoveRoundedIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography noWrap >{
            `${getServingInUnits(servingInGrams, baseServing)} (${servingInGrams} g)`}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton size="small" color="primary" onClick={() => changeServing(true)}>
            <AddRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>
      {
        servingDesc ?
          <Grid item>
            <Typography variant="caption">
              {`/${servingDesc.toLowerCase()}/`}
            </Typography>
          </Grid>
          :
          null
      }

    </Grid>
  );
}

FoodPortionControl.propTypes = {
  servingDesc: PropTypes.string,
  baseServing: PropTypes.number,
  portionUnits: PropTypes.instanceOf(Fraction),
  servingInGrams: PropTypes.number,
  onPortionChange: PropTypes.func,
}
