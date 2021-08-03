import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const tabBarIcon = name => ({ tintColor, size }) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={size}
  />
);

export default tabBarIcon;