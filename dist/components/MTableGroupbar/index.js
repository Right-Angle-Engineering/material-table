var t = Object.assign;
import y from '@mui/material/Toolbar';
import x from '@mui/material/Chip';
import f from '@mui/material/Typography';
import i from 'prop-types';
import o, { useEffect as C } from 'react';
import { Droppable as G, Draggable as I } from '@hello-pangea/dnd';
import { useLocalizationStore as T, useIconStore as D } from '@store';
import { Box as s } from '@mui/material';
import { useOptionStore as O } from '../../store/LocalizationStore';
function b(e) {
  const g = T().grouping,
    p = D(),
    u = O(),
    S = (n, r) => t({ userSelect: 'none', margin: `0 ${8}px 0 0` }, r),
    h = (n) => ({
      background: '#0000000a',
      display: 'flex',
      width: '100%',
      padding: 1,
      overflow: 'auto',
      border: '1px solid #ccc',
      borderStyle: 'dashed'
    });
  return (
    C(() => {
      if (e.persistentGroupingsId) {
        const n = e.groupColumns.map((a) => ({
          field: a.field,
          groupOrder: a.tableData.groupOrder,
          groupSort: a.tableData.groupSort,
          columnOrder: a.tableData.columnOrder
        }));
        let r = localStorage.getItem('material-table-groupings');
        r ? (r = JSON.parse(r)) : (r = {}),
          n.length === 0
            ? (delete r[e.persistentGroupingsId],
              Object.keys(r).length === 0
                ? localStorage.removeItem('material-table-groupings')
                : localStorage.setItem(
                    'material-table-groupings',
                    JSON.stringify(r)
                  ))
            : ((r[e.persistentGroupingsId] = n),
              localStorage.setItem(
                'material-table-groupings',
                JSON.stringify(r)
              ));
      }
      e.onGroupChange && e.onGroupChange(e.groupColumns);
    }, [e.groupColumns]),
    o.createElement(
      y,
      { className: e.className, disableGutters: !0, ref: e.forwardedRef },
      o.createElement(
        G,
        {
          droppableId: 'groups',
          direction: 'horizontal',
          placeholder: 'Deneme'
        },
        (n, r) =>
          o.createElement(
            s,
            { ref: n.innerRef, sx: h(r.isDraggingOver) },
            e.groupColumns.length > 0 &&
              o.createElement(
                f,
                { variant: 'caption', sx: { padding: 1 } },
                g.groupedBy
              ),
            e.groupColumns.map((a, d) =>
              o.createElement(
                I,
                {
                  key: a.tableData.id.toString(),
                  draggableId: a.tableData.id.toString(),
                  index: d
                },
                (l, c) => {
                  var m;
                  return o.createElement(
                    s,
                    t(
                      t(
                        t({ ref: l.innerRef }, l.draggableProps),
                        l.dragHandleProps
                      ),
                      { sx: S(c.isDragging, l.draggableProps.style) }
                    ),
                    o.createElement(
                      x,
                      t(t(t({}, l.dragHandleProps), u.groupChipProps), {
                        onClick: () => e.onSortChanged(a),
                        label: o.createElement(
                          s,
                          { sx: { display: 'flex', alignItems: 'center' } },
                          o.createElement(
                            s,
                            { sx: { float: 'left' } },
                            a.title
                          ),
                          a.tableData.groupSort &&
                            o.createElement(p.SortArrow, {
                              sx: {
                                transition: '300ms ease all',
                                transform:
                                  a.tableData.groupSort === 'asc'
                                    ? 'rotate(-180deg)'
                                    : 'none',
                                fontSize: 18
                              }
                            })
                        ),
                        sx: t(
                          { boxShadow: 'none', textTransform: 'none' },
                          (m = u.groupChipProps) != null ? m : {}
                        ),
                        onDelete: () => e.onGroupRemoved(a, d)
                      })
                    )
                  );
                }
              )
            ),
            e.groupColumns.length === 0 &&
              o.createElement(
                f,
                { variant: 'caption', sx: { padding: 1 } },
                g.placeholder
              ),
            n.placeholder
          )
      )
    )
  );
}
b.propTypes = {
  forwardedRef: i.element,
  className: i.string,
  onSortChanged: i.func,
  onGroupRemoved: i.func,
  onGroupChange: i.func,
  persistentGroupingsId: i.string
};
export default o.forwardRef(function (g, p) {
  return o.createElement(b, t(t({}, g), { forwardedRef: p }));
});
