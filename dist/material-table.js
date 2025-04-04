var P = Object.defineProperty;
var n = Object.assign;
var s = (p, t, e) => (
  typeof t != 'symbol' && (t += ''),
  t in p
    ? P(p, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (p[t] = e)
);
import r from 'react';
import { debounce as D } from 'debounce';
import S from 'deep-eql';
import * as M from './utils/common-values';
import {
  Table as w,
  TableFooter as x,
  TableRow as O,
  LinearProgress as v,
  Box as k
} from '@mui/material';
import { DragDropContext as A, Droppable as T } from '@hello-pangea/dnd';
import B from './utils/data-manager';
import {
  MTablePagination as F,
  MTableSteppedPagination as z,
  MTableScrollbar as L
} from './components';
export default class q extends r.Component {
  constructor(t) {
    super(t);
    s(this, 'dataManager', new B());
    s(this, 'checkedForFunctions', !1);
    s(this, 'clearCriteria', () => {
      this.dataManager.clearCriteria(),
        this.setState(this.dataManager.getRenderState());
    });
    s(this, 'isRemoteData', (t) => !Array.isArray((t || this.props).data));
    s(this, 'onAllSelected', (t) => {
      this.dataManager.changeAllSelected(t, this.props.options.selectionProps),
        this.setState(this.dataManager.getRenderState(), () =>
          this.onSelectionChange()
        );
    });
    s(this, 'onGroupSelected', (t, e) => {
      this.dataManager.changeGroupSelected(t, e),
        this.setState(this.dataManager.getRenderState(), () =>
          this.onSelectionChange()
        );
    });
    s(this, 'onChangeColumnHidden', (t, e) => {
      this.dataManager.changeColumnHidden(t, e),
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onChangeColumnHidden &&
            this.props.onChangeColumnHidden(t, e);
        });
    });
    s(this, 'onChangeGroupOrder', (t) => {
      this.dataManager.changeGroupOrder(t.tableData.id),
        this.setState(this.dataManager.getRenderState());
    });
    s(this, 'onChangeOrder', (t, e, a) => {
      this.dataManager.changeColumnOrder(t, e, a);
      const o = this.dataManager.getOrderByCollection();
      if (this.isRemoteData()) {
        const i = n({}, this.state.query);
        (i.page = 0),
          (i.orderBy = this.state.columns.find((l) => l.tableData.id === t)),
          (i.orderDirection = e),
          (i.orderDirection !== void 0 || i.orderBy !== void 0) &&
            console.warn(
              'Properties orderBy and orderDirection had been deprecated when remote data, please start using orderByCollection instead'
            ),
          (i.orderByCollection = o),
          this.onQueryChange(i, () => {
            this.props.onOrderChange && this.props.onOrderChange(t, e),
              this.props.onOrderCollectionChange &&
                this.props.onOrderCollectionChange(o);
          });
      } else
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onOrderChange && this.props.onOrderChange(t, e),
            this.props.onOrderCollectionChange &&
              this.props.onOrderCollectionChange(o);
        });
    });
    s(this, 'onPageChange', (t, e) => {
      if (this.isRemoteData()) {
        const a = n({}, this.state.query);
        (a.page = e),
          this.onQueryChange(a, () => {
            this.props.onPageChange && this.props.onPageChange(e, a.pageSize);
          });
      } else
        this.dataManager.changeCurrentPage(e),
          this.setState(this.dataManager.getRenderState(), () => {
            this.props.onPageChange &&
              this.props.onPageChange(e, this.state.pageSize);
          });
    });
    s(this, 'onRowsPerPageChange', (t) => {
      const e = t.target.value;
      this.dataManager.changePageSize(e);
      const a = () => {
        this.props.onPageChange && this.props.onPageChange(0, e),
          this.props.onRowsPerPageChange && this.props.onRowsPerPageChange(e);
      };
      if (this.isRemoteData()) {
        const o = n({}, this.state.query);
        (o.pageSize = t.target.value), (o.page = 0), this.onQueryChange(o, a);
      } else
        this.dataManager.changeCurrentPage(0),
          this.setState(this.dataManager.getRenderState(), a);
    });
    s(this, 'onDragEnd', (t) => {
      !t ||
        !t.source ||
        !t.destination ||
        (this.dataManager.changeByDrag(t),
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onColumnDragged &&
            t.destination.droppableId === 'headers' &&
            t.source.droppableId === 'headers' &&
            this.props.onColumnDragged(t.source.index, t.destination.index);
        }));
    });
    s(this, 'onGroupExpandChanged', (t) => {
      this.dataManager.changeGroupExpand(t),
        this.setState(this.dataManager.getRenderState());
    });
    s(this, 'onGroupRemoved', (t, e) => {
      const a = {
        combine: null,
        destination: { droppableId: 'headers', index: 0 },
        draggableId: t.tableData.id,
        mode: 'FLUID',
        reason: 'DROP',
        source: { index: e, droppableId: 'groups' },
        type: 'DEFAULT'
      };
      this.dataManager.changeByDrag(a),
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onGroupRemoved && this.props.onGroupRemoved(t, e);
        });
    });
    s(this, 'onEditingApproved', (t, e, a) => {
      t === 'add' && this.props.editable && this.props.editable.onRowAdd
        ? this.setState({ isLoading: !0 }, () => {
            this.props.editable
              .onRowAdd(e)
              .then((o) => {
                this.setState({ isLoading: !1, showAddRow: !1 }, () => {
                  this.isRemoteData() && this.onQueryChange(this.state.query);
                });
              })
              .catch((o) => {
                const i = { message: o, errorCause: 'add' };
                this.setState({ isLoading: !1, errorState: i });
              });
          })
        : t === 'update' &&
          this.props.editable &&
          this.props.editable.onRowUpdate
        ? this.setState({ isLoading: !0 }, () => {
            this.props.editable
              .onRowUpdate(e, a)
              .then((o) => {
                this.dataManager.changeRowEditing(a),
                  this.setState(
                    n({ isLoading: !1 }, this.dataManager.getRenderState()),
                    () => {
                      this.isRemoteData() &&
                        this.onQueryChange(this.state.query);
                    }
                  );
              })
              .catch((o) => {
                const i = { message: o, errorCause: 'update' };
                this.setState({ isLoading: !1, errorState: i });
              });
          })
        : t === 'delete' &&
          this.props.editable &&
          this.props.editable.onRowDelete
        ? this.setState({ isLoading: !0 }, () => {
            this.props.editable
              .onRowDelete(
                Object.entries(a).reduce(
                  (o, [i, l]) => (i !== 'tableData' && (o[i] = l), o),
                  {}
                )
              )
              .then((o) => {
                this.dataManager.changeRowEditing(a),
                  this.setState(
                    n({ isLoading: !1 }, this.dataManager.getRenderState()),
                    () => {
                      this.isRemoteData() &&
                        this.onQueryChange(this.state.query);
                    }
                  );
              })
              .catch((o) => {
                const i = { message: o, errorCause: 'delete' };
                this.setState({ isLoading: !1, errorState: i });
              });
          })
        : t === 'bulk' &&
          this.props.editable &&
          this.props.editable.onBulkUpdate &&
          this.setState({ isLoading: !0 }, () => {
            this.props.editable
              .onBulkUpdate(this.dataManager.bulkEditChangedRows)
              .then((o) => {
                this.dataManager.changeBulkEditOpen(!1),
                  this.props.onBulkEditOpen && this.props.onBulkEditOpen(!1),
                  this.dataManager.clearBulkEditChangedRows(),
                  this.setState(
                    n({ isLoading: !1 }, this.dataManager.getRenderState()),
                    () => {
                      this.isRemoteData() &&
                        this.onQueryChange(this.state.query);
                    }
                  );
              })
              .catch((o) => {
                const i = { message: o, errorCause: 'bulk edit' };
                this.setState({ isLoading: !1, errorState: i });
              });
          });
    });
    s(this, 'onEditingCanceled', (t, e) => {
      t === 'add'
        ? (this.props.editable.onRowAddCancelled &&
            this.props.editable.onRowAddCancelled(e),
          this.setState({ showAddRow: !1 }))
        : t === 'update'
        ? (this.props.editable.onRowUpdateCancelled &&
            this.props.editable.onRowUpdateCancelled(e),
          this.dataManager.changeRowEditing(e),
          this.setState(this.dataManager.getRenderState()))
        : t === 'delete' &&
          (this.props.editable.onRowDeleteCancelled &&
            this.props.editable.onRowDeleteCancelled(e),
          this.dataManager.changeRowEditing(e),
          this.setState(this.dataManager.getRenderState()));
    });
    s(this, 'retry', () => {
      this.onQueryChange(this.state.query);
    });
    s(this, 'onQueryChange', (t, e) => {
      (t = n(n(n({}, this.state.query), t), { error: this.state.errorState })),
        this.setState({ isLoading: !0, errorState: void 0 }, () => {
          this.props
            .data(t)
            .then((a) => {
              (t.totalCount = a.totalCount), (t.page = a.page);
              const o = n(n({}, t), { totalCount: a.totalCount, page: a.page });
              this.dataManager.setData(a.data, this.props.options.idSynonym),
                this.setState(
                  n(
                    n(
                      { isLoading: !1, errorState: !1 },
                      this.dataManager.getRenderState()
                    ),
                    { query: o }
                  ),
                  () => {
                    e && e();
                  }
                );
            })
            .catch((a) => {
              const o = {
                message:
                  typeof a == 'object'
                    ? a.message
                    : a !== void 0
                    ? a
                    : this.props.localization.error,
                errorCause: 'query'
              };
              this.setState(
                n(
                  { isLoading: !1, errorState: o },
                  this.dataManager.getRenderState()
                )
              );
            });
        });
    });
    s(this, 'onRowSelected', (t, e, a) => {
      this.dataManager.changeRowSelected(t.target.checked, e),
        this.setState(this.dataManager.getRenderState(), () =>
          this.onSelectionChange(a)
        );
    });
    s(this, 'onSelectionChange', (t) => {
      if (this.props.onSelectionChange) {
        const e = [];
        ((o) => {
          o.forEach((i) => {
            i.tableData.checked && e.push(i);
          });
        })(this.state.originalData),
          this.props.onSelectionChange(e, t);
      }
    });
    s(
      this,
      'onSearchChangeDebounce',
      D((t) => {
        if (this.isRemoteData()) {
          const e = n({}, this.state.query);
          (e.page = 0),
            (e.search = t),
            this.onQueryChange(e, () => {
              this.props.onSearchChange && this.props.onSearchChange(t);
            });
        } else
          this.setState(this.dataManager.getRenderState(), () => {
            this.props.onSearchChange && this.props.onSearchChange(t);
          });
      }, this.props.options.debounceInterval)
    );
    s(this, 'onFilterChange', (t, e, a = '=') => {
      this.dataManager.changeFilterValue(t, e),
        this.dataManager.changeFilterOperator(t, a),
        this.setState({}, this.onFilterChangeDebounce);
    });
    s(
      this,
      'onFilterChangeDebounce',
      D(() => {
        if (this.isRemoteData()) {
          const t = n({}, this.state.query);
          (t.page = 0),
            (t.filters = this.state.columns
              .filter((e) => e.tableData.filterValue)
              .map((e) => ({
                column: e,
                operator: e.tableData.filterOperator,
                value: e.tableData.filterValue
              }))),
            this.onQueryChange(t, () => {
              this.props.onFilterChange && this.props.onFilterChange(t.filters);
            });
        } else
          this.setState(this.dataManager.getRenderState(), () => {
            if (this.props.onFilterChange) {
              const t = this.state.columns
                .filter((e) => e.tableData.filterValue)
                .map((e) => ({
                  column: e,
                  operator: e.tableData.filterOperator,
                  value: e.tableData.filterValue
                }));
              this.props.onFilterChange(t);
            }
          });
      }, this.props.options.debounceInterval)
    );
    s(this, 'onTreeExpandChanged', (t, e) => {
      this.dataManager.changeTreeExpand(t),
        this.setState(this.dataManager.getRenderState(), () => {
          this.props.onTreeExpandChange &&
            this.props.onTreeExpandChange(e, e.tableData.isTreeExpanded);
        });
    });
    s(this, 'onToggleDetailPanel', (t, e) => {
      const a = this.dataManager.changeDetailPanelVisibility(t, e);
      this.setState(this.dataManager.getRenderState()),
        this.props.onTreeExpandChange &&
          this.props.onDetailPanelChange(
            a,
            a.tableData.showDetailPanel ? 'open' : 'closed'
          );
    });
    s(this, 'onCellEditStarted', (t, e) => {
      this.dataManager.startCellEditable(t, e),
        this.setState(this.dataManager.getRenderState());
    });
    s(this, 'onCellEditFinished', (t, e) => {
      this.dataManager.finishCellEditable(t, e),
        this.setState(this.dataManager.getRenderState());
    });
    s(this, 'onEditRowDataChanged', (t, e) => {
      this.dataManager.setEditRowData(t, e),
        this.setState(this.dataManager.getRenderState());
    });
    s(this, 'onColumnResized', (t, e, a, o) => {
      const i = (d) =>
          n(
            n(
              n(
                {
                  field: d.field,
                  width: d.tableData.width,
                  widthPx: d.tableData.widthPx
                },
                d.id && { id: d.id }
              ),
              d.minWidth && { minWidth: d.minWidth }
            ),
            d.maxWidth && { maxWidth: d.maxWidth }
          ),
        l = this.dataManager.onColumnResized(t, e, a, o);
      this.setState(this.dataManager.getRenderState(), () => {
        e === 0 &&
          this.props.onColumnResized &&
          l.length > 0 &&
          this.props.onColumnResized(
            l.map((d) => i(d)),
            this.state.columns.map((d) => i(d))
          );
      });
    });
    s(this, 'renderTable', (t) => {
      var e;
      return r.createElement(
        w,
        {
          sx: t.sx,
          style: n(
            n(
              {},
              t.options.tableWidth === 'variable' && {
                width: this.state.tableStyleWidth
              }
            ),
            {
              tableLayout:
                t.options.fixedColumns &&
                (t.options.fixedColumns.left || t.options.fixedColumns.right)
                  ? 'fixed'
                  : t.options.tableLayout
            }
          )
        },
        t.options.header &&
          r.createElement(t.components.Header, {
            actions: this.state.actions,
            columns: this.state.columns,
            selectedCount: this.state.selectedCount,
            dataCount: t.parentChildData
              ? this.dataManager.searchedData.length
              : this.state.columns.some((a) => a.tableData.groupOrder > -1)
              ? this.state.groupedDataLength
              : this.state.data.length,
            hasDetailPanel: !!t.detailPanel,
            showActionsColumn:
              !this.dataManager.bulkEditOpen &&
              this.state.actions &&
              this.state.actions.some(
                (a) => a.position === 'row' || typeof a == 'function'
              ),
            onAllSelected: this.onAllSelected,
            onOrderChange: this.onChangeOrder,
            isTreeData: this.props.parentChildData !== void 0,
            treeDataMaxLevel: this.state.treeDataMaxLevel,
            onColumnResized: this.onColumnResized,
            scrollWidth: this.state.width,
            sorting: t.options.sorting || this.dataManager.maxColumnSort !== 0,
            allowSorting: this.dataManager.maxColumnSort !== 0,
            orderByCollection: this.dataManager.getOrderByCollection(),
            tableWidth: (e = t.options.tableWidth) != null ? e : 'full'
          }),
        r.createElement(t.components.Body, {
          actions: this.state.actions,
          components: this.props.components,
          renderData: this.state.renderData,
          data: this.state.data,
          renderSummaryRow: this.props.renderSummaryRow,
          currentPage: this.isRemoteData() ? 0 : this.state.currentPage,
          initialFormData: t.initialFormData,
          pageSize: this.state.pageSize,
          columns: this.state.columns,
          errorState: this.state.errorState,
          detailPanel: t.detailPanel,
          options: t.options,
          getFieldValue: this.dataManager.getFieldValue,
          isTreeData: this.props.parentChildData !== void 0,
          onFilterChanged: this.onFilterChange,
          onRowSelected: this.onRowSelected,
          onGroupSelected: this.onGroupSelected,
          onToggleDetailPanel: this.onToggleDetailPanel,
          onGroupExpandChanged: this.onGroupExpandChanged,
          onTreeExpandChanged: this.onTreeExpandChanged,
          onEditingCanceled: this.onEditingCanceled,
          onEditingApproved: this.onEditingApproved,
          onRowClick: this.props.onRowClick,
          onRowDoubleClick: this.props.onRowDoubleClick,
          showAddRow: this.state.showAddRow,
          hasAnyEditingRow: !!(
            this.state.lastEditingRow || this.state.showAddRow
          ),
          hasDetailPanel: !!t.detailPanel,
          treeDataMaxLevel: this.state.treeDataMaxLevel,
          cellEditable: t.cellEditable,
          onCellEditStarted: this.onCellEditStarted,
          onCellEditFinished: this.onCellEditFinished,
          onRowEditStarted: this.onRowEditStarted,
          bulkEditOpen: this.dataManager.bulkEditOpen,
          bulkEditChangedRows: this.dataManager.bulkEditChangedRows,
          onBulkEditRowChanged: this.dataManager.onBulkEditRowChanged,
          scrollWidth: this.state.width
        })
      );
    });
    s(this, 'onRowEditStarted', (t) => {
      var e;
      !((e = this.props.editable) == null ? void 0 : e.onRowUpdate) ||
        (this.dataManager.changeRowEditing(t, 'update'),
        this.setState(
          n(n({}, this.dataManager.getRenderState()), { showAddRow: !1 })
        ));
    });
    s(this, 'getColumnsWidth', (t, e) => {
      const a = [],
        o = M.actionsColumnWidth(t);
      if (
        (o > 0 &&
          ((e > 0 &&
            t.options.actionsColumnIndex >= 0 &&
            t.options.actionsColumnIndex < e) ||
            (e < 0 &&
              t.options.actionsColumnIndex < 0 &&
              t.options.actionsColumnIndex >= e)) &&
          a.push(o + 'px'),
        t.options.selection && e > 0)
      ) {
        const i = M.selectionMaxWidth(t, this.state.treeDataMaxLevel);
        a.push(i + 'px');
      }
      for (let i = 0; i < Math.abs(e) && i < this.state.columns.length; i++) {
        const l =
          this.state.columns[e >= 0 ? i : this.state.columns.length - 1 - i];
        l.tableData &&
          (typeof l.tableData.width == 'number'
            ? a.push(l.tableData.width + 'px')
            : a.push(l.tableData.width));
      }
      return 'calc(' + a.join(' + ') + ')';
    });
    s(this, 'getRenderData', () =>
      this.props.options.exportAllData ? this.state.data : this.state.renderData
    );
    const e = this.getProps(t);
    this.setDataManagerFields(e, !0);
    const a = this.dataManager.getRenderState();
    (this.state = n(n({ data: [], errorState: void 0 }, a), {
      query: {
        filters: a.columns
          .filter((o) => o.tableData.filterValue)
          .map((o) => ({
            column: o,
            operator: o.tableData.filterOperator,
            value: o.tableData.filterValue
          })),
        orderBy: a.columns.find((o) => o.tableData.id === a.orderBy),
        orderDirection: a.orderDirection,
        orderByCollection: a.orderByCollection,
        page: 0,
        pageSize: e.options.pageSize,
        search: a.searchText,
        totalCount: 0
      },
      showAddRow: !1,
      bulkEditOpen: !1,
      width: 0,
      tableInitialWidthPx: void 0,
      tableStyleWidth: '100%',
      actions: e.actions
    })),
      (this.tableContainerDiv = r.createRef());
  }
  componentDidMount() {
    this.setState(
      n(n({}, this.dataManager.getRenderState()), {
        width: this.tableContainerDiv.current.scrollWidth
      }),
      () => {
        this.isRemoteData() &&
          this.onQueryChange(
            n(n({}, this.state.query), {
              page: this.props.options.initialPage || 0
            })
          ),
          this.props.onDoubleRowClick !== void 0 &&
            console.warn(
              'Property `onDoubleRowClick` has been renamed to `onRowDoubleClick`'
            ),
          this.props.options.sorting !== void 0 &&
            console.warn(
              'Property `sorting` has been deprecated, please start using `maxColumnSort` instead. https://github.com/material-table-core/core/pull/619'
            );
      }
    );
  }
  setDataManagerFields(t, e, a) {
    var m;
    const o = {};
    if (t.options.persistentGroupingsId && localStorage) {
      let g = localStorage.getItem('material-table-groupings');
      g &&
        ((g = JSON.parse(g)),
        g[t.options.persistentGroupingsId] &&
          g[t.options.persistentGroupingsId].forEach((c) => {
            o[c.field] = {
              groupOrder: c.groupOrder,
              groupSort: c.groupSort,
              columnOrder: c.columnOrder
            };
          }));
    }
    this.dataManager.setTableWidth(
      (m = t.options.tableWidth) != null ? m : 'full'
    ),
      this.dataManager.setColumns(t.columns, a, o),
      this.dataManager.setDefaultExpanded(t.options.defaultExpanded),
      this.dataManager.changeRowEditing();
    const { clientSorting: i, grouping: l, maxColumnSort: d } = t.options;
    this.dataManager.setClientSorting(i),
      this.dataManager.setMaxColumnSort(l ? 1 : d),
      this.dataManager.setOrderByCollection(),
      this.isRemoteData(t)
        ? (this.dataManager.changeApplySearch(!1),
          this.dataManager.changeApplyFilters(!1),
          this.dataManager.changeApplySort(!1))
        : (this.dataManager.changeApplySearch(!0),
          this.dataManager.changeApplyFilters(!0),
          this.dataManager.changeApplySort(!0),
          this.dataManager.setData(t.data, t.options.idSynonym));
    const f = this.dataManager.getDefaultOrderByCollection(),
      { defaultOrderByCollection: u } = t.options;
    let h = [],
      C = '',
      b = '';
    if (u && u.length > 0)
      (h = [...u].slice(0, d)),
        (h = this.dataManager.sortOrderCollection(h)),
        (C = JSON.stringify(h)),
        (b = JSON.stringify(f)),
        C !== b && this.dataManager.setDefaultOrderByCollection(h);
    else {
      const g = W(t.columns, a, this.dataManager.maxColumnSort);
      (h = [...g[0]]), (C = JSON.stringify(h)), (b = JSON.stringify([...g[1]]));
    }
    const y = JSON.stringify(this.dataManager.orderByCollection);
    (e || (!this.isRemoteData() && h.length && C !== b && C !== y)) &&
      h.length > 0 &&
      d > 0 &&
      h.forEach(({ orderBy: g, orderDirection: c, sortOrder: E }) =>
        this.dataManager.changeColumnOrder(g, c, E)
      ),
      e && this.dataManager.changeSearchText(t.options.searchText || ''),
      e && this.dataManager.changeSearchDebounce(t.options.searchDebounceDelay),
      e &&
        this.dataManager.changeCurrentPage(
          t.options.initialPage ? t.options.initialPage : 0
        ),
      e && this.dataManager.changePageSize(t.options.pageSize),
      this.dataManager.changePaging(
        this.isRemoteData() ? !1 : t.options.paging
      ),
      e && this.dataManager.changeParentFunc(t.parentChildData),
      this.dataManager.changeDetailPanelType(t.options.detailPanelType);
  }
  cleanColumns(t) {
    return t.map((e) => {
      const a = n({}, e);
      return delete a.tableData, a;
    });
  }
  componentDidUpdate(t) {
    const e = this.cleanColumns(t.columns),
      a = this.cleanColumns(this.props.columns);
    let i = !S(e, a) || !S(t.options, this.props.options);
    if (
      (this.isRemoteData() || (i = i || !S(t.data, this.props.data)),
      t.options.pageSize !== this.props.options.pageSize &&
        this.dataManager.changePageSize(this.props.options.pageSize),
      i)
    ) {
      const u = this.getProps(this.props);
      this.setDataManagerFields(u, !1, t.columns),
        this.setState(
          n(n({}, this.dataManager.getRenderState()), { actions: u.actions })
        );
    }
    const l = this.isRemoteData()
        ? this.state.query.totalCount
        : this.state.data.length,
      d = this.isRemoteData() ? this.state.query.page : this.state.currentPage,
      f = this.isRemoteData() ? this.state.query.pageSize : this.state.pageSize;
    l <= f * d &&
      d !== 0 &&
      !this.state.isLoading &&
      this.onPageChange(null, Math.max(0, Math.ceil(l / f) - 1));
  }
  getProps(t) {
    var o;
    const e = n({}, t || this.props),
      a = this.props.localization.body;
    return (
      e.options.selection
        ? (e.actions = e.actions
            .filter((i) => i)
            .map((i) =>
              i.position === 'auto' ||
              i.isFreeAction === !1 ||
              (i.position === void 0 && i.isFreeAction === void 0)
                ? typeof i == 'function'
                  ? { action: i, position: 'toolbarOnSelect' }
                  : n(n({}, i), { position: 'toolbarOnSelect' })
                : i.isFreeAction
                ? typeof i == 'function'
                  ? { action: i, position: 'toolbar' }
                  : n(n({}, i), { position: 'toolbar' })
                : i
            ))
        : (e.actions = e.actions
            .filter((i) => i)
            .map((i) =>
              i.position === 'auto' ||
              i.isFreeAction === !1 ||
              (i.position === void 0 && i.isFreeAction === void 0)
                ? typeof i == 'function'
                  ? { action: i, position: 'row' }
                  : n(n({}, i), { position: 'row' })
                : i.isFreeAction
                ? typeof i == 'function'
                  ? { action: i, position: 'toolbar' }
                  : n(n({}, i), { position: 'toolbar' })
                : i
            )),
      e.editable &&
        (e.editable.onRowAdd &&
          e.actions.push({
            icon: e.icons.Add,
            tooltip: a.addTooltip,
            position: 'toolbar',
            disabled: !!this.dataManager.lastEditingRow,
            onClick: () => {
              this.dataManager.changeRowEditing(),
                this.state.showAddRow &&
                  this.props.editable.onRowAddCancelled &&
                  this.props.editable.onRowAddCancelled(),
                this.setState(
                  n(n({}, this.dataManager.getRenderState()), {
                    showAddRow: !this.state.showAddRow
                  })
                );
            }
          }),
        e.editable.onRowUpdate &&
          e.actions.push((i) => ({
            icon: e.icons.Edit,
            tooltip: e.editable.editTooltip
              ? e.editable.editTooltip(i)
              : a.editTooltip,
            disabled: e.editable.isEditable && !e.editable.isEditable(i),
            hidden: e.editable.isEditHidden && e.editable.isEditHidden(i),
            onClick: (l, d) => {
              this.onRowEditStarted(d);
            }
          })),
        e.editable.onRowDelete &&
          e.actions.push((i) => ({
            icon: e.icons.Delete,
            tooltip: e.editable.deleteTooltip
              ? e.editable.deleteTooltip(i)
              : a.deleteTooltip,
            disabled: e.editable.isDeletable && !e.editable.isDeletable(i),
            hidden: e.editable.isDeleteHidden && e.editable.isDeleteHidden(i),
            onClick: (l, d) => {
              this.dataManager.changeRowEditing(d, 'delete'),
                this.setState(
                  n(n({}, this.dataManager.getRenderState()), {
                    showAddRow: !1
                  })
                );
            }
          })),
        e.editable.onBulkUpdate &&
          (e.actions.push({
            icon: e.icons.Edit,
            tooltip: a.bulkEditTooltip,
            position: 'toolbar',
            hidden: this.dataManager.bulkEditOpen,
            disabled: e.isBulkEditable && e.isBulkEditable(),
            onClick: () => {
              this.dataManager.changeBulkEditOpen(!0),
                this.props.onBulkEditOpen && this.props.onBulkEditOpen(!0),
                this.setState(this.dataManager.getRenderState());
            }
          }),
          e.actions.push({
            icon: e.icons.Check,
            tooltip: a.bulkEditApprove,
            position: 'toolbar',
            hidden: !this.dataManager.bulkEditOpen,
            onClick: () => this.onEditingApproved('bulk')
          }),
          e.actions.push({
            icon: e.icons.Clear,
            tooltip: a.bulkEditCancel,
            position: 'toolbar',
            hidden: !this.dataManager.bulkEditOpen,
            onClick: () => {
              this.dataManager.changeBulkEditOpen(!1),
                this.props.onBulkEditOpen && this.props.onBulkEditOpen(!1),
                this.dataManager.clearBulkEditChangedRows(),
                this.setState(this.dataManager.getRenderState());
            }
          })),
        ((o = this.state) == null ? void 0 : o.showAddRow) &&
          e.editable.onRowAdd &&
          e.actions.filter((i) => i.position === 'row').length === 0 &&
          e.actions.push({
            icon: void 0,
            position: 'row',
            onClick: () => {},
            disabled: !0
          })),
      e
    );
  }
  renderFooter() {
    const t = this.getProps();
    if (t.options.paging) {
      const e = this.isRemoteData()
          ? Math.min(t.page, Math.floor(t.totalCount / this.state.pageSize))
          : this.state.currentPage,
        a = this.isRemoteData() ? t.totalCount : this.state.data.length;
      return r.createElement(
        w,
        null,
        r.createElement(
          x,
          { style: { display: 'grid' } },
          r.createElement(
            O,
            { style: { display: 'grid' } },
            r.createElement(t.components.Pagination, {
              sx: {
                display: 'flex',
                justifyContent: t.options.paginationAlignment
                  ? t.options.paginationAlignment
                  : 'flex-end',
                overflowX: 'auto',
                '& .MuiTablePagination-displayedRows': { display: 'none' }
              },
              colSpan: 3,
              count: this.isRemoteData() ? this.state.query.totalCount : a,
              rowsPerPage: this.state.pageSize,
              rowsPerPageOptions: t.options.pageSizeOptions,
              SelectProps: {
                renderValue: (o) =>
                  r.createElement(
                    k,
                    { sx: { padding: '0px 5px' } },
                    o + ' ' + t.localization.pagination.labelRows + ' '
                  )
              },
              page: this.isRemoteData() ? this.state.query.page : e,
              onPageChange: this.onPageChange,
              onRowsPerPageChange: this.onRowsPerPageChange,
              ActionsComponent: (o) =>
                t.options.paginationType === 'normal'
                  ? r.createElement(
                      F,
                      n(n({}, o), {
                        showFirstLastPageButtons:
                          t.options.showFirstLastPageButtons
                      })
                    )
                  : r.createElement(
                      z,
                      n(n({}, o), {
                        showFirstLastPageButtons:
                          t.options.showFirstLastPageButtons,
                        numberOfPagesAround: t.options.numberOfPagesAround
                      })
                    ),
              labelRowsPerPage: t.localization.pagination.labelRowsPerPage
            })
          )
        )
      );
    }
  }
  render() {
    const t = this.getProps();
    return r.createElement(
      A,
      { onDragEnd: this.onDragEnd, nonce: t.options.cspNonce },
      r.createElement(
        this.props.components.Container,
        { style: n({ position: 'relative' }, t.style) },
        t.options.paginationPosition === 'top' ||
          t.options.paginationPosition === 'both'
          ? this.renderFooter()
          : null,
        t.options.toolbar &&
          r.createElement(this.props.components.Toolbar, {
            actions: t.actions,
            components: this.props.components,
            originalData: this.state.originalData,
            columns: this.state.columns,
            selectedCount: this.state.selectedCount,
            getFieldValue: this.dataManager.getFieldValue,
            data: this.getRenderData,
            title: t.title,
            searchText: this.dataManager.searchText,
            searchDebounceDelay: this.dataManager.searchDebounceDelay,
            onSearchChanged: this.onSearchChangeDebounce,
            isRemoteData: this.isRemoteData(),
            dataManager: this.dataManager,
            onColumnsChanged: this.onChangeColumnHidden
          }),
        t.options.grouping &&
          r.createElement(this.props.components.Groupbar, {
            groupColumns: this.state.columns
              .filter((e) => e.tableData.groupOrder > -1)
              .sort((e, a) => e.tableData.groupOrder - a.tableData.groupOrder),
            onSortChanged: this.onChangeGroupOrder,
            onGroupRemoved: this.onGroupRemoved,
            onGroupChange: this.props.onGroupChange,
            persistentGroupingsId: t.options.persistentGroupingsId
          }),
        r.createElement(
          L,
          { double: t.options.doubleHorizontalScroll },
          r.createElement(
            T,
            { droppableId: 'headers', direction: 'horizontal' },
            (e, a) => {
              const o = this.renderTable(t);
              return r.createElement(
                'div',
                { ref: e.innerRef },
                r.createElement(
                  'div',
                  {
                    ref: this.tableContainerDiv,
                    style: {
                      maxHeight: t.options.maxBodyHeight,
                      minHeight: t.options.minBodyHeight,
                      overflowY: t.options.overflowY
                    }
                  },
                  this.state.width &&
                    t.options.fixedColumns &&
                    t.options.fixedColumns.right
                    ? r.createElement(
                        'div',
                        {
                          style: {
                            width: this.getColumnsWidth(
                              t,
                              -1 * t.options.fixedColumns.right
                            ),
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            boxShadow: '-2px 0px 15px rgba(125,147,178,.25)',
                            overflowX: 'clip',
                            zIndex: 11
                          }
                        },
                        r.createElement(
                          'div',
                          {
                            style: {
                              width: this.state.width,
                              background: 'white',
                              transform: `translateX(calc(${this.getColumnsWidth(
                                t,
                                -1 * t.options.fixedColumns.right
                              )} - 100%))`
                            }
                          },
                          o
                        )
                      )
                    : null,
                  r.createElement('div', null, o),
                  this.state.width &&
                    t.options.fixedColumns &&
                    t.options.fixedColumns.left
                    ? r.createElement(
                        'div',
                        {
                          style: {
                            width: this.getColumnsWidth(
                              t,
                              t.options.fixedColumns.left
                            ),
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            boxShadow: '2px 0px 15px rgba(125,147,178,.25)',
                            overflowX: 'clip',
                            zIndex: 11
                          }
                        },
                        r.createElement(
                          'div',
                          {
                            style: {
                              width: this.state.width,
                              background: 'white'
                            },
                            onKeyDown: (i) => {
                              i.key === 'Tab' && i.preventDefault();
                            }
                          },
                          o
                        )
                      )
                    : null
                ),
                e.placeholder
              );
            }
          )
        ),
        (this.state.isLoading || t.isLoading) &&
          t.options.loadingType === 'linear' &&
          r.createElement(
            'div',
            { style: { position: 'relative', width: '100%' } },
            r.createElement(
              'div',
              {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%'
                }
              },
              r.createElement(v, null)
            )
          ),
        t.options.paginationPosition === 'bottom' ||
          t.options.paginationPosition === 'both'
          ? this.renderFooter()
          : null,
        (this.state.isLoading || t.isLoading) &&
          t.options.loadingType === 'overlay' &&
          r.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 11
              }
            },
            r.createElement(this.props.components.OverlayLoading, {
              theme: t.theme
            })
          ),
        this.state.errorState &&
          this.state.errorState.errorCause === 'query' &&
          r.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 11
              }
            },
            r.createElement(this.props.components.OverlayError, {
              error: this.state.errorState,
              retry: this.retry,
              theme: t.theme
            })
          )
      )
    );
  }
}
function W(p, t, e) {
  let a = [],
    o = [];
  return e > 0 && (a = R(p, e)), t && (o = R(t, e)), [a, o];
}
function R(p, t) {
  return p
    .filter((a) => a.defaultSort && a.sorting !== !1)
    .slice(0, t)
    .map((a, o) => ({
      orderBy: a.tableData
        ? a.tableData.id
        : p.findIndex((i) => i.field === a.field),
      orderDirection: a.defaultSort,
      sortOrder: o + 1
    }));
}
