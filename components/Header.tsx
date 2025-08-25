
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const getTitleFromPath = (path: string): string => {
    if (path === '/') return 'Dashboard';
    const title = path.replace('/', '');
    return title.charAt(0).toUpperCase() + title.slice(1);
}

export const Header: React.FC = () => {
    const location = useLocation();
    const title = useMemo(() => getTitleFromPath(location.pathname), [location.pathname]);

  return (
    <header className="flex items-center justify-between h-20 px-6 lg:px-8 bg-surface border-b border-gray-200">
      <h2 className="text-2xl font-bold text-on-surface">{title}</h2>
      {/* Additional header content can go here */}
    </header>
  );
};
