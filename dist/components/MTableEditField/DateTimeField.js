var d = Object.prototype.hasOwnProperty;
var l = Object.getOwnPropertySymbols,
  f = Object.prototype.propertyIsEnumerable;
var r = Object.assign;
var n = (e, t) => {
  var i = {};
  for (var a in e) d.call(e, a) && t.indexOf(a) < 0 && (i[a] = e[a]);
  if (e != null && l)
    for (var a of l(e)) t.indexOf(a) < 0 && f.call(e, a) && (i[a] = e[a]);
  return i;
};
import o from 'react';
import m from '@date-io/date-fns';
import {
  LocalizationProvider as u,
  DateTimePicker as c
} from '@mui/x-date-pickers';
function s(i) {
  var { forwardedRef: e } = i,
    t = n(i, ['forwardedRef']);
  return o.createElement(
    u,
    { dateAdapter: m, locale: t.locale },
    o.createElement(
      c,
      r(r({}, t), {
        ref: e,
        format: 'dd.MM.yyyy HH:mm:ss',
        value: t.value || null,
        onChange: t.onChange,
        clearable: !0,
        InputProps: { style: { fontSize: 13 } },
        inputProps: {
          'aria-label': `${t.columnDef.title}: press space to edit`
        }
      })
    )
  );
}
export default o.forwardRef(function (t, i) {
  return o.createElement(s, r(r({}, t), { forwardedRef: i }));
});
