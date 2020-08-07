import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PageContextProvider from './contexts/PageContext';
import ThemeContextProvider from './contexts/ThemeContext';

ReactDOM.render(
    <PageContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </PageContextProvider>,
  document.getElementById('root')
);
