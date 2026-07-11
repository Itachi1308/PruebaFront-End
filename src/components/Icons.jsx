import React from 'react';

const Icon = ({ children, size = 24, className = '', viewBox = '0 0 24 24' }) => (
  <svg className={className} width={size} height={size} viewBox={viewBox} fill="none" aria-hidden="true">
    {children}
  </svg>
);

export const BrandIcon = ({ size = 24 }) => <Icon size={size}><path d="M8 3 3 8l4 4-4 4 5 5 3-3-3-3 4-4-4-4 3-3L8 3Z" fill="currentColor"/><path d="m14 4 7 8-7 8v-5l3-3-3-3V4Z" fill="currentColor"/></Icon>;
export const BellIcon = ({ size = 26 }) => <Icon size={size}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" stroke="currentColor" strokeWidth="1.8"/><path d="M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></Icon>;
export const SearchIcon = ({ size = 25 }) => <Icon size={size}><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7"/><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></Icon>;
export const BackIcon = ({ size = 24 }) => <Icon size={size}><path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></Icon>;
export const TruckIcon = ({ size = 30 }) => <Icon size={size} viewBox="0 0 40 24"><path d="M2 4h21v14H2V4Zm21 5h8l5 5v4H23V9Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="20" r="2.5" stroke="currentColor"/><circle cx="29" cy="20" r="2.5" stroke="currentColor"/></Icon>;
export const ContainerIcon = ({ size = 30 }) => <Icon size={size} viewBox="0 0 40 24"><rect x="3" y="4" width="28" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v12m5-12v12m5-12v12m5-12v12m5-12v12" stroke="currentColor" strokeWidth="1"/><circle cx="10" cy="20" r="2" stroke="currentColor"/><circle cx="27" cy="20" r="2" stroke="currentColor"/></Icon>;
export const PickupIcon = ({ size = 38 }) => <Icon size={size} viewBox="0 0 48 48"><path d="M8 30h27V17H21v13m14-8h5l4 5v3h-9" stroke="currentColor" strokeWidth="1.7"/><path d="M15 13v13m-4-7 4-6 4 6" stroke="currentColor" strokeWidth="1.7"/><circle cx="17" cy="34" r="4" stroke="currentColor" strokeWidth="1.7"/><circle cx="36" cy="34" r="4" stroke="currentColor" strokeWidth="1.7"/></Icon>;
export const PinIcon = ({ size = 27 }) => <Icon size={size}><path d="M12 22s7-5.7 7-12A7 7 0 1 0 5 10c0 6.3 7 12 7 12Z" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7"/></Icon>;
export const CheckIcon = ({ size = 20 }) => <Icon size={size}><path d="m6 12 4 4 8-9" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></Icon>;
export const ChevronIcon = ({ size = 22 }) => <Icon size={size}><path d="m8 10 4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></Icon>;
