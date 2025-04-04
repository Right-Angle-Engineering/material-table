import React from 'react';
import { TextField } from '@mui/material';

function CurrencyField({ forwardedRef, ...props }) {
  return (
    <TextField
      {...props}
      ref={forwardedRef}
      placeholder={props.columnDef.editPlaceholder || props.columnDef.title}
      type="number"
      value={props.value === undefined ? '' : props.value}
      onChange={(event) => {
        let value = event.target.valueAsNumber;
        if (!value && value !== 0) {
          value = undefined;
        }
        return props.onChange(value);
      }}
      onKeyDown={props.onKeyDown}
      autoFocus={props.autoFocus}
      slotProps={{
        input: {
          style: {
            fontSize: 13,
            textAlign: 'right'
          }
        },

        htmlInput: {
          'aria-label': props.columnDef.title,
          style: { textAlign: 'right' }
        }
      }}
    />
  );
}

export default React.forwardRef(function CurrencyFieldRef(props, ref) {
  return <CurrencyField {...props} forwardedRef={ref} />;
});
