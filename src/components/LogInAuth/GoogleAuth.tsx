import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    google: any;
    handleCredentialResponse: (response: any) => void;
  }
}

export default function GoogleAuth({ setUser, formData }: { setUser: (user: any) => void, formData: any }) {
  const navigate = useNavigate();
  const initialized = useRef(false);
  const formDataRef = useRef(formData);

  // Keep ref up to date so the callback has access to current state without re-rendering the button
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    console.log('[GoogleAuth] Mounted. Checking for window.google');

    const handleSuccess = async (response: any) => {
      console.log('[GoogleAuth] Callback hit! Received credential from Google');
      try {
        const payload = { 
          credential: response.credential, 
          ...formDataRef.current 
        };
        
        console.log('[GoogleAuth] Sending login data to backend:', { ...payload, credential: 'HIDDEN' });
        
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(`Google auth failed: ${errorMsg}`);
        }

        const data = await res.json();
        console.log('[GoogleAuth] Backend response successful:', data.success);
        
        setUser(data.user);
        if (data.needsProfile) {
          navigate('/login');
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error('[GoogleAuth] Error in handleSuccess:', error);
      }
    };

    const initializeGoogle = () => {
      if (initialized.current) return;
      
      console.log('[GoogleAuth] Found window.google. Initializing...');
      
      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleSuccess,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        console.log('[GoogleAuth] Rendering Google button');
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large', shape: 'pill' }
        );
        
        initialized.current = true;
      } catch (err) {
        console.error('[GoogleAuth] Initialization error:', err);
      }
    };

    // Polling for window.google if it hasn't loaded yet
    if (window.google) {
      initializeGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          console.log('[GoogleAuth] window.google found via polling');
          initializeGoogle();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []); // Only once on mount

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div id="google-signin-button"></div>
    </div>
  );
}



