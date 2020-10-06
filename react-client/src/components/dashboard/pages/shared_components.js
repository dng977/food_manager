import React from 'react';
import { TableBody, TableRow, TableCell } from '@material-ui/core';


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