import ws from 'k6/ws';
import { sleep, check } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const url = 'ws://localhost:3501';
    const params = { tags: { my_tag: 'my ws session' } };

    const startTime = new Date();

    const res = ws.connect(url, params, function (socket) {
        // Simulate sending messages
        simulateSendMessage(socket, 50);
    });

    // Check if the connection was successful
    check(res, { 'Connected successfully': (r) => r && r.status === 101 });

    const duration = new Date() - startTime;
    console.log(`VU ${__VU} - Total test duration: ${duration}ms`);
}

function simulateSendMessage(socket, count) {
    for (let i = 0; i < count; i++) {
        const startTime = new Date();
        const message = `Hello from VU ${__VU} - ${i}`;
        socket.send(JSON.stringify({ event: 'message', text: message }));
        const duration = new Date() - startTime;
        console.log(`VU ${__VU} sent message: ${message} - Duration: ${duration}ms`);
        sleep(1); // Introduce a 1-second delay between messages
    }
}
