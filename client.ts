import { Server, DataStore } from './';

export class Client {
    store: DataStore = {
        timestamp: 0,
        data: undefined
    }
    constructor(
        public server: Server
    ) { }

    synchronize(): void {
        let updateStore = this.server.getData(this.store.timestamp);
        if (updateStore) {
            this.store = updateStore;
        }
    }

    update(data: string): void {
        this.store.data = data;
        this.store.timestamp = Date.now();
    }
}
