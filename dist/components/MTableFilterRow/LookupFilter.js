var o = Object.assign;
import r, { useEffect as d, useState as n } from 'react';
import { getLocalizedFilterPlaceHolder as b } from './utils';
import {
  Checkbox as m,
  FormControl as I,
  InputLabel as f,
  ListItemText as c,
  MenuItem as h,
  Select as k
} from '@mui/material';
const g = 48,
  x = 8,
  F = {
    PaperProps: { style: { maxHeight: g * 4.5 + x, width: 250 } },
    variant: 'menu'
  };
function P({
  columnDef: e,
  onFilterChanged: l,
  localization: a,
  forwardedRef: u
}) {
  const [i, p] = n(e.tableData.filterValue || []);
  return (
    d(() => {
      p(e.tableData.filterValue || []);
    }, [e.tableData.filterValue]),
    r.createElement(
      I,
      { style: { width: '100%' }, ref: u },
      r.createElement(
        f,
        {
          htmlFor: 'select-multiple-checkbox' + e.tableData.id,
          style: { marginTop: -16 }
        },
        b(e, a)
      ),
      r.createElement(
        k,
        {
          multiple: !0,
          value: i,
          onClose: () => {
            e.filterOnItemSelect !== !0 && l(e.tableData.id, i);
          },
          onChange: (t) => {
            p(t.target.value),
              e.filterOnItemSelect === !0 && l(e.tableData.id, t.target.value);
          },
          labelId: 'select-multiple-checkbox' + e.tableData.id,
          renderValue: (t) => t.map((s) => e.lookup[s]).join(', '),
          MenuProps: F,
          style: { marginTop: 0 }
        },
        Object.keys(e.lookup).map((t) =>
          r.createElement(
            h,
            { key: t, value: t },
            r.createElement(m, { checked: i.indexOf(t.toString()) > -1 }),
            r.createElement(c, { primary: e.lookup[t] })
          )
        )
      )
    )
  );
}
export default r.forwardRef(function (l, a) {
  return r.createElement(P, o(o({}, l), { forwardedRef: a }));
});
