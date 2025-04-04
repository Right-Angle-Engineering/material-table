var t = Object.assign;
import e from 'react';
import l from 'prop-types';
import { CircularProgress as d } from '@mui/material';
import { useTheme as p } from '@mui/material/styles';
function o(i) {
  const r = p();
  return e.createElement(
    'div',
    {
      ref: i.forwardedRef,
      style: {
        display: 'table',
        width: '100%',
        height: '100%',
        backgroundColor: r.palette.background.paper,
        opacity: 0.7
      }
    },
    e.createElement(
      'div',
      {
        style: {
          display: 'table-cell',
          width: '100%',
          height: '100%',
          verticalAlign: 'middle',
          textAlign: 'center'
        }
      },
      e.createElement(d, null)
    )
  );
}
o.propTypes = { theme: l.any };
export default e.forwardRef(function (r, a) {
  return e.createElement(o, t(t({}, r), { forwardedRef: a }));
});
