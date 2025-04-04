var d = Object.assign;
import u from '@mui/material/IconButton';
import g from '@mui/material/Tooltip';
import b from '@mui/material/Box';
import N from '@mui/material/Button';
import a from 'prop-types';
import t from 'react';
import { useTheme as j } from '@mui/material/styles';
import * as H from '../../utils/common-values';
import { useLocalizationStore as V, useIconStore as W } from '../../store';
function x(o) {
  const r = j(),
    n = V().pagination,
    i = W(),
    B = (e) => {
      o.onPageChange(e, 0);
    },
    T = (e) => {
      o.onPageChange(e, o.page - 1);
    },
    C = (e) => {
      o.onPageChange(e, o.page + 1);
    },
    k = (e) => (c) => {
      o.onPageChange(c, e);
    },
    M = (e) => {
      o.onPageChange(e, Math.max(0, Math.ceil(o.count / o.rowsPerPage) - 1));
    };
  function L(e, c, F, m) {
    const P = [];
    m = Math.max(1, Math.min(10, m));
    for (let l = Math.max(e - m + 1, 0); l <= Math.min(c + m - 1, F); l++) {
      const A = l === o.page ? 'contained' : 'text';
      P.push(
        t.createElement(
          N,
          {
            size: 'small',
            style: {
              boxShadow: 'none',
              maxWidth: '30px',
              maxHeight: '30px',
              minWidth: '30px',
              minHeight: '30px'
            },
            disabled: l === o.page,
            variant: A,
            onClick: k(l),
            key: l
          },
          l + 1
        )
      );
    }
    return t.createElement('span', null, P);
  }
  const {
      count: f,
      page: s,
      rowsPerPage: h,
      showFirstLastPageButtons: y = !0,
      numberOfPagesAround: w
    } = o,
    p = Math.ceil(f / h) - 1,
    I = Math.max(s - 1, 0),
    S = Math.min(p, s + 1),
    { first: v, last: z } = H.parseFirstLastPageButtons(
      y,
      r.direction === 'rtl'
    );
  return t.createElement(
    b,
    {
      sx: {
        flexShrink: 0,
        color: 'text.secondary',
        marginLeft: 2.5,
        display: 'flex',
        alignItems: 'center'
      },
      ref: o.forwardedRef
    },
    v &&
      t.createElement(
        g,
        { title: n.firstTooltip },
        t.createElement(
          'span',
          null,
          t.createElement(
            u,
            {
              onClick: B,
              disabled: s === 0,
              'aria-label': n.firstAriaLabel,
              size: 'large'
            },
            r.direction === 'rtl'
              ? t.createElement(i.LastPage, null)
              : t.createElement(i.FirstPage, null)
          )
        )
      ),
    t.createElement(
      g,
      { title: n.previousTooltip },
      t.createElement(
        'span',
        null,
        t.createElement(
          u,
          { onClick: T, disabled: s === 0, 'aria-label': n.previousAriaLabel },
          t.createElement(i.PreviousPage, null)
        )
      )
    ),
    t.createElement(
      b,
      { sx: { display: { xs: 'false', sm: 'false', md: 'block' } } },
      L(I, S, p, w)
    ),
    t.createElement(
      g,
      { title: n.nextTooltip },
      t.createElement(
        'span',
        null,
        t.createElement(
          u,
          {
            onClick: C,
            disabled: s >= p,
            'aria-label': n.nextAriaLabel,
            size: 'large'
          },
          r.direction === 'rtl'
            ? t.createElement(i.PreviousPage, null)
            : t.createElement(i.NextPage, null)
        )
      )
    ),
    z &&
      t.createElement(
        g,
        { title: n.lastTooltip },
        t.createElement(
          'span',
          null,
          t.createElement(
            u,
            {
              onClick: M,
              disabled: s >= Math.ceil(f / h) - 1,
              'aria-label': n.lastAriaLabel,
              size: 'large'
            },
            r.direction === 'rtl'
              ? t.createElement(i.FirstPage, null)
              : t.createElement(i.LastPage, null)
          )
        )
      )
  );
}
x.propTypes = {
  onPageChange: a.func,
  page: a.number,
  forwardedRef: a.func,
  count: a.number,
  rowsPerPage: a.number,
  numberOfPagesAround: a.number,
  classes: a.object,
  theme: a.any,
  showFirstLastPageButtons: a.oneOfType([a.object, a.bool])
};
const E = t.forwardRef(function (r, n) {
    return t.createElement(x, d(d({}, r), { forwardedRef: n }));
  }),
  q = E;
export default q;
