import React, { useEffect, useMemo, useState } from 'react';
import { ContainerIcon, PinIcon, PickupIcon, TruckIcon } from './Icons';
import { formatDate, formatTime } from '../utils/orderMapper';

function Destination({ destination, index }) {
  const pickup = index === 0;
  return (
    <div className="destination-row">
      <div className={`destination-marker ${pickup ? 'pickup' : 'dropoff'}`}>
        {pickup ? <PickupIcon size={34} /> : <PinIcon size={25} />}
      </div>
      <div className="destination-copy">
        <span className="eyebrow">{pickup ? 'PICKUP' : 'DROPOFF'}</span>
        <strong>{destination.city}</strong>
        <p>{destination.address}</p>
      </div>
      <div className="destination-date">
        <span>{formatDate(destination.date)}</span>
        <strong>{formatTime(destination.date)}</strong>
      </div>
    </div>
  );
}

function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

export default function OrderCard({ order, onOpen }) {
  const pickupStart = Number(order.startDate || order.destinations?.[0]?.date || 0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!pickupStart || now >= pickupStart) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [pickupStart, now]);

  const canNavigate = Boolean(pickupStart) && now >= pickupStart;
  const countdown = useMemo(() => formatCountdown(pickupStart - now), [pickupStart, now]);

  const handleNavigate = () => {
    if (canNavigate) console.log('Navegar');
  };

  return (
    <article className="order-group">
      <h2><span>Order</span> #{order.orderNumber}</h2>
      <div className="order-card">
        <div className="order-card-head">
          <div className="order-type">
            {order.type === 'FCL' ? <ContainerIcon /> : <TruckIcon />}
            <strong>{order.type}</strong>
          </div>
          <div className="order-status">
            <span className={`status-dot ${order.statusClass.includes('blue') ? 'blue' : 'grey'}`} />
            {order.statusText}
          </div>
        </div>
        <div className="route-list">
          {order.destinations.slice(0, 2).map((destination, index) => (
            <Destination key={`${order.id}-${index}`} destination={destination} index={index} />
          ))}
        </div>
        <div className="order-actions two-actions">
          <button
            type="button"
            className={`navigate-button ${canNavigate ? 'enabled' : ''}`}
            disabled={!canNavigate}
            onClick={handleNavigate}
          >
            {canNavigate ? 'Navigate' : <>Start pickup in <strong>{countdown}</strong></>}
          </button>
          <button type="button" onClick={() => onOpen(order)}>Resume <span className="action-mark">◉</span></button>
        </div>
      </div>
    </article>
  );
}
