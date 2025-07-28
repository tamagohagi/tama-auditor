const CACHE_NAME = 'tama-auditor-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/egg-logo.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/_next/static/chunks/app/layout.js',
  '/_next/static/chunks/app/page.js',
  '/_next/static/css/app/layout.css',
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-audit-data') {
    event.waitUntil(syncAuditData())
  }
})

async function syncAuditData() {
  // Sync audit data when back online
  console.log('Syncing audit data...')
}

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Nouvelle notification',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  event.waitUntil(
    self.registration.showNotification('Tama Auditor', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.openWindow('/')
  )
})
