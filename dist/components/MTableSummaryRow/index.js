var s = Object.assign;
import * as p from 'react';
import { TableRow as x, TableCell as g } from '@mui/material';
import { getStyle as C } from '../../utils';
import * as f from '../../utils/common-values';
import { useOptionStore as T } from '../../store';
import b from 'prop-types';
export function MTableSummaryRow({
  columns: d,
  rowProps: t,
  renderSummaryRow: h
}) {
  const l = T();
  if (!h) return null;
  function o(e, r = 1) {
    const n = f.elementSize(s(s({}, t), { options: l })),
      m = r * f.baseIconSize(s(s({}, t), { options: l }));
    return p.createElement(g, {
      key: `placeholder.${e}`,
      size: n,
      padding: 'none',
      style: { width: m, padding: '0px 5px', boxSizing: 'border-box' }
    });
  }
  const a = [],
    u = [];
  let i = 0;
  if (
    (l.selection && a.push(o(i++)),
    t.actions &&
      t.actions.filter((e) => e.position === 'row' || typeof e == 'function')
        .length > 0)
  ) {
    const e = f.rowActions(t).length;
    l.actionsColumnIndex === -1
      ? u.push(o(i++, e))
      : l.actionsColumnIndex >= 0 && a.push(o(i++, e));
  }
  return (
    t.detailPanel &&
      l.showDetailPanelIcon &&
      (l.detailPanelColumnAlignment === 'right'
        ? u.push(o(i++))
        : a.push(o(i++))),
    t.isTreeData && a.push(o(i++)),
    p.createElement(
      x,
      null,
      a,
      [...d]
        .sort((e, r) => e.tableData.columnOrder - r.tableData.columnOrder)
        .map((e, r) => {
          const n = h({
              index: e.tableData.columnOrder,
              column: e,
              columns: d
            }),
            m =
              e.align !== void 0
                ? e.align
                : ['numeric', 'currency'].indexOf(e.type) !== -1
                ? 'right'
                : 'left';
          let c = '',
            y = C({ columnDef: e, scrollWidth: 0 });
          return (
            typeof n == 'object' && n !== null
              ? ((c = n.value), (y = n.style))
              : (c = n),
            p.createElement(g, { key: r, style: y, align: m }, c)
          );
        }),
      u
    )
  );
}
MTableSummaryRow.propTypes = { columns: b.array, renderSummaryRow: b.func };
export default MTableSummaryRow;
