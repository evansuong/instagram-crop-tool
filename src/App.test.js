import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import useAuth from './hooks/useAuth';

test('keys are good', () => {
  console.log(useAuth());
});
