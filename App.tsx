
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { FinanceTracker } from './components/FinanceTracker';
import { HealthTracker } from './components/HealthTracker';
import { RecipeBook } from './components/RecipeBook';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/finance" element={<FinanceTracker />} />
            <Route path="/health" element={<HealthTracker />} />
            <Route path="/recipes" element={<RecipeBook />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
