import { TableBody, TableRow, TableCell, Button, Grid, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import PropTypes from 'prop-types';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { fetchFoodItems } from '../../../redux_store/food_store/foodActions';
import { RootState } from '../../../redux_store/rootReducer';
import { FoodItemDto } from '../../../apis/dtos/serverDtos';
import { CLEAR_FOOD_ITEMS,DELETE_SEARCH_ROW, FoodItemsActions } from '../../../redux_store/food_store/foodTypes';
import { bindActionCreators, Dispatch } from 'redux';

export const EmptyTable = (props) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={3} align="center">
          <div className="MuiTypography-body1">
            {props.text}
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export const DeleteAlertDialog = ({ dialogTitle, onDeleteDialogNo, onDeleteDialogYes, openDeleteDialog, error }) => {
  const loading = useSelector((state: RootState) => state.feedback.dialogLoading);

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={onDeleteDialogNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >{
        loading ?

          <DialogTitle>Deleting...</DialogTitle> :
          error ?
            <>
              <DialogTitle>{`${error}`}</DialogTitle>
              <DialogActions>
                <Button variant="outlined" onClick={onDeleteDialogNo} color="primary">
                  Close
                </Button>
              </DialogActions>
            </>
            : openDeleteDialog ?
              <>
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogActions>
                  <Button variant="outlined" onClick={onDeleteDialogNo} color="primary">
                    No
                  </Button>
                  <Button variant="contained" onClick={onDeleteDialogYes} color="secondary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </> : <></>
      }
    </Dialog>
  );
}
DeleteAlertDialog.propTypes = {
  dialogTitle: PropTypes.string,
  onDeleteDialogNo: PropTypes.func,
  onDeleteDialogYes: PropTypes.func,
  openDeleteDialog: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string
}

const mapDispatchToProps = (dispatch: Dispatch<FoodItemsActions>) => {
  return {
    clearFoodItems: () => dispatch({ type: CLEAR_FOOD_ITEMS }),
    deleteSearchRow: (rowIndex: number) => dispatch({type: DELETE_SEARCH_ROW, payload: rowIndex}),
    dispatch,
    ...bindActionCreators({ fetchFoodItems }, dispatch)
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    foodItems: state.food.searchedItems,
    loading: state.food.food_loading
  };
};


const reduxConnector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof reduxConnector>
type FoodLookUpProps = PropsFromRedux & {
  rowIndex: number;
  onChange: (foodItemDto: FoodItemDto) => any;
  editMode?: boolean;
  closeEditMode?: () => any;
  hasConfirmButton?: boolean;
  onConfirm?: (foodItemDto: FoodItemDto) => any;
  initSelectedValue?: FoodItemDto;
  label?: string;
  width?: number;
  required?: boolean;
}

export const FoodLookUp = reduxConnector((props: FoodLookUpProps) => {
  //Default props
  props = { label: "Search", editMode: false, hasConfirmButton: true, width: 180, required: true, ...props };

  // console.log("lookupfield", props)
  const [ selectedValue, setSelectedValue ] = useState<FoodItemDto>(props.initSelectedValue ? props.initSelectedValue : null);
  const [ input, setInput ] = useState('');
  const [ debouncedInput, setDebouncedInput ] = useState(input);
  const foodItems = props.rowIndex in props.foodItems ? props.foodItems[ props.rowIndex ] : [];
  let timerId = null;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };

  }, [ input ]);
  // const onInputChange = (input) => {
  //   clearTimeout(timerId);

  //   timerId = setTimeout(() => {
  //     setDebouncedInput(input);
  //   }, 1000);

  // }

  useEffect(() => {


    if (debouncedInput.length && (!foodItems.length || !foodItems.some(item => item.name === debouncedInput))) {
      if(!(selectedValue && selectedValue.name === debouncedInput)){
        // console.log(selectedValue, debouncedInput);
        // console.log('DEBOUNCED');
        props.fetchFoodItems(debouncedInput, props.rowIndex);
      }
    }

  }, [ debouncedInput]);

  useEffect(()=> {
    if(selectedValue != props.initSelectedValue){
      setSelectedValue(props.initSelectedValue);
    }
  },[props.initSelectedValue ]);

  return (
    <>
      <Grid item xs={12}>
        <Autocomplete<FoodItemDto, undefined, undefined, false>
          value={selectedValue}
          loading={props.loading}
          fullWidth={true}
          style={{ width: props.width }}
          onChange={(event, newValue: FoodItemDto) => {
            setSelectedValue(newValue);
            if (props.onChange){
              props.onChange(newValue);
              if(!newValue){
                props.deleteSearchRow(props.rowIndex);
              }
            }

          }}
          onInputChange={(event, newValue) => {
              setInput(newValue);

          }
}
          options={foodItems}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              {...params}
              label={props.label}
              size="small"
              required={props.required}
              />
          )}
        />
      </Grid>
      {props.editMode ?
        <Grid item>
          <IconButton onClick={() => props.closeEditMode()} size='small'>
            <Tooltip title="Cancel"><CloseRoundedIcon color="primary" fontSize="small" /></Tooltip>
          </IconButton>
        </Grid>
        :
        null}
      {props.hasConfirmButton && selectedValue ?
        <Grid item>
          <IconButton
            onClick={() => {
              if (props.editMode)
                props.closeEditMode();
              props.onConfirm(selectedValue);
            }}
            size='small'>
            <Tooltip title="Confirm"><CheckRoundedIcon color="primary" fontSize="small" /></Tooltip>
          </IconButton>
        </Grid>
        :
        null}

    </>
  );
}
);




