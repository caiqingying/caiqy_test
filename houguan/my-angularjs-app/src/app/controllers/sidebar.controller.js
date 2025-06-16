/**
 * Sidebar Controller
 * 处理侧边栏菜单的交互逻辑
 */
angular.module('myApp')
  .controller('SidebarCtrl', ['$scope', '$location', function($scope, $location) {
    
    // 菜单状态管理
    $scope.openMenus = {};
    
    /**
     * 切换菜单展开/收起状态
     * @param {string} menuKey - 菜单键值
     */
    $scope.toggleMenu = function(menuKey) {
      $scope.openMenus[menuKey] = !$scope.openMenus[menuKey];
    };
    
    /**
     * 检查菜单是否展开
     * @param {string} menuKey - 菜单键值
     * @returns {boolean} - 是否展开
     */
    $scope.isMenuOpen = function(menuKey) {
      return !!$scope.openMenus[menuKey];
    };
    
    /**
     * 检查菜单是否激活（有子菜单被选中）
     * @param {string} menuKey - 菜单键值
     * @returns {boolean} - 是否激活
     */
    $scope.isMenuActive = function(menuKey) {
      var currentPath = $location.path();
      
      switch(menuKey) {
        case 'user':
          return currentPath.indexOf('/users') === 0;
        case 'system':
          return currentPath.indexOf('/settings') === 0;
        case 'statistics':
          return currentPath.indexOf('/statistics') === 0;
        default:
          return false;
      }
    };
    
    /**
     * 检查当前路由是否激活
     * @param {string} path - 路由路径
     * @returns {boolean} - 是否激活
     */
    $scope.isActive = function(path) {
      return $location.path() === path;
    };
    
    /**
     * 监听路由变化，自动展开相关菜单
     */
    $scope.$on('$routeChangeSuccess', function() {
      var currentPath = $location.path();
      
      // 根据当前路径自动展开相应菜单
      if (currentPath.indexOf('/users') === 0) {
        $scope.openMenus.user = true;
      } else if (currentPath.indexOf('/settings') === 0) {
        $scope.openMenus.system = true;
      } else if (currentPath.indexOf('/statistics') === 0) {
        $scope.openMenus.statistics = true;
      }
    });
    
    // 初始化时根据当前路径展开菜单
    var initPath = $location.path();
    if (initPath.indexOf('/users') === 0) {
      $scope.openMenus.user = true;
    } else if (initPath.indexOf('/settings') === 0) {
      $scope.openMenus.system = true;
    } else if (initPath.indexOf('/statistics') === 0) {
      $scope.openMenus.statistics = true;
    }
  }]); 