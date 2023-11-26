import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import UserSelectors from '../redux/selectors/userSelector';
import UserData from '../screens/UserData';
import UserOnboarding from '../screens/UserOnboarding';

const UserSwitcher = (): ReactElement => {
  const isNewUser = useSelector(UserSelectors.getNewUserValue);
  // return <></>;
  return isNewUser ? <UserOnboarding /> : <UserData />;
};

export default UserSwitcher;
