var m = Object.prototype.hasOwnProperty;
var a = Object.getOwnPropertySymbols,
  f = Object.prototype.propertyIsEnumerable;
var t = Object.assign;
var i = (r, e) => {
  var l = {};
  for (var o in r) m.call(r, o) && e.indexOf(o) < 0 && (l[o] = r[o]);
  if (r != null && a)
    for (var o of a(r)) e.indexOf(o) < 0 && f.call(r, o) && (l[o] = r[o]);
  return l;
};
import n from 'react';
import {
  FormControl as u,
  FormGroup as d,
  FormControlLabel as F,
  Checkbox as h,
  FormHelperText as c
} from '@mui/material';
function g(l) {
  var { forwardedRef: r } = l,
    e = i(l, ['forwardedRef']);
  return n.createElement(
    u,
    { error: Boolean(e.error), ref: r, component: 'fieldset' },
    n.createElement(
      d,
      null,
      n.createElement(F, {
        label: '',
        control: n.createElement(
          h,
          t(t({}, e), {
            value: String(e.value),
            checked: Boolean(e.value),
            onChange: (o) => e.onChange(o.target.checked),
            style: { padding: 0, width: 24, marginLeft: 9 },
            inputProps: { 'aria-label': e.columnDef.title }
          })
        )
      })
    ),
    n.createElement(c, null, e.helperText)
  );
}
export default n.forwardRef(function (e, l) {
  return n.createElement(g, t(t({}, e), { forwardedRef: l }));
});
