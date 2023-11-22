import {memo} from 'react';
import {Box} from '@mui/material';

const areaColor = '#e2deed';

const Main = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        '&> *': {
          backgroundColor: areaColor,
        },
      }}
    >
      Hello World!
    </Box>
  );
};

export default memo(Main);
