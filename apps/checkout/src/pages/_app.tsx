import { configure as configureMobx } from 'mobx';
import App from 'next/app';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
  useProxies: 'ifavailable',
});

export default App;
