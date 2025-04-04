var f = Object.prototype.hasOwnProperty;
var u = Object.getOwnPropertySymbols,
  m = Object.prototype.propertyIsEnumerable;
var n = Object.assign;
var a = (o, e) => {
  var r = {};
  for (var l in o) f.call(o, l) && e.indexOf(l) < 0 && (r[l] = o[l]);
  if (o != null && u)
    for (var l of u(o)) e.indexOf(l) < 0 && m.call(o, l) && (r[l] = o[l]);
  return r;
};
import t from 'react';
import {
  FormControl as i,
  Select as d,
  MenuItem as c,
  FormHelperText as F
} from '@mui/material';
function v(r) {
  var { forwardedRef: o } = r,
    e = a(r, ['forwardedRef']);
  return t.createElement(
    i,
    { ref: o, error: Boolean(e.error) },
    t.createElement(
      d,
      n(n({}, e), {
        value: e.value === void 0 ? '' : e.value,
        onChange: (l) => e.onChange(l.target.value),
        style: { fontSize: 13 },
        SelectDisplayProps: { 'aria-label': e.columnDef.title }
      }),
      Object.keys(e.columnDef.lookup).map((l) =>
        t.createElement(c, { key: l, value: l }, e.columnDef.lookup[l])
      )
    ),
    Boolean(e.helperText) && t.createElement(F, null, e.helperText)
  );
}
export default t.forwardRef(function (e, r) {
  return t.createElement(v, n(n({}, e), { forwardedRef: r }));
});
