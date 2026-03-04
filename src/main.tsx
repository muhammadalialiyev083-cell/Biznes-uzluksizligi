import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1>Biznes uzluksizligi</h1>
      <p>
        Loyiha Netlify&apos;ga deploy qilish uchun tayyorlandi. Build xatolari bartaraf etildi va React entrypoint
        qo&apos;shildi.
      </p>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
