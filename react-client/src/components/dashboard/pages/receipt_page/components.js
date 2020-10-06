import { Box, Grid, IconButton, MenuItem, Select, Tooltip } from '@material-ui/core';
import React from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import PropTypes from 'prop-types';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {itemStatus} from './constants';
export const FoodTypeCell = (props) => {
  console.log("PROPS: ", props)
  return <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
    {
      props.cellState === itemStatus.UNRECOGNIZED ?
        LookUpField(props)
        : props.cellState === itemStatus.UNSURE ?
          SelectField(props)
          :
          TextField(props)
    }
  </Grid>
}

FoodTypeCell.propTypes = {
  cellState: PropTypes.oneOf(Object.keys(itemStatus)),
  onCofirm: PropTypes.func,
  foodList: PropTypes.any
}
FoodTypeCell.defaultProps = {
  cellState: 'ready'
}
const TextField = (props) => {
  return (
    <>
    <Grid item>
      <div>{props.foodList[ 0 ].name}</div>
    </Grid>
    {props.cellState === itemStatus.RECOGNIZED ?
      <Grid item>
            <IconButton onClick={() => props.onConfirm} size='small'>
              <Tooltip title="Edit"><EditRoundedIcon color="primary" fontSize="small" /></Tooltip>
            </IconButton>
      </Grid>
      : null
   }
  </>
  );

}
const SelectField = (props) => {
  const [selectedFood, setSelectedFood] = React.useState(props.foodList[ 0 ]);
  const handleChange = (event) => {
    console.log(event)
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
      props.cellState == 'search' && !props.foodList.length ? null :
        <Grid item>
          <Grid container>
            <Grid item>
              <IconButton onClick={() => props.onConfirm(selectedFood)} size='small'>
                <Tooltip title="Confirm"><CheckRoundedIcon color="primary" fontSize="small" /></Tooltip>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
    }
    </>
  );

}
const LookUpField = () => {
  return <Tooltip title="Click here to look up"><SearchRoundedIcon color="primary" /></Tooltip>
}