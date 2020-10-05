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
    //   <tbody className="MuiTableBody-root">
    //     <tr className="MuiTableRow-root MUIDataTableBodyRow-root-161 undefined MUIDataTableBodyRow-hoverCursor-162 MuiTableRow-hover">
    //       <td className="MuiTableCell-root MuiTableCell-body MUIDataTableBodyCell-root-165 datatables-noprint" data-colindex="0" colSpan="3">
    //         <div className="MUIDataTableBodyCell-root-165 datatables-noprint">
    //           <div className="MuiTypography-root MUIDataTableBody-emptyTitle-158 MuiTypography-body1">{props.text}
    //           </div>
    //         </div>
    //       </td>
    //     </tr>
    //   </tbody>
    // );
}