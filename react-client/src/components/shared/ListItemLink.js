import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink } from 'react-router-dom';

export function ListItemLink(props) {
  const { icon, secondaryIcon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <ListItem button component={renderLink}>
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
};