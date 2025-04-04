var t = Object.assign;
import i from 'react';
import n from 'prop-types';
import P from '@mui/material/Icon';
import O from '@mui/material/IconButton';
import u from '@mui/material/Tooltip';
function d({
  action: s = m.action,
  data: e = m.data,
  size: c,
  forwardedRef: b,
  disabled: f
}) {
  let o = s;
  if (
    (typeof o == 'function' && ((o = o(e)), !o)) ||
    (o.action && ((o = o.action(e)), !o)) ||
    o.hidden
  )
    return null;
  const p = o.disabled || f,
    T = (l) => {
      o.onClick && (o.onClick(l, e), l.stopPropagation());
    },
    y = o.handlers || {},
    h = Object.entries(y).reduce(
      (l, [k, C]) => ((l[k] = (I) => C(I, e)), l),
      {}
    );
  let r = null;
  switch (typeof o.icon) {
    case 'string':
      r = i.createElement(P, t({}, o.iconProps), o.icon);
      break;
    case 'function':
      r = o.icon(t(t({}, o.iconProps), { disabled: f }));
      break;
    case 'undefined':
      r = null;
      break;
    default:
      r = i.createElement(o.icon, t({}, o.iconProps));
  }
  const a = i.createElement(
    O,
    t({ ref: b, size: c, color: 'inherit', disabled: p, onClick: T }, h),
    r
  );
  return o.tooltip
    ? p
      ? i.createElement(
          u,
          { title: o.tooltip },
          i.createElement('span', null, a)
        )
      : i.createElement(u, { title: o.tooltip }, a)
    : a;
}
const m = { action: {}, data: {} };
d.propTypes = {
  action: n.oneOfType([n.func, n.object]).isRequired,
  columns: n.array,
  data: n.oneOfType([n.object, n.arrayOf(n.object)]),
  disabled: n.bool,
  onColumnsChanged: n.func,
  size: n.string
};
export default i.forwardRef(function (e, c) {
  return i.createElement(d, t(t({}, e), { forwardedRef: c }));
});
