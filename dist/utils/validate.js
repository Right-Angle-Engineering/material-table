var a = Object.assign;
function i(t, r) {
  if (t.validate) {
    const e = t.validate(r);
    switch (typeof e) {
      case 'object':
        return a({}, e);
      case 'boolean':
        return { isValid: e, helperText: '' };
      case 'string':
        return { isValid: !1, helperText: e };
      default:
        return { isValid: !0, helperText: '' };
    }
  }
  return { isValid: !0, helperText: '' };
}
export { i as validateInput };
