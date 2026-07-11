# BEGO Front-End Test

Implementación React/Vite de las interfaces **Cargo Orders** y **Cargo Details** para la prueba técnica de BEGO.

## Enlaces

- Repositorio: https://github.com/Itachi1308/PruebaFront-End
- Deploy: https://prueba-front-end-five.vercel.app/

## Funcionalidad

- Consumo real de `GET /orders/upcoming` y `GET /orders`.
- Respuesta de Postman (`result`, `order_number`, fechas en milisegundos y `status_list`).
- Componentes reutilizables para encabezado, pestañas, tarjetas, destinos, detalle y timeline.
- Navegación lista/detalle sin dependencias adicionales.
- Buscador por número de pedido.
- Estados de carga, error y resultados vacíos.
- Avatar predeterminado mediante iniciales cuando la API no entrega imagen.
- Responsive mobile-first con adaptación para tabletas y escritorio.
- CSS compatible con navegadores.

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
