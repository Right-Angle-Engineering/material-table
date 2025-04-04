var S = Object.defineProperty;
var c = Object.assign;
var n = (x, t, i) => (
  typeof t != 'symbol' && (t += ''),
  t in x
    ? S(x, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
    : (x[t] = i)
);
import b from 'date-fns/format';
import { v4 as E } from 'uuid';
import { selectFromObject as C } from './';
import { widthToNumber as O } from './common-values';
import { ALL_COLUMNS as v } from './constants';
export default class R {
  constructor() {
    n(this, 'checkForId', !1);
    n(this, 'applyFilters', !1);
    n(this, 'applySearch', !1);
    n(this, 'applySort', !1);
    n(this, 'currentPage', 0);
    n(this, 'detailPanelType', 'multiple');
    n(this, 'lastDetailPanelRow');
    n(this, 'lastEditingRow');
    n(this, 'maxColumnSort', 1);
    n(this, 'orderByCollection', []);
    n(this, 'defaultOrderByCollection', []);
    n(this, 'pageSize', 5);
    n(this, 'paging', !0);
    n(this, 'parentFunc', null);
    n(this, 'searchText', '');
    n(this, 'searchDebounceDelay', 500);
    n(this, 'selectedCount', 0);
    n(this, 'treefiedDataLength', 0);
    n(this, 'treeDataMaxLevel', 0);
    n(this, 'groupedDataLength', 0);
    n(this, 'defaultExpanded', !1);
    n(this, 'bulkEditOpen', !1);
    n(this, 'bulkEditChangedRows', {});
    n(this, 'clientSorting', !0);
    n(this, 'data', []);
    n(this, 'columns', []);
    n(this, 'filteredData', []);
    n(this, 'searchedData', []);
    n(this, 'groupedData', []);
    n(this, 'treefiedData', []);
    n(this, 'sortedData', []);
    n(this, 'pagedData', []);
    n(this, 'renderData', []);
    n(this, 'filtered', !1);
    n(this, 'searched', !1);
    n(this, 'grouped', !1);
    n(this, 'treefied', !1);
    n(this, 'sorted', !1);
    n(this, 'paged', !1);
    n(this, 'tableWidth', 'full');
    n(this, 'tableStyleWidth', '100%');
    n(this, 'rootGroupsIndex', {});
    n(this, 'changeGroupSelected', (t, i) => {
      let r,
        s = this.groupedData;
      i.forEach((a) => {
        (r = s.find((d) => d.value === a)), (s = r.groups);
      });
      const e = (a) => {
        a.forEach((d) => {
          d.groups.length > 0
            ? e(d.groups)
            : d.data.forEach((l) => {
                l.tableData.checked !== t &&
                  ((l.tableData.checked = l.tableData.disabled ? !1 : t),
                  (this.selectedCount = this.selectedCount + (t ? 1 : -1)));
              });
        });
      };
      e([r]);
    });
    n(this, 'getOrderByCollection', () =>
      this.orderByCollection.filter((t) => t.sortOrder)
    );
    n(this, 'sortOrderCollection', (t) =>
      t.sort((i, r) =>
        i.sortOrder ? (r.sortOrder ? i.sortOrder - r.sortOrder : -1) : 1
      )
    );
    n(this, 'startCellEditable', (t, i) => {
      t.tableData.editCellList = [...(t.tableData.editCellList || []), i];
    });
    n(this, 'finishCellEditable', (t, i) => {
      if (t.tableData.editCellList) {
        const r = t.tableData.editCellList.findIndex(
          (s) => s.tableData.id.toString() === i.tableData.id.toString()
        );
        r !== -1 && t.tableData.editCellList.splice(r, 1);
      }
    });
    n(this, 'clearBulkEditChangedRows', () => {
      this.bulkEditChangedRows = {};
    });
    n(this, 'onBulkEditRowChanged', (t, i) => {
      this.bulkEditChangedRows[t.tableData.id] = { oldData: t, newData: i };
    });
    n(this, 'expandTreeForNodes', (t) => {
      t.forEach((i) => {
        let r = i;
        for (; this.parentFunc(r, this.data); ) {
          const s = this.parentFunc(r, this.data);
          s && (s.tableData.isTreeExpanded = !0), (r = s);
        }
      });
    });
    n(this, 'findDataByPath', (t, i) => {
      if (this.isDataType('tree'))
        return i.reduce(
          (s, e) =>
            s &&
            s.tableData &&
            s.tableData.childRows &&
            s.tableData.childRows.find((a) => a && a.tableData.uuid === e),
          { tableData: { childRows: t } }
        );
      {
        const r = { groups: t };
        return i.reduce(
          (e, a) =>
            e.groups.length > 0
              ? e.groups[a]
              : e.data
              ? e.data[a] ||
                e.data.find((d) => {
                  var l;
                  return ((l = d.tableData) == null ? void 0 : l.uuid) === a;
                })
              : void 0,
          r
        );
      }
    });
    n(this, 'getFieldValue', (t, i, r = !0) => {
      let s = typeof t[i.field] != 'undefined' ? t[i.field] : C(t, i.field);
      return i.lookup && r && (s = i.lookup[s]), s;
    });
    n(
      this,
      'getRenderState',
      () => (
        this.filtered === !1 && this.filterData(),
        this.searched === !1 && this.searchData(),
        this.grouped === !1 && this.isDataType('group') && this.groupData(),
        this.treefied === !1 && this.isDataType('tree') && this.treefyData(),
        this.sorted === !1 && this.sortData(),
        this.paged === !1 && this.pageData(),
        {
          columns: this.columns,
          currentPage: this.currentPage,
          data: this.sortedData,
          lastEditingRow: this.lastEditingRow,
          orderByCollection: this.orderByCollection,
          maxColumnSort: this.maxColumnSort,
          originalData: [...this.data],
          pageSize: this.pageSize,
          renderData: this.pagedData,
          searchText: this.searchText,
          selectedCount: this.selectedCount,
          treefiedDataLength: this.treefiedDataLength,
          treeDataMaxLevel: this.treeDataMaxLevel,
          groupedDataLength: this.groupedDataLength,
          tableStyleWidth: this.tableStyleWidth
        }
      )
    );
    n(this, 'filterData', () => {
      (this.searched =
        this.grouped =
        this.treefied =
        this.sorted =
        this.paged =
          !1),
        (this.filteredData = [...this.data]),
        this.applyFilters &&
          this.columns
            .filter((t) => t.tableData.filterValue !== void 0)
            .forEach((t) => {
              const { lookup: i, type: r, tableData: s } = t;
              t.customFilterAndSearch
                ? (this.filteredData = this.filteredData.filter(
                    (e) => !!t.customFilterAndSearch(s.filterValue, e, t)
                  ))
                : i
                ? (this.filteredData = this.filteredData.filter((e) => {
                    const a = this.getFieldValue(e, t, !1);
                    return (
                      !s.filterValue ||
                      s.filterValue.length === 0 ||
                      s.filterValue.indexOf(a != null && a.toString()) > -1
                    );
                  }))
                : r === 'numeric'
                ? (this.filteredData = this.filteredData.filter(
                    (e) => this.getFieldValue(e, t) + '' === s.filterValue
                  ))
                : r === 'boolean' && s.filterValue
                ? (this.filteredData = this.filteredData.filter((e) => {
                    const a = this.getFieldValue(e, t);
                    return (
                      (a && s.filterValue === 'checked') ||
                      (!a && s.filterValue === 'unchecked')
                    );
                  }))
                : ['date', 'datetime'].includes(r)
                ? (this.filteredData = this.filteredData.filter((e) => {
                    const a = this.getFieldValue(e, t),
                      d = a ? new Date(a) : null;
                    if (d && d.toString() !== 'Invalid Date') {
                      const l = s.filterValue;
                      let o = '',
                        u = '';
                      return (
                        r === 'date'
                          ? ((o = b(d, 'MM/dd/yyyy')), (u = b(l, 'MM/dd/yyyy')))
                          : r === 'datetime' &&
                            ((o = b(d, 'MM/dd/yyyy - HH:mm')),
                            (u = b(l, 'MM/dd/yyyy - HH:mm'))),
                        o === u
                      );
                    }
                    return !0;
                  }))
                : r === 'time'
                ? (this.filteredData = this.filteredData.filter((e) => {
                    const d = this.getFieldValue(e, t) || null;
                    if (d) {
                      const l = s.filterValue,
                        o = b(l, 'HH:mm');
                      return d === o;
                    }
                    return !0;
                  }))
                : (this.filteredData = this.filteredData.filter((e) => {
                    const a = this.getFieldValue(e, t);
                    return (
                      a != null &&
                      a
                        .toString()
                        .toUpperCase()
                        .includes(s.filterValue.toUpperCase())
                    );
                  }));
            }),
        (this.filtered = !0);
    });
    n(this, 'searchData', () => {
      if (
        ((this.grouped = this.treefied = this.sorted = this.paged = !1),
        (this.searchedData = [...this.filteredData]),
        this.searchText && this.applySearch)
      ) {
        const t = this.searchText.trim();
        this.searchedData = this.searchedData.filter((i) =>
          this.columns
            .filter((r) => (r.searchable === void 0 ? !r.hidden : r.searchable))
            .some((r) => {
              if (r.customFilterAndSearch)
                return !!r.customFilterAndSearch(t, i, r);
              if (r.field) {
                const s = this.getFieldValue(i, r);
                if (s)
                  return s.toString().toUpperCase().includes(t.toUpperCase());
              }
              return !1;
            })
        );
      }
      this.searched = !0;
    });
    n(this, 'clearCriteria', () => {
      this.changeOrder(-1, ''), this.changeSearchText('');
      for (const t of this.columns) this.changeFilterValue(t.tableData.id, '');
      this.changeSearchText(''), this.changePaging(0);
    });
  }
  setData(t, i) {
    this.selectedCount = 0;
    let r = {};
    this.data.length !== 0 &&
      this.data[0][i] !== void 0 &&
      (r = this.data.reduce(
        (s, e) => ((s[e.tableData.id] = e.tableData), s),
        {}
      )),
      process.env.NODE_ENV === 'development' &&
        !this.checkForId &&
        ((this.checkForId = !0),
        t.some((s) => s[i] === void 0) &&
          console.warn(
            'The table requires all rows to have an unique id property. A row was provided without id in the rows prop. To prevent the loss of state between renders, please provide an unique id for each row.'
          )),
      (this.data = t.map((s, e) => {
        const a = r[s[i]] || {},
          d = c(
            c({ index: e, id: s[i] || e, uuid: s.uuid || E() }, a),
            s.tableData
          );
        d.checked && this.selectedCount++;
        const l = c(c({}, s), { tableData: d });
        return (
          this.lastDetailPanelRow &&
            this.lastDetailPanelRow.tableData === a &&
            (this.lastDetailPanelRow = l),
          this.lastEditingRow &&
            this.lastEditingRow.tableData === a &&
            (this.lastEditingRow = l),
          l
        );
      })),
      (this.filtered = !1);
  }
  setTableWidth(t) {
    this.tableWidth = t;
  }
  setColumns(t, i = [], r = {}) {
    let s = 0;
    const e = [];
    this.columns = t.map((l, o) => {
      var f;
      const u = O(l.width),
        h = typeof l.width == 'number' ? l.width + 'px' : l.width;
      h && (isNaN(u) ? e.push(h) : (s += u));
      const p = i.find(({ id: y }) => y === o),
        g = (f = r[l.field]) != null ? f : {},
        D = c(
          c(
            c(
              c(
                {
                  columnOrder: o,
                  filterValue: l.defaultFilter,
                  filterOperator: l.defaultFilterOperator || '=',
                  groupOrder: l.defaultGroupOrder,
                  groupSort: l.defaultGroupSort || 'asc',
                  width: h,
                  initialWidth: h,
                  widthPx: isNaN(u) ? void 0 : u,
                  additionalWidth: 0
                },
                g
              ),
              p ? p.tableData : {}
            ),
            l.tableData
          ),
          { id: o }
        );
      return (l.tableData = D), l;
    });
    const a = this.columns.filter((l) =>
        l.hidden ||
        (l.columnDef && l.columnDef.tableData && l.columnDef.tableData.width)
          ? !1
          : l.width === void 0
      ),
      d =
        (s !== 0 ? `${s}px` : '0px') +
        (e.length > 0 ? ' - ' + e.join(' - ') : '');
    a.forEach((l) => {
      l.tableData.width =
        l.tableData.initialWidth = `calc((100% - ${d}) / ${a.length})`;
    }),
      (this.tableStyleWidth =
        this.tableWidth === 'full' || a.length > 0 || e.length > 0
          ? '100%'
          : s);
  }
  setDefaultExpanded(t) {
    this.defaultExpanded = t;
  }
  setClientSorting(t) {
    this.clientSorting = !!t;
  }
  setMaxColumnSort(t) {
    const i = this.columns.filter((r) => r.sorting !== !1).length;
    t === v ? (this.maxColumnSort = i) : (this.maxColumnSort = Math.min(t, i));
  }
  setOrderByCollection() {
    const t = this.getOrderByCollection();
    let i = this.columns.map((r) => {
      const { id: s } = r.tableData,
        e = t.find((a) => a.orderBy === s);
      return e
        ? c({}, e)
        : {
            orderBy: r.tableData.id,
            sortOrder: void 0,
            orderDirection: '',
            orderByField: r.field
          };
    });
    (i = this.sortOrderCollection(i)), (this.orderByCollection = [...i]);
  }
  setDefaultOrderByCollection(t) {
    this.defaultOrderByCollection = [...t];
  }
  getDefaultOrderByCollection() {
    return this.defaultOrderByCollection;
  }
  changeApplySearch(t) {
    (this.applySearch = t), (this.searched = !1);
  }
  changeApplyFilters(t) {
    (this.applyFilters = t), (this.filtered = !1);
  }
  changeApplySort(t) {
    (this.applySort = t), (this.sorted = !1);
  }
  changePaging(t) {
    (this.paging = t), (this.paged = !1);
  }
  changeCurrentPage(t) {
    (this.currentPage = t), (this.paged = !1);
  }
  changePageSize(t) {
    (this.pageSize = t), (this.paged = !1);
  }
  changeParentFunc(t) {
    this.parentFunc = t;
  }
  changeFilterValue(t, i) {
    const r = this.columns.find((s) => s.tableData.id === t);
    (r.tableData.filterValue = i), (this.filtered = !1);
  }
  changeFilterOperator(t, i) {
    const r = this.columns.find((s) => s.tableData.id === t);
    (r.tableData.filterOperator = i), (this.filtered = !1);
  }
  changeRowSelected(t, i) {
    const r = this.findDataByPath(this.sortedData, i);
    (r.tableData.checked = t),
      (this.selectedCount = this.selectedCount + (t ? 1 : -1));
    const s = (e) => {
      e.tableData.childRows &&
        e.tableData.childRows.forEach((a) => {
          a.tableData.checked !== t &&
            ((a.tableData.checked = t),
            (this.selectedCount = this.selectedCount + (t ? 1 : -1))),
            s(a);
        });
    };
    s(r), (this.filtered = !1);
  }
  changeDetailPanelVisibility(t, i) {
    const r = this.findDataByPath(this.sortedData, t);
    return (
      (r.tableData.showDetailPanel || '').toString() === i.toString()
        ? (r.tableData.showDetailPanel = void 0)
        : (r.tableData.showDetailPanel = i),
      this.detailPanelType === 'single' &&
        this.lastDetailPanelRow &&
        this.lastDetailPanelRow !== r &&
        (this.lastDetailPanelRow.tableData.showDetailPanel = void 0),
      (this.lastDetailPanelRow = r),
      r
    );
  }
  changeGroupExpand(t) {
    const i = this.findDataByPath(this.sortedData, t);
    i.isExpanded = !i.isExpanded;
  }
  changeSearchText(t) {
    (this.searchText = t), (this.searched = !1), (this.currentPage = 0);
  }
  changeSearchDebounce(t) {
    this.searchDebounceDelay = t;
  }
  changeRowEditing(t, i) {
    t
      ? ((t.tableData.editing = i),
        this.lastEditingRow &&
          this.lastEditingRow !== t &&
          (this.lastEditingRow.tableData.editing = void 0),
        i ? (this.lastEditingRow = t) : (this.lastEditingRow = void 0))
      : this.lastEditingRow &&
        ((this.lastEditingRow.tableData.editing = void 0),
        (this.lastEditingRow = void 0));
  }
  changeBulkEditOpen(t) {
    this.bulkEditOpen = t;
  }
  changeAllSelected(t, i) {
    let r = 0;
    const s = (e) => {
      const a = i instanceof Function ? i(e) : { disabled: !1 };
      return e.tableData.disabled || a.disabled ? !1 : t;
    };
    if (this.isDataType('group')) {
      const e = (a) => {
        a.forEach((d) => {
          d.groups.length > 0
            ? e(d.groups)
            : d.data.forEach((l) => {
                (l.tableData.checked = s(l)), r++;
              });
        });
      };
      e(this.groupedData);
    } else {
      const e = (a) => {
        a.tableData.childRows &&
          a.tableData.childRows.forEach((d) => {
            (d.tableData.checked = s(a)), e(d);
          });
      };
      this.searchedData.forEach((a) => {
        (a.tableData.checked = s(a)), e(a);
      }),
        (r = this.searchedData.length);
    }
    this.selectedCount = t ? r : 0;
  }
  changeColumnOrder(t, i, r) {
    let s = [];
    const e = this.getOrderByCollection();
    e.length === this.maxColumnSort && !r
      ? ((this.orderByCollection[0].orderDirection = ''),
        (this.orderByCollection[0].sortOrder = void 0),
        (s = this.orderByCollection.map(
          (a) => (
            a.sortOrder
              ? (a.sortOrder -= 1)
              : a.orderBy === t &&
                i &&
                ((a.sortOrder = e.length), (a.orderDirection = i)),
            a
          )
        )))
      : (s = this.orderByCollection.map(
          (a) => (
            a.orderBy === t && i
              ? ((a.orderDirection = i), (a.sortOrder = r || e.length + 1))
              : !i && a.orderBy === t
              ? ((a.orderDirection = i), (a.sortOrder = void 0))
              : !i && r < a.sortOrder && (a.sortOrder -= 1),
            a
          )
        )),
      (s = this.sortOrderCollection(s)),
      (this.orderByCollection = [...s]),
      (this.currentPage = 0),
      (this.sorted = !1);
  }
  changeGroupOrder(t) {
    const i = this.columns.find((r) => r.tableData.id === t);
    i.tableData.groupSort === 'asc'
      ? (i.tableData.groupSort = 'desc')
      : (i.tableData.groupSort = 'asc'),
      (this.sorted = !1);
  }
  changeColumnHidden(t, i) {
    (t.hidden = i), this.setColumns(this.columns);
  }
  changeTreeExpand(t) {
    const i = this.findDataByPath(this.sortedData, t);
    i.tableData.isTreeExpanded = !i.tableData.isTreeExpanded;
  }
  changeDetailPanelType(t) {
    this.detailPanelType = t;
  }
  changeByDrag(t) {
    let i = 0,
      r = this.columns
        .filter((s) => s.tableData.groupOrder > -1)
        .sort((s, e) => s.tableData.groupOrder - e.tableData.groupOrder);
    if (
      t.destination.droppableId === 'groups' &&
      t.source.droppableId === 'groups'
    ) {
      i = Math.min(t.destination.index, t.source.index);
      const s = Math.max(t.destination.index, t.source.index);
      if (((r = r.slice(i, s + 1)), t.destination.index < t.source.index)) {
        const e = r.pop();
        r.unshift(e);
      } else {
        const e = r.shift();
        r.push(e);
      }
    } else if (
      t.destination.droppableId === 'groups' &&
      t.source.droppableId === 'headers'
    ) {
      const s = this.columns.find(
        (e) => e.tableData.id.toString() === t.draggableId.toString()
      );
      if (!s || s.grouping === !1 || !s.field) return;
      r.splice(t.destination.index, 0, s);
    } else if (
      t.destination.droppableId === 'headers' &&
      t.source.droppableId === 'groups'
    ) {
      const s = this.columns.find(
        (e) => e.tableData.id.toString() === t.draggableId.toString()
      );
      (s.tableData.groupOrder = void 0), r.splice(t.source.index, 1);
    } else if (
      t.destination.droppableId === 'headers' &&
      t.source.droppableId === 'headers'
    ) {
      i = Math.min(t.destination.index, t.source.index);
      const s = Math.max(t.destination.index, t.source.index),
        e = this.columns
          .sort((h, p) => h.tableData.columnOrder - p.tableData.columnOrder)
          .filter((h) => h.tableData.groupOrder === void 0 && !h.hidden);
      let a = 0,
        d = 0;
      for (let h = 0; h < e.length && d <= i; h++) e[h].hidden ? a++ : d++;
      const l = i + a;
      let o = l;
      for (let h = 0; h < s - i && o < e.length; o++) e[o].hidden || h++;
      const u = e.slice(l, o + 1);
      if (t.destination.index < t.source.index) {
        const h = u.pop();
        u.unshift(h);
      } else {
        const h = u.shift();
        u.push(h);
      }
      for (let h = 0; h < u.length; h++) u[h].tableData.columnOrder = l + h;
      return;
    } else return;
    for (let s = 0; s < r.length; s++) r[s].tableData.groupOrder = i + s;
    this.sorted = this.grouped = !1;
  }
  onColumnResized(t, i, r, s) {
    const e = this.columns.find((l) => l.tableData.id === t);
    if (!e) return [];
    const a = this.columns.find((l) => l.tableData.id === t + 1);
    if (this.tableWidth === 'full' && !a) return [];
    if (i === 0) return this.tableWidth === 'full' ? [e, a] : [e];
    this.tableWidth === 'variable' &&
      this.tableStyleWidth === '100%' &&
      (this.columns.forEach((l, o) =>
        c(c({}, l), {
          tableData: c(c({}, l.tableData), {
            width: `${s[o]}px`,
            widthPx: s[o]
          })
        })
      ),
      (this.tableStyleWidth = s.reduce((l, o) => l + o)));
    const d = [e];
    return (
      (e.tableData.widthPx = r[0] + i),
      (e.tableData.additionalWidth += i),
      (e.tableData.width =
        this.tableWidth === 'full'
          ? `calc(${e.tableData.initialWidth} + ${e.tableData.additionalWidth}px)`
          : `${e.tableData.widthPx}px`),
      this.tableWidth === 'full' &&
        ((a.tableData.widthPx = r[1] - i),
        (a.tableData.additionalWidth -= i),
        (a.tableData.width = `calc(${a.tableData.initialWidth} + ${a.tableData.additionalWidth}px)`),
        d.push(a)),
      this.tableWidth === 'variable' && (this.tableStyleWidth += i),
      d
    );
  }
  findGroupByGroupPath(t, i) {
    const r = { groups: t, groupsIndex: this.rootGroupsIndex };
    return i.reduce((e, a) => {
      if (!!e && e.groupsIndex[a] !== void 0) return e.groups[e.groupsIndex[a]];
    }, r);
  }
  isDataType(t) {
    let i = 'normal';
    return (
      this.parentFunc
        ? (i = 'tree')
        : this.columns.find((r) => r.tableData.groupOrder > -1) &&
          (i = 'group'),
      t === i
    );
  }
  sort(t, i, r) {
    if (r === 'numeric') return t - i;
    if (t !== i) {
      if (!t) return -1;
      if (!i) return 1;
    }
    return t < i ? -1 : t > i ? 1 : 0;
  }
  sortList(t) {
    if (!this.clientSorting) return t;
    const i = this.orderByCollection.map((d) => d.orderBy),
      r = new Map();
    this.columns.forEach((d) => {
      const l = d.tableData.id;
      i.includes(l) && r.set(l, d);
    });
    const s = this.sort,
      e = this.getFieldValue,
      a = this.orderByCollection;
    return t.sort(function d(l, o, u = r, h = a) {
      const { orderBy: p, orderDirection: g } = h[0],
        D = u.get(p);
      let f = 0;
      return (
        D.customSort
          ? g === 'desc'
            ? (f = D.customSort(o, l, 'row', g))
            : (f = D.customSort(l, o, 'row', g))
          : ((f = s(e(l, D), e(o, D), D.type)),
            (f = g.toLowerCase() === 'desc' ? f * -1 : f)),
        f === 0 && h.filter((m) => m.sortOrder !== void 0).length !== 1
          ? d(l, o, u, h.slice(1))
          : f
      );
    });
  }
  groupData() {
    (this.sorted = this.paged = !1), (this.groupedDataLength = 0);
    const t = [...this.searchedData],
      i = this.columns
        .filter((s) => s.tableData.groupOrder > -1)
        .sort((s, e) => s.tableData.groupOrder - e.tableData.groupOrder),
      r = t.reduce(
        (s, e) => {
          let a = s;
          return (
            (a = i.reduce((d, l) => {
              const o = e[l.field] || C(e, l.field);
              let u;
              if (
                (d.groupsIndex[o] !== void 0 &&
                  (u = d.groups[d.groupsIndex[o]]),
                !u)
              ) {
                const h = [...(d.path || []), o];
                let p = !1;
                switch (typeof this.defaultExpanded) {
                  case 'boolean':
                    p = this.defaultExpanded;
                    break;
                  case 'function':
                    p = this.defaultExpanded(e);
                    break;
                }
                const g = this.findGroupByGroupPath(this.groupedData, h) || {
                  isExpanded: p
                };
                (u = {
                  value: o,
                  groups: [],
                  groupsIndex: {},
                  data: [],
                  isExpanded: g.isExpanded,
                  path: h
                }),
                  d.groups.push(u),
                  (d.groupsIndex[o] = d.groups.length - 1);
              }
              return u;
            }, a)),
            a.data.push(e),
            this.groupedDataLength++,
            s
          );
        },
        { groups: [], groupsIndex: {} }
      );
    (this.groupedData = r.groups),
      (this.grouped = !0),
      (this.rootGroupsIndex = r.groupsIndex);
  }
  treefyData() {
    (this.sorted = this.paged = !1),
      this.data.forEach((e) => (e.tableData.childRows = null)),
      (this.treefiedData = []),
      (this.treefiedDataLength = 0),
      (this.treeDataMaxLevel = 0),
      (this.searchText || this.columns.some((e) => e.tableData.filterValue)) &&
        (this.data.forEach((e) => {
          e.tableData.isTreeExpanded = !1;
        }),
        this.expandTreeForNodes(this.searchedData));
    const t = (e) => {
      e.tableData.markedForTreeRemove = !1;
      const a = this.parentFunc(e, this.data);
      a
        ? ((a.tableData.childRows = a.tableData.childRows || []),
          a.tableData.childRows.includes(e) ||
            (a.tableData.childRows.push(e), this.treefiedDataLength++),
          t(a),
          (e.tableData.path = [...a.tableData.path, e.tableData.uuid]),
          (this.treeDataMaxLevel = Math.max(
            this.treeDataMaxLevel,
            e.tableData.path.length
          )))
        : this.treefiedData.includes(e) ||
          (this.treefiedData.push(e),
          this.treefiedDataLength++,
          (e.tableData.path = [e.tableData.uuid]));
    };
    this.data.forEach((e) => {
      t(e);
    });
    const i = (e) => {
        let a = this.treefiedData;
        e.tableData.path.forEach((d) => {
          a.tableData && a.tableData.childRows && (a = a.tableData.childRows),
            Array.isArray(a) && (a = a.find((l) => l.tableData.uuid === d));
        }),
          (a.tableData.markedForTreeRemove = !0);
      },
      r = (e) => {
        e.tableData.childRows &&
          e.tableData.childRows.forEach((a) => {
            r(a);
          }),
          (e.tableData.markedForTreeRemove = !1);
      };
    this.data.forEach((e) => {
      if (
        !this.searchText &&
        !this.columns.some((d) => d.tableData.filterValue) &&
        e.tableData.isTreeExpanded === void 0
      ) {
        let d = !1;
        switch (typeof this.defaultExpanded) {
          case 'boolean':
            isDefaultExpanded = this.defaultExpanded;
            break;
          case 'function':
            isDefaultExpanded = this.defaultExpanded(e);
            break;
        }
        e.tableData.isTreeExpanded = d;
      }
      !e.tableData.isTreeExpanded && this.searchedData.indexOf(e) < 0 && i(e);
    }),
      this.data.forEach((e) => {
        this.searchedData.indexOf(e) > -1 && r(e);
      });
    const s = (e) => {
      for (let a = e.length - 1; a >= 0; a--) {
        const d = e[a];
        d.tableData.childRows && s(d.tableData.childRows),
          d.tableData.markedForTreeRemove && e.splice(a, 1);
      }
    };
    s(this.treefiedData),
      (this.treefiedDataLength = this.treefiedData.length),
      (this.treefied = !0);
  }
  sortData() {
    if (((this.paged = !1), this.isDataType('group'))) {
      this.sortedData = [...this.groupedData];
      const t = this.columns
          .filter((e) => e.tableData.groupOrder > -1)
          .sort((e, a) => e.tableData.groupOrder - a.tableData.groupOrder),
        i = (e, a) =>
          a.customSort
            ? e.sort(
                a.tableData.groupSort === 'desc'
                  ? (d, l) =>
                      a.customSort(
                        l.value,
                        d.value,
                        'group',
                        a.tableData.groupSort
                      )
                  : (d, l) =>
                      a.customSort(
                        d.value,
                        l.value,
                        'group',
                        a.tableData.groupSort
                      )
              )
            : e.sort(
                a.tableData.groupSort === 'desc'
                  ? (d, l) => this.sort(l.value, d.value, a.type)
                  : (d, l) => this.sort(d.value, l.value, a.type)
              );
      this.sortedData = i(this.sortedData, t[0]);
      const r = (e) =>
          e.reduce(
            (a, d) => (
              (a[d.value] = e.findIndex((l) => l.value === d.value)), a
            ),
            {}
          ),
        s = (e, a) => {
          e.forEach((d) => {
            if (d.groups.length > 0) {
              const l = t[a];
              (d.groups = i(d.groups, l)),
                (d.groupsIndex = r(d.groups)),
                s(d.groups, a + 1);
            } else
              this.maxColumnSort > 0 && this.getOrderByCollection().length > 0
                ? (d.data = this.sortList(d.data))
                : this.maxColumnSort > 0 &&
                  (d.data = d.data.sort(
                    (l, o) =>
                      this.data.findIndex(
                        (u) => u.tableData.id === l.tableData.id
                      ) -
                      this.data.findIndex(
                        (u) => u.tableData.id === o.tableData.id
                      )
                  ));
          });
        };
      s(this.sortedData, 1);
    } else if (this.isDataType('tree')) {
      if (
        ((this.sortedData = [...this.treefiedData]),
        this.maxColumnSort > 0 && this.getOrderByCollection().length > 0)
      ) {
        this.sortedData = this.sortList(this.sortedData);
        const t = (i) => {
          i.forEach((r) => {
            r.tableData.childRows &&
              ((r.tableData.childRows = this.sortList(r.tableData.childRows)),
              t(r.tableData.childRows));
          });
        };
        t(this.sortedData);
      }
    } else
      this.isDataType('normal') &&
        ((this.sortedData = [...this.searchedData]),
        this.maxColumnSort > 0 &&
          this.getOrderByCollection().length > 0 &&
          this.applySort &&
          (this.sortedData = this.sortList(this.sortedData)));
    this.sorted = !0;
  }
  pageData() {
    if (((this.pagedData = [...this.sortedData]), this.paging)) {
      const t = this.currentPage * this.pageSize,
        i = t + this.pageSize;
      this.pagedData = this.pagedData.slice(t, i);
    }
    this.paged = !0;
  }
}
