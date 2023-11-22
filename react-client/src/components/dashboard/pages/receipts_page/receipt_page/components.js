import { Grid, IconButton, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PropTypes from 'prop-types';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { itemStatus } from './constants';
import {FoodLookUp} from "../../shared_components";
export const FoodTypeCell = (props) => {
  return <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
    {
      props.cellState === itemStatus.UNRECOGNIZED ?
        <FoodLookUp {...props} />
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
      <FoodLookUp {...props} editMode={editMode} closeEditMode={closeEditMode} />
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
  const [ selectedFood, setSelectedFood ] = React.useState(0);
  console.log("SELECTED FOOD: ", selectedFood);
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
            <MenuItem key={index} value={index}>
              {food.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      {
        props.cellState === 'search' && !props.foodList.length ? null :
          <Grid item>
            <IconButton onClick={() => props.onConfirm(props.foodList[selectedFood])} size='small'>
              <Tooltip title="Confirm"><CheckRoundedIcon color="primary" fontSize="small" /></Tooltip>
            </IconButton>
          </Grid>
      }
    </>
  );

}


