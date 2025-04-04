var b = Object.prototype.hasOwnProperty;
var u = Object.getOwnPropertySymbols,
  k = Object.prototype.propertyIsEnumerable;
var r = Object.assign;
var m = (o, s) => {
  var t = {};
  for (var i in o) b.call(o, i) && s.indexOf(i) < 0 && (t[i] = o[i]);
  if (o != null && u)
    for (var i of u(o)) s.indexOf(i) < 0 && k.call(o, i) && (t[i] = o[i]);
  return t;
};
import l from 'react';
import d from 'prop-types';
import F from './DateFilter';
import g from './LookupFilter';
import h from './DefaultFilter';
import T from './BooleanFilter';
import w from './Filter';
import { TableCell as f, TableRow as C } from '@mui/material';
import { useOptionStore as x } from '../../store/LocalizationStore';
export function MTableFilterRow(i) {
  var { columns: o = p.columns, hasActions: s = !1 } = i,
    t = m(i, ['columns', 'hasActions']);
  const a = x();
  function y(e) {
    if (e.filtering === !1) return null;
    if (e.field || e.customFilterAndSearch)
      return e.filterComponent
        ? l.createElement(w, r({ columnDef: e }, t))
        : e.lookup
        ? l.createElement(g, r({ columnDef: e }, t))
        : e.type === 'boolean'
        ? l.createElement(T, r({ columnDef: e }, t))
        : ['date', 'datetime', 'time'].includes(e.type)
        ? l.createElement(F, r({ columnDef: e }, t))
        : l.createElement(h, r({ columnDef: e }, t));
  }
  const n = o
    .filter((e) => !e.hidden && !(e.tableData.groupOrder > -1))
    .sort((e, c) => e.tableData.columnOrder - c.tableData.columnOrder)
    .map((e) =>
      l.createElement(
        f,
        {
          key: e.tableData.id,
          style: r(r({}, a.filterCellStyle), e.filterCellStyle)
        },
        y(e)
      )
    );
  if (
    (a.selection &&
      n.splice(
        0,
        0,
        l.createElement(f, { padding: 'none', key: 'key-selection-column' })
      ),
    s)
  )
    if (a.actionsColumnIndex === -1)
      n.push(l.createElement(f, { key: 'key-action-column' }));
    else {
      let e = 0;
      t.selection && (e = 1),
        n.splice(
          a.actionsColumnIndex + e,
          0,
          l.createElement(f, { key: 'key-action-column' })
        );
    }
  if (t.hasDetailPanel && a.showDetailPanelIcon) {
    const e = a.detailPanelColumnAlignment === 'left' ? 0 : n.length;
    n.splice(
      e,
      0,
      l.createElement(f, { padding: 'none', key: 'key-detail-panel-column' })
    );
  }
  return (
    t.isTreeData > 0 &&
      n.splice(
        0,
        0,
        l.createElement(f, { padding: 'none', key: 'key-tree-data-filter' })
      ),
    o
      .filter((e) => e.tableData.groupOrder > -1)
      .forEach((e) => {
        n.splice(
          0,
          0,
          l.createElement(f, {
            padding: 'checkbox',
            key: 'key-group-filter' + e.tableData.id
          })
        );
      }),
    l.createElement(
      C,
      {
        id: 'm--table--filter--row',
        ref: t.forwardedRef,
        style: r({ height: 10 }, a.filterRowStyle)
      },
      n
    )
  );
}
const p = { columns: [], localization: { filterTooltip: 'Filter' } };
MTableFilterRow.propTypes = {
  columns: d.array.isRequired,
  hasDetailPanel: d.bool.isRequired,
  isTreeData: d.bool.isRequired,
  onFilterChanged: d.func.isRequired,
  hasActions: d.bool,
  localization: d.object
};
export default l.forwardRef(function (s, t) {
  return l.createElement(MTableFilterRow, r(r({}, s), { forwardedRef: t }));
});
export { p as defaultProps };
