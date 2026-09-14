const mockSuppliers = [
  { name: 'Seki Forge Co.', country: 'Japan', moq: '10 units', lead_days: 12, margin: 38, reliability_score: 96, search_score: 0.96 },
  { name: 'Tokyo Craft Studio', country: 'Japan', moq: '15 units', lead_days: 9, margin: 42, reliability_score: 94, search_score: 0.91 },
  { name: 'Kyoto Artisan House', country: 'Japan', moq: '5 units', lead_days: 14, margin: 40, reliability_score: 98, search_score: 0.93 },
  { name: 'Washi Masters Guild', country: 'Japan', moq: '20 units', lead_days: 11, margin: 35, reliability_score: 92, search_score: 0.89 },
  { name: 'Ceramic Heritage Studio', country: 'Japan', moq: '8 units', lead_days: 13, margin: 44, reliability_score: 95, search_score: 0.90 }
];

function apiMockPlugin() {
  return {
    name: 'api-mock',
    configureServer(server) {
      return () => {
        server.middlewares.use('/api/suppliers', (req, res, next) => {
          const url = new URL(req.url, `http://${req.headers.host}`);
          const limit = parseInt(url.searchParams.get('limit') || '10');
          const sorted = [...mockSuppliers].sort((a, b) => b.search_score - a.search_score).slice(0, limit);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(sorted));
        });
      };
    }
  };
}

export default {
  plugins: [apiMockPlugin()],
  server: {
    port: 5173,
    open: true
  }
};
