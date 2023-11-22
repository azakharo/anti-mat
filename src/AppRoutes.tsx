import {FC, memo} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {ROUTE__MAIN} from 'src/constants/routes';
import Main from 'src/pages/Main';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={ROUTE__MAIN} element={<Main />} />
      <Route path="*" element={<Navigate to={ROUTE__MAIN} replace />} />
    </Routes>
  );
};

export default memo(AppRoutes);
