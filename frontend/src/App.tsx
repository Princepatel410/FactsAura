import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { IncidentPage } from './pages/IncidentPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ActivityPage } from './pages/ActivityPage';
import { AuthPage } from './pages/AuthPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Auth page without layout */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Main app routes with layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/incident/:incidentId" element={<IncidentPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/activity" element={<ActivityPage />} />
          </Route>
        </Routes>
        <Navigation />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
