var t = Object.assign;
import p from 'react';
import r from 'prop-types';
import { Icon as n } from '@mui/material';
export default function m({ icon: e, iconProps: o = {} }) {
  if (!!e)
    return typeof e == 'string'
      ? p.createElement(n, t({}, o), e)
      : p.createElement(e, t({}, o));
}
m.propTypes = {
  icon: r.oneOfType([r.element, r.elementType]).isRequired,
  iconProps: r.object
};
