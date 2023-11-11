module.exports = {
    async rewrites() {
      return [
          { source: '/api/proxy/:path*', destination: 'http://localhost:5000/:path*' }
      ]
    }
  }
