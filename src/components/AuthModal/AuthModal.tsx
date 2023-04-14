import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

import Initial from './components/Initial';
import Login from './components/Login';
import Register from './components/Register';
import { Modal, Overlay, OverlayInner } from './Style.css';
import { useScrollLock } from './utils/useScrollLock';

interface Props {
  onSuccessfulLogin: () => void;
  redirectUrl?: string;
}

const AuthModal = ({ onSuccessfulLogin, redirectUrl }: Props) => {
  useScrollLock();

  const [mode, setMode] = useState('initial');
  const [initialEmail, setInitialEmail] = useState('');

  const onSuccess = useCallback(() => {
    Cookies.set('mrt', Date.now().toString());
    onSuccessfulLogin();
  }, [onSuccessfulLogin]);

  const onEmailProcessed = useCallback((email: string, hasAccount: boolean) => {
    setInitialEmail(email);
    setMode(hasAccount ? 'login' : 'register');
  }, []);

  const authModalRoot =
    typeof document !== 'undefined'
      ? document.getElementById('modals-root')
      : null;
  const modal = (
    <Overlay>
      <OverlayInner>
        <Modal>
          {mode === 'initial' && (
            <Initial
              onEmailProcessed={onEmailProcessed}
              redirectUrl={redirectUrl}
            />
          )}
          {mode === 'login' && (
            <Login
              onRegister={() => setMode('register')}
              onSuccess={onSuccess}
              initialEmail={initialEmail}
              redirectUrl={redirectUrl}
            />
          )}
          {mode === 'register' && (
            <Register
              onLogin={() => setMode('login')}
              onSuccess={onSuccess}
              initialEmail={initialEmail}
              redirectUrl={redirectUrl}
            />
          )}
        </Modal>
      </OverlayInner>
    </Overlay>
  );

  return (
    <>{authModalRoot ? ReactDOM.createPortal(modal, authModalRoot) : modal}</>
  );
};

export default AuthModal;
