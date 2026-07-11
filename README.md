# BEGO Front-End Test

Implementación React/Vite de las interfaces **Cargo Orders** y **Cargo Details** para la prueba técnica de BEGO.

## Funcionalidad

- Consumo real de `GET /orders/upcoming` y `GET /orders`.
- Normalización de la respuesta de Postman (`result`, `order_number`, fechas en milisegundos y `status_list`).
- Componentes reutilizables para encabezado, pestañas, tarjetas, destinos, detalle y timeline.
- Navegación lista/detalle sin dependencias adicionales.
- Buscador por número de pedido.
- Estados de carga, error y resultados vacíos.
- Avatar predeterminado mediante iniciales cuando la API no entrega imagen.
- Responsive mobile-first y adaptación de escritorio.
- CSS compatible con navegadores modernos, sin propiedades experimentales indispensables.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

## Deploy

### Vercel
1. Crear un repositorio nuevo y subir este proyecto.
2. Importarlo en Vercel.
3. Framework preset: `Vite`.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

## Estructura

```text
src/
├── components/
│   ├── AppHeader.jsx
│   ├── DefaultAvatar.jsx
│   ├── Icons.jsx
│   ├── OrderCard.jsx
│   ├── OrderDetails.jsx
│   ├── ProgressTimeline.jsx
│   └── Tabs.jsx
├── services/ordersApi.js
├── utils/orderMapper.js
├── App.jsx
├── main.jsx
└── styles.css
```
