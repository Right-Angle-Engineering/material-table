var g = Object.prototype.hasOwnProperty;
var m = Object.getOwnPropertySymbols,
  P = Object.prototype.propertyIsEnumerable;
var o = Object.assign;
var d = (t, a) => {
  var r = {};
  for (var e in t) g.call(t, e) && a.indexOf(e) < 0 && (r[e] = t[e]);
  if (t != null && m)
    for (var e of m(t)) a.indexOf(e) < 0 && P.call(t, e) && (r[e] = t[e]);
  return r;
};
import i from 'react';
import { AdapterDateFns as F } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextField as k } from '@mui/material';
import {
  LocalizationProvider as w,
  DatePicker as y
} from '@mui/x-date-pickers';
function D(l) {
  var { columnDef: t, value: a, onChange: r, locale: e, forwardedRef: f } = l,
    n = d(l, ['columnDef', 'value', 'onChange', 'locale', 'forwardedRef']);
  const s = () => {
      const {
        columnDef: p,
        rowData: S,
        onRowDataChange: h,
        errorState: x,
        onBulkEditRowChanged: v,
        scrollWidth: z
      } = n;
      return d(n, [
        'columnDef',
        'rowData',
        'onRowDataChange',
        'errorState',
        'onBulkEditRowChanged',
        'scrollWidth'
      ]);
    },
    u =
      t.dateSetting && t.dateSetting.format
        ? t.dateSetting.format
        : 'dd.MM.yyyy',
    c = s();
  return i.createElement(
    w,
    { dateAdapter: F, locale: e },
    i.createElement(
      y,
      o(o({}, c), {
        ref: f,
        format: u,
        value: a || null,
        onChange: r,
        clearable: !0,
        InputProps: { style: { fontSize: 13 } },
        renderInput: (p) => i.createElement(k, o({}, p)),
        inputProps: { 'aria-label': `${t.title}: press space to edit` }
      })
    )
  );
}
export default i.forwardRef(function (a, r) {
  return i.createElement(D, o(o({}, a), { forwardedRef: r }));
});
