
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HeartIcon, DollarSignIcon, BookOpenIcon } from './icons';

// Mock data for demonstration
const financeData = [
  { name: 'Week 1', income: 1200, expense: 750 },
  { name: 'Week 2', income: 1100, expense: 800 },
  { name: 'Week 3', income: 1500, expense: 1000 },
  { name: 'Week 4', income: 1300, expense: 900 },
];

const healthData = {
    totalWorkouts: 12,
    avgDuration: 45, // minutes
};

const recipesData = {
    totalRecipes: 8,
};

const StatCard: React.FC<{ icon: React.ElementType; title: string; value: string; color: string }> = ({ icon: Icon, title, value, color }) => (
    <div className="bg-surface p-6 rounded-xl shadow-sm flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-7 w-7 text-white" />
        </div>
        <div>
            <p className="text-sm text-muted">{title}</p>
            <p className="text-2xl font-bold text-on-surface">{value}</p>
        </div>
    </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={DollarSignIcon} title="Monthly Income" value="$5,100" color="bg-green-500" />
        <StatCard icon={HeartIcon} title="Total Workouts" value={`${healthData.totalWorkouts}`} color="bg-red-500" />
        <StatCard icon={BookOpenIcon} title="Saved Recipes" value={`${recipesData.totalRecipes}`} color="bg-blue-500" />
      </div>

      <div className="bg-surface p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-on-surface mb-4">Financial Overview (Weekly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={financeData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
            <YAxis tick={{ fill: '#6b7280' }} />
            <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                cursor={{fill: '#f3f4f6'}}
            />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-on-surface mb-4">Recent Activity</h3>
            <ul className="space-y-3">
                <li className="flex items-center"><span className="text-green-500 mr-3">●</span> Logged Expense: Groceries - $85.40</li>
                <li className="flex items-center"><span className="text-red-500 mr-3">●</span> Logged Workout: Running - 30 min</li>
                <li className="flex items-center"><span className="text-blue-500 mr-3">●</span> Added Recipe: AI Chicken Pasta</li>
                <li className="flex items-center"><span className="text-green-500 mr-3">●</span> Logged Income: Freelance - $500</li>
            </ul>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-on-surface mb-4">Quick Add</h3>
            <div className="flex space-x-4">
                <button className="flex-1 bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors">Add Transaction</button>
                <button className="flex-1 bg-secondary text-white py-3 px-4 rounded-lg hover:bg-secondary/90 transition-colors">Log Workout</button>
            </div>
        </div>
      </div>
    </div>
  );
};
