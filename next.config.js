module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://prisma-postgres-nextjs.vercel.app/'
          }
        ]
      }
    ]
  }
}
