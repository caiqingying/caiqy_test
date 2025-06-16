angular.module('myApp', [])
    .controller('MainController', function($scope) {
        // 页面标题
        $scope.title = '欢迎来到我的网站';

        // 菜单项
        $scope.menuItems = [
            {
                name: '首页',
                title: '欢迎访问',
                description: '这是一个使用 AngularJS 构建的示例网站。'
            },
            {
                name: '关于我们',
                title: '关于我们',
                description: '我们是一个专注于提供优质服务的团队。'
            },
            {
                name: '服务',
                title: '我们的服务',
                description: '我们提供多种服务，包括网站开发、移动应用开发等。'
            },
            {
                name: '联系我们',
                title: '联系方式',
                description: '您可以通过以下方式联系我们。'
            }
        ];

        // 默认选中的菜单项
        $scope.selectedItem = $scope.menuItems[0];

        // 表单数据
        $scope.formData = {
            name: '',
            email: '',
            message: '',
            file: null,
            fileName: '',
            fileSize: ''
        };

        // 选择菜单项
        $scope.selectMenuItem = function(item) {
            $scope.selectedItem = item;
        };

        // 处理文件选择
        $scope.handleFileSelect = function(files) {
            if (files && files.length > 0) {
                var file = files[0];
                $scope.formData.file = file;
                $scope.formData.fileName = file.name;
                $scope.formData.fileSize = formatFileSize(file.size);
                $scope.$apply(); // 更新视图
            }
        };

        // 格式化文件大小
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            var k = 1024;
            var sizes = ['Bytes', 'KB', 'MB', 'GB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // 提交表单
        $scope.submitForm = function() {
            if ($scope.formData.name && $scope.formData.email && $scope.formData.message) {
                var message = '表单提交成功！\n' +
                            '姓名：' + $scope.formData.name + '\n' +
                            '邮箱：' + $scope.formData.email + '\n' +
                            '留言：' + $scope.formData.message;
                
                if ($scope.formData.file) {
                    message += '\n文件：' + $scope.formData.fileName + 
                             '\n文件大小：' + $scope.formData.fileSize;
                }

                alert(message);
                
                // 重置表单
                $scope.formData = {
                    name: '',
                    email: '',
                    message: '',
                    file: null,
                    fileName: '',
                    fileSize: ''
                };
            }
        };
    }); 