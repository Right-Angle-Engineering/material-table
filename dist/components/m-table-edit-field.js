var g = Object.prototype.hasOwnProperty;
var c = Object.getOwnPropertySymbols,
  y = Object.prototype.propertyIsEnumerable;
var t = Object.assign;
var u = (i, e) => {
  var r = {};
  for (var p in i) g.call(i, p) && e.indexOf(p) < 0 && (r[p] = i[p]);
  if (i != null && c)
    for (var p of c(i)) e.indexOf(p) < 0 && y.call(i, p) && (r[p] = i[p]);
  return r;
};
import o from 'react';
import a from '@mui/material/TextField';
import C from '@mui/material/Checkbox';
import v from '@mui/material/Select';
import P from '@mui/material/MenuItem';
import f from '@mui/material/FormControl';
import F from '@mui/material/FormHelperText';
import b from '@mui/material/FormGroup';
import x from '@mui/material/FormControlLabel';
import { AdapterDateFns as m } from '@mui/x-date-pickers/AdapterDateFnsV3';
import {
  LocalizationProvider as h,
  TimePicker as T,
  DatePicker as k,
  DateTimePicker as S
} from '@mui/x-date-pickers';
import s from 'prop-types';
class D extends o.Component {
  getProps() {
    const d = this.props,
      {
        columnDef: e,
        rowData: r,
        onRowDataChange: p,
        errorState: n,
        autoFocus: l,
        onBulkEditRowChanged: I,
        scrollWidth: w
      } = d;
    return u(d, [
      'columnDef',
      'rowData',
      'onRowDataChange',
      'errorState',
      'autoFocus',
      'onBulkEditRowChanged',
      'scrollWidth'
    ]);
  }
  renderLookupField() {
    const n = this.getProps(),
      { helperText: e, error: r } = n,
      p = u(n, ['helperText', 'error']);
    return o.createElement(
      f,
      { error: Boolean(r) },
      o.createElement(
        v,
        t(t({}, p), {
          value: this.props.value === void 0 ? '' : this.props.value,
          onChange: (l) => this.props.onChange(l.target.value),
          style: { fontSize: 13 },
          inputProps: { autoFocus: this.props.autoFocus },
          SelectDisplayProps: { 'aria-label': this.props.columnDef.title }
        }),
        Object.keys(this.props.columnDef.lookup).map((l) =>
          o.createElement(
            P,
            { key: l, value: l },
            this.props.columnDef.lookup[l]
          )
        )
      ),
      Boolean(e) && o.createElement(F, null, e)
    );
  }
  renderBooleanField() {
    const n = this.getProps(),
      { helperText: e, error: r } = n,
      p = u(n, ['helperText', 'error']);
    return o.createElement(
      f,
      { error: Boolean(r), component: 'fieldset' },
      o.createElement(
        b,
        null,
        o.createElement(x, {
          label: '',
          control: o.createElement(
            C,
            t(t({}, p), {
              value: String(this.props.value),
              checked: Boolean(this.props.value),
              onChange: (l) => this.props.onChange(l.target.checked),
              style: { padding: 0, width: 24, marginLeft: 9 },
              inputProps: {
                autoFocus: this.props.autoFocus,
                'aria-label': this.props.columnDef.title
              }
            })
          )
        })
      ),
      o.createElement(F, null, e)
    );
  }
  renderDateField() {
    const e =
      this.props.columnDef.dateSetting &&
      this.props.columnDef.dateSetting.format
        ? this.props.columnDef.dateSetting.format
        : 'dd.MM.yyyy';
    return o.createElement(
      h,
      { dateAdapter: m, locale: this.props.locale },
      o.createElement(
        k,
        t(t({}, this.getProps()), {
          renderInput: (r) => o.createElement(a, t({}, r)),
          format: e,
          value: this.props.value || null,
          onChange: this.props.onChange,
          clearable: !0,
          InputProps: { style: { fontSize: 13 } },
          inputProps: {
            autoFocus: this.props.autoFocus,
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }
        })
      )
    );
  }
  renderTimeField() {
    return o.createElement(
      h,
      { dateAdapter: m, locale: this.props.locale },
      o.createElement(
        T,
        t(t({}, this.getProps()), {
          renderInput: (e) => o.createElement(a, t({}, e)),
          format: 'HH:mm:ss',
          value: this.props.value || null,
          onChange: this.props.onChange,
          clearable: !0,
          InputProps: { style: { fontSize: 13 } },
          inputProps: {
            autoFocus: this.props.autoFocus,
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }
        })
      )
    );
  }
  renderDateTimeField() {
    return o.createElement(
      h,
      { dateAdapter: m, locale: this.props.locale },
      o.createElement(
        S,
        t(t({}, this.getProps()), {
          renderInput: (e) => o.createElement(a, t({}, e)),
          format: 'dd.MM.yyyy HH:mm:ss',
          value: this.props.value || null,
          onChange: this.props.onChange,
          clearable: !0,
          InputProps: { style: { fontSize: 13 } },
          inputProps: {
            autoFocus: this.props.autoFocus,
            'aria-label': `${this.props.columnDef.title}: press space to edit`
          }
        })
      )
    );
  }
  renderTextField() {
    return o.createElement(
      a,
      t(t({}, this.getProps()), {
        variant: 'standard',
        fullWidth: !0,
        type: this.props.columnDef.type === 'numeric' ? 'number' : 'text',
        placeholder:
          this.props.columnDef.editPlaceholder || this.props.columnDef.title,
        value: this.props.value === void 0 ? '' : this.props.value,
        onChange: (e) =>
          this.props.onChange(
            this.props.columnDef.type === 'numeric'
              ? e.target.valueAsNumber
              : e.target.value
          ),
        slotProps: {
          input: { style: { minWidth: 50, fontSize: 13 } },
          htmlInput: {
            autoFocus: this.props.autoFocus,
            'aria-label': this.props.columnDef.title,
            style:
              this.props.columnDef.type === 'numeric'
                ? { textAlign: 'right' }
                : {}
          }
        }
      })
    );
  }
  renderCurrencyField() {
    return o.createElement(
      a,
      t(t({}, this.getProps()), {
        variant: 'standard',
        placeholder:
          this.props.columnDef.editPlaceholder || this.props.columnDef.title,
        type: 'number',
        value: this.props.value === void 0 ? '' : this.props.value,
        onChange: (e) => {
          let r = e.target.valueAsNumber;
          return !r && r !== 0 && (r = void 0), this.props.onChange(r);
        },
        onKeyDown: this.props.onKeyDown,
        slotProps: {
          input: { style: { fontSize: 13, textAlign: 'right' } },
          htmlInput: {
            autoFocus: this.props.autoFocus,
            'aria-label': this.props.columnDef.title,
            style: { textAlign: 'right' }
          }
        }
      })
    );
  }
  render() {
    let e = 'ok';
    return (
      this.props.columnDef.editComponent
        ? (e = this.props.columnDef.editComponent(this.props))
        : this.props.columnDef.lookup
        ? (e = this.renderLookupField())
        : this.props.columnDef.type === 'boolean'
        ? (e = this.renderBooleanField())
        : this.props.columnDef.type === 'date'
        ? (e = this.renderDateField())
        : this.props.columnDef.type === 'time'
        ? (e = this.renderTimeField())
        : this.props.columnDef.type === 'datetime'
        ? (e = this.renderDateTimeField())
        : this.props.columnDef.type === 'currency'
        ? (e = this.renderCurrencyField())
        : (e = this.renderTextField()),
      e
    );
  }
}
D.propTypes = {
  value: s.any,
  onChange: s.func.isRequired,
  columnDef: s.object.isRequired,
  locale: s.object,
  rowData: s.object,
  onRowDataChange: s.func,
  errorState: s.func,
  autoFocus: s.bool,
  onBulkEditRowChanged: s.func,
  scrollWidth: s.number,
  onKeyDown: s.func
};
export default D;
