const token = 'user_token';

export default  {
  isLoggedIn() {
    let result;

    if (localStorage.getItem(token)) {
      result = true;
    } else {
      result = false;
    }

    return result;
  },

  login(user) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(token)) {
        localStorage.removeItem(token);

        reject();
      } else {
        localStorage.setItem(token, user.username);

        resolve();
      }
    });
  },

  getUser() {
    if (localStorage.getItem(token)) {
      return localStorage.getItem(token);
    }
  },

  logout() {
    localStorage.removeItem(token);
    // loggedIn = false;
  }
}