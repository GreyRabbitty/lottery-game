import axiosClient from './axiosClient';

class UserApi {
  async getUser() {
    return axiosClient.get('/users');
  }
}

export default new UserApi();
