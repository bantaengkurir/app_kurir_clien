class WebSocketService {
    static instance = null;
    callbacks = new Map(); // Gunakan Map untuk multiple listeners
    socket = null;
    reconnectAttempts = 0; // Tambahkan inisialisasi
    subscriptions = new Set(); // Track active subscriptions





    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    connect(orderId) {

        if (this.subscriptions.has(orderId)) return;
        this.subscriptions.add(orderId);

        if (!orderId) {
            console.error("Order ID is undefined");
            return;
        }

        if (this.socket) {
            this.disconnect(); // Pastikan koneksi sebelumnya ditutup
        }

        const wsUrl = `http://localhost:8001/api/orders/${orderId}/`;
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
            // Reset reconnect attempt setelah berhasil
            this.reconnectAttempts = 0;
        };

        this.socket.onmessage = (e) => {
            this.handleMessage(e);
        };

        this.socket.onclose = (e) => {
            if (e.wasClean) {
                console.log("WebSocket ditutup secara normal");
            } else {
                console.log("WebSocket terputus tiba-tiba");
                this.reconnect(orderId);
            }
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            // Trigger reconnect saat error
            this.reconnect(orderId);
        };
    }

    reconnect(orderId) {
        // Batasi maksimal reconnect attempts
        if (this.reconnectAttempts < 5) {
            this.reconnectAttempts++;
            setTimeout(() => {
                console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
                this.connect(orderId);
            }, 5000);
        } else {
            console.error("Gagal reconnect setelah 5 percobaan");
        }
    }




    addCallback(type, callback) {
        if (!this.callbacks.has(type)) {
            this.callbacks.set(type, new Set());
        }
        this.callbacks.get(type).add(callback);
    }

    removeCallback(type, callback) {
        if (this.callbacks.has(type)) {
            this.callbacks.get(type).delete(callback);
        }
    }

    handleMessage(e) {
        try {
            const data = JSON.parse(e.data);
            const callbacks = this.callbacks.get(data.type) || [];
            callbacks.forEach(cb => cb(data));
        } catch (error) {
            console.error("Error handling message:", error);
        }
    }

    disconnect(orderId) {
        this.subscriptions.delete(orderId);
        if (this.subscriptions.size === 0) {
            if (this.socket) {
                // Hentikan reconnect jika disconnect manual
                this.reconnectAttempts = 0;
                this.socket.close();
                this.socket = null;
            }
        }
    }


}

export default WebSocketService.getInstance();