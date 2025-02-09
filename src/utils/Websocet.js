class WebSocketService {
    static instance = null;
    callbacks = {};
    socket = null; // Inisialisasi socket sebagai null

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    connect(order_id) {
        if (this.socket) {
            this.disconnect(); // Tutup koneksi sebelumnya jika ada
        }
        this.socket = new WebSocket(`wss://your-api.com/ws/tracking/${order_id}/`);
        this.socket.onmessage = (e) => {
            this.handleMessage(e);
        };
        this.socket.onclose = () => {
            this.reconnect();
        };
    }

    reconnect() {
        setTimeout(() => {
            this.connect();
        }, 5000);
    }

    handleMessage(e) {
        const data = JSON.parse(e.data);
        const callback = this.callbacks[data.type];
        if (callback) {
            callback(data);
        }
    }

    addCallback(type, callback) {
        this.callbacks[type] = callback;
    }

    disconnect() {
        if (this.socket) { // Cek apakah socket ada
            this.socket.close();
            this.socket = null; // Set socket ke null setelah ditutup
        }
    }
}

export default WebSocketService.getInstance();