angular.module('app', ['ngStorage']).controller('indexController', function ($scope, $http, $localStorage) {
    const contextPath = 'http://localhost:8080/app/api/v1';


    $scope.loadProducts = function (pageIndex=1) {
        $http({
            url: contextPath + '/products',
            method: 'GET',
            params: {
                page: pageIndex,
                min_price: $scope.filter ? $scope.filter.min_price : null,
                max_price: $scope.filter ? $scope.filter.max_price : null,
                title_part: $scope.filter ? $scope.filter.title_part : null
            }
        }).then(function (response) {

            $scope.ProductList = response.data.content;
        });
    }


    $scope.resetForm = function() {
            $scope.filter.min_price = null;
            $scope.filter.max_price = null;
            $scope.filter.title_part = null;
          $scope.loadProducts();
    };

    $scope.deleteProduct = function (productId) {
        console.log('Click deleteProduct', productId);
        $http.delete(contextPath + '/products/' + productId)
            .then(function (response) {
                $scope.loadProducts();
            });
    }


    $scope.addProduct = function () {
        console.log('Click addProduct!', $scope.newProduct);
        $http.post(contextPath + '/products', $scope.newProduct)
            .then(function (response) {
                $scope.newProduct.title = null;
                $scope.newProduct.price = null;
                $scope.newProduct.manufacturer = null;
                $scope.loadProducts();
            });
    }



    $scope.loadCart = function () {
        $http({
            url: contextPath + '/products/cart',
            method: 'GET'
        }).then(function (response) {
            $scope.CartList = response.data;
            console.log($scope.CartList)
        });
    }

    $scope.addProductInCart= function (productId) {
        $scope.count= 1;
        console.log('Click addProductInCart', productId);
        $http.get(contextPath + '/products/cart/' + productId)
            .then(function (response) {
                $scope.loadCart();
            });
    }

    $scope.deleteProductFromCart= function (productId) {
        console.log('Click deleteProductFromCart', productId);
        $http.delete(contextPath + '/products/cart/' + productId)
            .then(function (response) {
                $scope.loadCart();
            });
    }




    $scope.tryToAuth = function () {
        $http.post('http://localhost:8080/app/auth', $scope.user)
            .then(function successCallback(response) {
                if (response.data.token) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $localStorage.springWebUser = {username: $scope.user.username, token: response.data.token};

                    $scope.user.username = null;
                    $scope.user.password = null;
                }
            }, function errorCallback(response) {
            });
    };

    $scope.tryToLogout = function () {
        $scope.clearUser();
        if ($scope.user.username) {
            $scope.user.username = null;
        }
        if ($scope.user.password) {
            $scope.user.password = null;
        }
    };

    $scope.clearUser = function () {
        delete $localStorage.springWebUser;
        $http.defaults.headers.common.Authorization = '';
    };

    $rootScope.isUserLoggedIn = function () {
        if ($localStorage.springWebUser) {
            return true;
        } else {
            return false;
        }
    };

    $scope.showCurrentUserInfo = function () {
        $http.get('http://localhost:8080/app/api/v1/profile')
            .then(function successCallback(response) {
                alert('MY NAME IS: ' + response.data.username);
            }, function errorCallback(response) {
                alert('UNAUTHORIZED');
            });
    }




    $scope.loadProducts();

});
