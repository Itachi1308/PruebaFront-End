import React, { useMemo, useState } from 'react';
import AppHeader from './AppHeader';
import DefaultAvatar from './DefaultAvatar';
import ProgressTimeline from './ProgressTimeline';
import { ChevronIcon, PinIcon, PickupIcon } from './Icons';
import { formatLongDate, formatTime } from '../utils/orderMapper';

export default function OrderDetails({ order, onBack }) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  const destinations = order.destinations || [];
  const pickup = destinations[0] || {};
  const dropoff = destinations[1] || {};
  const selectedDestination = destinations[selectedIndex] || {};
  const selectedKey = selectedIndex === 0 ? 'pickup' : 'dropoff';
  const steps = order.statusList?.[selectedKey] || [];
  const driverName = order.driver?.nickname || 'Assigned driver';
  const contact = selectedDestination.contact_info || {};
  const reference = order.referenceNumber || '';
  const time = useMemo(() => formatTime(selectedDestination.date), [selectedDestination.date]);
  const canTrack = Number(order.status) >= 3;

  const handleTrack = () => {
    if (canTrack) console.log('Track Order');
  };

  return (
    <main className="phone-shell detail-view">
      <AppHeader title="Cargo Details" detail onBack={onBack} />

      <section className="route-summary glass-card">
        <p>Referencia {reference}</p>
        <h2>Order #{order.orderNumber}</h2>
        <div className="detail-route">
          <div className="detail-route-icons">
            <button
              type="button"
              className={`pickup-round route-switch ${selectedIndex === 0 ? 'selected' : ''}`}
              onClick={() => setSelectedIndex(0)}
              aria-label="Mostrar datos de pickup"
            >
              <PickupIcon size={34} />
            </button>
            <span className="route-line" />
            <button
              type="button"
              className={`dropoff-round route-switch ${selectedIndex === 1 ? 'selected' : ''}`}
              onClick={() => setSelectedIndex(1)}
              aria-label="Mostrar datos de dropoff"
            >
              <PinIcon size={23} />
            </button>
          </div>
          <div className="detail-route-copy">
            <button type="button" className={selectedIndex === 0 ? 'route-copy-button selected' : 'route-copy-button'} onClick={() => setSelectedIndex(0)}>
              <span className="eyebrow">PICKUP</span>
              <strong>{pickup.city}</strong>
              <p>{pickup.address}</p>
              <span className="status-pill accepted"><i /> {pickup.status_string || 'Accepted'}</span>
            </button>
            <button type="button" className={selectedIndex === 1 ? 'route-copy-button selected' : 'route-copy-button'} onClick={() => setSelectedIndex(1)}>
              <span className="eyebrow">DROPOFF</span>
              <strong>{dropoff.city}</strong>
              <p>{dropoff.address}</p>
              <span className="status-pill"><i /> {dropoff.status_string || 'On hold'}</span>
            </button>
          </div>
        </div>
      </section>

      <section className="tracking-card glass-card">
        <div className="driver-avatar">
          {order.driverImage && !imageFailed
            ? <img src={order.driverImage} alt={driverName} onError={() => setImageFailed(true)} />
            : <DefaultAvatar name={driverName} />}
        </div>
        <time>{time}</time>
        <ProgressTimeline steps={steps} />
        <button type="button" className="track-button" disabled={!canTrack} onClick={handleTrack}>Track Order</button>
      </section>

      <section className="pickup-panel">
        <button className="pickup-toggle" type="button" onClick={() => setPanelOpen((value) => !value)} aria-expanded={panelOpen}>
          <strong>{selectedIndex === 0 ? 'Pickup Data' : 'Dropoff Data'}</strong>
          <span className={panelOpen ? 'chevron-open' : ''}><ChevronIcon /></span>
        </button>
        {panelOpen && (
          <div className="pickup-data">
            <p>{selectedDestination.address || 'Dirección no disponible'}</p>
            <p>{formatLongDate(selectedDestination.date)} <span>•</span> {time}</p>
            <p>{contact.telephone || 'Teléfono no disponible'}</p>
            <p>{contact.email || 'Correo no disponible'}</p>
          </div>
        )}
      </section>
    </main>
  );
}
