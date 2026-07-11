import React from 'react';

export default function DefaultAvatar({ name = 'Driver' }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  return <div className="default-avatar" role="img" aria-label={`Avatar de ${name}`}>{initials || 'DR'}</div>;
}
