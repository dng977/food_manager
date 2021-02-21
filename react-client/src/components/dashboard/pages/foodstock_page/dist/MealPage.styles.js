"use strict";
exports.__esModule = true;
var styles_1 = require("@material-ui/core/styles");
exports["default"] = (function (theme) { return styles_1.createStyles({
    avatarSize: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    ingredients: {
        '& li div:first-child': {
            minWidth: "0px",
            marginRight: "15px"
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
}); });
