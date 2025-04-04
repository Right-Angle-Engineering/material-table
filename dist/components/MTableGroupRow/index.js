var V = Object.prototype.hasOwnProperty;
var x = Object.getOwnPropertySymbols,
  W = Object.prototype.propertyIsEnumerable;
var f = Object.assign;
var v = (o, d) => {
  var a = {};
  for (var e in o) V.call(o, e) && d.indexOf(e) < 0 && (a[e] = o[e]);
  if (o != null && x)
    for (var e of x(o)) d.indexOf(e) < 0 && W.call(o, e) && (a[e] = o[e]);
  return a;
};
import B from '@mui/material/TableCell';
import O from '@mui/material/TableRow';
import I from '@mui/material/IconButton';
import L from '@mui/material/Checkbox';
import t from 'prop-types';
import l from 'react';
import { useOptionStore as q, useIconStore as z } from '../../store';
function P(s) {
  var { columns: o = G.columns, groups: d = G.groups, level: a = 0 } = s,
    e = v(s, ['columns', 'groups', 'level']);
  var y, k;
  const c = q(),
    w = z(),
    A = (n) => ({ transform: n ? 'rotate(90deg)' : 'none' });
  let r = o.filter((n) => !n.hidden).length;
  c.selection && r++,
    e.detailPanel && r++,
    e.actions && e.actions.length > 0 && r++;
  const u = d[a];
  let m;
  e.groupData.isExpanded &&
    (d.length > a + 1
      ? (m = e.groupData.groups.map((n, i) =>
          l.createElement(e.components.GroupRow, {
            actions: e.actions,
            key: n.value || '' + i,
            columns: o,
            components: e.components,
            detailPanel: e.detailPanel,
            getFieldValue: e.getFieldValue,
            groupData: n,
            groups: d,
            level: a + 1,
            path: [...e.path, i],
            onGroupExpandChanged: e.onGroupExpandChanged,
            onGroupSelected: e.onGroupSelected,
            onRowSelected: e.onRowSelected,
            onRowClick: e.onRowClick,
            onToggleDetailPanel: e.onToggleDetailPanel,
            onTreeExpandChanged: e.onTreeExpandChanged,
            onEditingCanceled: e.onEditingCanceled,
            onEditingApproved: e.onEditingApproved,
            hasAnyEditingRow: e.hasAnyEditingRow,
            isTreeData: e.isTreeData,
            cellEditable: e.cellEditable,
            onCellEditStarted: e.onCellEditStarted,
            onCellEditFinished: e.onCellEditFinished,
            scrollWidth: e.scrollWidth,
            treeDataMaxLevel: e.treeDataMaxLevel
          })
        ))
      : (m = e.groupData.data.map((n, i) =>
          n.tableData.editing
            ? l.createElement(e.components.EditRow, {
                columns: o,
                components: e.components,
                data: n,
                path: [...e.path, n.tableData.uuid],
                localization: e.localization,
                key: i,
                mode: n.tableData.editing,
                isTreeData: e.isTreeData,
                detailPanel: e.detailPanel,
                onEditingCanceled: e.onEditingCanceled,
                onEditingApproved: e.onEditingApproved,
                getFieldValue: e.getFieldValue,
                onBulkEditRowChanged: e.onBulkEditRowChanged,
                scrollWidth: e.scrollWidth
              })
            : l.createElement(e.components.Row, {
                actions: e.actions,
                key: i,
                columns: o,
                components: e.components,
                data: n,
                detailPanel: e.detailPanel,
                level: a + 1,
                getFieldValue: e.getFieldValue,
                path: [...e.path, n.tableData.uuid],
                onRowSelected: e.onRowSelected,
                onRowClick: e.onRowClick,
                onToggleDetailPanel: e.onToggleDetailPanel,
                isTreeData: e.isTreeData,
                onTreeExpandChanged: e.onTreeExpandChanged,
                onEditingCanceled: e.onEditingCanceled,
                onEditingApproved: e.onEditingApproved,
                hasAnyEditingRow: e.hasAnyEditingRow,
                cellEditable: e.cellEditable,
                onCellEditStarted: e.onCellEditStarted,
                onCellEditFinished: e.onCellEditFinished,
                scrollWidth: e.scrollWidth,
                treeDataMaxLevel: e.treeDataMaxLevel
              })
        )));
  const T = [];
  for (let n = 0; n < a; n++)
    T.push(l.createElement(B, { padding: 'checkbox', key: n }));
  let h = e.groupData.value;
  u.lookup && (h = u.lookup[h]);
  let g = u.title;
  typeof c.groupTitle == 'function'
    ? (g = c.groupTitle(e.groupData))
    : typeof u.groupTitle == 'function'
    ? (g = u.groupTitle(e.groupData))
    : typeof g != 'string' && (g = l.cloneElement(g));
  const F = c.groupRowSeparator || ': ',
    R = c.selection && c.showSelectGroupCheckbox,
    D = (n) => {
      let i = 0,
        C = 0;
      return (
        R &&
          (n.data.length
            ? ((i += n.data.length),
              n.data.forEach((b) => b.tableData.checked && C++))
            : n.groups.forEach((b) => {
                const [j, M] = D(b);
                (i += j), (C += M);
              })),
        [i, C]
      );
    },
    [S, E] = D(e.groupData);
  return (
    c.showGroupingCount &&
      (h += ` (${
        (k = (y = e.groupData.data) == null ? void 0 : y.length) != null ? k : 0
      })`),
    l.createElement(
      l.Fragment,
      null,
      l.createElement(
        O,
        { ref: e.forwardedRef },
        T,
        l.createElement(
          e.components.Cell,
          { colSpan: r, padding: 'none', columnDef: u, value: h, icons: w },
          l.createElement(
            l.Fragment,
            null,
            l.createElement(
              I,
              {
                style: f(
                  { transition: 'all ease 200ms' },
                  A(e.groupData.isExpanded)
                ),
                onClick: (n) => {
                  e.onGroupExpandChanged(e.path);
                },
                size: 'large'
              },
              l.createElement(w.DetailPanel, {
                row: e,
                level: e.path.length - 1
              })
            ),
            R &&
              l.createElement(L, {
                indeterminate: E > 0 && S !== E,
                checked: S === E,
                onChange: (n, i) =>
                  e.onGroupSelected && e.onGroupSelected(i, e.groupData.path),
                style: { marginRight: 8 }
              }),
            l.createElement('b', null, g, F)
          )
        )
      ),
      m
    )
  );
}
const G = { columns: [], groups: [] };
P.propTypes = {
  actions: t.array,
  columns: t.arrayOf(t.object),
  components: t.object,
  cellEditable: t.object,
  detailPanel: t.oneOfType([t.func, t.arrayOf(t.object)]),
  forwardedRef: t.element,
  getFieldValue: t.func,
  groupData: t.object,
  groups: t.arrayOf(t.object),
  hasAnyEditingRow: t.bool,
  icons: t.object,
  isTreeData: t.bool.isRequired,
  level: t.number,
  localization: t.object,
  onBulkEditRowChanged: t.func,
  onCellEditFinished: t.func,
  onCellEditStarted: t.func,
  onEditingApproved: t.func,
  onEditingCanceled: t.func,
  onGroupExpandChanged: t.func,
  onRowClick: t.func,
  onGroupSelected: t.func,
  onRowSelected: t.func,
  onToggleDetailPanel: t.func.isRequired,
  onTreeExpandChanged: t.func.isRequired,
  path: t.arrayOf(t.number),
  scrollWidth: t.number.isRequired,
  treeDataMaxLevel: t.number
};
export default l.forwardRef(function (d, a) {
  return l.createElement(P, f(f({}, d), { forwardedRef: a }));
});
