import http from "../http-common";

class RestaurantDataService {
    getAll() {
        return http.get(`/restaurants`);
    }

    get(id) {
        return http.get(`/restaurants/${id}`);
    }

    create(data) {
        return http.post(`/restaurants`, data)
    }

    update(id, data) {
        return http.put(`/restaurants/${id}`, data)
    }

    delete(id) {
        return http.delete(`/restaurants/${id}`);
    }

    deleteAll() {
        return http.delete(`/restaurants`);
    }

    findByName(name) {
        return http.get(`/restaurants?name=${name}`);
    }
}

export default new RestaurantDataService();