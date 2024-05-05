console.log("Worker listening...");

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log("push received...");
  self.registration.showNotification(data.title, {
    body: data.date,
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
  });
})