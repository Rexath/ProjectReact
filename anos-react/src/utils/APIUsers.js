import axios from "axios";
const USER_API_BASE_URL = 'http://localhost:8080/users';
const Product_API_BASE_URL = 'http://localhost:8080/products';

/*
export default axios.create({
  baseURL: "http://localhost:3000/api/",
  responseType: "json"
});
*/

class UserApiService {

    fetchUsers() {
        return axios.post(USER_API_BASE_URL + "/tabella");
    }

    loginUser(user) {
        return axios.post(""+USER_API_BASE_URL + "/login-user", user);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    cancelloUser(userId) {
        //alert("sono nel api delete")
        return axios.delete(USER_API_BASE_URL + '/delete-user' + userId);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL + "/add-user", user);
    }

    selectUser(userId) {
        return axios.get(USER_API_BASE_URL + '/recupera' + userId);
    }

    saveUser(user) {
        alert (JSON.stringify(user))
        return axios.post(USER_API_BASE_URL + '/save' , user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }
    

}

export default new UserApiService();