let loggedIn = false;

export default  {
  isLoggedIn() {
    return loggedIn;
  },

  login() {
    loggedIn = true;
  },

  logout() {
    loggedIn = false;
  }
}