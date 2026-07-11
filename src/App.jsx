import React, { useEffect, useMemo, useState } from 'react';
import AppHeader from './components/AppHeader';
import OrderCard from './components/OrderCard';
import OrderDetails from './components/OrderDetails';
import Tabs from './components/Tabs';
import { SearchIcon } from './components/Icons';
import { getOrderDetails, getUpcomingOrders } from './services/ordersApi';
import { mergeOrderDetails, normalizeUpcomingOrder } from './utils/orderMapper';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [detail, setDetail] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError('');
        const [upcoming, fullDetail] = await Promise.all([
          getUpcomingOrders(controller.signal),
          getOrderDetails(controller.signal),
        ]);
        setDetail(fullDetail);
        setOrders(upcoming.map(normalizeUpcomingOrder).map((order) => mergeOrderDetails(order, fullDetail)));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message || 'No fue posible cargar los pedidos');
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const visibleOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesQuery = !normalizedQuery || order.orderNumber.toLowerCase().includes(normalizedQuery);
      if (!matchesQuery) return false;
      if (activeTab === 'completed') return order.status >= 4;
      if (activeTab === 'past') return order.status === 0;
      return order.status > 0 && order.status < 4;
    });
  }, [orders, query, activeTab]);

  const selectedOrder = orders.find((order) => order.id === detail?.selectedId);
  if (selectedOrder) return <OrderDetails order={selectedOrder} onBack={() => setDetail((value) => ({ ...value, selectedId: null }))} />;

  return (
    <main className="phone-shell orders-view">
      <AppHeader title="Cargo Orders" />
      <Tabs active={activeTab} onChange={setActiveTab} />
      <label className="search-field">
        <SearchIcon />
        <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Buscar pedido" />
      </label>

      <section className="orders-list" aria-live="polite">
        {loading && <div className="state-message"><span className="loader" />Loading orders…</div>}
        {!loading && error && <div className="state-message error">{error}</div>}
        {!loading && !error && !visibleOrders.length && <div className="state-message">No orders found.</div>}
        {!loading && !error && visibleOrders.map((order) => (
          <OrderCard key={order.id} order={order} onOpen={(selected) => setDetail((value) => ({ ...(value || {}), selectedId: selected.id }))} />
        ))}
      </section>
    </main>
  );
}
