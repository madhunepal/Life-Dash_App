
import React, { useState } from 'react';
import { Exercise } from '../types';

const initialExercises: Exercise[] = [
  { id: '1', name: 'Morning Run', duration: 30, date: '2024-07-15' },
  { id: '2', name: 'Weightlifting', duration: 60, date: '2024-07-16' },
  { id: '3', name: 'Yoga Session', duration: 45, date: '2024-07-17' },
];

export const HealthTracker: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-on-surface">Exercise Log</h3>
          <button className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors font-medium">
            Log Exercise
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-muted">Exercise</th>
                <th className="py-3 px-4 text-sm font-semibold text-muted">Date</th>
                <th className="py-3 px-4 text-sm font-semibold text-muted text-right">Duration (min)</th>
                <th className="py-3 px-4 text-sm font-semibold text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((ex) => (
                <tr key={ex.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-on-surface">{ex.name}</td>
                  <td className="py-3 px-4 text-muted">{ex.date}</td>
                  <td className="py-3 px-4 font-semibold text-right text-on-surface">{ex.duration}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* A section for food habits could be added here */}
    </div>
  );
};
