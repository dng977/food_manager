import { Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, ThemeProvider, TextField, Divider, IconButton, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, } from '@material-ui/core';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { EmptyTable, FoodLookUp } from "../shared_components";
import _ from 'lodash';
import { dialogTheme, FoodPortionControl, QuantityCell } from './components';
import MUIDataTable from 'mui-datatables';
import { MealsListType } from '../selectors';
import { EatFoodDto, FoodItemDto, MealDto, MealItemDto } from '../../../../apis/dtos/serverDtos';
import { RootState } from '../../../../redux_store/rootReducer';
import {History} from 'history'



type AddEditMealDialogPropTypes = {
  onCancel: () => any;
  onConfirm: (mealDto: MealDto) => void;
  openDialog: boolean;
  error: string;
  mealDto?: MealDto;
  title: string;
}
export const AddEditMealDialog = ({ onCancel, onConfirm, error, openDialog, mealDto, title }: AddEditMealDialogPropTypes) => {
  const isEdit = mealDto != null;
  const loading = useSelector((state: RootState) => state.feedback.dialogLoading);
  const [ name, setName ] = useState(isEdit ? mealDto.name : '');
  const [ description, setDescription ] = useState(isEdit ? mealDto.description : '');
  const [ servings, setServings ] = useState(isEdit ? mealDto.servings : null);
  const [ ingredientList, setIngredientList ] = useState<MealItemDto[]>(isEdit ? mealDto.ingredients.concat([null]) : [ null ]);

  const onPortionChange = (indexToChange: number, servingInGrams: number) => {
    setIngredientList(ingredientList.map((ingredient, ind) => {
      if (ind === indexToChange)
        ingredient.quantity = servingInGrams;
      return ingredient;
    }));
  }
  const onConditionChange = (indexToChange: number, newCondition: string) => {
    setIngredientList(ingredientList.map((ingredient, ind) => {
      if (ind === indexToChange)
        ingredient.cooked = newCondition === "raw" ? false : true;
      return ingredient;
    }));
  }

  const updateIngredientList = (newFoodItem: FoodItemDto, selFoodIndex: number) => {
    let lastIndex = ingredientList.length - 1;
    const reducer = (acc: MealItemDto[], cur: MealItemDto, idx: number) => {

      //Add the previous element if index is different from selFood
      if (idx !== selFoodIndex) {
        return acc.concat([ cur ]);
      }
      //If there is a new ingredient
      if (newFoodItem && idx === lastIndex) {
        return acc.concat([  { foodItemDto: newFoodItem, quantity: newFoodItem.servingSize, cooked: false } , null ]);
      }
      if (newFoodItem && idx !== lastIndex) {

        return acc.concat([ { foodItemDto: newFoodItem, quantity: newFoodItem.servingSize, cooked: false }  ]);
      }
      if (!newFoodItem) {
        
        return acc;
      }
    }
    let newList = ingredientList.reduce(reducer, []);
    setIngredientList(newList);

  }
  const onClose = () => {
    if(!isEdit){
      setIngredientList([ null ]);
      setServings(null);
    }

    onCancel();
  }


  const createMealDto = (): MealDto => {
    let totalQuantity = 0;
    let ingredients = ingredientList.filter(ing => ing !== null).map(ingredient => {
      totalQuantity += ingredient.quantity;
      return ingredient;
    });
    return {
      id: isEdit ? mealDto.id : null,
      name: name,
      description: description,
      ingredients: ingredients,
      quantity: totalQuantity,
      quantityLeft: totalQuantity,
      servings: servings
    };
  }

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

            <DialogTitle>{mealDto ? "Editing..." : "Adding..."}</DialogTitle> :
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
                  <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                  <form onSubmit={() => { onConfirm(createMealDto()); if(!isEdit) setIngredientList([ null ]); }}>
                    <DialogContent dividers>
                      <Grid container direction="column" alignItems="stretch" justify="flex-start" spacing={3}>
                        <Grid item>
                          <TextField
                            value={name}
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
                        <Grid item>
                          <Grid container direction="column" alignItems="flex-start" justify="flex-start" spacing={1}>
                            {ingredientList.map((ingredient, index) => {
                              // console.log("ingredientTuple: ", ingredient);
                              return (
                                <Grid item container alignItems="center" justify="flex-start" spacing={3} key={index} >
                                  <Grid item>
                                    <FoodLookUp
                                      label={index === (ingredientList.length - 1) ? "Add ingredient" : "#" + (index + 1)}
                                      initSelectedValue={ingredient ? ingredient.foodItemDto: null}
                                      width={200}
                                      rowIndex={index}
                                      hasConfirmButton={false}
                                      onChange={selectedFood => updateIngredientList(selectedFood, index)}
                                      required={ingredientList.length <= 1}
                                    />
                                  </Grid>
                                  {ingredient === null ? null :
                                    <>
                                      <Grid item>
                                        <FoodPortionControl
                                          maxQuantity={null}
                                          servingDesc={ingredient.foodItemDto.servingDesc}
                                          baseServing={ingredient.foodItemDto.servingSize}
                                          onPortionChange={servingInGrams => onPortionChange(index, servingInGrams)}
                                          quantity={ingredient.quantity}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <RadioGroup aria-label="gender" name="condition" value={ingredient.cooked ? "cooked" : "raw"} onChange={event => { onConditionChange(index, event.target.value) }}>
                                          <FormControlLabel value="raw" disabled={!ingredient.foodItemDto.hasRaw} control={<Radio size="small" color="primary" />} label="Raw" />
                                          <FormControlLabel value="cooked" disabled={!ingredient.foodItemDto.hasCooked} control={<Radio size="small" color="primary" />} label="Cooked" />
                                        </RadioGroup>
                                      </Grid>
                                    </>
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
                              value={servings ? servings : ''}
                              required
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
                            value={description}
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
                      <Button fullWidth type="submit" variant="contained"  color="primary">
                        {mealDto ? "Edit" : "Add"}
                  </Button>
                    </DialogActions>
                  </form>

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
  history: History;
  locationPath: String;
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
    responsive: "simple",
    // tableBodyHeight: "600px",
    tableBodyMaxHeight: "800px",

    customToolbar: null,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    filter: false,
    sort: true,
    sortOrder: { name: "Quantity", direction: "desc" },
    selectableRows: "none",
    selectableRowsHeader: false,
    selectToolbarPlacement: 'none',
    // rowsSelected: [],
    // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
    //   console.log(rowsSelected)
    //   this.props.setRowsSelected(rowsSelected)
    //   //setRowsSelected(rowsSelected)

    // },
    expandableRowsOnClick: true
  };

  columns = [

    {
      name: 'Meal Name',
      options: {
        sort: false
      }
    },
    {
      name: '',
      options: {
        sort: false,
        customBodyRender: (value: MealDto) => {
          return <EatMealCell
            value={value}
            onPrepare={() => this.props.editMeal({ id: value.id, quantityLeft: value.quantity })}
            onEat={(eatMealDto) => this.props.eatMeal(eatMealDto)}

          />;
        }
      }
    },
    {
      name: 'Quantity',
      options: {
        sort: true,
        customBodyRender: (value: MealDto, { }) => {
          return (
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <QuantityCell
                  hasEditMode={false}
                  foodItem={{ quantity: value.quantityLeft, servingSize: value.quantity / value.servings }}
                  emptyContents={() => this.props.editMeal({ id: value.id, quantityLeft: 0 })}
                  mealQuantity={value.quantity}
                />
              </Grid>

            </Grid>);
        },
        sortCompare: (order) => {
          return (obj1: { data: MealDto }, obj2: { data: MealDto }) => {
            let val1 = obj1.data.quantityLeft;
            let val2 = obj2.data.quantityLeft;
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
      name: 'Details',
      options: {
        sort: false,
        customBodyRender: (value) => {
          // console.log("Info - value: ", value);
          return <IconButton color="primary" onClick={() => {
            this.props.history.push(`${this.props.locationPath}/meal/${value.id}`);
          }} >
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
  onPrepare?: () => any;
}
export const EatMealCell = ({ value, onEat, onPrepare }: EatMealCellProps) => {
  const baseServing = value.quantity / value.servings;
  const quantityStmt = baseServing <= value.quantityLeft ? baseServing : value.quantityLeft;
  const [ quantity, setQuantity ] = React.useState(quantityStmt)
  const onPortionChange = (servingInGrams) => {
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
    <Grid container wrap="nowrap" alignItems="center" justify="center" spacing={2}>
      {        value.quantityLeft !== 0 ?
        <>
          <Grid item>
            <FoodPortionControl servingDesc={null} baseServing={quantityStmt < value.quantityLeft ? quantityStmt : value.quantityLeft} quantity={quantity} onPortionChange={onPortionChange} maxQuantity={value.quantityLeft} />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOnEatClick}>
              Eat
          	</Button>
          </Grid>
        </>
        :
        <>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => onPrepare()}>
              Prepare
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body2" noWrap>
              {`${value.servings} servings (${value.quantity} g)`}
            </Typography>
          </Grid>


        </>
      }
    </Grid>

  );


}

