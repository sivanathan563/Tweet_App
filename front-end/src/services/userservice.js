import axios from "axios";

import urls from "../config/urlconfig.json";

class UserService {
  login(user) {
    return axios.post(urls.BASE_URL + "login", user);
  }

  logout(user) {
    return axios.post(urls.BASE_URL + "logout", user);
  }

  register(user) {
    return axios.post(urls.BASE_URL + "register", user);
  }

  reset(user) {
    return axios.post(urls.BASE_URL + "forgot", user);
  }

  getAllUser() {
    return axios.get(urls.BASE_URL + "users/all");
  }
}

export default new UserService();
