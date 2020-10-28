import TextField from '@material-ui/core/TextField';
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';

export const renderTextField = ({
  input,
  meta: { touched, invalid, warning, error },
  ...custom
}) => (
    <TextField
      {...input}
      {...custom}
      error={touched && invalid}
      helperText={touched && (
        (error && <span>{error}</span>) ||
        (warning && <span>{"WARNING: " + warning}</span>)
      )}
    />
  );

export const renderRadioGroup = ({
  input,label, ...rest
}) => (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row {...input} {...rest} value={input.value} onChange={(event, value) => input.onChange(value)} />
    </FormControl>
  );

const MenuProps = (itemsNumber) => {
  return {
    PaperProps: {
      style: {
        maxHeight: 48 * (itemsNumber)
      }
    }
  }
};

export const renderSelect = ({
  input: { value, onChange },
  meta: { touched, invalid, error },
  itemList,
  label,
  ...rest
}) => (
    <FormControl {...rest}>
      <InputLabel id="select-outlined-label">{label}</InputLabel>
      <Select
        labelId="select-outlined-label"
        label={label}
        value={value}
        onChange={onChange}
        MenuProps={MenuProps(8)}
      >
        {itemList.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}