import { Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, ThemeProvider, TextField, Divider, Tooltip, IconButton, Select, Input, MenuItem, FormControl, InputLabel, } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { EmptyTable, FoodLookUp } from "../shared_components";
import _ from 'lodash';
import { dialogTheme, EatCell, FoodPortionControl, QuantityCell } from './components';
import MUIDataTable from 'mui-datatables';
import { MealsListType } from '../selectors';
import { EatFoodDto, FoodItemDto, MealDto, MealItemDto } from '../../../../apis/dtos/serverDtos';
import { RootState } from '../../../../redux_store/rootReducer';



type AddMealDialogPropTypes = {
  onCancel: () => any;
  onConfirm: (mealDto: MealDto) => void;
  openDialog: boolean;
  error: string;
}
export const AddMealDialog = ({ onCancel, onConfirm, error, openDialog }: AddMealDialogPropTypes) => {
  console.log("render add meal dialog: ", openDialog)
  const loading = useSelector((state: RootState) => state.feedback.dialogLoading);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ servings, setServings ] = useState(null);
  const [ ingredientList, setIngredientList ] = useState<Array<{ mealItemDto: MealItemDto, foodItemDto: FoodItemDto }>>([ null ]);

  const onPortionChange = (indexToChange, servingInGrams) => {
    console.log("On port change");

    setIngredientList(ingredientList.map((ingredient, ind) => {
      if (ind === indexToChange)
        ingredient.mealItemDto.quantity = servingInGrams;
      return ingredient;
    }));
  }

  const updateIngredientList = (newFoodItem: FoodItemDto, selFoodIndex: number) => {
    console.log("updIngList");
    let lastIndex = ingredientList.length - 1;
    const reducer = (acc: Array<{ mealItemDto: MealItemDto, foodItemDto: FoodItemDto }>, cur: { mealItemDto: MealItemDto; foodItemDto: FoodItemDto; }, idx: number) => {

      //Add the previous element if index is different from selFood
      if (idx !== selFoodIndex) {
        return acc.concat([ cur ]);
      }
      //If there is a new ingredient
      if (newFoodItem && idx === lastIndex) {
        return acc.concat([ { mealItemDto: { foodItemId: newFoodItem.id, quantity: newFoodItem.servingSize, cooked: false }, foodItemDto: newFoodItem }, null ]);
      }
      if (newFoodItem && idx !== lastIndex) {
        return acc.concat([ { mealItemDto: { foodItemId: newFoodItem.id, quantity: newFoodItem.servingSize, cooked: false }, foodItemDto: newFoodItem } ]);
      }
      if (!newFoodItem) {
        return acc;
      }
    }
    let newList = ingredientList.reduce(reducer, []);
    console.log(newList);
    setIngredientList(newList);

  }
  const onClose = () => {
    setIngredientList([ null ]);
    setServings(null);
    console.log("on clse:", ingredientList)
    onCancel();
  }

  const createMealDto = (): MealDto => {
    let totalQuantity = 0;
    let ingredients = ingredientList.filter(ing => ing !== null).map(ingredient => {
      totalQuantity += ingredient.mealItemDto.quantity;
      return ingredient.mealItemDto;
    });
    return {
      id: null,
      name: name,
      description: description,
      ingredients: ingredients,
      quantity: totalQuantity,
      servings: servings
    };
  }

  console.log("before render");
  return (
    <ThemeProvider theme={dialogTheme}>
      <Dialog
        open={openDialog}
        onClose={onClose}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >{
          loading ?

            <DialogTitle>Adding...</DialogTitle> :
            error ?
              <>
                <DialogTitle>{`${error}`}</DialogTitle>
                <DialogActions>
                  <Button variant="outlined" onClick={onClose} color="primary">
                    Close
                </Button>
                </DialogActions>
              </>
              : openDialog ?
                <>
                  <DialogTitle id="alert-dialog-title">Add a new Meal</DialogTitle>
                  <DialogContent dividers>
                    <Grid container direction="column" alignItems="stretch" justify="flex-start" spacing={3}>
                      {/* <Grid item>
                        <Typography>Name</Typography>
                      </Grid> */}
                      <Grid item>
                        <TextField
                          onChange={(event) => setName(event.target.value)}
                          label="Name"
                          autoFocus
                          id="name"
                          fullWidth
                          variant="outlined"
                          size="small"
                          required
                        />
                      </Grid>
                      <Divider light />

                      {/* <Grid item>
                          <Typography>Ingredients</Typography>
                        </Grid> */}
                      <Grid item>
                        <Grid container direction="column" alignItems="flex-start" justify="flex-start" spacing={1}>
                          {ingredientList.map((ingredientTuple, index) => {
                            console.log("ingredientTuple: ", ingredientTuple);
                            let mealItemDto = null;
                            let foodItemDto = null;
                            if (ingredientTuple !== null) {
                              mealItemDto = ingredientTuple.mealItemDto;
                              foodItemDto = ingredientTuple.foodItemDto;
                            }
                            return (
                              <Grid item container alignItems="center" justify="flex-start" spacing={3} key={index} >
                                <Grid item>
                                  <FoodLookUp
                                    label={index === (ingredientList.length - 1) ? "Add ingredient" : "#" + (index + 1)}
                                    initSelectedValue={foodItemDto}
                                    width={200}
                                    rowIndex={0}
                                    hasConfirmButton={false}
                                    onChange={selectedFood => updateIngredientList(selectedFood, index)}
                                  />
                                </Grid>
                                {ingredientTuple === null ? null :
                                  <Grid item>
                                    <FoodPortionControl
                                      maxQuantity={null}
                                      servingDesc={foodItemDto.servingDesc}
                                      baseServing={foodItemDto.servingSize}
                                      onPortionChange={servingInGrams => onPortionChange(index, servingInGrams)}
                                      quantity={mealItemDto.quantity}
                                    />
                                  </Grid>
                                }
                              </Grid>
                            );
                          })
                          }
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid item>
                        <FormControl size="small" variant="outlined" style={{ width: 120 }}>
                          <InputLabel id="servings-select-label">Servings</InputLabel>
                          <Select
                            MenuProps={
                              {
                                PaperProps: {
                                  style: {
                                    maxHeight: 200,
                                  }
                                }
                              }
                            }
                            labelId="servings-select-label"
                            id="servings-select"
                            label="Servings LABEL"
                            value={servings}
                            onChange={({ target }) => setServings(target.value as number)}
                          >
                            {
                              _.range(1, 20, 1).map(number => (
                                <MenuItem key={number} value={number} >
                                  {number}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>

                      </Grid>
                      <Divider />
                      <Grid item >
                        <TextField
                          onChange={(event) => setDescription(event.target.value)}
                          id="desc"
                          label="Description"
                          multiline
                          rows={5}
                          rowsMax={15}
                          variant="outlined"
                          fullWidth
                        >
                        </TextField>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button fullWidth variant="outlined" onClick={onClose} color="primary">
                      Cancel
                  </Button>
                    <Button fullWidth disabled={!name.length} variant="contained" onClick={() => { onConfirm(createMealDto()); setIngredientList([ null ]); }} color="primary">
                      Add
                  </Button>
                  </DialogActions>
                </> : <></>
        }
      </Dialog>
    </ThemeProvider>

  );
}


//TABLE

type MealTableProps = {
  setRowsSelected: any;
  meals: MealsListType;
  indexToKey: number[];
  editMeal: (mealDto: MealDto) => any;
  eatMeal: (eatMealDto: EatFoodDto) => any;
  paperElevation: number;
  loading: boolean;
}
export class MealsTable extends React.Component<MealTableProps> {
  constructor(props: MealTableProps) {
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

    customToolbar: null,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    filter: false,
    sort: false,
    selectableRows: "none",
    selectableRowsHeader: false,
    selectToolbarPlacement: 'none',
    // rowsSelected: [],
    // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
    //   console.log(rowsSelected)
    //   this.props.setRowsSelected(rowsSelected)
    //   //setRowsSelected(rowsSelected)

    // },
    expandableRowsOnClick: true,
    onRowClick: (rowData, { }) => {
      // history.push(`${url}/${dataIndex}`);
    },

  };

  columns = [

    {
      name: 'Meal Name',
    },
    {
      name: '',
      options: {
        customBodyRender: (value: MealDto) => {
          return <EatMealCell value={value} onPrepare={(id) => console.log("PREPARE " + id)} onEat={(eatMealDto) => this.props.eatMeal(eatMealDto)} />;
        }
      }
    },
    {
      name: 'Quantity',
      options: {
        customBodyRender: (value: MealDto, { _rowIndex }) => {
          return (
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <QuantityCell
                  hasEditMode={false}
                  foodItem={{ quantity: value.quantity }}
                />
              </Grid>

            </Grid>);
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
    // {
    //   name: 'Expiry Date',
    //   options: {
    //     customBodyRender: () => {
    //       return <Typography variant="caption">-</Typography>;
    //     }
    //   }
    // },
    {
      name: 'Info',
      options: {
        customBodyRender: ({ rowIndex }) => {
          return <IconButton color="primary" onClick={() => { this.props.editMeal(rowIndex) }} >
            <KeyboardArrowRightRoundedIcon />
          </IconButton>

        }
      }
    }
  ];

  render() {
    return (
      <MUIDataTable
        text="Loading"
        data={this.props.meals}
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

type EatMealCellProps = {
  value: MealDto;
  onEat: (arg0: EatFoodDto) => any;
  onPrepare?: (arg0: number) => any;
}
export const EatMealCell = ({ value, onEat, onPrepare }: EatMealCellProps) => {
  const quantityStmt = value.quantity / value.servings;
  const [ quantity, setQuantity ] = React.useState(quantityStmt)
  const onPortionChange = (servingInGrams) => {
    console.log("onport change-serving in grams: ", servingInGrams);
    setQuantity(servingInGrams)
  }

  useEffect(() => {
    setQuantity(quantityStmt);
  }, [ value ])
  const handleOnEatClick = () => {
    let eatMealDto: EatFoodDto = {
      foodId: value.id,
      quantity: quantity,
      cooked: null
    }
    onEat(eatMealDto);
  }

  return (
    value.quantity !== 0 ?
      <Grid container wrap="nowrap" alignItems="center" justify="flex-start" spacing={2}>
        <Grid item>
          <FoodPortionControl servingDesc={null} baseServing={value.quantity / value.servings} quantity={quantity} onPortionChange={onPortionChange} maxQuantity={value.quantity} />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleOnEatClick}>
            Eat
          	</Button>
        </Grid>
      </Grid>
      :
      <Button variant="contained" color="secondary" onClick={() => onPrepare(value.id)}>
        Prepare
    </Button>
  );


}

