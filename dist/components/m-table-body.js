var c = Object.assign;
import t from 'react';
import o from 'prop-types';
import { TableBody as T, TableCell as k, TableRow as m } from '@mui/material';
import {
  useLocalizationStore as P,
  useOptionStore as F,
  useIconStore as A
} from '../store';
function R(h) {
  const e = c(c({}, v), h),
    d = P().body,
    l = F(),
    p = A(),
    g = e.columns.filter((n) => !n.hidden);
  function y(n, a) {
    const r = l.padding === 'normal' ? 49 : 36;
    if (l.showEmptyDataSourceMessage && a.length === 0) {
      let i = 0;
      return (
        l.selection && i++,
        e.actions &&
          e.actions.filter(
            (s) => s.position === 'row' || typeof s == 'function'
          ).length > 0 &&
          i++,
        e.hasDetailPanel && i++,
        e.isTreeData && i++,
        t.createElement(
          m,
          {
            style: {
              height: r * (l.paging && l.emptyRowsWhenPaging ? e.pageSize : 1)
            },
            key: 'empty-' + 0
          },
          t.createElement(
            k,
            {
              style: { paddingTop: 0, paddingBottom: 0, textAlign: 'center' },
              colSpan: e.columns.reduce((s, S) => (S.hidden ? s : s + 1), i),
              key: 'empty-'
            },
            d.emptyDataSourceMessage
          )
        )
      );
    } else if (l.emptyRowsWhenPaging)
      return t.createElement(
        t.Fragment,
        null,
        [...Array(n)].map((i, s) =>
          t.createElement(m, { style: { height: r }, key: 'empty-' + s })
        ),
        n > 0 &&
          t.createElement(m, { style: { height: 1 }, key: 'empty-last1' })
      );
  }
  function b(n) {
    return n.map((a, r) => {
      if (a.tableData.editing || e.bulkEditOpen)
        return t.createElement(e.components.EditRow, {
          columns: g,
          components: e.components,
          data: a,
          errorState: e.errorState,
          icons: p,
          localization: d.editRow,
          key: 'row-' + a.tableData.uuid,
          mode: e.bulkEditOpen ? 'bulk' : a.tableData.editing,
          isTreeData: e.isTreeData,
          detailPanel: e.detailPanel,
          onEditingCanceled: e.onEditingCanceled,
          onEditingApproved: e.onEditingApproved,
          bulkEditChangedRows: e.bulkEditChangedRows,
          getFieldValue: e.getFieldValue,
          onBulkEditRowChanged: e.onBulkEditRowChanged,
          scrollWidth: e.scrollWidth
        });
      {
        const i = e.isTreeData
          ? [a.tableData.uuid]
          : [r + e.pageSize * e.currentPage];
        return t.createElement(e.components.Row, {
          components: e.components,
          data: a,
          index: r,
          errorState: e.errorState,
          key: 'row-' + a.tableData.uuid,
          level: 0,
          onRowSelected: e.onRowSelected,
          actions: e.actions,
          columns: e.columns,
          getFieldValue: e.getFieldValue,
          detailPanel: e.detailPanel,
          path: i,
          onToggleDetailPanel: e.onToggleDetailPanel,
          onRowClick: e.onRowClick,
          onRowDoubleClick: e.onRowDoubleClick,
          isTreeData: e.isTreeData,
          onTreeExpandChanged: e.onTreeExpandChanged,
          onEditingCanceled: e.onEditingCanceled,
          onEditingApproved: e.onEditingApproved,
          hasAnyEditingRow: e.hasAnyEditingRow,
          treeDataMaxLevel: e.treeDataMaxLevel,
          cellEditable: e.cellEditable,
          onCellEditStarted: e.onCellEditStarted,
          onCellEditFinished: e.onCellEditFinished,
          onRowEditStarted: e.onRowEditStarted,
          scrollWidth: e.scrollWidth
        });
      }
    });
  }
  function C(n, a) {
    return a.map((r, i) =>
      t.createElement(e.components.GroupRow, {
        actions: e.actions,
        cellEditable: e.cellEditable,
        columns: e.columns,
        components: e.components,
        detailPanel: e.detailPanel,
        getFieldValue: e.getFieldValue,
        groupData: r,
        groups: n,
        hasAnyEditingRow: e.hasAnyEditingRow,
        icons: p,
        isTreeData: e.isTreeData,
        key: r.value == null ? '' + i : r.value,
        level: 0,
        localization: d.editRow,
        onBulkEditRowChanged: e.onBulkEditRowChanged,
        onCellEditFinished: e.onCellEditFinished,
        onCellEditStarted: e.onCellEditStarted,
        onEditingApproved: e.onEditingApproved,
        onEditingCanceled: e.onEditingCanceled,
        onGroupExpandChanged: e.onGroupExpandChanged,
        onRowClick: e.onRowClick,
        onGroupSelected: e.onGroupSelected,
        onRowSelected: e.onRowSelected,
        onToggleDetailPanel: e.onToggleDetailPanel,
        onTreeExpandChanged: e.onTreeExpandChanged,
        path: [i + e.pageSize * e.currentPage],
        scrollWidth: e.scrollWidth,
        treeDataMaxLevel: e.treeDataMaxLevel
      })
    );
  }
  function w() {
    return (
      e.showAddRow &&
      t.createElement(e.components.EditRow, {
        columns: g,
        components: e.components,
        data: e.initialFormData,
        detailPanel: e.detailPanel,
        errorState: e.errorState,
        getFieldValue: e.getFieldValue,
        icons: p,
        isTreeData: e.isTreeData,
        key: 'key-add-row',
        localization: d.editRow,
        mode: 'add',
        onEditingApproved: e.onEditingApproved,
        onEditingCanceled: e.onEditingCanceled,
        scrollWidth: e.scrollWidth
      })
    );
  }
  const u = e.renderData,
    f = e.columns
      .filter((n) => n.tableData.groupOrder > -1)
      .sort((n, a) => n.tableData.groupOrder - a.tableData.groupOrder);
  let E = 0;
  l.paging && e.pageSize > u.length && (E = e.pageSize - u.length);
  const D = t.useMemo(
    () =>
      e.renderSummaryRow
        ? (n) =>
            e.renderSummaryRow(
              c(c({}, n), { data: e.data, currentData: e.currentData })
            )
        : void 0,
    [e.data]
  );
  return t.createElement(
    T,
    { ref: e.forwardedRef },
    l.filtering &&
      t.createElement(e.components.FilterRow, {
        columns: g,
        icons: p,
        hasActions: e.actions.some(
          (n) => n.position === 'row' || typeof n == 'function'
        ),
        onFilterChanged: e.onFilterChanged,
        localization: d.filterRow,
        hasDetailPanel: !!e.detailPanel,
        isTreeData: e.isTreeData,
        scrollWidth: e.scrollWidth,
        hideFilterIcons: e.options.hideFilterIcons
      }),
    l.addRowPosition === 'first' && w(),
    f.length > 0 ? C(f, u) : b(u),
    l.addRowPosition === 'last' && w(),
    t.createElement(e.components.SummaryRow, {
      columns: g,
      renderSummaryRow: D,
      rowProps: e
    }),
    y(E, u)
  );
}
const v = {
  actions: [],
  currentPage: 0,
  data: [],
  pageSize: 5,
  renderData: [],
  selection: !1
};
R.propTypes = {
  actions: o.array,
  bulkEditChangedRows: o.object,
  bulkEditOpen: o.bool,
  cellEditable: o.object,
  columns: o.array.isRequired,
  components: o.object.isRequired,
  currentPage: o.number,
  data: o.array,
  detailPanel: o.oneOfType([
    o.func,
    o.arrayOf(o.oneOfType([o.object, o.func]))
  ]),
  errorState: o.oneOfType([o.object, o.bool]),
  forwardedRef: o.oneOfType([o.func, o.object]),
  getFieldValue: o.func.isRequired,
  hasAnyEditingRow: o.bool,
  hasDetailPanel: o.bool.isRequired,
  initialFormData: o.object,
  isTreeData: o.bool.isRequired,
  onBulkEditRowChanged: o.func,
  onCellEditFinished: o.func,
  onCellEditStarted: o.func,
  onEditingApproved: o.func,
  onEditingCanceled: o.func,
  onFilterChanged: o.func,
  onGroupExpandChanged: o.func,
  onRowClick: o.func,
  onRowDoubleClick: o.func,
  onGroupSelected: o.func,
  onRowSelected: o.func,
  onToggleDetailPanel: o.func.isRequired,
  onTreeExpandChanged: o.func.isRequired,
  pageSize: o.number,
  renderData: o.array,
  renderSummaryRow: o.func,
  scrollWidth: o.number.isRequired,
  selection: o.bool,
  showAddRow: o.bool,
  treeDataMaxLevel: o.number
};
export default t.forwardRef(function (e, d) {
  return t.createElement(R, c(c({}, e), { forwardedRef: d }));
});
