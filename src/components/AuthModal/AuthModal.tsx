import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

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

  const [mode, setMode] = useState('login');

  const onSuccess = useCallback(() => {
    Cookies.set('mrt', Date.now().toString());
    onSuccessfulLogin();
  }, [onSuccessfulLogin]);

  const authModalRoot =
    typeof document !== 'undefined'
      ? document.getElementById('auth-modal-root')
      : null;
  const modal = (
    <Overlay>
      <OverlayInner>
        <Modal>
          {mode === 'login' ? (
            <Login
              onRegister={() => setMode('register')}
              onSuccess={onSuccess}
              redirectUrl={redirectUrl}
            />
          ) : (
            <Register
              onLogin={() => setMode('login')}
              onSuccess={onSuccess}
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
