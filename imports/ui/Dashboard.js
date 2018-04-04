import React from 'react';

import PrivateHeader from './PrivateHeader';
import MainMenu from './MainMenu';

export default () => {
  return (
    <div>
      <PrivateHeader title="Smart Survey Dashboard" subtitle="Biosci (Thailand) Co., Ltd"/>
      <MainMenu/>
      <div className="page-content">

      </div>
    </div>
  );
};
