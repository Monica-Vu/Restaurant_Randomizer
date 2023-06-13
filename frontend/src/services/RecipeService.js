import http from "../http-common";

class RecipeDataService {
    getAll() {
        return http.get(`/recipes`);
    }

    get(id) {
        return http.get(`/recipes/${id}`);
    }

    create(data) {
        return http.post(`/recipes/${id}`, data)
    }

    update(id, data) {
        return http.put(`/recipes/$[id}]`, data)
    }

    delete(id) {
        return http.delete(`/recipes/${id}`);
    }

    deleteAll() {
        return http.delete(`/recipes`);
    }

    findByName(name) {
        return http.get(`/recipes?name=${name}`);
    }
}

export default new RecipeDataService();