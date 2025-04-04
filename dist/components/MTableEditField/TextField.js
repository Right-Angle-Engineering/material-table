var m = Object.prototype.hasOwnProperty;
var f = Object.getOwnPropertySymbols,
  r = Object.prototype.propertyIsEnumerable;
var u = Object.assign;
var a = (l, e) => {
  var n = {};
  for (var t in l) m.call(l, t) && e.indexOf(t) < 0 && (n[t] = l[t]);
  if (l != null && f)
    for (var t of f(l)) e.indexOf(t) < 0 && r.call(l, t) && (n[t] = l[t]);
  return n;
};
import i from 'react';
import { TextField as d } from '@mui/material';
function c(n) {
  var { forwardedRef: l } = n,
    e = a(n, ['forwardedRef']);
  return i.createElement(
    d,
    u(u({}, e), {
      ref: l,
      fullWidth: !0,
      type: e.columnDef.type === 'numeric' ? 'number' : 'text',
      placeholder: e.columnDef.editPlaceholder || e.columnDef.title,
      value: e.value === void 0 ? '' : e.value,
      onChange: (t) =>
        e.onChange(
          e.columnDef.type === 'numeric'
            ? t.target.valueAsNumber
            : t.target.value
        ),
      slotProps: {
        input: { style: { minWidth: 50, fontSize: 13 } },
        htmlInput: {
          'aria-label': e.columnDef.title,
          style: e.columnDef.type === 'numeric' ? { textAlign: 'right' } : {}
        }
      }
    })
  );
}
export default i.forwardRef(function (e, n) {
  return i.createElement(c, u(u({}, e), { forwardedRef: n }));
});
