var d = Object.prototype.hasOwnProperty;
var f = Object.getOwnPropertySymbols,
  F = Object.prototype.propertyIsEnumerable;
var l = Object.assign;
var u = (o, e) => {
  var t = {};
  for (var i in o) d.call(o, i) && e.indexOf(i) < 0 && (t[i] = o[i]);
  if (o != null && f)
    for (var i of f(o)) e.indexOf(i) < 0 && F.call(o, i) && (t[i] = o[i]);
  return t;
};
import m from 'react';
import n from 'prop-types';
import c from './LookupField';
import D from './BooleanField';
import y from './DateField';
import T from './TimeField';
import a from './TextField';
import b from './DateTimeField';
import C from './CurrencyField';
function r(t) {
  var { forwardedRef: o } = t,
    e = u(t, ['forwardedRef']);
  let i = 'ok';
  return (
    e.columnDef.editComponent
      ? (i = e.columnDef.editComponent(e))
      : e.columnDef.lookup
      ? (i = m.createElement(c, l(l({}, e), { ref: o })))
      : e.columnDef.type === 'boolean'
      ? (i = m.createElement(D, l(l({}, e), { ref: o })))
      : e.columnDef.type === 'date'
      ? (i = m.createElement(y, l(l({}, e), { ref: o })))
      : e.columnDef.type === 'time'
      ? (i = m.createElement(T, l(l({}, e), { ref: o })))
      : e.columnDef.type === 'datetime'
      ? (i = m.createElement(b, l(l({}, e), { ref: o })))
      : e.columnDef.type === 'currency'
      ? (i = m.createElement(C, l(l({}, e), { ref: o })))
      : (i = m.createElement(a, l(l({}, e), { ref: o }))),
    i
  );
}
r.propTypes = {
  value: n.any,
  onChange: n.func.isRequired,
  columnDef: n.object.isRequired,
  locale: n.object
};
export default m.forwardRef(function (e, t) {
  return m.createElement(r, l(l({}, e), { forwardedRef: t }));
});
