// Define the main module
angular.module('myApp', [
  'ngAnimate',
  'ngTouch',
  'ngResource',
  'ngRoute',
  'ngCookies',
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar'
])

// Main controller
.controller('MainCtrl', ['$scope', 'userService', function($scope, userService) {
  $scope.message = "Welcome to AngularJS!";
  
  // 用户列表
  $scope.users = [];
  $scope.loading = false;
  $scope.error = null;

  // 加载用户列表
  $scope.loadUsers = function() {
    $scope.loading = true;
    $scope.error = null;

    userService.getUsers()
      .then(function(users) {
        // 确保users是一个数组
        $scope.users = Array.isArray(users) ? users : [];
      })
      .catch(function(error) {
        $scope.error = '加载用户列表失败: ' + error.message;
        $scope.users = [];
      })
      .finally(function() {
        $scope.loading = false;
      });
  };

  // 添加新用户
  $scope.addUser = function() {
    var newUser = {
      id: Date.now(), // 使用时间戳作为临时ID
      name: 'New User ' + ($scope.users.length + 1),
      email: 'user' + ($scope.users.length + 1) + '@example.com'
    };

    userService.createUser(newUser)
      .then(function(user) {
        if (Array.isArray($scope.users)) {
          $scope.users.push(user);
        } else {
          $scope.users = [user];
        }
      })
      .catch(function(error) {
        $scope.error = '创建用户失败: ' + error.message;
      });
  };

  // 删除用户
  $scope.deleteUser = function(userIdOrIndex) {
    if (Array.isArray($scope.users)) {
      // 如果是数字且小于数组长度，则按索引删除
      if (typeof userIdOrIndex === 'number' && userIdOrIndex < $scope.users.length) {
        $scope.users.splice(userIdOrIndex, 1);
      } else {
        // 否则按ID删除
        $scope.users = $scope.users.filter(function(user, index) {
          return user.id !== userIdOrIndex && index !== userIdOrIndex;
        });
      }
    }
  };

  // 初始化加载用户列表
  $scope.loadUsers();
}])

// Configuration
.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .when('/users', {
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .when('/users/add', {
      templateUrl: 'views/user-add.html',
      controller: 'MainCtrl'
    })
    .when('/users/roles', {
      templateUrl: 'views/user-roles.html',
      controller: 'MainCtrl'
    })
    .when('/settings/general', {
      templateUrl: 'views/settings-general.html',
      controller: 'MainCtrl'
    })
    .when('/settings/security', {
      templateUrl: 'views/settings-security.html',
      controller: 'MainCtrl'
    })
    .when('/settings/backup', {
      templateUrl: 'views/settings-backup.html',
      controller: 'MainCtrl'
    })
    .when('/statistics/overview', {
      templateUrl: 'views/statistics-overview.html',
      controller: 'MainCtrl'
    })
    .when('/statistics/reports', {
      templateUrl: 'views/statistics-reports.html',
      controller: 'MainCtrl'
    })
    .when('/statistics/analytics', {
      templateUrl: 'views/statistics-analytics.html',
      controller: 'MainCtrl'
    })
    .when('/help', {
      templateUrl: 'views/help.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    
  $locationProvider.html5Mode(true);
  
  // Configure loading bar
  $httpProvider.interceptors.push('cfpLoadingBar');
}])

// Run block
.run(['$rootScope', function($rootScope) {
  $rootScope.$on('$routeChangeStart', function() {
    console.log('Route change started');
  });
  
  $rootScope.$on('$routeChangeSuccess', function() {
    console.log('Route change successful');
  });
}]);