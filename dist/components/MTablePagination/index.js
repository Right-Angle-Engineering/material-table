var g = Object.assign;
import s from '@mui/material/IconButton';
import c from '@mui/material/Tooltip';
import y from '@mui/material/Typography';
import i from 'prop-types';
import e from 'react';
import { Box as x } from '@mui/material';
import { useTheme as B } from '@mui/material/styles';
import * as C from '../../utils/common-values';
import {
  useLocalizationStore as k,
  useIconStore as L
} from '../../store/LocalizationStore';
function p(o) {
  const n = B(),
    a = L(),
    t = k().pagination;
  process.env.NODE_ENV === 'development' &&
    !o.onPageChange &&
    console.error(
      'The prop `onPageChange` in pagination is undefined and paging does not work. This is most likely caused by an old material-ui version <= 4.11.X.To fix this, install either material-ui >=4.12 or downgrade material-table-core to <=3.0.15.'
    ),
    process.env.NODE_ENV === 'development' &&
      t.labelRowsSelect &&
      console.warn(
        'The prop `labelRowsSelect` was renamed to labelDisplayedRows. Please rename the prop accordingly: https://mui.com/material-ui/api/table-pagination/#main-content.'
      );
  const d = (l) => {
      o.onPageChange(l, 0);
    },
    f = (l) => {
      o.onPageChange(l, o.page - 1);
    },
    P = (l) => {
      o.onPageChange(l, o.page + 1);
    },
    h = (l) => {
      o.onPageChange(l, Math.max(0, Math.ceil(o.count / o.rowsPerPage) - 1));
    },
    { count: u, page: r, rowsPerPage: m, showFirstLastPageButtons: b = !0 } = o,
    { first: T, last: w } = C.parseFirstLastPageButtons(
      b,
      n.direction === 'rtl'
    );
  return e.createElement(
    x,
    {
      sx: {
        flexShrink: 0,
        color: 'text.secondary',
        display: 'flex',
        alignItems: 'center'
      },
      ref: o.forwardedRef
    },
    T &&
      e.createElement(
        c,
        { title: t.firstTooltip },
        e.createElement(
          'span',
          null,
          e.createElement(
            s,
            {
              onClick: d,
              disabled: r === 0,
              'aria-label': t.firstAriaLabel,
              size: 'large'
            },
            n.direction === 'rtl'
              ? e.createElement(a.LastPage, null)
              : e.createElement(a.FirstPage, null)
          )
        )
      ),
    e.createElement(
      c,
      { title: t.previousTooltip },
      e.createElement(
        'span',
        null,
        e.createElement(
          s,
          { onClick: f, disabled: r === 0, 'aria-label': t.previousAriaLabel },
          n.direction === 'rtl'
            ? e.createElement(a.NextPage, null)
            : e.createElement(a.PreviousPage, null)
        )
      )
    ),
    e.createElement(
      y,
      {
        variant: 'caption',
        style: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
          flexBasis: 'inherit'
        }
      },
      t.labelDisplayedRows
        .replace('{from}', o.count === 0 ? 0 : o.page * o.rowsPerPage + 1)
        .replace('{to}', Math.min((o.page + 1) * o.rowsPerPage, o.count))
        .replace('{count}', o.count)
    ),
    e.createElement(
      c,
      { title: t.nextTooltip },
      e.createElement(
        'span',
        null,
        e.createElement(
          s,
          {
            onClick: P,
            disabled: r >= Math.ceil(u / m) - 1,
            'aria-label': t.nextAriaLabel
          },
          n.direction === 'rtl'
            ? e.createElement(a.PreviousPage, null)
            : e.createElement(a.NextPage, null)
        )
      )
    ),
    w &&
      e.createElement(
        c,
        { title: t.lastTooltip },
        e.createElement(
          'span',
          null,
          e.createElement(
            s,
            {
              onClick: h,
              disabled: r >= Math.ceil(u / m) - 1,
              'aria-label': t.lastAriaLabel,
              size: 'large'
            },
            n.direction === 'rtl'
              ? e.createElement(a.FirstPage, null)
              : e.createElement(a.LastPage, null)
          )
        )
      )
  );
}
p.propTypes = {
  onPageChange: i.func,
  page: i.number,
  count: i.number,
  rowsPerPage: i.number,
  classes: i.object,
  localization: i.object,
  showFirstLastPageButtons: i.oneOfType([i.object, i.bool]),
  forwardedRef: i.func
};
const v = e.forwardRef(function (n, a) {
    return e.createElement(p, g(g({}, n), { forwardedRef: a }));
  }),
  M = v;
export default M;
