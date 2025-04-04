var U = Object.prototype.hasOwnProperty;
var V = Object.getOwnPropertySymbols,
  G = Object.prototype.propertyIsEnumerable;
var d = Object.assign;
var E = (e, s) => {
  var l = {};
  for (var o in e) U.call(e, o) && s.indexOf(o) < 0 && (l[o] = e[o]);
  if (e != null && V)
    for (var o of V(e)) s.indexOf(o) < 0 && G.call(e, o) && (l[o] = e[o]);
  return l;
};
import r, { useState as H } from 'react';
import y from '@mui/material/TableCell';
import J from '@mui/material/TableRow';
import N from '@mui/material/Typography';
import i from 'prop-types';
import { setObjectByKey as A } from '../../utils';
import { useOptionStore as Q, useIconStore as X } from '../../store';
import * as S from '../../utils/common-values';
import { validateInput as B } from '../../utils/validate';
function I(e) {
  const s = X(),
    l = Q(),
    [o, z] = H(() => {
      let t = e.data
        ? e.data
        : e.columns
            .filter((n) => 'initialEditValue' in n && n.field)
            .reduce((n, k) => (A(n, k.field, k.initialEditValue), n), {});
      return (
        e.mode === 'bulk' &&
          e.bulkEditChangedRows[t.tableData.id] &&
          (t = e.bulkEditChangedRows[t.tableData.id].newData),
        { data: t }
      );
    });
  function F() {
    const t = S.elementSize(e);
    let n = -1;
    return e.columns
      .filter((a) => !a.hidden && !(a.tableData.groupOrder > -1))
      .sort((a, m) => a.tableData.columnOrder - m.tableData.columnOrder)
      .map((a, m) => {
        const h = e.getFieldValue(o.data, a, !1),
          P = (u, w) => {
            let f = { color: 'inherit' };
            return (
              typeof u.cellStyle == 'function'
                ? (f = d(d({}, f), u.cellStyle(w, e.data)))
                : (f = d(d({}, f), u.cellStyle)),
              u.disableClick && (f.cursor = 'default'),
              d({}, f)
            );
          },
          q = {};
        m === 0 && (q.paddingLeft = 24 + e.level * 20);
        let g = !1;
        if (
          (a.editable === void 0 && (g = !0),
          a.editable === 'always' && (g = !0),
          a.editable === 'onAdd' && e.mode === 'add' && (g = !0),
          a.editable === 'onUpdate' && e.mode === 'update' && (g = !0),
          typeof a.editable == 'function' && (g = a.editable(a, e.data)),
          !a.field || !g)
        ) {
          const u = e.getFieldValue(o.data, a);
          return r.createElement(e.components.Cell, {
            size: t,
            icons: s,
            columnDef: a,
            value: u,
            key: a.tableData.id,
            rowData: e.data,
            style: P(a, h)
          });
        } else {
          const { editComponent: u } = a,
            w = E(a, ['editComponent']),
            f = u || e.components.EditField,
            R = B(a, o.data);
          return (
            n === -1 && (n = m),
            r.createElement(
              y,
              {
                size: t,
                key: a.tableData.id,
                align: ['numeric'].indexOf(a.type) !== -1 ? 'right' : 'left',
                style: P(a, h)
              },
              r.createElement(f, {
                key: a.tableData.id,
                columnDef: w,
                autoFocus: n === m,
                value: h,
                error: !R.isValid,
                helperText: R.helperText,
                locale: e.localization.dateTimePickerLocalization,
                rowData: o.data,
                onChange: (b) => {
                  const T = d({}, o.data);
                  A(T, a.field, b),
                    z({ data: T }),
                    e.onBulkEditRowChanged && e.onBulkEditRowChanged(e.data, T);
                },
                onRowDataChange: (b) => {
                  z({ data: b }),
                    e.onBulkEditRowChanged && e.onBulkEditRowChanged(e.data, b);
                }
              })
            )
          );
        }
      });
  }
  const x = e.columns.every((t) => B(t, o.data).isValid),
    C = () => {
      !x || e.onEditingApproved(e.mode, o.data, e.data);
    };
  function v() {
    if (e.mode === 'bulk') return;
    const t = S.elementSize(e),
      n = [
        {
          icon: s.Check,
          tooltip: e.localization.saveTooltip,
          disabled: !x,
          onClick: C
        },
        {
          icon: s.Clear,
          tooltip: e.localization.cancelTooltip,
          onClick: () => {
            e.onEditingCanceled(e.mode, e.data);
          }
        }
      ];
    return r.createElement(
      y,
      {
        size: t,
        padding: 'none',
        key: 'key-actions-column',
        style: d(
          d({ width: 42 * n.length, padding: '0px 5px' }, l.editCellStyle),
          l.actionsCellStyle
        )
      },
      r.createElement(e.components.Actions, {
        data: e.data,
        actions: n,
        components: e.components,
        size: t
      })
    );
  }
  function j() {
    return { borderBottom: '1px solid red' };
  }
  const K = (t) => {
      (t.keyCode === 13 &&
        t.target.type !== 'textarea' &&
        t.target.type !== 'button') ||
      (t.keyCode === 13 && t.target.type === 'textarea' && t.shiftKey)
        ? C()
        : t.keyCode === 27 && e.onEditingCanceled(e.mode, e.data);
    },
    L = S.elementSize(e);
  let c;
  if (e.mode === 'add' || e.mode === 'update' || e.mode === 'bulk') c = F();
  else {
    const t = e.columns.filter(
      (n) => !n.hidden && !(n.tableData.groupOrder > -1)
    ).length;
    c = [
      r.createElement(
        y,
        {
          size: L,
          padding: l.actionsColumnIndex === 0 ? 'none' : void 0,
          key: 'key-edit-cell',
          colSpan: t
        },
        r.createElement(N, { variant: 'h6' }, e.localization.deleteText)
      )
    ];
  }
  if (
    (l.selection &&
      c.splice(
        0,
        0,
        r.createElement(y, { padding: 'none', key: 'key-selection-cell' })
      ),
    e.isTreeData &&
      c.splice(
        0,
        0,
        r.createElement(y, { padding: 'none', key: 'key-tree-data-cell' })
      ),
    l.actionsColumnIndex === -1)
  )
    c.push(v());
  else if (l.actionsColumnIndex >= 0) {
    let t = 0;
    l.selection && (t = 1),
      e.isTreeData && ((t = 1), l.selection && c.splice(1, 1)),
      c.splice(l.actionsColumnIndex + t, 0, v());
  }
  if (e.detailPanel && l.showDetailPanelIcon !== !1 && e.mode !== 'bulk') {
    const n = l.detailPanelColumnAlignment === 'left' ? 0 : c.length;
    c.splice(
      n,
      0,
      r.createElement(y, { padding: 'none', key: 'key-detail-panel-cell' })
    );
  }
  e.columns
    .filter((t) => t.tableData.groupOrder > -1)
    .forEach((t) => {
      c.splice(
        0,
        0,
        r.createElement(y, {
          padding: 'none',
          key: 'key-group-cell' + t.tableData.id
        })
      );
    });
  const O = d(d({}, Y), e),
    {
      detailPanel: Z,
      isTreeData: _,
      onRowClick: $,
      onRowSelected: D,
      onTreeExpandChanged: p,
      onToggleDetailPanel: ee,
      onEditingApproved: te,
      onEditingCanceled: ae,
      getFieldValue: ie,
      components: ne,
      columns: le,
      errorState: oe,
      onBulkEditRowChanged: de,
      bulkEditChangedRows: re,
      scrollWidth: ce,
      forwardedRef: M
    } = O,
    W = E(O, [
      'detailPanel',
      'isTreeData',
      'onRowClick',
      'onRowSelected',
      'onTreeExpandChanged',
      'onToggleDetailPanel',
      'onEditingApproved',
      'onEditingCanceled',
      'getFieldValue',
      'components',
      'columns',
      'errorState',
      'onBulkEditRowChanged',
      'bulkEditChangedRows',
      'scrollWidth',
      'forwardedRef'
    ]);
  return r.createElement(
    J,
    d(d({ onKeyDown: K }, W), { ref: M, style: j() }),
    c
  );
}
const Y = {
  actions: [],
  index: 0,
  options: {},
  path: [],
  onBulkEditRowChanged: () => {}
};
I.propTypes = {
  actions: i.array,
  index: i.number.isRequired,
  data: i.object,
  detailPanel: i.oneOfType([
    i.func,
    i.arrayOf(i.oneOfType([i.object, i.func]))
  ]),
  onRowSelected: i.func,
  path: i.arrayOf(i.number),
  columns: i.array,
  onRowClick: i.func,
  onEditingApproved: i.func,
  onEditingCanceled: i.func,
  localization: i.object,
  getFieldValue: i.func,
  errorState: i.oneOfType([i.object, i.bool]),
  onBulkEditRowChanged: i.func
};
export default r.forwardRef(function (s, l) {
  return r.createElement(I, d(d({}, s), { forwardedRef: l }));
});
