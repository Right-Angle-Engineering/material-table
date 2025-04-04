var o = Object.assign;
import n from 'react';
import { defaultProps as s } from './defaults';
import { propTypes as m } from './prop-types';
import t from './material-table';
import { useTheme as b } from '@mui/material/styles';
import {
  useMergeProps as T,
  withContext as M,
  useLocalizationStore as c
} from './store/LocalizationStore';
t.propTypes = m;
export default M((a) => {
  const e = o(o({}, s), a),
    r = b(),
    { localization: l, options: i, components: p } = T(e);
  return n.createElement(
    t,
    o(o({}, e), {
      theme: r,
      options: i,
      components: p,
      localization: l,
      ref: e.tableRef
    })
  );
});
export { c as useLocalizationStore };
export {
  MTableAction,
  MTableActions,
  MTableBody,
  MTableBodyRow,
  MTableCell,
  MTableEditCell,
  MTableEditField,
  MTableEditRow,
  MTableFilterRow,
  MTableGroupRow,
  MTableGroupbar,
  MTableHeader,
  MTablePagination,
  MTableSteppedPagination,
  MTableToolbar
} from './components';
export { ALL_COLUMNS } from './utils/constants';
