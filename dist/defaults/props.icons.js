var e = Object.assign;
import a, { forwardRef as d } from 'react';
import { Icon as o } from '@mui/material';
import {
  AddBox as f,
  ArrowDownward as l,
  Check as h,
  ChevronLeft as n,
  ChevronRight as i,
  Clear as s,
  DeleteOutline as m,
  Edit as g,
  FilterList as _,
  FirstPage as v,
  LastPage as w,
  Remove as p,
  SaveAlt as u,
  Search as C,
  ViewColumn as P,
  Replay as S
} from '@mui/icons-material';
export default {
  Add: d((t, r) =>
    a.createElement(f, e(e({}, t), { ref: r, 'data-testid': 'add_box' }))
  ),
  Check: d((t, r) =>
    a.createElement(h, e(e({}, t), { ref: r, 'data-testid': 'check' }))
  ),
  Clear: d((t, r) =>
    a.createElement(s, e(e({}, t), { ref: r, 'data-testid': 'clear' }))
  ),
  Delete: d((t, r) =>
    a.createElement(m, e(e({}, t), { ref: r, 'data-testid': 'delete_outline' }))
  ),
  DetailPanel: d((t, r) =>
    a.createElement(i, e(e({}, t), { ref: r, 'data-testid': 'chevron_right' }))
  ),
  Edit: d((t, r) =>
    a.createElement(g, e(e({}, t), { ref: r, 'data-testid': 'edit' }))
  ),
  Export: d((t, r) =>
    a.createElement(u, e(e({}, t), { ref: r, 'data-testid': 'save_alt' }))
  ),
  Filter: d((t, r) =>
    a.createElement(_, e(e({}, t), { ref: r, 'data-testid': 'filter_list' }))
  ),
  FirstPage: d((t, r) =>
    a.createElement(v, e(e({}, t), { ref: r, 'data-testid': 'first_page' }))
  ),
  LastPage: d((t, r) =>
    a.createElement(w, e(e({}, t), { ref: r, 'data-testid': 'last_page' }))
  ),
  NextPage: d((t, r) =>
    a.createElement(i, e(e({}, t), { ref: r, 'data-testid': 'chevron_right' }))
  ),
  PreviousPage: d((t, r) =>
    a.createElement(n, e(e({}, t), { ref: r, 'data-testid': 'chevron_left' }))
  ),
  ResetSearch: d((t, r) =>
    a.createElement(s, e(e({}, t), { ref: r, 'data-testid': 'clear' }))
  ),
  Resize: d((t, r) =>
    a.createElement(
      o,
      e(e({}, t), { ref: r, 'data-testid': 'drag_handle' }),
      '|'
    )
  ),
  Retry: d((t, r) =>
    a.createElement(S, e(e({}, t), { ref: r, 'data-testid': 'replay' }))
  ),
  Search: d((t, r) =>
    a.createElement(C, e(e({}, t), { ref: r, 'data-testid': 'search' }))
  ),
  SortArrow: d((t, r) =>
    a.createElement(l, e(e({}, t), { ref: r, 'data-testid': 'arrow_downward' }))
  ),
  ThirdStateCheck: d((t, r) =>
    a.createElement(p, e(e({}, t), { ref: r, 'data-testid': 'remove' }))
  ),
  ViewColumn: d((t, r) =>
    a.createElement(P, e(e({}, t), { ref: r, 'data-testid': 'view_column' }))
  )
};
