import { useRouter } from 'next/router'
import { GetProfileAPI } from '../services/user.service';
import { useEffect, useState } from 'react';

const withAuthentication = (WrappedComponent) => {
  const WrapperComponent = (props) => {
    const router = useRouter()
    const [log, setLog] = useState(false)

    const checkIfUserIsAuthenticated = async () => {
      try {
        const res = await GetProfileAPI();
        if (res) {
          setLog(true);
        } else {
          if (typeof window !== 'undefined') {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        if (typeof window !== 'undefined') {
          router.push('/login');
        }
      }
    }

     useEffect(() => {
      checkIfUserIsAuthenticated();
    }, []);

    return log ? <WrappedComponent {...props} /> : null;
  }

  // Render the protected component
  return WrapperComponent;
};

export default withAuthentication;