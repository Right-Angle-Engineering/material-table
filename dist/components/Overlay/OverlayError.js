var n = Object.assign;
import r from 'react';
import e from 'prop-types';
import { useTheme as p } from '@mui/material/styles';
import { useIconStore as s } from '@store';
function l(t) {
  const o = s(),
    i = p();
  return r.createElement(
    'div',
    {
      ref: t.forwardedRef,
      style: {
        display: 'table',
        width: '100%',
        height: '100%',
        backgroundColor: i.palette.background.paper,
        opacity: 0.7
      }
    },
    r.createElement(
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
      r.createElement('span', null, t.error.message),
      ' ',
      r.createElement(o.Retry, {
        onClick: t.retry,
        style: { cursor: 'pointer', position: 'relative', top: 5 }
      })
    )
  );
}
l.propTypes = {
  error: e.oneOfType([e.object, e.string]),
  retry: e.func,
  theme: e.any
};
export default r.forwardRef(function (o, i) {
  return r.createElement(l, n(n({}, o), { forwardedRef: i }));
});
