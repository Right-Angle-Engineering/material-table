var f = Object.prototype.hasOwnProperty;
var l = Object.getOwnPropertySymbols,
  d = Object.prototype.propertyIsEnumerable;
var a = Object.assign;
var n = (e, i) => {
  var t = {};
  for (var r in e) f.call(e, r) && i.indexOf(r) < 0 && (t[r] = e[r]);
  if (e != null && l)
    for (var r of l(e)) i.indexOf(r) < 0 && d.call(e, r) && (t[r] = e[r]);
  return t;
};
import o from 'react';
import m from '@date-io/date-fns';
import {
  LocalizationProvider as u,
  TimePicker as c
} from '@mui/x-date-pickers';
function s(t) {
  var { forwardedRef: e } = t,
    i = n(t, ['forwardedRef']);
  return o.createElement(
    u,
    { dateAdapter: m, locale: i.locale },
    o.createElement(
      c,
      a(a({}, i), {
        ref: e,
        format: 'HH:mm:ss',
        value: i.value || null,
        onChange: i.onChange,
        clearable: !0,
        InputProps: { style: { fontSize: 13 } },
        inputProps: {
          'aria-label': `${i.columnDef.title}: press space to edit`
        }
      })
    )
  );
}
export default o.forwardRef(function (i, t) {
  return o.createElement(s, a(a({}, i), { forwardedRef: t }));
});
