import { IconButton, Tooltip, Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, createMuiTheme, ThemeProvider, RadioGroup, FormControlLabel, Radio, } from '@material-ui/core';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

import { useSelector } from 'react-redux';
import { Fraction } from 'fractional';
import PropTypes from 'prop-types';
import { EmptyTable, FoodLookUp } from "../shared_components";
import MUIDataTable from 'mui-datatables';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import _ from 'lodash';
import { FoodStockListType } from '../selectors';
import { EatFoodDto, FoodItemDto, FoodStockDto, MealDto } from '../../../../apis/dtos/serverDtos';
import { RootState } from '../../../../redux_store/rootReducer';
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
  const loading = useSelector((state: RootState) => state.feedback.dialogLoading);
  const [ selectedFood, setSelectedFood ] = useState<FoodItemDto | null>(null);
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
                        onChange={(selectedFood: React.SetStateAction<FoodItemDto>) => setSelectedFood(selectedFood)}
                      />
                      {selectedFood ?
                        <Grid item>
                          <FoodPortionControl
                            servingDesc={selectedFood.servingDesc}
                            baseServing={selectedFood.servingSize}
                            onPortionChange={onPortionChange}
                            quantity={servingInGrams}
                            maxQuantity={null}
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
                    <Button fullWidth disabled={emptyInput} variant="contained" onClick={() => { onConfirm(selectedFood.id, servingInGrams); setSelectedFood(null); }} color="primary" autoFocus>
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
interface FoodTableProps {
  setRowsSelected: any;
  foodStockItems: FoodStockListType;
  indexToKey: number[];
  editFoodStockItem: (foodStockDto: FoodStockDto) => any;
  eatFoodStockItem: (eatFoodStockDto: EatFoodDto) => any;
  paperElevation: number;
  loading: boolean;
}
export class FoodTable extends React.Component<FoodTableProps> {
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
    onRowSelectionChange: (_currentRowsSelected, _allRowsSelected, rowsSelected) => {
      console.log(rowsSelected)
      this.props.setRowsSelected(rowsSelected)
      //setRowsSelected(rowsSelected)

    },
    expandableRowsOnClick: true,
    onRowClick: (_rowData, { }) => {
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
        customBodyRender: (value: FoodStockDto, _tableMeta) => {
          return <EatCell value={value} onEat={(eatFoodStockDto: EatFoodDto) => this.props.eatFoodStockItem(eatFoodStockDto)} />;
        }
      }
    },
    {
      name: 'Quantity',
      options: {
        customBodyRender: (value: FoodStockDto) => {
          return <QuantityCell
            foodItem={{quantity: value.quantity, servingDesc: value.foodItemDto.servingDesc, servingSize: value.foodItemDto.servingSize}}
            submitEdit={(newQuantity) => {
              let newFoodStockDto: FoodStockDto = { ...value, quantity: newQuantity };
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
        customBodyRender: (_value) => {
          return <Typography variant="caption">-</Typography>;
        }
      }
    },
    {
      name: 'Info',
      options: {
        customBodyRender: (_value) => {
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

  type EatCellProps = {
    value: FoodStockDto;
    onEat: (arg0: EatFoodDto) => any;
  }
  export const EatCell = ({ value, onEat }: EatCellProps) => {
    const cQstatement = useMemo(() => value.quantity <= value.foodItemDto.servingSize ? value.quantity : value.foodItemDto.servingSize, [value]);
    const [ currentQuantity, setCurrentQuantity ] = React.useState(cQstatement)
    const [ condition, setCondition ] = React.useState(value.hasRaw ? "raw" : "cooked");
    //eval(servingUnits)
    const onPortionChange = (currentQuantity) => {
      setCurrentQuantity(currentQuantity)
    }

    useEffect(() => {
      setCurrentQuantity(cQstatement);
      setCondition(value.hasRaw ? "raw" : "cooked");
    }, [ value, cQstatement ])
    const handleOnEatClick = () => {
      let eatFoodStockDto: EatFoodDto = {
        foodId: value.foodItemDto.id,
        quantity: currentQuantity,
        cooked: condition === "cooked"
      }
      onEat(eatFoodStockDto);
    }

    return (
      value.quantity !== 0 ?
        <Grid container wrap="nowrap" alignItems="center" justify="flex-start" spacing={2}>
          <Grid item>
            <FoodPortionControl maxQuantity={value.quantity} servingDesc={value.foodItemDto.servingDesc} baseServing={value.foodItemDto.servingSize} quantity={currentQuantity} onPortionChange={onPortionChange} />
          </Grid>
          <Grid item>
            <RadioGroup aria-label="gender" name="condition" value={condition} onChange={event => { setCondition(event.target.value) }}>
              <FormControlLabel value="raw" disabled={!value.hasRaw} control={<Radio size="small" color="primary" />} label="Raw" />
              <FormControlLabel value="cooked" disabled={!value.hasCooked} control={<Radio size="small" color="primary" />} label="Cooked" />
            </RadioGroup>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOnEatClick}>
              Eat
          	</Button>
          </Grid>
        </Grid>
        :
        <Grid container wrap="nowrap" alignItems="center" justify="center" spacing={2}>
          <Grid item>
            <Tooltip title="No more quantiy left of this item.">
              <div>
                <Button variant="contained" disabled color="primary">
                  Eat
                </Button>
              </div>
            </Tooltip>
          </Grid>
        </Grid>
    );
  }

type QuantityCellPropTypes = {
  hasEditMode?: boolean;
  submitEdit?: (quantity: number) => any;
  foodItem: {quantity: number, servingSize?: number, servingDesc?: string };
  emptyContents?: () => (mealDto: MealDto) => any;
  mealQuantity?: number
}

// export const QuantityCell = React.memo(({ submitEdit, value, hasEditMode }) => {
export const QuantityCell = ({ submitEdit, foodItem, hasEditMode=true, emptyContents }: QuantityCellPropTypes) => {

  //console.log("before", currentQuantity);

  const [ currentQuantity, setCurrentQuantity ] = useState({ grams: foodItem.quantity, units: getServingInUnits(foodItem.quantity, foodItem.servingSize) });

  const [ editMode, setEditMode ] = useState(false)
  const [ quantityInGrams, setQuantityInGrams ] = useState(currentQuantity.grams === null || currentQuantity.grams === 0 ? foodItem.servingSize : currentQuantity.grams)

  useEffect(() => {
    if (foodItem.quantity !== currentQuantity.grams) {
      let grams = Math.ceil(foodItem.quantity);
      let units = getServingInUnits(foodItem.quantity, foodItem.servingSize);
      setCurrentQuantity({ grams, units });
      setQuantityInGrams(grams === null || grams === 0 ? foodItem.servingSize : grams);
    }
  }, [ foodItem ]);

  const onPortionChange = (servingInGrams) => {
    setQuantityInGrams(servingInGrams)

  }
  const handleSubmit = (_event) => {
    setEditMode(false);
    setCurrentQuantity({ units: getServingInUnits(quantityInGrams, foodItem.servingSize), grams: Math.ceil(quantityInGrams) })
    submitEdit(quantityInGrams)
  }
  const handleCancel = _event => {
    setEditMode(false)
  }

  return (
    editMode ?
      <Grid container direction="column" alignItems="center" justify="center" spacing={0}>
        < Grid item xs >
          <FoodPortionControl
            maxQuantity={null}
            servingDesc={foodItem.servingDesc}
            baseServing={foodItem.servingSize ? foodItem.servingSize : quantityInGrams}
            quantity={quantityInGrams}
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
                    <IconButton onClick={() => emptyContents()} color="primary">
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                :
                null
          }

        </Grid>
        {foodItem.servingDesc ?
          <Grid item>
            <Typography variant="caption">
              {`/${foodItem.servingDesc.toLowerCase()}/`}
            </Typography>
          </Grid>
          :
          null
        }
      </Grid>
  );
};


const getServingInUnits = (quantity: number, baseServing: number) => {
  if (baseServing === 0)
    return new Fraction(0, 1);
  let quotient = quantity/baseServing;
  if(quotient >= 1){
    return Math.round(quotient)
  }else{
    return new Fraction(Math.ceil(quantity), Math.ceil(baseServing));
  }
}

type FoodPortionControlType = {
  servingDesc: string;
  baseServing: number;
  quantity: number;
  onPortionChange: (serving: number) => any,
  maxQuantity: number;
}

export const FoodPortionControl = ({ servingDesc, baseServing, quantity, onPortionChange, maxQuantity }: FoodPortionControlType) => {
  console.log(quantity, maxQuantity);
  const [minusDisabled, setMinusDisabled] = useState(false);
  const plusDisabledStmt = maxQuantity && quantity === maxQuantity ? true : false;
  const [plusDisabled, setPlusDisabled] = useState(plusDisabledStmt);

  useEffect(()=>{
    setPlusDisabled(plusDisabledStmt)
  },[maxQuantity, quantity])

  const changeServing = (plus) => {
    if (plus) {
      //Enable minus 
      if(quantity < 1) {
        setMinusDisabled(false);
      }
      let newQuantity: number;
      //If quantity < 1 unit(base serving)
      if (quantity < baseServing) {
        newQuantity = quantity * 2;
      }
      else{
        newQuantity = quantity + baseServing;
      }

      //if there is maxQuantity and it is exceeded
      if(maxQuantity && newQuantity >= maxQuantity){
        onPortionChange(maxQuantity)
        setPlusDisabled(true);
      }else{
        //Change quantity to base serving to keep the proportions right
        if (quantity < baseServing && newQuantity > baseServing) {
          onPortionChange(baseServing)
        }
        else
          onPortionChange(newQuantity)
      }
    }
    else {
      if(quantity === maxQuantity){
        setPlusDisabled(false);
      }
      if (quantity <= baseServing){
        let newQuantity = quantity / 2;
        if(newQuantity < 1){
          setMinusDisabled(true);
        }
        onPortionChange(newQuantity)
      }
      else
        onPortionChange(quantity - baseServing)
    }
  }
  return (
    <Grid container direction="column" alignItems="center" justify="center" spacing={0}>
      <Grid item container wrap="nowrap" alignItems="center" justify="flex-start" spacing={1}>
        <Grid item>
          <IconButton size="small" disabled={minusDisabled} color="primary" onClick={() => changeServing(false)}>
            <RemoveRoundedIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography noWrap >{
            `${getServingInUnits(quantity, baseServing)} (${Math.ceil(quantity)} g)`}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton size="small" disabled={plusDisabled} color="primary" onClick={() => changeServing(true)}>
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


