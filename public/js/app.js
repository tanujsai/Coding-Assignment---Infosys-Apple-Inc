console.log("appjs");

var app = angular.module("myApp", ["ui.router", "ngAnimate", "ui.bootstrap", "angular-confirm", "ngMaterial"]);


//Routing Logic

// app.config(function($routeProvider) {
//     $routeProvider
//         .when("/", {
//             templateUrl: "/buddylist.html",
//             controller: "buddy"
//         })
//         .when("/signup", {
//             templateUrl: "/signup.html",
//             controller: "formcntrl"

//         });
// });

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/signup');

    $stateProvider

        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html'
        })
        .state('buddyList', {
            url: '/buddylist',
            templateUrl: 'buddylist.html'
        })
});

app.controller('formcntrl', function($scope, $http, $state) {


    //Date range selector 

    this.myDate = new Date();

    $scope.minDate = new Date(
        this.myDate.getFullYear() - 150,
        this.myDate.getMonth() ,
        this.myDate.getDate()
    );

    $scope.maxDate = new Date(
        this.myDate.getFullYear() - 14,
        this.myDate.getMonth(),
        this.myDate.getDate()
    );
    $scope.userObj = {}
    $scope.addNewUser = function() {
            console.log($scope.userObj);
            validateData($scope.userObj);
            $state.go('buddyList', {});

        }
    
    // User Data Validation Funtion

    function validateData(userObj) {
        if (userObj == null) {
            alert("Error.. Please Resubmit");
        } else if (userObj.password != userObj.confPass) {
            alert("Password does not match with the confirm password");
        } else {
            console.log(userObj);
            //I'm assuming there is a bakend API to save the Data

            $http({
                method: 'POST',
                url: '/addNewUser',
                data: userObj
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                alert("user data submitted successfully");
                // //Resetting the form
                // $scope.userObj = {}
                // $scope.myForm.$setUntouched();
                // $scope.myForm.$setPristine();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("new user data is not uploaded");
                alert("500: Internal Server Error.. Please Resubmit");

            });

        }
    }
});

app.controller('buddy', function($scope, $http, $confirm) {

    $scope.name = "tanuj";

    $scope.sort = {
        active: '',
        descending: undefined
    }; //sort

    $scope.changeSorting = function(column) {
        var sort = $scope.sort;
        if (sort.active == column) {
            sort.descending = !sort.descending;
        } else {
            sort.active = column;
            sort.descending = false;
        }
    };
    $scope.getIcon = function(column) {
            var sort = $scope.sort;
            if (sort.active == column) {
                return sort.descending ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';
            }

            return 'glyphicon-chevron-down';
        }
    // Define an array of objects
    $http.get('data1.json').then(function(response) {
        if (response.status = 200 && response.data.buddies.length > 0) {
            $scope.buddies = response.data.buddies;
            $scope.closeAllBuddies = []; // this is the array which holds the extra info
            for (i = 0; i < $scope.buddies.length; i++) {
                $scope.closeAllBuddies[i] = false;
            }
        }

    })

    //Show More Button Funtion
    $scope.showMoreDetails = function(index, userName) {

        for (i = 0; i < $scope.buddies.length; i++) {
            $scope.closeAllBuddies[i] = false;
        }

        $scope.test = !$scope.test;
        $scope.closeAllBuddies[index + '' + userName] = true;

    };
    //I'm not usnig API fuction call for this 
    //I'm demonstrating I can delete in UI for particular session.
    $scope.deleteBuddy = function(index, userName) {
        $confirm({
            text: "Are you sure you want to Delete ",
            title: "Delete it",
            ok: "Yes",
            cancel: "No"
        }).then(function() {
            angular.forEach($scope.buddies, function(buddyObj, buddyIndex) {
                if (buddyObj.userName === userName) {
                    $scope.buddies.splice(buddyIndex, 1);
                    return;
                }
            });
        });

    }


});
