import Api from './api';

export default {
    async fetchOrganizations() {
        const organizations = await Api().post({
            query: '{organizations}'
        });
        return organizations;
    }
}