import { Grid, IconButton, MenuItem, Select, TextField, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import PropTypes from 'prop-types';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { itemStatus } from './constants';
import { fetchFoodItems } from '../../../../store/actions/foodActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
export const FoodTypeCell = (props) => {
  return <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
    {
      props.cellState === itemStatus.UNRECOGNIZED ?
        <LookUpField {...props} />
        : props.cellState === itemStatus.UNSURE ?
          <SelectField {...props} />
          :
          <RecognField {...props} />
    }
  </Grid>
}

FoodTypeCell.propTypes = {
  cellState: PropTypes.oneOf(Object.keys(itemStatus)),
  onCofirm: PropTypes.func,
  foodList: PropTypes.any
}

const RecognField = (props) => {
  const [ editMode, setEditMode ] = useState(false)

  const closeEditMode = () => {
    setEditMode(false);
  }

  return (
    editMode ?
      <LookUpField {...props} editMode={editMode} closeEditMode={closeEditMode} />
      :
      <>
        <Grid item>
          <div>{props.foodList[ 0 ].name}</div>
        </Grid>
        {props.cellState === itemStatus.RECOGNIZED ?
          <Grid item>
            <IconButton onClick={() => { setEditMode(true); }} size='small'>
              <Tooltip title="Edit"><EditRoundedIcon color="primary" fontSize="small" /></Tooltip>
            </IconButton>
          </Grid>
          : null
        }
      </>
  )
}
const SelectField = (props) => {
  console.log(props.foodList)
  const [ selectedFood, setSelectedFood ] = React.useState(props.foodList[ 0 ]);
  const handleChange = (event) => {
    console.log("event: ", event)
    setSelectedFood(event.target.value)
  }
  return (
    <>
      <Grid item>
        <Select
          value={selectedFood}
          onChange={handleChange}
        >
          {props.foodList.map((food, index) => (
            <MenuItem key={index} value={food}>
              {food.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      {
        props.cellState === 'search' && !props.foodList.length ? null :
          <Grid item>
            <IconButton onClick={() => props.onConfirm(selectedFood)} size='small'>
              <Tooltip title="Confirm"><CheckRoundedIcon color="primary" fontSize="small" /></Tooltip>
            </IconButton>
          </Grid>
      }
    </>
  );

}

const mapStateToProps = (state) => {
  return {
    foodItems: state.foodItems.searchedItems,
    loading: state.foodItems.loading
  };
};

const LookUpField = connect(mapStateToProps, { fetchFoodItems })((props) => {
  // console.log("lookupfield", props)
  const [ selectedValue, setSelectedValue ] = useState('');
  const [ input, setInput ] = useState('');
  const [ debouncedInput, setDebouncedInput ] = useState(input);
  const foodItems = [props.rowIndex] in props.foodItems ? props.foodItems[props.rowIndex] : []

  useEffect(() => {
    // console.log("input change")
    const timerId = setTimeout(() => {
      setDebouncedInput(input)
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };

  }, [ input ])

  useEffect(() => {
    if (debouncedInput.length && (!foodItems.length || !foodItems.some(item => item.name === debouncedInput))) {
      props.fetchFoodItems(debouncedInput, props.rowIndex);
    }
  }, [ debouncedInput ])

  return (
    <>
      <Grid item>
        <Autocomplete
          loading={props.loading}
          style={{ width: 180 }}
          onChange={(event, newValue) => {
            setSelectedValue(newValue);
          }}
          onInputChange={(event, newValue) => {
            setInput(newValue);
          }}
          options={foodItems}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              size="small"

            />
          )}
        >
        </Autocomplete>
      </Grid>
      {props.editMode ?
        <Grid item>
          <IconButton onClick={() => props.closeEditMode()} size='small'>
            <Tooltip title="Cancel"><CloseRoundedIcon color="primary" fontSize="small" /></Tooltip>
          </IconButton>
        </Grid>
        :
        null
      }
      {selectedValue ?
        <Grid item>
          <IconButton
            onClick={
              () => {
                if(props.editMode)
                  props.closeEditMode();
                props.onConfirm(selectedValue);
              }
            } 
            size='small'>
            <Tooltip title="Confirm"><CheckRoundedIcon color="primary" fontSize="small" /></Tooltip>
          </IconButton>
        </Grid>
        :
        null
      }

    </>
  );
})
