/**
 * User Service
 * 处理用户相关的业务逻辑
 */
angular.module('myApp')
  .service('userService', ['apiService', '$q', function(apiService, $q) {
    // 用户数据缓存
    let userCache = null;

    /**
     * 获取用户列表
     * @param {Object} params - 查询参数
     * @returns {Promise} - 用户列表数据
     */
    this.getUsers = function(params) {
      return apiService.get('/users', params)
        .then(function(response) {
          // 确保返回一个数组
          return Array.isArray(response.data) ? response.data : [];
        });
    };

    /**
     * 获取单个用户信息
     * @param {number} userId - 用户ID
     * @returns {Promise} - 用户信息
     */
    this.getUser = function(userId) {
      return apiService.get('/users/' + userId)
        .then(function(response) {
          return response.data;
        });
    };

    /**
     * 创建新用户
     * @param {Object} userData - 用户数据
     * @returns {Promise} - 创建结果
     */
    this.createUser = function(userData) {
      return apiService.post('/users', userData)
        .then(function(response) {
          return response.data;
        });
    };

    /**
     * 更新用户信息
     * @param {number} userId - 用户ID
     * @param {Object} userData - 更新的用户数据
     * @returns {Promise} - 更新结果
     */
    this.updateUser = function(userId, userData) {
      return apiService.put('/users/' + userId, userData)
        .then(function(response) {
          return response.data;
        });
    };

    /**
     * 删除用户
     * @param {number} userId - 用户ID
     * @returns {Promise} - 删除结果
     */
    this.deleteUser = function(userId) {
      return apiService.delete('/users/' + userId)
        .then(function(response) {
          return response.data;
        });
    };

    /**
     * 获取当前登录用户信息
     * @returns {Promise} - 当前用户信息
     */
    this.getCurrentUser = function() {
      if (userCache) {
        return $q.resolve(userCache);
      }
      
      return apiService.get('/users/current')
        .then(function(response) {
          userCache = response.data;
          return userCache;
        });
    };

    /**
     * 清除用户缓存
     */
    this.clearCache = function() {
      userCache = null;
    };
  }]); 