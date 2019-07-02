import Api from './api';

export default {
    async fetchEvents() {
        const events = await Api().post({
            query: '{events}'
        });
        return events;
    }
}