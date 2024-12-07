import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../lib/graphql/queries';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const { setViewer } = useAuthStore();
  
  const { data, loading } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'network-only', // Don't use cache for this query
  });

  useEffect(() => {
    if (data?.isLoggedIn) {
      setViewer(data.isLoggedIn);
    }
  }, [data, setViewer]);

  return {
    loading,
    isAuthenticated: Boolean(data?.isLoggedIn?.token),
  };
};
