/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react'
import App from './App';
import {name as appName} from './app.json';
import { AuthProvider } from './src/provider/AuthProvider';
import { AxiosProvider } from './src/provider/AxiosProvider';

const Root = () => {
    return (
      <AuthProvider>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </AuthProvider>
    );
  };
AppRegistry.registerComponent(appName, () => Root);
