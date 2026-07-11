import React from 'react';

const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'past', label: 'Past' },
];

export default function Tabs({ active, onChange }) {
  return (
    <nav className="tabs" aria-label="Order filters">
      {tabs.map((tab) => (
        <button key={tab.id} className={active === tab.id ? 'active' : ''} onClick={() => onChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
