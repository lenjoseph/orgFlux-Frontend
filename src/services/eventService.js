import Api from './api';

export default {
    fetchEvents() {
        return Api().post('', {
            query: `
            query {events {}}
            `
        })
    }
}