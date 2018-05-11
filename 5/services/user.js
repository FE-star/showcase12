/*
 * @Author: kael 
 * @Date: 2018-05-11 18:17:03 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-11 18:26:45
 */

module.exports = {
  register: async (ctx, params = {}) => {
    if (!params.username || !params.password) {
      let error = new Error('参数错误');
      error.status = 400;
      throw error;
    }
    return `hello ${params.username}`;
  },
  login: async (ctx, params = {}) => {
    if (!params.username || !params.password) {
      let error = new Error('参数错误');
      error.status = 400;
      throw error;
    }
    if (params.username === 'festar' && params.password === 'festar') {
      return `hello ${params.username}`;
    } else {
      throw new Error('用户名或密码错误');
    }
  },
}