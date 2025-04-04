var f = Object.assign;
import n, { createElement as o } from 'react';
function i({ columnDef: e, onFilterChanged: r, forwardedRef: t }) {
  return o(e.filterComponent, {
    columnDef: e,
    onFilterChanged: r,
    forwardedRef: t
  });
}
export default n.forwardRef(function (r, t) {
  return n.createElement(i, f(f({}, r), { forwardedRef: t }));
});
