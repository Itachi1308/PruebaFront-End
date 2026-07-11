import React from 'react';
import { BackIcon, BellIcon, BrandIcon } from './Icons';

export default function AppHeader({ title, detail = false, onBack }) {
  return (
    <header className="app-header">
      <button className="icon-button brand-button" onClick={detail ? onBack : undefined} aria-label={detail ? 'Volver' : 'BEGO'}>
        {detail ? <BackIcon /> : <BrandIcon />}
      </button>
      <h1>{title}</h1>
      <button className="icon-button notification-button" aria-label="Notificaciones">
        <BellIcon />
      </button>
    </header>
  );
}
