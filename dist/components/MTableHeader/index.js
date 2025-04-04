var Z = Object.prototype.hasOwnProperty;
var R = Object.getOwnPropertySymbols,
  $ = Object.prototype.propertyIsEnumerable;
var o = Object.assign;
var U = (r, u) => {
  var b = {};
  for (var d in r) Z.call(r, d) && u.indexOf(d) < 0 && (b[d] = r[d]);
  if (r != null && R)
    for (var d of R(r)) u.indexOf(d) < 0 && $.call(r, d) && (b[d] = r[d]);
  return b;
};
import i from 'react';
import m from 'prop-types';
import ee from '@mui/material/TableHead';
import te from '@mui/material/TableRow';
import W from '@mui/material/TableCell';
import V from '@mui/material/TableSortLabel';
import ae from '@mui/material/Checkbox';
import { Draggable as ie } from '@hello-pangea/dnd';
import { Box as P, Tooltip as re } from '@mui/material';
import * as H from '../../utils/common-values';
import {
  useLocalizationStore as oe,
  useIconStore as le,
  useOptionStore as ne
} from '@store';
export function MTableHeader(c) {
  var {
      onColumnResized: r,
      classes: u,
      dataCount: b = 0,
      selectedCount: d = 0,
      sx: k,
      allowSorting: v = !0,
      orderByCollection: I = se.orderByCollection,
      columns: T
    } = c,
    s = U(c, [
      'onColumnResized',
      'classes',
      'dataCount',
      'selectedCount',
      'sx',
      'allowSorting',
      'orderByCollection',
      'columns'
    ]);
  const S = oe().header,
    e = ne(),
    w = le(),
    O = 20,
    F = 1e4,
    [l, L] = i.useState(void 0),
    [M, N] = i.useState(0),
    y = i.useMemo(() => T.filter((a) => a.hidden !== !0), [T]),
    G = (a, t, n) => {
      const g = a.clientX,
        h = a.target.closest('th'),
        f = h && Math.round(+window.getComputedStyle(h).width.slice(0, -2));
      let x = l == null ? void 0 : l.initialColWidths,
        p,
        D;
      if (e.tableWidth === 'full') {
        const z = h.nextSibling;
        (p = z && Math.round(+window.getComputedStyle(z).width.slice(0, -2))),
          (D = y.findIndex((Y) => Y.tableData.id === t.tableData.id + 1));
      } else
        x ||
          (x = Array.from(h.parentNode.children).map((z) =>
            Math.round(+window.getComputedStyle(z).width.slice(0, -2))
          ));
      N(g);
      const q = y[D];
      L(
        o(
          o(
            {
              colIndex: n,
              nextColIndex: D,
              lastColData: o(o({}, t.tableData), { width: f })
            },
            D && q && { lastNextColData: o(o({}, q.tableData), { width: p }) }
          ),
          { initialColWidths: x, startX: g }
        )
      );
    },
    X = (a, t, n) =>
      Math.min(
        Math.max(a.maxWidth || F, t),
        Math.max(Math.min(a.minWidth || O, t), t + n)
      ) - t,
    A = i.useCallback(
      (a) => {
        if (!l) return;
        a.preventDefault && a.preventDefault();
        const t = a.clientX,
          n = y[l.colIndex],
          g = n.tableData.additionalWidth - l.lastColData.additionalWidth;
        let h = X(n, l.lastColData.width + g, t - M);
        h = Math.round(h);
        const f = [l.lastColData.width + g];
        e.tableWidth === 'full' &&
          l.lastNextColData &&
          ((h = -X(y[l.nextColIndex], l.lastNextColData.width - g, -h)),
          f.push(l.lastNextColData.width - g)),
          N(t),
          h && r(n.tableData.id, h, f, l.initialColWidths);
      },
      [M, l, r]
    ),
    B = i.useCallback(
      (a) => {
        l && M !== l.startX && r(y[l.colIndex].tableData.id, 0, [], []),
          L(void 0);
      },
      [L, l, M, r]
    );
  i.useEffect(
    () => (
      document.addEventListener('mousemove', A),
      document.addEventListener('mouseup', B),
      () => {
        document.removeEventListener('mousemove', A),
          document.removeEventListener('mouseup', B);
      }
    ),
    [A, B]
  );
  const E = () => {
      const a = H.actionsColumnWidth(o({ options: e }, s));
      return i.createElement(
        W,
        {
          key: 'key-actions-column',
          padding: 'checkbox',
          sx: styles.header,
          style: o(o({ textAlign: 'center' }, e.headerStyle), {
            width: a,
            boxSizing: 'border-box'
          })
        },
        i.createElement(V, { hideSortIcon: !0, disabled: !0 }, S.actions)
      );
    },
    J = (a) => {
      const t = e.columnResizable
          ? H.reducePercentsInCalc(a.tableData.width, s.scrollWidth)
          : a.tableData.width,
        n = o(
          o(
            o(o(o({}, e.headerStyle), a.headerStyle), {
              boxSizing: 'border-box',
              width: t
            }),
            e.tableWidth === 'full' && a.minWidth && { minWidth: a.minWidth }
          ),
          e.tableWidth === 'full' && a.maxWidth && { maxWidth: a.maxWidth }
        );
      return (
        e.tableLayout === 'fixed' &&
          e.columnResizable &&
          a.resizable !== !1 &&
          ((n.paddingLeft = 8),
          (n.paddingRight = 2),
          (n.position = 'relative')),
        n
      );
    };
  function K() {
    const a = e.padding === 'default' ? 'medium' : 'small';
    return y
      .filter((t) => !(t.tableData.groupOrder > -1) && !t.tableData.hiddden)
      .sort((t, n) => t.tableData.columnOrder - n.tableData.columnOrder)
      .map((t, n, g) => {
        const h =
          t.align !== void 0
            ? t.align
            : ['numeric', 'currency'].indexOf(t.type) !== -1
            ? 'right'
            : 'left';
        let f = t.title;
        if (
          (e.draggable && t.draggable !== !1
            ? (f = i.createElement(
                ie,
                {
                  key: t.tableData.id,
                  draggableId: t.tableData.id.toString(),
                  index: n,
                  style: { zIndex: 99 }
                },
                (x, p) =>
                  i.createElement(
                    'div',
                    o(
                      o(
                        o({ ref: x.innerRef }, x.draggableProps),
                        x.dragHandleProps
                      ),
                      {
                        style: p.isDragging
                          ? x.draggableProps.style
                          : {
                              position: 'relative',
                              minWidth: 0,
                              display: 'flex',
                              flexDirection:
                                h === 'right' ? 'row-reverse' : void 0
                            }
                      }
                    ),
                    t.sorting !== !1 && s.sorting && v
                      ? i.createElement(
                          _,
                          {
                            columnDef: t,
                            keepSortDirectionOnColumnSwitch:
                              e.keepSortDirectionOnColumnSwitch,
                            icon: w.SortArrow,
                            thirdSortClick: e.thirdSortClick,
                            onOrderChange: s.onOrderChange,
                            orderByCollection: I,
                            showColumnSortOrder: e.showColumnSortOrder,
                            sortOrderIndicatorStyle: e.sortOrderIndicatorStyle
                          },
                          t.title
                        )
                      : t.title
                  )
              ))
            : t.sorting !== !1 &&
              s.sorting &&
              v &&
              (f = i.createElement(
                _,
                {
                  columnDef: t,
                  keepSortDirectionOnColumnSwitch:
                    e.keepSortDirectionOnColumnSwitch,
                  icon: w.SortArrow,
                  thirdSortClick: e.thirdSortClick,
                  onOrderChange: s.onOrderChange,
                  orderByCollection: I,
                  showColumnSortOrder: e.showColumnSortOrder,
                  sortOrderIndicatorStyle: e.sortOrderIndicatorStyle
                },
                t.title
              )),
          t.tooltip &&
            (f = i.createElement(
              re,
              { title: t.tooltip, placement: 'bottom' },
              i.createElement('span', null, f)
            )),
          e.tableLayout === 'fixed' &&
            e.columnResizable &&
            t.resizable !== !1 &&
            !(e.tableWidth === 'full' && n === g.length - 1))
        ) {
          const x = w.Resize
            ? w.Resize
            : (p) =>
                i.createElement(
                  P,
                  o(o({}, p), { 'data-test-id': 'drag_handle' })
                );
          f = i.createElement(
            P,
            { sx: styles.headerWrap(h === 'right') },
            i.createElement(P, { sx: styles.headerContent(h === 'right') }, f),
            i.createElement('div', null),
            i.createElement(x, {
              sx: styles.headerResize(
                (l == null ? void 0 : l.col) &&
                  l.col.tableData.id === t.tableData.id
              ),
              onMouseDown: (p) => G(p, t, n)
            })
          );
        }
        return i.createElement(
          W,
          {
            key: t.tableData.id,
            align: h,
            sx: styles.header,
            style: J(t),
            size: a,
            'aria-label': t.ariaLabel
          },
          f
        );
      });
  }
  function Q() {
    const a = H.selectionMaxWidth(
      o(o({}, s), { options: e }),
      s.treeDataMaxLevel
    );
    return i.createElement(
      W,
      {
        padding: 'none',
        key: 'key-selection-column',
        sx: styles.header,
        style: o(o({}, e.headerStyle), { width: a })
      },
      e.showSelectAllCheckbox &&
        i.createElement(
          ae,
          o(
            {
              indeterminate: d > 0 && d < b,
              checked: b > 0 && d >= b,
              onChange: (t, n) => s.onAllSelected && s.onAllSelected(n)
            },
            e.headerSelectionProps
          )
        )
    );
  }
  function j() {
    return i.createElement(W, {
      padding: 'none',
      key: 'key-detail-panel-column',
      sx: styles.header,
      style: e.headerStyle
    });
  }
  const C = K();
  if ((e.selection && C.splice(0, 0, Q()), s.showActionsColumn))
    if (e.actionsColumnIndex >= 0) {
      let a = 0;
      e.selection && (a = 1), C.splice(e.actionsColumnIndex + a, 0, E());
    } else e.actionsColumnIndex === -1 && C.push(E());
  return (
    s.hasDetailPanel &&
      e.showDetailPanelIcon &&
      (e.detailPanelColumnAlignment === 'right'
        ? C.push(j())
        : C.splice(0, 0, j())),
    s.isTreeData > 0 &&
      C.splice(
        0,
        0,
        i.createElement(W, {
          padding: 'none',
          key: 'key-tree-data-header',
          sx: styles.header,
          style: e.headerStyle
        })
      ),
    y
      .filter((a) => a.tableData.groupOrder > -1)
      .forEach((a) => {
        C.splice(
          0,
          0,
          i.createElement(W, {
            padding: 'checkbox',
            key: 'key-group-header' + a.tableData.id,
            sx: styles.header,
            style: e.headerStyle
          })
        );
      }),
    i.createElement(
      ee,
      { ref: s.forwardedRef, classes: u, sx: k },
      i.createElement(te, { sx: styles.headerRow }, C)
    )
  );
}
const de = (r, u, b, d, k) =>
  b.tableData.id !== r
    ? (k && u) || 'asc'
    : u === 'asc'
    ? 'desc'
    : u === 'desc' && d
    ? ''
    : 'asc';
function _({
  columnDef: r,
  keepSortDirectionOnColumnSwitch: u,
  icon: b,
  thirdSortClick: d,
  onOrderChange: k,
  children: v,
  orderByCollection: I,
  showColumnSortOrder: T,
  sortOrderIndicatorStyle: s
}) {
  const c = I.find(({ orderBy: O }) => O === r.tableData.id),
    S = ((c || u) && c && c.orderDirection) || 'asc';
  let e = 'none';
  c && S === 'asc'
    ? (e = r.ariaSortAsc || 'ascending')
    : c && S === 'desc' && (e = r.ariaSortDesc || 'descending');
  const w = c && c.orderBy;
  return i.createElement(
    i.Fragment,
    null,
    i.createElement(
      V,
      {
        role: 'columnheader',
        'aria-sort': e,
        'aria-label': r.ariaLabel,
        IconComponent: b,
        active: Boolean(c),
        'data-testid': 'mtableheader-sortlabel',
        direction: S,
        onClick: () => {
          const O = de(w, S, r, d, u);
          k(r.tableData.id, O, c && c.sortOrder);
        }
      },
      v
    ),
    i.createElement(
      'span',
      {
        style: o(o({}, s), { width: '1em' }),
        'data-testid': 'material-table-column-sort-order-indicator'
      },
      T && c ? c.sortOrder : ''
    )
  );
}
const se = { orderByCollection: [] };
MTableHeader.propTypes = {
  columns: m.array.isRequired,
  classes: m.object,
  sx: m.object,
  dataCount: m.number,
  hasDetailPanel: m.bool.isRequired,
  selectedCount: m.number,
  onAllSelected: m.func,
  onOrderChange: m.func,
  showActionsColumn: m.bool,
  orderByCollection: m.array,
  showColumnSortOrder: m.bool,
  tooltip: m.string,
  allowSorting: m.bool
};
export const styles = {
  headerRow: { zIndex: 10 },
  header: { top: 0 },
  headerWrap: (r) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    left: 4
  }),
  headerWrapRight: (r) => ({
    display: 'flex',
    alignItems: 'center',
    pr: r ? 1 : void 0,
    position: 'relative',
    left: 4,
    justifyContent: 'flex-end'
  }),
  headerContent: (r) => ({
    minWidth: 0,
    display: 'flex',
    flex: '1 0 100%',
    flexDirection: r ? 'row-reverse' : void 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    position: 'relative'
  }),
  headerResize: (r) => ({
    color: r ? 'primary.main' : 'inherit',
    flex: 1,
    cursor: 'col-resize',
    position: 'absolute',
    height: '100%',
    width: 16,
    display: 'flex',
    justifyContent: 'center',
    right: -8,
    zIndex: 20
  })
};
const he = i.forwardRef(function (u, b) {
  return i.createElement(MTableHeader, o(o({}, u), { forwardedRef: b }));
});
export default i.memo(he);
