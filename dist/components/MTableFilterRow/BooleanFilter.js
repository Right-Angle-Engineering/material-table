var r = Object.assign;
import i from 'react';
import { Checkbox as d } from '@mui/material';
function f({ forwardedRef: l, columnDef: e, onFilterChanged: a }) {
  return i.createElement(d, {
    ref: l,
    inputProps: { 'aria-label': `Filter of ${e.title}` },
    indeterminate: e.tableData.filterValue === void 0,
    checked: e.tableData.filterValue === 'checked',
    onChange: () => {
      let t;
      e.tableData.filterValue === void 0
        ? (t = 'checked')
        : e.tableData.filterValue === 'checked' && (t = 'unchecked'),
        a(e.tableData.id, t);
    }
  });
}
export default i.forwardRef(function (e, a) {
  return i.createElement(f, r(r({}, e), { forwardedRef: a }));
});
