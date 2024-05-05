const PUBLIC_VAPID_KEY = "BPXN1rEIDr-GwA3YV-26FjbXT-QwSRoVCX1s_O1nK5eSJ--2zWT_krW7qATTSHPlkaxzoeNIWUQ98QgltdGaIxI";

if("serviceWorker" in navigator) {
  send().catch( err => console.error(err));
}

async function send() {
  console.log('Registering service worker ...');
  const register = await navigator.serviceWorker.register("/js/worker.js", {
    scope: "/js/"
  });
  console.log('Registering push ...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: PUBLIC_VAPID_KEY
  });
  console.log("Send push registration to server ...");
  await fetch('/subscribe/date', {
    method: "POST",
    body: JSON.stringify(subscription),
    header: {
      "content-type": "application/json"
    }
  });
}