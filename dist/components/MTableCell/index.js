var T = Object.prototype.hasOwnProperty;
var m = Object.getOwnPropertySymbols,
  h = Object.prototype.propertyIsEnumerable;
var n = Object.assign;
var u = (e, r) => {
  var o = {};
  for (var t in e) T.call(e, t) && r.indexOf(t) < 0 && (o[t] = e[t]);
  if (e != null && m)
    for (var t of m(e)) r.indexOf(t) < 0 && h.call(e, t) && (o[t] = e[t]);
  return o;
};
import a from 'react';
import p from '@mui/material/TableCell';
import l from 'prop-types';
import { getRenderValue as w } from './cellUtils';
import { getStyle as v } from '@utils';
import { useIconStore as D } from '@store';
function s(e) {
  const r = D(),
    {
      forwardedRef: o,
      scrollWidth: t,
      rowData: b,
      onCellEditStarted: g,
      cellEditable: y,
      columnDef: i = {},
      errorState: R
    } = e,
    C = u(e, [
      'forwardedRef',
      'scrollWidth',
      'rowData',
      'onCellEditStarted',
      'cellEditable',
      'columnDef',
      'errorState'
    ]),
    S = (c) => {
      e.columnDef.disableClick && c.stopPropagation();
    },
    f =
      i.align !== void 0
        ? i.align
        : ['numeric', 'currency'].indexOf(i.type) !== -1
        ? 'right'
        : 'left';
  let d = w(e, r);
  return (
    y &&
      (d = a.createElement(
        'div',
        {
          style: {
            borderBottom: '1px dashed grey',
            cursor: 'pointer',
            marginLeft: f === 'right' ? 'auto' : void 0,
            width: 'max-content'
          },
          onClick: (c) => {
            c.stopPropagation(), g(b, i);
          }
        },
        d
      )),
    a.createElement(
      p,
      n(n({}, C), {
        size: e.size,
        value: e.value,
        style: v(e),
        align: f,
        onClick: S,
        ref: o,
        colSpan: e.colSpan,
        'data-testid': 'mtablecell'
      }),
      e.children,
      d
    )
  );
}
s.propTypes = {
  columnDef: l.object.isRequired,
  value: l.any,
  rowData: l.object,
  errorState: l.oneOfType([l.object, l.bool]),
  forwardedRef: l.oneOfType([l.element, l.func]),
  size: l.string,
  colSpan: l.number,
  children: l.element,
  cellEditable: l.bool,
  onCellEditStarted: l.func
};
export default a.forwardRef(function (r, o) {
  return a.createElement(s, n(n({}, r), { forwardedRef: o }));
});
