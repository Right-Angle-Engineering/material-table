import a from 'react';
import { parseISO as u } from 'date-fns';
export const isoDateRegex =
  /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3])\:[0-5]\d|24\:00)(\:[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3])\:?([0-5]\d)?)?)?$/;
export function getEmptyValue(e = '', t = {}) {
  return typeof e == 'function' ? t.columnDef.emptyValue(t.rowData) : e;
}
export function getCurrencyValue(e, t) {
  return e !== void 0
    ? new Intl.NumberFormat(e.locale !== void 0 ? e.locale : 'en-US', {
        style: 'currency',
        currency: e.currencyCode !== void 0 ? e.currencyCode : 'USD',
        minimumFractionDigits:
          e.minimumFractionDigits !== void 0 ? e.minimumFractionDigits : 2,
        maximumFractionDigits:
          e.maximumFractionDigits !== void 0 ? e.maximumFractionDigits : 2
      }).format(t !== void 0 ? t : 0)
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(t !== void 0 ? t : 0);
}
export function getRenderValue(e, t, i) {
  const n =
    e.columnDef.dateSetting && e.columnDef.dateSetting.locale
      ? e.columnDef.dateSetting.locale
      : void 0;
  if (
    e.columnDef.emptyValue !== void 0 &&
    (e.value === void 0 || e.value === null)
  )
    return getEmptyValue(e.columnDef.emptyValue, e);
  if (e.rowData === void 0 && e.value && e.columnDef.groupRender)
    return e.columnDef.groupRender(e.value);
  if (e.columnDef.render && e.rowData) return e.columnDef.render(e.rowData);
  if (e.columnDef.type === 'boolean') {
    const l = { textAlign: 'left', verticalAlign: 'middle', width: 48 };
    return e.value
      ? a.createElement(t.Check, { style: l })
      : a.createElement(t.ThirdStateCheck, { style: l });
  } else {
    if (e.columnDef.type === 'date')
      return e.value instanceof Date
        ? e.value.toLocaleDateString(n)
        : isoDateRegex.exec(e.value)
        ? u(e.value).toLocaleDateString(n)
        : e.value;
    if (e.columnDef.type === 'time')
      return e.value instanceof Date
        ? e.value.toLocaleTimeString()
        : isoDateRegex.exec(e.value)
        ? u(e.value).toLocaleTimeString(n)
        : e.value;
    if (e.columnDef.type === 'datetime')
      return e.value instanceof Date
        ? e.value.toLocaleString()
        : isoDateRegex.exec(e.value)
        ? u(e.value).toLocaleString(n)
        : e.value;
    if (e.columnDef.type === 'currency')
      return getCurrencyValue(e.columnDef.currencySetting, e.value);
    if (typeof e.value == 'boolean') return e.value.toString();
  }
  return e.value;
}
