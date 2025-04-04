var a = Object.assign;
import e from 'react';
import {
  getLocalizedFilterPlaceHolder as g,
  getLocalizationData as m
} from './utils';
import {
  InputAdornment as F,
  TextField as h,
  Tooltip as b
} from '@mui/material';
function y({
  columnDef: t,
  icons: i,
  localization: r,
  hideFilterIcons: n,
  onFilterChanged: p,
  forwardedRef: d
}) {
  var l, o;
  const f = m(r),
    u = i.Filter;
  return e.createElement(h, {
    ref: d,
    style:
      t.type === 'numeric'
        ? { float: (l = t.align) != null ? l : 'right' }
        : { float: (o = t.align) != null ? o : 'left' },
    type: t.type === 'numeric' ? 'number' : 'search',
    value: t.tableData.filterValue || '',
    placeholder: g(t, r),
    onChange: (s) => {
      p(t.tableData.id, s.target.value);
    },
    slotProps: {
      input:
        n || t.hideFilterIcon
          ? void 0
          : {
              startAdornment: e.createElement(
                F,
                { position: 'start' },
                e.createElement(
                  b,
                  { title: f.filterTooltip },
                  e.createElement(u, null)
                )
              )
            },
      htmlInput: { 'aria-label': `filter data by ${t.title}` }
    }
  });
}
export default e.forwardRef(function (i, r) {
  return e.createElement(y, a(a({}, i), { forwardedRef: r }));
});
