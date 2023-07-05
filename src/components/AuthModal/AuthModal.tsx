import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

import Initial from './components/Initial';
import Login from './components/Login';
import Register, { RegistrationData } from './components/Register';
import { Modal, Overlay, OverlayInner } from './Style.css';
import { useScrollLock } from './utils/useScrollLock';

interface Props {
  onSuccessfulLogin: () => void;
  redirectUrl?: string;
  email?: string;
  initialRegistrationData?: Partial<RegistrationData>;
  enable3rdPartyLogin?: boolean;
}

const AuthModal = ({
  onSuccessfulLogin,
  redirectUrl,
  email,
  initialRegistrationData,
  enable3rdPartyLogin = false,
}: Props) => {
  useScrollLock();

  const [mode, setMode] = useState('initial');
  const [initialEmail, setInitialEmail] = useState(email || '');

  const onSuccess = useCallback(() => {
    Cookies.set('mrt', Date.now().toString());
    onSuccessfulLogin();
  }, [onSuccessfulLogin]);

  const onEmailProcessed = useCallback((email: string, hasAccount: boolean) => {
    setInitialEmail(email);
    setMode(hasAccount ? 'login' : 'register');
  }, []);

  const lockEmail = !!email;

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
              initialEmail={initialEmail}
              enable3rdPartyLogin={enable3rdPartyLogin}
              lockEmail={lockEmail}
            />
          )}
          {mode === 'login' && (
            <Login
              onRegister={() => setMode('register')}
              onSuccess={onSuccess}
              initialEmail={initialEmail}
              redirectUrl={redirectUrl}
              enable3rdPartyLogin={enable3rdPartyLogin}
              lockEmail={lockEmail}
            />
          )}
          {mode === 'register' && (
            <Register
              onLogin={() => setMode('login')}
              onSuccess={onSuccess}
              initialEmail={initialEmail}
              redirectUrl={redirectUrl}
              initialRegistrationData={initialRegistrationData}
              enable3rdPartyLogin={enable3rdPartyLogin}
              lockEmail={lockEmail}
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
