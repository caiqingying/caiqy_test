/**
 * API Service
 * 处理所有与后端API的通信
 */
angular.module('myApp')
  .service('apiService', ['$http', '$q', function($http, $q) {
    // 基础URL配置
    const BASE_URL = '/api';
    
    // 通用请求配置
    const defaultConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    /**
     * 处理HTTP请求错误
     * @param {Object} error - 错误对象
     * @returns {Promise} - 拒绝的Promise
     */
    function handleError(error) {
      console.error('API请求错误:', error);
      return $q.reject(error);
    }

    /**
     * 发送GET请求
     * @param {string} url - 请求URL
     * @param {Object} params - 查询参数
     * @returns {Promise} - 请求Promise
     */
    this.get = function(url, params) {
      return $http.get(BASE_URL + url, {
        params: params,
        ...defaultConfig
      }).catch(handleError);
    };

    /**
     * 发送POST请求
     * @param {string} url - 请求URL
     * @param {Object} data - 请求数据
     * @returns {Promise} - 请求Promise
     */
    this.post = function(url, data) {
      return $http.post(BASE_URL + url, data, defaultConfig)
        .catch(handleError);
    };

    /**
     * 发送PUT请求
     * @param {string} url - 请求URL
     * @param {Object} data - 请求数据
     * @returns {Promise} - 请求Promise
     */
    this.put = function(url, data) {
      return $http.put(BASE_URL + url, data, defaultConfig)
        .catch(handleError);
    };

    /**
     * 发送DELETE请求
     * @param {string} url - 请求URL
     * @returns {Promise} - 请求Promise
     */
    this.delete = function(url) {
      return $http.delete(BASE_URL + url, defaultConfig)
        .catch(handleError);
    };
  }]); 