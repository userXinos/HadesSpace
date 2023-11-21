self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('fetch', () => {})

self.addEventListener('activate', () => {
    self.clients.matchAll({ type: 'window' }).then(windowClients => {
        for (const windowClient of windowClients) {
            // Force open pages to refresh, so that they have a chance to load the
            // fresh navigation response from the local dev server.
            windowClient.navigate(windowClient.url)
        }
    })
})
