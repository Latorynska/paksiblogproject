import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Loader = () => {
  return (
    <Box sx={{ display: 'absolute', paddingTop:'25%', marginLeft:'50%', paddingBottom:'25%' }}>
        <CircularProgress />
    </Box>
  );
}
export default Loader;
