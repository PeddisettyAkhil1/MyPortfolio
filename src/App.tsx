import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PortfolioPage } from './pages/Portfolio';
import { AdminLayout } from './admin/AdminLayout';

export function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="*" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
