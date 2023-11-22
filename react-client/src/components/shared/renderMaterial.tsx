import React from 'react';
import { FormControl, FormControlLabel, FormLabel, InputLabel, Link, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';

export const renderTextField = ({
  input,
  meta: { touched, invalid, warning, error },
  ...custom
}) => (
    <TextField
      {...input}
      {...custom}
      error={touched && invalid}p
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
        Food Manager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}