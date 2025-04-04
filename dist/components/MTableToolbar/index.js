var f = Object.assign;
import N from '@mui/material/Checkbox';
import E from '@mui/material/InputAdornment';
import x from '@mui/material/IconButton';
import L from '@mui/material/Menu';
import C from '@mui/material/MenuItem';
import V from '@mui/material/TextField';
import $ from '@mui/material/Toolbar';
import A from '@mui/material/Tooltip';
import j from '@mui/material/Typography';
import { Box as B } from '@mui/material';
import { lighten as H, useTheme as W } from '@mui/material/styles';
import n from 'prop-types';
import t, { useState as M } from 'react';
import {
  useLocalizationStore as G,
  useIconStore as J,
  useOptionStore as K
} from '../../store';
let b;
export function MTableToolbar(e) {
  const s = W(),
    l = G().toolbar,
    [m, O] = M(e.searchText),
    [S, T] = M(null),
    [w, D] = M(null),
    g = J(),
    r = K(),
    u = t.useMemo(
      () => e.originalData.filter((a) => a.tableData.checked),
      [e.originalData]
    ),
    F = (a) => {
      if ((O(a), e.dataManager.changeSearchText(a), !e.isRemoteData)) {
        e.onSearchChanged(a);
        return;
      }
      b && clearTimeout(b),
        (b = setTimeout(() => {
          e.onSearchChanged(a), (b = null);
        }, e.searchDebounceDelay));
    },
    q = () => {
      const a = e.columns
          .filter(
            (i) => (!i.hidden || i.export === !0) && i.field && i.export !== !1
          )
          .sort((i, c) =>
            i.tableData.columnOrder > c.tableData.columnOrder ? 1 : -1
          ),
        o = U(e.data()).map((i) =>
          a.reduce((c, h) => {
            let y;
            return (
              typeof h.customExport == 'function'
                ? (y = h.customExport(i))
                : (y = e.getFieldValue(i, h)),
              (c[h.field] = y),
              c
            );
          }, {})
        );
      return [a, o];
    };
  function I() {
    return r.search
      ? t.createElement(V, {
          autoFocus: r.searchAutoFocus,
          sx:
            r.searchFieldAlignment === 'left' && r.showTitle === !1
              ? void 0
              : d.searchField,
          value: m,
          onChange: (a) => F(a.target.value),
          placeholder: l.searchPlaceholder,
          variant: r.searchFieldVariant,
          slotProps: {
            input: {
              startAdornment: t.createElement(
                E,
                { position: 'start' },
                t.createElement(
                  A,
                  { title: l.searchTooltip },
                  t.createElement(g.Search, { fontSize: 'small' })
                )
              ),
              endAdornment: t.createElement(
                E,
                { position: 'end' },
                t.createElement(
                  x,
                  {
                    disabled: !m,
                    onClick: () => F(''),
                    'aria-label': l.clearSearchAriaLabel
                  },
                  t.createElement(g.ResetSearch, {
                    fontSize: 'small',
                    'aria-label': 'clear'
                  })
                )
              ),
              style: r.searchFieldStyle,
              inputProps: { 'aria-label': l.searchAriaLabel }
            }
          }
        })
      : null;
  }
  function z(a) {
    const p = a ? 'toolbarOnSelect' : 'toolbar';
    return t.createElement(
      'div',
      { style: { display: 'flex' } },
      r.columnsButton &&
        !a &&
        t.createElement(
          'span',
          null,
          t.createElement(
            A,
            { title: l.showColumnsTitle },
            t.createElement(
              x,
              {
                color: 'inherit',
                onClick: (o) => D(o.currentTarget),
                'aria-label': l.showColumnsAriaLabel
              },
              t.createElement(g.ViewColumn, null)
            )
          ),
          t.createElement(
            L,
            { anchorEl: w, open: Boolean(w), onClose: () => D(null) },
            t.createElement(
              C,
              {
                key: 'text',
                disabled: !0,
                style: { opacity: 1, fontWeight: 600, fontSize: 12 }
              },
              l.addRemoveColumns
            ),
            e.columns.map((o) =>
              (
                o.hiddenByColumnsButton !== void 0
                  ? o.hiddenByColumnsButton
                  : e.columnsHiddenInColumnsButton
              )
                ? null
                : t.createElement(
                    'li',
                    { key: o.tableData.id },
                    t.createElement(
                      C,
                      {
                        sx: d.formControlLabel,
                        component: 'label',
                        htmlFor: `column-toggle-${o.tableData.id}`,
                        disabled: o.removable === !1
                      },
                      t.createElement(N, {
                        checked: !o.hidden,
                        id: `column-toggle-${o.tableData.id}`,
                        onChange: () => e.onColumnsChanged(o, !o.hidden)
                      }),
                      t.createElement('span', null, o.title)
                    )
                  )
            )
          )
        ),
      r.exportMenu.length > 0 &&
        t.createElement(
          'span',
          null,
          t.createElement(
            A,
            { title: l.exportTitle },
            t.createElement(
              x,
              {
                color: 'inherit',
                onClick: (o) => T(o.currentTarget),
                'aria-label': l.exportAriaLabel
              },
              t.createElement(g.Export, null)
            )
          ),
          t.createElement(
            L,
            { anchorEl: S, open: Boolean(S), onClose: () => T(null) },
            r.exportMenu.map((o, i) => {
              const [c, h] = q();
              return t.createElement(
                C,
                {
                  key: `${o.label}${i}`,
                  onClick: () => {
                    o.exportFunc(c, h, {
                      searchedData: e.dataManager.searchedData,
                      filteredData: e.dataManager.filteredData,
                      groupedData: e.dataManager.groupedData,
                      selectedData: u
                    }),
                      T(null);
                  }
                },
                o.label
              );
            })
          )
        ),
      t.createElement(
        'span',
        null,
        t.createElement(e.components.Actions, {
          actions: e.actions && e.actions.filter((o) => o.position === p),
          columns: e.columns,
          onColumnsChanged: (o, i) =>
            e.onColumnsChanged && e.onColumnsChanged(o, i),
          data: a ? u : void 0,
          components: e.components
        })
      )
    );
  }
  function k() {
    return t.createElement(
      B,
      { sx: d.actions },
      t.createElement('div', null, z(u.length > 0))
    );
  }
  function P(a) {
    const p =
      typeof a == 'string'
        ? t.createElement(
            j,
            {
              variant: 'h6',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }
            },
            a
          )
        : a;
    return t.createElement(B, { sx: d.title }, p);
  }
  const v =
    r.showTextRowsSelected && u.length > 0
      ? typeof l.nRowsSelected == 'function'
        ? l.nRowsSelected(u.length)
        : l.nRowsSelected.replace('{0}', u.length)
      : r.showTitle
      ? e.title
      : null;
  return t.createElement(
    $,
    {
      ref: e.forwardedRef,
      className: e.className,
      sx: f(
        f({}, d.root),
        r.showTextRowsSelected && u.length > 0 ? d.highlight(s) : {}
      )
    },
    v && P(v),
    r.searchFieldAlignment === 'left' && I(),
    r.toolbarButtonAlignment === 'left' && k(),
    t.createElement(B, { sx: d.spacer }),
    r.searchFieldAlignment === 'right' && I(),
    r.toolbarButtonAlignment === 'right' && k()
  );
}
const de = {
  actions: [],
  columns: [],
  columnsHiddenInColumnsButton: !1,
  searchText: '',
  originalData: [],
  title: 'No Title!'
};
MTableToolbar.propTypes = {
  actions: n.array,
  className: n.string,
  columns: n.array,
  components: n.object.isRequired,
  getFieldValue: n.func.isRequired,
  onColumnsChanged: n.func.isRequired,
  dataManager: n.object.isRequired,
  searchText: n.string,
  onSearchChanged: n.func.isRequired,
  originalData: n.array,
  title: n.oneOfType([n.element, n.string]),
  renderData: n.array,
  data: n.oneOfType([n.array, n.func]),
  exportAllData: n.bool,
  exportMenu: n.arrayOf(n.shape({ name: n.string, handler: n.func })),
  searchAutoFocus: n.bool,
  classes: n.object
};
const d = {
    root: { paddingRight: 1, paddingLeft: 2 },
    highlight: (e) =>
      e.palette.mode === 'light'
        ? {
            color: e.palette.secondary.main,
            backgroundColor: H(e.palette.secondary.light, 0.85)
          }
        : {
            color: e.palette.text.primary,
            backgroundColor: e.palette.secondary.dark
          },
    spacer: { flex: '1 1 10%' },
    actions: { color: 'text.secondary' },
    title: { overflow: 'hidden' },
    searchField: { minWidth: 150, paddingLeft: 2 },
    formControlLabel: { px: 1 }
  },
  Q = t.forwardRef(function (s, l) {
    return t.createElement(MTableToolbar, f(f({}, s), { forwardedRef: l }));
  });
function U(e) {
  var l;
  let s = e;
  for (
    ;
    Array.isArray((l = s == null ? void 0 : s[0]) == null ? void 0 : l.data);

  )
    s = s.map((m) => (m.groups.length !== 0 ? m.groups : m.data)).flat();
  return s;
}
export default t.memo(Q);
