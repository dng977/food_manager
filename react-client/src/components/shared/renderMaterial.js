import TextField from '@material-ui/core/TextField';
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export const renderTextField = ({
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
  {...input}
  {...custom}
/>
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