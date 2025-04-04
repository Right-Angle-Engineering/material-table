var n = Object.assign;
export const elementSize = ({ options: e = {} }) =>
    e.padding === 'normal' ? 'medium' : 'small',
  baseIconSize = (e) => (elementSize(e) === 'medium' ? 48 : 32),
  rowActions = (e) =>
    e.actions
      ? e.actions.filter((r) => r.position === 'row' || typeof r == 'function')
      : [],
  actionsColumnWidth = (e) => rowActions(e).length * baseIconSize(e),
  selectionMaxWidth = (e, r) => baseIconSize(e) + 9 * r,
  reducePercentsInCalc = (e, r) => {
    if (!e) return `${r}px`;
    const t = e.match(/(\d*)%/);
    if (t && t.length > 1) {
      const o = t[1];
      return e.replace(/\d*%/, `${r * (o / 100)}px`);
    }
    return e.replace(/\d*%/, `${r}px`);
  },
  widthToNumber = (e) =>
    typeof e == 'number'
      ? e
      : !e || !e.match(/^\s*\d+(px)?\s*$/)
      ? NaN
      : Number(e.replace(/px$/, '')),
  parseFirstLastPageButtons = (e, r) => {
    let t = { first: !0, last: !0 };
    return (
      typeof e == 'boolean'
        ? (t = { first: e, last: e })
        : typeof e == 'object' && (t = n(n({}, t), e)),
      r && (t = { first: t.last, last: t.first }),
      t
    );
  };
