import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { createElement } from 'react';

export default function layoutLoader() {
  return createElement(
    Box,
    { sx: { margin: 'auto' } },
    createElement(CircularProgress, { color: 'info', size: 80 })
  );
}

layoutLoader;
