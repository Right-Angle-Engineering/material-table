var e = Object.assign;
import t from 'react';
import { AdapterDateFns as u } from '@mui/x-date-pickers/AdapterDateFnsV3';
import d from '@mui/material/TextField';
import { getLocalizedFilterPlaceHolder as f } from './utils';
import {
  DatePicker as s,
  DateTimePicker as P,
  TimePicker as c,
  LocalizationProvider as k
} from '@mui/x-date-pickers';
function F({
  columnDef: r,
  onFilterChanged: o,
  localization: a,
  forwardedRef: n
}) {
  const m = (i) => o(r.tableData.id, i),
    p = {
      value: r.tableData.filterValue || null,
      onChange: m,
      placeholder: f(r, a),
      clearable: !0
    };
  let l = null;
  return (
    r.type === 'date'
      ? (l = t.createElement(
          s,
          e(e({}, p), {
            ref: n,
            renderInput: (i) => t.createElement(d, e({}, i))
          })
        ))
      : r.type === 'datetime'
      ? (l = t.createElement(
          P,
          e(e({}, p), {
            ref: n,
            renderInput: (i) => t.createElement(d, e({}, i))
          })
        ))
      : r.type === 'time' &&
        (l = t.createElement(
          c,
          e(e({}, p), {
            ref: n,
            renderInput: (i) => t.createElement(d, e({}, i))
          })
        )),
    t.createElement(
      k,
      { dateAdapter: u, locale: a.dateTimePickerLocalization },
      l
    )
  );
}
export default t.forwardRef(function (o, a) {
  return t.createElement(F, e(e({}, o), { forwardedRef: a }));
});
