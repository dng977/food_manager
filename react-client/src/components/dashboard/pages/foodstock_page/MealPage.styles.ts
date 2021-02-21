import {createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) => createStyles({
  avatarSize: {
      width: theme.spacing(3),
      height: theme.spacing(3),
  },
  ingredients: {
    '& li div:first-child': {
      minWidth: "0px",
      marginRight: "15px",
    }
  },
  '@global': {
    // MuiListItemAvatar: {
    //   root:{
    //     minWidth: null,
    //     marginRight: "8px",
    //   }
    // },
    // '.MuiListItemIcon-root.ingredients': {
    //     minWidth: "0px",
    //     marginRight: "15px",
    // },
  }

});