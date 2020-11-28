import { Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, ThemeProvider, TextField, Divider, Tooltip, IconButton, } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { EmptyTable, FoodLookUp } from "../shared_components";
import _ from 'lodash';
import { dialogTheme, EatCell, FoodPortionControl, QuantityCell } from './components';
import MUIDataTable from 'mui-datatables';

export const AddMealDialog = ({ onCancel, onConfirm, error, openDialog }) => {
  console.log("render add meal dialog: ", openDialog)
  const loading = useSelector(state => state.feedback.dialogLoading);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ ingredientList, setIngredientList ] = useState([ {} ]);

  const onPortionChange = (indexToChange, servingInGrams) => {
    console.log("On port change");

    setIngredientList(ingredientList.map((ingredient, ind) => {
      if (ind === indexToChange)
        ingredient.quantity = servingInGrams;
      return ingredient;
    }));
  }
  const updateIngredientList = (newIngredient, selFoodIndex) => {
    console.log("updIngList");
    let lastIndex = ingredientList.length - 1;
    const reducer = (acc, cur, idx) => {

      //Add the previous element if index is different from selFood
      if (idx !== selFoodIndex) {
        return acc.concat([ cur ]);
      }
      //If there is a new ingredient
      if (newIngredient && idx === lastIndex) {
        return acc.concat([ { ingredient: newIngredient, quantity: newIngredient.servingSize }, {} ]);
      }
      if (newIngredient && idx !== lastIndex) {
        return acc.concat([ { ingredient: newIngredient, quantity: newIngredient.servingSize } ]);
      }
      if (!newIngredient) {
        return acc;
      }
    }
    let newList = ingredientList.reduce(reducer, []);
    console.log(newList);
    setIngredientList(newList);

  }
  const onClose = () => {
    setIngredientList([ {} ]);
    console.log("on clse:", ingredientList)
    onCancel();
  }

  const createMealDto = () => {
    let totalQuantity = 0;
    let ingredients = ingredientList.filter(ing => !_.isEmpty(ing)).map(ingredientTuple => {
      totalQuantity += ingredientTuple.quantity;
      return {
        foodItemId: ingredientTuple.ingredient.id,
        quantity: ingredientTuple.quantity
      }
    });
    return {
      id: null,
      name: name,
      description: description,
      ingredients: ingredients,
      quantity: totalQuantity

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
                            console.log("ingredientTuple: ", ingredientTuple)
                            let emptyIngredient = _.isEmpty(ingredientTuple);
                            let ingredient = emptyIngredient ? null : ingredientTuple.ingredient;
                            console.log(emptyIngredient)
                            console.log(ingredient);
                            return (
                              <Grid item container alignItems="center" justify="flex-start" spacing={3} key={index} >
                                <Grid item>
                                  <FoodLookUp
                                    label={index === (ingredientList.length - 1) ? "Add ingredient" : "#" + (index + 1)}
                                    initSelectedValue={ingredient}
                                    width={250}
                                    rowIndex={0}
                                    hasConfirmButton={false}
                                    onChange={selectedFood => updateIngredientList(selectedFood, index)}
                                    loading={loading}
                                  />
                                </Grid>
                                {emptyIngredient ? null :
                                  <Grid item>
                                    <FoodPortionControl
                                      servingDesc={ingredient.servingDesc}
                                      baseServing={ingredient.servingSize}
                                      onPortionChange={servingInGrams => onPortionChange(index, servingInGrams)}
                                      servingInGrams={ingredientTuple.quantity}
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
                    <Button fullWidth disabled={!name.length} variant="contained" onClick={() => { onConfirm(createMealDto()); setIngredientList([ {} ]); }} color="primary">
                      Add
                  </Button>
                  </DialogActions>
                </> : <></>
        }
      </Dialog>
    </ThemeProvider>

  );
}

AddMealDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}

//TABLE

export class MealsTable extends React.Component {
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
        customBodyRender: (value) => {
          return <EatCell value={value} onPrepare={() => console.log("PREPARE")} onEat={(eatMealDto) => this.props.eatMeal(eatMealDto)} />;
        }
      }
    },
    {
      name: 'Quantity',
      options: {
        customBodyRender: (value, { rowIndex }) => {
          return (
            <Grid container alignItems="center" justify="center">
            <Grid item>
              <QuantityCell
                hasEditMode={false}
                value={value} />
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
      name: '',
      options: {
        customBodyRender: ({ rowIndex }) => {
          return <IconButton color="primary" onClick={() => {this.props.editMeal(rowIndex)}} >
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

MealsTable.propTypes = {
  setRowsSelected: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  indexToKey: PropTypes.array.isRequired,
  editMeal: PropTypes.func,
  eatMeal: PropTypes.func,
  paperElevation: PropTypes.number,

}