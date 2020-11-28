export const styles = {
  palette: {
    secondary: {
      main: '#c62828',
    },
  },

  overrides: {
    MuiRadio:{
      root: {
        padding: "3px",
      }
    },
    MuiTable:{
      root:{
        // borderCollapse: 'separate',
      }
    },

    MUIDataTableHeadCell: {
      fixedHeader: {
        fontWeight: 'bold',
        borderTop: 'ridge solid rgba(224, 224, 224, 1)',
        borderBottom: 'double medium ',
        color: 'rgba(0, 0, 0, 0.60)'
      }
    },
    MUIDataTableSelectCell:{
      fixedHeader: {
        fontWeight: 'bold',
        borderTop: 'ridge solid rgba(224, 224, 224, 1)',
        borderBottom: 'double medium ',
        color: 'rgba(0, 0, 0, 0.60)'
      }
    },
    MUIDataTableBody:{
      emptyTitle:{
        textAlign: 'center'
      }
    },
    MuiTableCell:{
      body: {
        borderRight: 'inset',
        borderRightWidth: 'thin',
        borderBottom: 'inset',
        borderBotttomWidth: 'medium',
        padding: '10px',
        // '&:hover': {
        //   padding: '10px'
        // }
      }
    },
    MUIDataTableBodyRow: {
      hoverCursor: {
        cursor: 'default'
      }
    }
  }
};