module.exports = {
  useFileSystemPublicRoutes: false,
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/register': { page: '/register' },
      '/registro': { page: '/register' }
    }
  }
}