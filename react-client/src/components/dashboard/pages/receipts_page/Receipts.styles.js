export const styles = {
  palette: {
    secondary: {
      main: '#c62828',
    },
  },

  overrides: {
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
        borderBotttomWidth: 'medium'

      }
    }
  }
};