const statusLabels = {
  0: 'Created',
  1: 'Assigned',
  2: 'In pickup',
  3: 'In transit',
  4: 'Completed',
};

const safeDate = (value) => {
  if (!value) return null;
  const date = new Date(Number(value));
  return Number.isNaN(date.getTime()) ? null : date;
};

export function formatDate(value) {
  const date = safeDate(value);
  return date
    ? new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).format(date)
    : '--/--/--';
}

export function formatLongDate(value) {
  const date = safeDate(value);
  return date
    ? new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
    : 'Fecha no disponible';
}

export function formatTime(value) {
  const date = safeDate(value);
  return date
    ? new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
    : '--:--';
}

export function cityFromAddress(address = '') {
  const parts = address.split(',').map((item) => item.trim()).filter(Boolean);
  if (!parts.length) return 'Location unavailable';
  return parts.length >= 3 ? parts[parts.length - 3] : parts[0];
}

export function normalizeUpcomingOrder(order) {
  const destinations = Array.isArray(order?.destinations) ? order.destinations : [];
  return {
    id: order?._id || order?.order_number,
    orderNumber: order?.order_number || 'N/A',
    type: order?.type || 'FTL',
    status: Number(order?.status ?? 0),
    statusText: order?.status_string || statusLabels[order?.status] || 'Unknown',
    statusClass: order?.status_class || 'grey-dot-bg',
    driverImage: order?.driver_thumbnail || '',
    isToday: Boolean(order?.is_today),
    startDate: order?.start_date || destinations[0]?.start_date || null,
    destinations: destinations.map((destination, index) => ({
      ...destination,
      kind: index === 0 ? 'pickup' : 'dropoff',
      city: cityFromAddress(destination.address),
      date: destination.start_date || destination.startDate,
      showNavigation: Boolean(destination.show_navigation),
    })),
  };
}

export function mergeOrderDetails(order, detail) {
  if (!detail || detail.order_number !== order.orderNumber) return order;

  const destinations = Array.isArray(detail.destinations)
    ? detail.destinations.map((destination, index) => ({
        ...destination,
        kind: index === 0 ? 'pickup' : 'dropoff',
        city: cityFromAddress(destination.address),
        date: destination.startDate || destination.start_date,
        showNavigation: order.destinations[index]?.showNavigation ?? false,
      }))
    : order.destinations;

  return {
    ...order,
    referenceNumber: detail.reference_number,
    completionPercentage: detail.completion_percentage,
    driver: detail.driver || null,
    driverImage: detail.driver?.thumbnail || order.driverImage,
    statusList: detail.status_list || null,
    destinations,
  };
}
