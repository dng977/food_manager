import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

export function ListItemLink(props) {
  const { icon, secondaryIcon, primary, to, selected, key } = props;

  const renderLink = React.useMemo(
  //@ts-ignore
    () => React.forwardRef((itemProps, ref) => <RouterLink key={primary} to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <ListItem key={primary} selected={selected} button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
      {secondaryIcon ? <ListItemIcon>{secondaryIcon}</ListItemIcon> : null}
    </ListItem>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  secondaryIcon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  selected: PropTypes.bool
};