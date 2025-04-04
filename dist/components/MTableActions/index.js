var t = Object.assign;
import o from 'react';
import e from 'prop-types';
function i({
  actions: r,
  columns: n,
  components: a,
  data: d = {},
  onColumnsChanged: s,
  size: f,
  disabled: l,
  forwardedRef: p
}) {
  return r
    ? o.createElement(
        'div',
        { style: { display: 'flex' }, ref: p },
        r.map((u, c) =>
          o.createElement(a.Action, {
            action: u,
            key: 'action-' + c,
            columns: n,
            data: d,
            size: f,
            onColumnsChanged: s,
            disabled: l
          })
        )
      )
    : null;
}
i.propTypes = {
  columns: e.array,
  components: e.object.isRequired,
  actions: e.array.isRequired,
  data: e.oneOfType([e.object, e.arrayOf(e.object)]),
  disabled: e.bool,
  onColumnsChanged: e.func,
  size: e.string,
  forwardedRef: e.element
};
export default o.forwardRef(function (n, a) {
  return o.createElement(i, t(t({}, n), { forwardedRef: a }));
});
