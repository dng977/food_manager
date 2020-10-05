export const styles = {
  palette: {
    secondary: {
      main: '#c62828',
    },
  },

  overrides: {
    MuiTable:{
      root:{
        borderCollapse: 'separate',
      }
    },

    MUIDataTableHeadCell: {
      fixedHeader: {
        fontWeight: 'bold',
        borderTop: '2px solid rgba(224, 224, 224, 1)',
        borderBottom: '2px solid rgba(224, 224, 224, 1)',
        color: 'rgba(0, 0, 0, 0.60)'
      }
    },
    MUIDataTableBody:{
      emptyTitle:{
        textAlign: 'center'
      }
    }
  }
};