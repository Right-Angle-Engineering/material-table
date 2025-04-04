var v = Object.prototype.hasOwnProperty;
var b = Object.getOwnPropertySymbols,
  S = Object.prototype.propertyIsEnumerable;
var t = Object.assign;
var u = (i, d) => {
  var e = {};
  for (var o in i) v.call(i, o) && d.indexOf(o) < 0 && (e[o] = i[o]);
  if (i != null && b)
    for (var o of b(i)) d.indexOf(o) < 0 && S.call(i, o) && (e[o] = i[o]);
  return e;
};
import r, { useState as E, useEffect as x } from 'react';
import n from 'prop-types';
import { TableCell as T, CircularProgress as m } from '@mui/material';
function y(o) {
  var { columnDef: i = {}, localization: d = j.localization } = o,
    e = u(o, ['columnDef', 'localization']);
  const [a, s] = E(() => ({ isLoading: !1, value: e.rowData[i.field] }));
  x(() => {
    e.cellEditable
      .onCellEditApproved(a.value, e.rowData[i.field], e.rowData, i)
      .then(() => {
        s(t(t({}, a), { isLoading: !1 })), e.onCellEditFinished(e.rowData, i);
      })
      .catch(() => {
        s(t(t({}, a), { isLoading: !1 }));
      });
  }, []);
  const g = () => {
      let l = {
        boxShadow: '2px 0px 15px rgba(125,147,178,.25)',
        color: 'inherit',
        width: i.tableData.width,
        boxSizing: 'border-box',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        padding: '0 16px'
      };
      return (
        typeof i.cellStyle == 'function'
          ? (l = t(t({}, l), i.cellStyle(a.value, e.rowData)))
          : (l = t(t({}, l), i.cellStyle)),
        typeof e.cellEditable.cellStyle == 'function'
          ? (l = t(t({}, l), e.cellEditable.cellStyle(a.value, e.rowData, i)))
          : (l = t(t({}, l), e.cellEditable.cellStyle)),
        l
      );
    },
    w = (l) => {
      l.keyCode === 13 ? c() : l.keyCode === 27 && f();
    },
    c = () => {
      s(t(t({}, a), { isLoading: !0 }));
    },
    f = () => {
      e.onCellEditFinished(e.rowData, i);
    };
  function C() {
    if (a.isLoading)
      return r.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', width: 60 } },
        r.createElement(m, { size: 20 })
      );
    const l = [
      {
        icon: e.icons.Check,
        tooltip: d && d.saveTooltip,
        onClick: c,
        disabled: a.isLoading
      },
      {
        icon: e.icons.Clear,
        tooltip: d && d.cancelTooltip,
        onClick: f,
        disabled: a.isLoading
      }
    ];
    return r.createElement(e.components.Actions, {
      actions: l,
      components: e.components,
      size: 'small'
    });
  }
  return r.createElement(
    T,
    { size: e.size, style: g(), padding: 'none', ref: e.forwardedRef },
    r.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center' } },
      r.createElement(
        'div',
        { style: { flex: 1, marginRight: 4 } },
        r.createElement(e.components.EditField, {
          columnDef: i,
          value: a.value,
          onChange: (l, h) => s(t(t({}, l), { value: h })),
          onKeyDown: w,
          disabled: a.isLoading,
          rowData: e.rowData,
          autoFocus: !0
        })
      ),
      C()
    )
  );
}
const j = { localization: { saveTooltip: 'Save', cancelTooltip: 'Cancel' } };
y.propTypes = {
  cellEditable: n.object.isRequired,
  columnDef: n.object.isRequired,
  components: n.object.isRequired,
  errorState: n.oneOfType([n.object, n.bool]),
  icons: n.object.isRequired,
  localization: n.object.isRequired,
  onCellEditFinished: n.func.isRequired,
  rowData: n.object.isRequired,
  size: n.string,
  forwardedRef: n.element
};
export default r.forwardRef(function (d, e) {
  return r.createElement(y, t(t({}, d), { forwardedRef: e }));
});
