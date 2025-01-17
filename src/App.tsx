import { Suspense } from "react";
import Navbar from "./components/Navbar";
import { AppRoutes } from "./routes";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Toaster />
      <Navbar />
      <AppRoutes />
    </Suspense>
  );
}

export default App;
