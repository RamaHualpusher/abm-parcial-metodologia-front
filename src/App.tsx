
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Header = React.lazy(() => import('./components/header'));
const Main = React.lazy(() => import('./components/main'));
const Router = React.lazy(() => import('./components/router'));

const App: React.FC = () => {
  // Render
  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      <Header />
      <Main>
        <Router />
      </Main>
    </React.Suspense>
  );
};

export default App;
