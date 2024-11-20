
import AppLayout from './layouts/AppLayout/AppLayout';
import AppRouter from './app/router/AppRouter';
import './App.css';
import AuthGuard from './app/AuthGuard/AuthGuard';

function App() {
  return (

    <AppLayout>
      <AuthGuard>
        <AppRouter />
      </AuthGuard>
    </AppLayout>

  );
}

export default App;
