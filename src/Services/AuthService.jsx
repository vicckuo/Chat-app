class AuthService {
  //獲取是否登入
  isLogin() {
    return localStorage.getItem('chat-app-user');
  }

  //獲取當前登入用戶(JSON parse)
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('chat-app-user'));
  }
}

export default new AuthService();
