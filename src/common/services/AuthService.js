const token = 'user_token';

export default  {
  isLoggedIn() {
    return localStorage.getItem(token);
  },
  getToken() {
    return localStorage.getItem(token);
  },
  login(user) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(token)) {
        reject();
      } else {
        localStorage.setItem(token, user.username);

        resolve();
      }
    });
  },

  logout() {
    localStorage.removeItem(token);
  }
}