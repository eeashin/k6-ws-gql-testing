import ws from 'k6/ws';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:3500';
  const params = {
    tags: { my_tag: 'chat app test' },
  };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log(`VU ${__VU}: connected`);

      // Simulate sending messages
      sendMessage(socket, `Hello from VU ${__VU}`);
    });

    socket.on('message', function (data) {
      console.log(`VU ${__VU} received: ${data}`);
    });

    socket.on('close', function close() {
      console.log(`VU ${__VU}: disconnected`);
    });
  });

  check(res, { 'Connected successfully': (r) => r && r.status === 101 });
}

// Function to simulate sending messages
function sendMessage(socket, message) {
  socket.send(JSON.stringify({ event: 'message', data: message }));
  sleep(1); // Introduce some delay between messages
}
