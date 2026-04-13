import { Navigate } from 'react-router-dom';
import React from 'react';
import { useUser } from '@/context/UserContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser()
console.log('ProtectedRoute render - isLoading:', isLoading, 'user:', !!user, 'path:', window.location.pathname)
if (isLoading) {
  return <div className='maincontainer'></div>
}

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}