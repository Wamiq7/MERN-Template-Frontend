import { Suspense } from 'react';
import Navbar from './components/Navbar';
import { AppRoutes } from './routes';
import { Toaster } from './components/ui/toaster';
import Footer from './components/Footer';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Toaster />
      <Navbar />
      <AppRoutes />
      <Footer />
    </Suspense>
  );
}

export default App;
