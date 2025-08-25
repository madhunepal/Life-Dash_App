
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, DollarSignIcon, HeartIcon, BookOpenIcon } from './icons';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Finance', href: '/finance', icon: DollarSignIcon },
  { name: 'Health', href: '/health', icon: HeartIcon },
  { name: 'Recipes', href: '/recipes', icon: BookOpenIcon },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-surface border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary">Life-Dash</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted hover:bg-gray-100 hover:text-on-surface'
              }`
            }
          >
            <item.icon className="h-6 w-6 mr-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
            <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
            <div className="ml-3">
                <p className="text-sm font-medium text-on-surface">Alex Doe</p>
                <p className="text-xs text-muted">alex.doe@example.com</p>
            </div>
        </div>
      </div>
    </div>
  );
};
