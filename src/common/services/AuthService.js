export default  {
  isLoggedIn() {
    let result;

    if (localStorage.getItem('user_token')) {
      result = true;
    } else {
      result = false;
    }

    return result;
  },

  login(user) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('user_token')) {
        localStorage.removeItem('user-token');

        reject();
      } else {
        localStorage.setItem('user_token', user.username);

        resolve();
      }
    });
  },

  getUser() {
    if (localStorage.getItem('user_token')) {
      return localStorage.getItem('user_token');
    }
  },

  logout() {
    localStorage.removeItem('user_token');
    // loggedIn = false;
  }
}