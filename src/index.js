import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './AuthProvider';
import Router from "./router/Router";
import { GlobalStyle } from './Styles/GlobalStyles.styles';

// AuthProvider를 최상위에 배치하여 모든 컴포넌트에서 인증 상태 접근 가능
// AuthContext를 통해 로그인 상태, 토큰, 사용자 정보 등을 전역적으로 관리
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Router />
      </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);
