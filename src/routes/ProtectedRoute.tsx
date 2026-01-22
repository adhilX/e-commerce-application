import type { RootState } from '../store/store'
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = useSelector((state: RootState) =>
      state.auth.token
    );
  
    if (!token) {
      return <Navigate to={ "/login"} replace />;
    }
  
    return <>{children}</>;
  };

export default ProtectedRoute;