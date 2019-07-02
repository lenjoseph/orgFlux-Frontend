import Api from './api';

export default {
    async fetchLocations() {
        const locations = await Api().post({
            query: '{locations}'
        });
        return locations;
    }
}