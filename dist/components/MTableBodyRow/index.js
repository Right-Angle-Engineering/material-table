var oe = Object.prototype.hasOwnProperty;
var W = Object.getOwnPropertySymbols,
  ae = Object.prototype.propertyIsEnumerable;
var a = Object.assign;
var v = (b, t) => {
  var f = {};
  for (var u in b) oe.call(b, u) && t.indexOf(u) < 0 && (f[u] = b[u]);
  if (b != null && W)
    for (var u of W(b)) t.indexOf(u) < 0 && ae.call(b, u) && (f[u] = b[u]);
  return f;
};
import n from 'react';
import o from 'prop-types';
import {
  Checkbox as de,
  TableCell as m,
  IconButton as x,
  Tooltip as re,
  TableRow as se
} from '@mui/material';
import { MTableDetailPanel as ce } from '../m-table-detailpanel';
import * as E from '../../utils/common-values';
import { useDoubleClick as ue } from '../../utils/hooks/useDoubleClick';
import { MTableCustomIcon as A } from '../MTableCustomIcon';
import {
  useLocalizationStore as be,
  useOptionStore as ye,
  useIconStore as fe
} from '../../store';
function q(f) {
  var { forwardedRef: b } = f,
    t = v(f, ['forwardedRef']);
  const u = be().body,
    d = ye(),
    C = fe(),
    P = a(a({}, t), { options: d }),
    {
      data: i = {},
      components: me,
      detailPanel: j,
      getFieldValue: ge,
      isTreeData: Ce,
      onRowSelected: De,
      onRowEditStarted: $,
      onTreeExpandChanged: he,
      onToggleDetailPanel: G,
      onEditingCanceled: z,
      onEditingApproved: I,
      hasAnyEditingRow: O,
      treeDataMaxLevel: H,
      path: g = [],
      actions: J = [],
      errorState: we,
      cellEditable: K,
      onCellEditStarted: N,
      onCellEditFinished: Q,
      persistEvents: U = !1,
      scrollWidth: p,
      onRowClick: h,
      onRowDoubleClick: w,
      columns: X
    } = t,
    M = v(t, [
      'data',
      'components',
      'detailPanel',
      'getFieldValue',
      'isTreeData',
      'onRowSelected',
      'onRowEditStarted',
      'onTreeExpandChanged',
      'onToggleDetailPanel',
      'onEditingCanceled',
      'onEditingApproved',
      'hasAnyEditingRow',
      'treeDataMaxLevel',
      'path',
      'actions',
      'errorState',
      'cellEditable',
      'onCellEditStarted',
      'onCellEditFinished',
      'persistEvents',
      'scrollWidth',
      'onRowClick',
      'onRowDoubleClick',
      'columns'
    ]),
    F = X.filter((e) => !e.hidden),
    L = (e) => {
      let l = j;
      Array.isArray(l) &&
        ((l = l[e || 0]), typeof l == 'function' && (l = l(i)), (l = l.render)),
        G(g, l);
    },
    Y = () => $(i),
    k = L;
  (k.toggleDetailPanel = L), (k.enableEditMode = Y);
  const R = (e, l) => l(e, i, k),
    Z = ue(h ? (e) => R(e, h) : void 0, w ? (e) => R(e, w) : void 0),
    _ = () =>
      F.filter((l) => !(l.tableData.groupOrder > -1))
        .sort((l, r) => l.tableData.columnOrder - r.tableData.columnOrder)
        .map((l) => {
          const r = t.getFieldValue(i, l);
          if (
            i.tableData.editCellList &&
            i.tableData.editCellList.find(
              (s) => s.tableData.id === l.tableData.id
            )
          )
            return n.createElement(t.components.EditCell, {
              getFieldValue: t.getFieldValue,
              components: t.components,
              icons: C,
              localization: u,
              columnDef: l,
              size: c,
              key: 'cell-' + i.tableData.id + '-' + l.tableData.id,
              rowData: i,
              cellEditable: t.cellEditable,
              onCellEditFinished: t.onCellEditFinished,
              scrollWidth: p
            });
          {
            let s = l.editable !== 'never' && !!t.cellEditable;
            s &&
              t.cellEditable.isCellEditable &&
              (s = t.cellEditable.isCellEditable(i, l));
            const D = `cell-${i.tableData.id}-${l.tableData.id}`;
            return n.createElement(t.components.Cell, {
              size: c,
              errorState: t.errorState,
              columnDef: a({ cellStyle: d.cellStyle }, l),
              value: r,
              key: D,
              rowData: i,
              cellEditable: s,
              onCellEditStarted: t.onCellEditStarted,
              scrollWidth: p
            });
          }
        }),
    c = E.elementSize(P),
    ee = J.length * E.baseIconSize(P),
    V = (e) =>
      n.createElement(
        m,
        {
          size: c,
          padding: 'none',
          key: 'key-actions-column',
          style: a(
            { width: ee, padding: '0px 5px', boxSizing: 'border-box' },
            d.actionsCellStyle
          )
        },
        n.createElement(t.components.Actions, {
          data: i,
          actions: e,
          components: t.components,
          size: c,
          disabled: t.hasAnyEditingRow
        })
      ),
    te = () => {
      let e = d.selectionProps || {};
      typeof e == 'function' && (e = e(i));
      const l = E.selectionMaxWidth(P, t.treeDataMaxLevel) || 0,
        r = c !== 'medium' ? { padding: '4px' } : void 0;
      return n.createElement(
        m,
        {
          size: c,
          padding: 'none',
          key: 'key-selection-column',
          style: { width: l }
        },
        n.createElement(
          de,
          a(
            {
              size: c,
              checked: i.tableData.checked === !0,
              onClick: (s) => s.stopPropagation(),
              value: i.tableData.id.toString(),
              onChange: (s) => {
                t.onRowSelected(s, g, i);
              },
              style: r
            },
            e
          )
        )
      );
    },
    S = (e) => ({ transform: e ? 'rotate(90deg)' : 'none' }),
    B = () =>
      d.showDetailPanelIcon
        ? typeof t.detailPanel == 'function'
          ? n.createElement(
              m,
              {
                size: c,
                padding: 'none',
                key: 'key-detail-panel-column',
                style: a(
                  { width: 42, textAlign: 'center' },
                  d.detailPanelColumnStyle
                )
              },
              n.createElement(
                x,
                {
                  'aria-label': 'Detail panel visibility toggle',
                  size: c,
                  style: a(
                    { transition: 'all ease 200ms' },
                    S(i.tableData.showDetailPanel)
                  ),
                  onClick: (e) => {
                    t.onToggleDetailPanel(g, t.detailPanel),
                      e.stopPropagation();
                  }
                },
                n.createElement(C.DetailPanel, null)
              )
            )
          : n.createElement(
              m,
              { size: c, padding: 'none', key: 'key-detail-panel-column' },
              n.createElement(
                'div',
                {
                  style: a(
                    {
                      width: 42 * t.detailPanel.length,
                      textAlign: 'center',
                      display: 'flex'
                    },
                    d.detailPanelColumnStyle
                  )
                },
                t.detailPanel.map((e, l) => {
                  typeof e == 'function' && (e = e(i));
                  const r =
                    (i.tableData.showDetailPanel || '').toString() ===
                    e.render.toString();
                  let s = n.createElement(C.DetailPanel, null),
                    D = !0;
                  return (
                    r
                      ? e.openIcon
                        ? ((s = n.createElement(A, {
                            icon: e.openIcon,
                            iconProps: e.iconProps
                          })),
                          (D = !1))
                        : e.icon &&
                          (s = n.createElement(A, {
                            icon: e.icon,
                            iconProps: e.iconProps
                          }))
                      : e.icon &&
                        ((s = n.createElement(A, {
                          icon: e.icon,
                          iconProps: e.iconProps
                        })),
                        (D = !1)),
                    (s = n.createElement(
                      x,
                      {
                        'aria-label': 'Detail panel visibility toggle',
                        size: c,
                        key: 'key-detail-panel-' + l,
                        style: a({ transition: 'all ease 200ms' }, S(D && r)),
                        disabled: e.disabled,
                        onClick: (ie) => {
                          t.onToggleDetailPanel(g, e.render),
                            ie.stopPropagation();
                        }
                      },
                      s
                    )),
                    e.tooltip &&
                      (s = n.createElement(
                        re,
                        { key: 'key-detail-panel-' + l, title: e.tooltip },
                        s
                      )),
                    s
                  );
                })
              )
            )
        : null,
    le = () =>
      i.tableData.childRows && i.tableData.childRows.length > 0
        ? n.createElement(
            m,
            {
              size: c,
              padding: 'none',
              key: 'key-tree-data-column',
              style: { width: 48 + 9 * (t.treeDataMaxLevel - 2) }
            },
            n.createElement(
              x,
              {
                'aria-label': 'Detail panel visibility toggle',
                size: c,
                style: a(
                  { transition: 'all ease 200ms', marginLeft: t.level * 9 },
                  S(i.tableData.isTreeExpanded)
                ),
                onClick: (e) => {
                  t.onTreeExpandChanged(g, i), e.stopPropagation();
                }
              },
              n.createElement(C.DetailPanel, null)
            )
          )
        : n.createElement(m, { padding: 'none', key: 'key-tree-data-column' }),
    ne = (e, l) => {
      let r = {};
      return (
        typeof d.rowStyle == 'function'
          ? (r = a(a({}, r), d.rowStyle(i, e, l, t.hasAnyEditingRow)))
          : d.rowStyle && (r = a(a({}, r), d.rowStyle)),
        (h || w) && (r.cursor = 'pointer'),
        t.hasAnyEditingRow && (r.opacity = r.opacity ? r.opacity : 0.2),
        r
      );
    },
    y = _();
  d.selection && y.splice(0, 0, te());
  const T = E.rowActions(t);
  if (T.length > 0) {
    if (d.actionsColumnIndex === -1) y.push(V(T));
    else if (d.actionsColumnIndex >= 0) {
      let e = 0;
      d.selection && (e = 1), y.splice(d.actionsColumnIndex + e, 0, V(T));
    }
  }
  return (
    t.detailPanel &&
      (d.detailPanelColumnAlignment === 'right'
        ? y.push(B())
        : y.splice(0, 0, B())),
    t.isTreeData && y.splice(0, 0, le()),
    t.columns
      .filter((e) => e.tableData.groupOrder > -1)
      .forEach((e) => {
        y.splice(
          0,
          0,
          n.createElement(m, {
            size: c,
            padding: 'none',
            key: 'key-group-cell' + e.tableData.id
          })
        );
      }),
    n.createElement(
      n.Fragment,
      null,
      n.createElement(
        se,
        a(a({ ref: b, selected: O }, M), {
          onClick: (e) => {
            U && e.persist(), !O && Z(e);
          },
          hover: !!(h || w),
          style: ne(M.index || 0, t.level),
          'data-testid': 'mtablebodyrow'
        }),
        y
      ),
      n.createElement(ce, {
        options: d,
        data: i,
        detailPanel: t.detailPanel,
        renderColumns: y,
        size: c
      }),
      i.tableData.childRows &&
        i.tableData.isTreeExpanded &&
        i.tableData.childRows.map((e, l) =>
          e.tableData.editing
            ? n.createElement(t.components.EditRow, {
                columns: F,
                components: t.components,
                data: e,
                icons: C,
                localization: u.editRow,
                getFieldValue: t.getFieldValue,
                key: l,
                mode: e.tableData.editing,
                isTreeData: t.isTreeData,
                detailPanel: t.detailPanel,
                onEditingCanceled: z,
                onEditingApproved: I,
                errorState: t.errorState
              })
            : n.createElement(
                t.components.Row,
                a(a({}, t), {
                  data: e,
                  index: l,
                  key: l,
                  level: t.level + 1,
                  path: [...g, e.tableData.uuid],
                  onEditingCanceled: z,
                  onEditingApproved: I,
                  hasAnyEditingRow: t.hasAnyEditingRow,
                  treeDataMaxLevel: H,
                  errorState: t.errorState,
                  cellEditable: K,
                  onCellEditStarted: N,
                  onCellEditFinished: Q
                })
              )
        )
    )
  );
}
q.propTypes = {
  forwardedRef: o.element,
  actions: o.array,
  index: o.number.isRequired,
  data: o.object.isRequired,
  detailPanel: o.oneOfType([
    o.func,
    o.arrayOf(o.oneOfType([o.object, o.func]))
  ]),
  hasAnyEditingRow: o.bool,
  onRowSelected: o.func,
  path: o.arrayOf(o.oneOfType([o.string, o.number])),
  persistEvents: o.bool,
  treeDataMaxLevel: o.number,
  getFieldValue: o.func.isRequired,
  columns: o.array,
  onToggleDetailPanel: o.func.isRequired,
  onRowClick: o.func,
  onRowDoubleClick: o.func,
  onEditingApproved: o.func,
  onEditingCanceled: o.func,
  errorState: o.oneOfType([o.object, o.bool])
};
export default n.forwardRef(function (t, f) {
  return n.createElement(q, a(a({}, t), { forwardedRef: f }));
});
