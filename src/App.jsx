import { useEffect } from 'react';
import { useSession } from './store/sessionStore.js';
import Modal from './components/Modal.jsx';

function App() {
  const open_modal = useSession((s) => s.open_modal);
  const open = useSession((s) => s.open);

  useEffect(() => {
    if (!open) open_modal();
  }, []);

  return open ? <Modal /> : null;
}

export default App;
