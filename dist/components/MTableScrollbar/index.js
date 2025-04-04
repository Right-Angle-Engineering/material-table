var o = Object.assign;
import l from 'react';
import { Box as i } from '@mui/material';
const r = { overflowX: 'auto', position: 'relative' },
  a = o(o({}, r), {
    '& ::-webkit-scrollbar': { WebkitAppearance: 'none' },
    '& ::-webkit-scrollbar:horizontal': { height: 8 },
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, .3)',
      border: '2px solid white',
      borderRadius: 4
    }
  }),
  b = ({ double: e, children: t }) => l.createElement(i, { sx: e ? r : a }, t);
export default b;
