var s = Object.assign;
import { create as E, useStore as u } from 'zustand';
import n from 'react';
import l from 'deep-eql';
import S from '../defaults/props.localization';
import m from '../defaults/props.options';
import f from '../defaults/props.icons';
import k from '../defaults/props.components';
const d = require('deepmerge'),
  a = n.createContext(),
  I = (o) =>
    E((i) => {
      var t;
      return {
        localization: d(S, (t = o.localization) != null ? t : {}),
        mergeLocalization: (e) => {
          i(({ localization: r }) => {
            const c = d(r, e != null ? e : {});
            return (
              (c.body.editRow.dateTimePickerLocalization =
                c.dateTimePickerLocalization),
              (c.body.filterRow.dateTimePickerLocalization =
                c.dateTimePickerLocalization),
              l(c, e) ? { localization: r } : { localization: c }
            );
          });
        },
        options: s(s({}, m), o.options),
        mergeOptions: (e) => {
          i(() => {
            const r = s(s({}, m), e);
            return l(r, e) ? { options: m } : { options: r };
          });
        },
        icons: f,
        mergeIcons: (e) => {
          i({ icons: s(s({}, f), e) });
        },
        components: k,
        mergeComponents: (e) => {
          i(({ components: r }) => ({ components: s(s({}, r), e) }));
        }
      };
    }),
  L = () => {
    const o = n.useContext(a);
    return u(o, (t) => t.localization);
  },
  O = () => {
    const o = n.useContext(a);
    return u(o, (t) => t.options);
  },
  T = () => {
    const o = n.useContext(a);
    return u(o, (t) => t.icons);
  };
function q(o) {
  const i = n.useContext(a),
    {
      mergeLocalization: t,
      mergeOptions: e,
      mergeIcons: r,
      mergeComponents: c,
      localization: p,
      options: z,
      icons: g,
      components: C
    } = u(i, (P) => P);
  return (
    n.useEffect(() => {
      o.localization && t(o.localization);
    }, [o.localization]),
    n.useEffect(() => {
      o.options && e(o.options);
    }, [o.options]),
    n.useEffect(() => {
      o.icons && r(o.icons);
    }, [o.icons]),
    n.useEffect(() => {
      o.components && c(o.components);
    }, [o.components]),
    { localization: p, options: z, icons: g, components: C }
  );
}
function v(o) {
  return function (t) {
    const e = n.useRef(I(t)).current;
    return n.createElement(
      a.Provider,
      { value: e },
      n.createElement(o, s({}, t))
    );
  };
}
export {
  L as useLocalizationStore,
  O as useOptionStore,
  q as useMergeProps,
  v as withContext,
  T as useIconStore
};
