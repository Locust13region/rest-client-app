import { Box, CircularProgress } from '@mui/material';
import { createElement } from 'react';

export default function layoutLoader() {
  return createElement(
    Box,
    { sx: { margin: 'auto' } },
    createElement(CircularProgress, { color: 'info', size: 80 })
  );
}

layoutLoader;
