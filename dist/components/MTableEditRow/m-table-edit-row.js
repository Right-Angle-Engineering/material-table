var P = Object.defineProperty;
var A = Object.prototype.hasOwnProperty;
var E = Object.getOwnPropertySymbols,
  V = Object.prototype.propertyIsEnumerable;
var a = Object.assign;
var T = (n, e) => {
  var o = {};
  for (var t in n) A.call(n, t) && e.indexOf(t) < 0 && (o[t] = n[t]);
  if (n != null && E)
    for (var t of E(n)) e.indexOf(t) < 0 && V.call(n, t) && (o[t] = n[t]);
  return o;
};
var w = (n, e, o) => (
  typeof e != 'symbol' && (e += ''),
  e in n
    ? P(n, e, { enumerable: !0, configurable: !0, writable: !0, value: o })
    : (n[e] = o)
);
import c from '@mui/material/TableCell';
import B from '@mui/material/TableRow';
import j from '@mui/material/Typography';
import i from 'prop-types';
import s from 'react';
import { selectFromObject as R, setObjectByKey as F } from '../../utils';
import * as S from '../../utils/common-values';
import { validateInput as v } from '../../utils/validate';
export default class y extends s.Component {
  constructor(e) {
    super(e);
    w(this, 'handleSave', () => {
      this.props.onEditingApproved(
        this.props.mode,
        this.state.data,
        this.props.data
      );
    });
    w(this, 'handleKeyDown', (e) => {
      e.keyCode === 13 && e.target.type !== 'textarea'
        ? this.handleSave()
        : e.keyCode === 13 && e.target.type === 'textarea' && e.shiftKey
        ? this.handleSave()
        : e.keyCode === 27 &&
          this.props.onEditingCanceled(this.props.mode, this.props.data);
    });
    this.state = {
      data: e.data ? JSON.parse(JSON.stringify(e.data)) : this.createRowData()
    };
  }
  createRowData() {
    return this.props.columns
      .filter((e) => 'initialEditValue' in e && e.field)
      .reduce((e, o) => ((e[o.field] = o.initialEditValue), e), {});
  }
  renderColumns() {
    const e = S.elementSize(this.props);
    return this.props.columns
      .filter((t) => !t.hidden && !(t.tableData.groupOrder > -1))
      .sort((t, d) => t.tableData.columnOrder - d.tableData.columnOrder)
      .map((t, d) => {
        const u =
            typeof this.state.data[t.field] != 'undefined'
              ? this.state.data[t.field]
              : R(this.state.data, t.field),
          f = (r, m) => {
            let p = { color: 'inherit' };
            return (
              typeof r.cellStyle == 'function'
                ? (p = a(a({}, p), r.cellStyle(m, this.props.data)))
                : (p = a(a({}, p), r.cellStyle)),
              r.disableClick && (p.cursor = 'default'),
              a({}, p)
            );
          },
          z = {};
        d === 0 && (z.paddingLeft = 24 + this.props.level * 20);
        let h = !1;
        if (
          (t.editable === void 0 && (h = !0),
          t.editable === 'always' && (h = !0),
          t.editable === 'onAdd' && this.props.mode === 'add' && (h = !0),
          t.editable === 'onUpdate' && this.props.mode === 'update' && (h = !0),
          typeof t.editable == 'function' &&
            (h = t.editable(t, this.props.data)),
          !t.field || !h)
        ) {
          const r = this.props.getFieldValue(this.state.data, t);
          return s.createElement(this.props.components.Cell, {
            size: e,
            icons: this.props.icons,
            columnDef: t,
            value: r,
            key: t.tableData.id,
            rowData: this.props.data,
            style: f(t, u)
          });
        } else {
          const { editComponent: r } = t,
            m = T(t, ['editComponent']),
            p = r || this.props.components.EditField,
            k = v(t, this.state.data);
          return s.createElement(
            c,
            {
              size: e,
              key: t.tableData.id,
              align: ['numeric'].indexOf(t.type) !== -1 ? 'right' : 'left',
              style: f(t, u)
            },
            s.createElement(p, {
              key: t.tableData.id,
              columnDef: m,
              value: u,
              error: !k.isValid,
              helperText: k.helperText,
              locale: this.props.localization.dateTimePickerLocalization,
              rowData: this.state.data,
              onChange: (g) => {
                const C = a({}, this.state.data);
                F(C, t.field, g),
                  this.setState({ data: C }, () => {
                    this.props.onBulkEditRowChanged &&
                      this.props.onBulkEditRowChanged(this.props.data, C);
                  });
              },
              onRowDataChange: (g) => {
                this.setState({ data: g }, () => {
                  this.props.onBulkEditRowChanged &&
                    this.props.onBulkEditRowChanged(this.props.data, g);
                });
              }
            })
          );
        }
      });
  }
  renderActions() {
    if (this.props.mode === 'bulk') return;
    const e = S.elementSize(this.props),
      o = a(a({}, y.defaultProps.localization), this.props.localization),
      t = this.props.columns.every((u) => v(u, this.state.data).isValid),
      d = [
        {
          icon: this.props.icons.Check,
          tooltip: o.saveTooltip,
          disabled: !t,
          onClick: this.handleSave
        },
        {
          icon: this.props.icons.Clear,
          tooltip: o.cancelTooltip,
          onClick: () => {
            this.props.onEditingCanceled(this.props.mode, this.props.data);
          }
        }
      ];
    return s.createElement(
      c,
      {
        size: e,
        padding: 'none',
        key: 'key-actions-column',
        style: a(
          { width: 42 * d.length, padding: '0px 5px' },
          this.props.options.editCellStyle
        )
      },
      s.createElement(this.props.components.Actions, {
        data: this.props.data,
        actions: d,
        components: this.props.components,
        size: e
      })
    );
  }
  getStyle() {
    return { borderBottom: '1px solid red' };
  }
  render() {
    const e = S.elementSize(this.props),
      o = a(a({}, y.defaultProps.localization), this.props.localization);
    let t;
    if (
      this.props.mode === 'add' ||
      this.props.mode === 'update' ||
      this.props.mode === 'bulk'
    )
      t = this.renderColumns();
    else {
      const l = this.props.columns.filter(
        (b) => !b.hidden && !(b.tableData.groupOrder > -1)
      ).length;
      t = [
        s.createElement(
          c,
          {
            size: e,
            padding:
              this.props.options.actionsColumnIndex === 0 ? 'none' : void 0,
            key: 'key-edit-cell',
            colSpan: l
          },
          s.createElement(j, { variant: 'h6' }, o.deleteText)
        )
      ];
    }
    if (
      (this.props.options.selection &&
        t.splice(
          0,
          0,
          s.createElement(c, { padding: 'none', key: 'key-selection-cell' })
        ),
      this.props.isTreeData &&
        t.splice(
          0,
          0,
          s.createElement(c, { padding: 'none', key: 'key-tree-data-cell' })
        ),
      this.props.options.actionsColumnIndex === -1)
    )
      t.push(this.renderActions());
    else if (this.props.options.actionsColumnIndex >= 0) {
      let l = 0;
      this.props.options.selection && (l = 1),
        this.props.isTreeData &&
          ((l = 1), this.props.options.selection && t.splice(1, 1)),
        t.splice(
          this.props.options.actionsColumnIndex + l,
          0,
          this.renderActions()
        );
    }
    if (this.props.detailPanel) {
      const b =
        this.props.options.detailPanelColumnAlignment === 'left' ? 0 : t.length;
      t.splice(
        b,
        0,
        s.createElement(c, { padding: 'none', key: 'key-detail-panel-cell' })
      );
    }
    this.props.columns
      .filter((l) => l.tableData.groupOrder > -1)
      .forEach((l) => {
        t.splice(
          0,
          0,
          s.createElement(c, {
            padding: 'none',
            key: 'key-group-cell' + l.tableData.id
          })
        );
      });
    const x = this.props,
      {
        detailPanel: d,
        isTreeData: u,
        onRowClick: f,
        onRowSelected: z,
        onTreeExpandChanged: h,
        onToggleDetailPanel: r,
        onEditingApproved: m,
        onEditingCanceled: p,
        getFieldValue: k,
        components: g,
        icons: C,
        columns: I,
        localization: K,
        options: q,
        actions: J,
        errorState: L,
        onBulkEditRowChanged: N,
        scrollWidth: U
      } = x,
      O = T(x, [
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
        'icons',
        'columns',
        'localization',
        'options',
        'actions',
        'errorState',
        'onBulkEditRowChanged',
        'scrollWidth'
      ]);
    return s.createElement(
      s.Fragment,
      null,
      s.createElement(
        B,
        a(a({ onKeyDown: this.handleKeyDown }, O), { style: this.getStyle() }),
        t
      )
    );
  }
}
(y.defaultProps = {
  actions: [],
  index: 0,
  options: {},
  path: [],
  localization: {
    saveTooltip: 'Save',
    cancelTooltip: 'Cancel',
    deleteText: 'Are you sure you want to delete this row?'
  },
  onBulkEditRowChanged: () => {}
}),
  (y.propTypes = {
    actions: i.array,
    icons: i.any.isRequired,
    index: i.number.isRequired,
    data: i.object,
    detailPanel: i.oneOfType([
      i.func,
      i.arrayOf(i.oneOfType([i.object, i.func]))
    ]),
    options: i.object.isRequired,
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
  });
