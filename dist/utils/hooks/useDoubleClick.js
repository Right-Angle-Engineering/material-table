import e from 'react';
function k(i, f) {
  const t = e.useRef(0),
    r = e.useRef(null),
    n = e.useRef(null),
    c = e.useRef(null);
  e.useEffect(() => {
    (n.current = f), (c.current = i);
  });
  const u = () => {
    clearTimeout(r.current), (r.current = null), (t.current = 0);
  };
  return e.useCallback((l) => {
    const a = t.current + 1 === 2,
      s = r.current;
    if ((s && a && (u(), n.current && n.current(l)), !s)) {
      t.current = t.current + 1;
      const o = () => {
        u(), c.current && c.current(l);
      };
      if (n.current) {
        const R = setTimeout(o, 250);
        r.current = R;
      } else o();
    }
  }, []);
}
export { k as useDoubleClick };
