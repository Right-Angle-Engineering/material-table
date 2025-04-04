var c = Object.assign;
import * as m from '@utils/common-values';
export const selectFromObject = (e, l) => {
    if (!l) return;
    let t;
    Array.isArray(l)
      ? (t = l)
      : ((l = l.replace(/\[(\w+)\]/g, '.$1')),
        (l = l.replace(/^\./, '')),
        (t = l.split('.')));
    for (let i = 0, n = t.length; i < n; ++i) {
      const r = t[i];
      if (e && r in e) e = e[r];
      else return;
    }
    return e;
  },
  setObjectByKey = (e, l, t) => {
    let i = e,
      n;
    Array.isArray(l)
      ? (n = l)
      : ((l = l.replace(/\[(\w+)\]/g, '.$1')),
        (l = l.replace(/^\./, '')),
        (n = l.split('.')));
    const r = n.length;
    for (let o = 0; o < r - 1; o++) {
      const f = n[o];
      i[f] || (i[f] = {}), (i = i[f]);
    }
    i[n[r - 1]] = t;
  };
export function getStyle(e) {
  const l = m.reducePercentsInCalc(e.columnDef.tableData.width, e.scrollWidth);
  let t = {
    color: 'inherit',
    width: l,
    maxWidth: e.columnDef.maxWidth,
    minWidth: e.columnDef.minWidth,
    boxSizing: 'border-box',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit'
  };
  return (
    typeof e.columnDef.cellStyle == 'function'
      ? (t = c(c({}, t), e.columnDef.cellStyle(e.value, e.rowData)))
      : (t = c(c({}, t), e.columnDef.cellStyle)),
    e.columnDef.disableClick && (t.cursor = 'default'),
    c(c({}, e.style), t)
  );
}
