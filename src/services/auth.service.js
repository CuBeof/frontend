import Vue from 'vue';
import qs from 'qs'

class AuthService {
  login(user) {
    return Vue.axios
      .post('/login', qs.stringify({
        username: user.username,
        password: user.password,
        remember: user.remember
      }))
      .then(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return Vue.axios.post('/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();