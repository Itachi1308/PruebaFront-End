const API_BASE = 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io';

async function request(path, signal) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`La API respondió con ${response.status}`);
  }

  return response.json();
}

export async function getUpcomingOrders(signal) {
  const payload = await request('/orders/upcoming', signal);
  return Array.isArray(payload?.result) ? payload.result : [];
}

export async function getOrderDetails(signal) {
  const payload = await request('/orders', signal);
  return payload?.result ?? null;
}
