var f = Object.prototype.hasOwnProperty;
var a = Object.getOwnPropertySymbols,
  d = Object.prototype.propertyIsEnumerable;
var u = Object.assign;
var o = (n, e) => {
  var l = {};
  for (var t in n) f.call(n, t) && e.indexOf(t) < 0 && (l[t] = n[t]);
  if (n != null && a)
    for (var t of a(n)) e.indexOf(t) < 0 && d.call(n, t) && (l[t] = n[t]);
  return l;
};
import i from 'react';
import { TextField as m } from '@mui/material';
function c(l) {
  var { forwardedRef: n } = l,
    e = o(l, ['forwardedRef']);
  return i.createElement(
    m,
    u(u({}, e), {
      ref: n,
      placeholder: e.columnDef.editPlaceholder || e.columnDef.title,
      type: 'number',
      value: e.value === void 0 ? '' : e.value,
      onChange: (t) => {
        let r = t.target.valueAsNumber;
        return !r && r !== 0 && (r = void 0), e.onChange(r);
      },
      onKeyDown: e.onKeyDown,
      autoFocus: e.autoFocus,
      slotProps: {
        input: { style: { fontSize: 13, textAlign: 'right' } },
        htmlInput: {
          'aria-label': e.columnDef.title,
          style: { textAlign: 'right' }
        }
      }
    })
  );
}
export default i.forwardRef(function (e, l) {
  return i.createElement(c, u(u({}, e), { forwardedRef: l }));
});
