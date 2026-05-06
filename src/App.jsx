import React from 'react';
import { useSession } from './store/sessionStore.js';
import Trigger from './components/Trigger.jsx';
import Modal from './components/Modal.jsx';

function App() {
  const open = useSession((s) => s.open);

  return (
    <>
      {!open && <Trigger />}
      {open && <Modal />}
    </>
  );
}

export default App;
