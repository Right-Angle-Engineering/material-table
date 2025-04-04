import t from 'react';
import { TableCell as f, Collapse as s, TableRow as c } from '@mui/material';
function m(e) {
  const i = Boolean(e.data.tableData && e.data.tableData.showDetailPanel),
    [d, o] = t.useState(i),
    [, u] = t.useReducer((a) => a + 1, 0),
    l = t.useRef();
  t.useEffect(() => {
    setTimeout(() => {
      o(i);
    }, 5);
  }, [i]);
  let n;
  if (
    (t.useEffect(() => {
      n && d && (l.current = n);
    }),
    e.detailPanel)
  )
    typeof e.detailPanel == 'function'
      ? (n = e.detailPanel)
      : ((n = e.detailPanel
          ? e.detailPanel
              .map((a) => (typeof a == 'function' ? a(e.data) : a))
              .find(
                (a) =>
                  a.render.toString() ===
                  (e.data.tableData.showDetailPanel || '').toString()
              )
          : void 0),
        (n = n ? n.render : null));
  else return t.createElement(t.Fragment, null);
  if (!l.current && !e.data.tableData.showDetailPanel) return null;
  const r = n || l.current;
  return t.createElement(
    c,
    null,
    e.options.detailPanelOffset.left > 0 &&
      t.createElement(f, { colSpan: e.options.detailPanelOffset.left }),
    t.createElement(
      f,
      {
        size: e.size,
        colSpan:
          e.renderColumns.length -
          e.options.detailPanelOffset.left -
          e.options.detailPanelOffset.right,
        padding: 'none'
      },
      t.createElement(
        s,
        {
          in: d,
          timeout: 'auto',
          unmountOnExit: !0,
          mountOnEnter: !0,
          onExited: () => {
            (l.current = void 0), u();
          }
        },
        r({ rowData: e.data })
      )
    )
  );
}
export { m as MTableDetailPanel };
