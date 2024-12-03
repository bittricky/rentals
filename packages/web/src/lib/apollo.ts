import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import useAuthStore from '../store/authStore';

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/api',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState().token;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    credentials: 'include',
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
});
