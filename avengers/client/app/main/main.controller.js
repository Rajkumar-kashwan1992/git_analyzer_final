(function() {
    'use strict';
    /*/* jshint camelcase: false */
     /*if(!localStorage.getItem("ID")){
            window.location.href = '/login';
        } */

    angular.module('wmsApp')
        .controller('mainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$http','socialLoginService' ,'$rootScope' ,'$timeout' ];

    function MainCtrl($scope, $http,socialLoginService,$rootScope,$timeout) {

        $scope.name=""; 
        $scope.prevUser=""; /*Username*/
        $scope.repo_list="";  // List of all the repository that a user has worked on
        $scope.btnclicked = false; 
        $scope.searchbtn = false;  
        $scope.selectedvalues = "";     // repository varaible name
        $scope.ip = "http://10.2.11.127:8000/"  //Server IP address
        $scope.date_from = null;
        $scope.date_to = null;
        
 // Event occur on pressing the ENTER KEY , call fetchrepo function inside it.
       $scope.usernameEnter = function(keyEvent){
            if (keyEvent.which === 13) {
                document.getElementById("Op").style.opacity = 1;
                document.getElementById("btn").style.opacity = 1;
                $scope.enableSubmit = true;
                $scope.fetchRepo();
            }
            else {
                document.getElementById("Op").style.opacity = 0.3;
                document.getElementById("btn").style.opacity = 0.3;
                $scope.enableSubmit = false;
                console.log("$scope.enableSubmit = " +$scope.enableSubmit);
            }

        }
        //conditon to check whether user is logged in or not
       if(!localStorage.getItem("ID")){
            window.location.href = '/login';
        }
      // select the repository name
       $scope.getselectedvalue = function () {
            $scope.selectedvalues= $scope.selectedName;
            //console.log($scope.selectedvalues);
        }
      
      //Logout function from App
        $scope.signOut=function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log('User signed out.');
              localStorage.removeItem('ID');
              window.location.href = '/login';
            });
          }

        /* Fetch the list of repository for a particular USERNAME */
        $scope.fetchRepo = function(){
           // alert('hi');
        
        if($scope.name !== "" && $scope.name !== $scope.prevUser){
            $scope.prevUser = $scope.name;
            $http.get($scope.ip+"gitapi/get_user_repository/"+$scope.name+"/?format=json")
            .success(function(response) {
                console.log($scope.ip+"gitapi/get_user_repository/"+$scope.name+"/?format=json");
                $scope.repo_list = response.Repository;
                $scope.repo_arr=[];
                for (var i = 0; i < $scope.repo_list.length; i++) {
                    $scope.repo_arr[i]=$scope.repo_list[i];
                }
            //console.log($scope.repo_list);
            }).error(function(error) {
                    $scope.employees = null;
                    $scope.root_link = null;
                    $scope.no_of_pages = null;
                    $scope.page_array = null;
                    $scope.btnclicked = false;
                    //alert("No repository available");
                    $scope.repo_arr=[];
                    alert(error.message);
                    document.getElementById("Op").style.opacity = 0.3;
                    document.getElementById("btn").style.opacity = 0.3;
                    $scope.enableSubmit = false;
                    }
                );
        }    
        else
        {
            document.getElementById("Op").style.opacity = 0.3;
            document.getElementById("btn").style.opacity = 0.3;
            alert("PLease  Enter a valid Username");
        }

       }
      
      
       /*Search the comments detail based on the input paramaters*/
        $scope.search=function(){
            socialLoginService.logout()
            $scope.btnclicked = true;
            $scope.sortType     = 'commented_by.username'; // set the default sort type
            $scope.sortReverse  = false;  // set the default sort order
            

            //case 1 : when only user name is entered.
            if($scope.date_from === null && $scope.date_to === null && $scope.selectedvalues===null){
                $http.get($scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&limit=2&offset=0")
                .success(function(response) {
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    $scope.count= response.count;
                    $scope.limit =2;
                    $scope.no_of_pages = Math.ceil($scope.count/$scope.limit);
                    $scope.page_array = new Array($scope.no_of_pages);
                    $scope.root_link = $scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json";
                    //console.log($scope.name);
                    }

                ).error(function(data, status) {
                     $scope.employees = null;
                     $scope.root_link = null;
                     $scope.no_of_pages = null;
                     $scope.page_array = null;
                     $scope.btnclicked = false;
                     $scope.date_from = null;
                     $scope.date_to =null;
                     $scope.selectedvalues= null;
                      alert("Comment not found");
                    }
                );
            }
//----------------------------------------------------------
            //case 2 : Only date_from field is selected
           else if($scope.date_to === null && $scope.selectedvalues===null){
            $http.get($scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&from_date="+$scope.date_from.getFullYear()+"-"+($scope.date_from.getMonth()+1)+"-"+$scope.date_from.getDate()+"&limit=2&offset=0")
                .success(function(response) {
                    //var a = $scope.date_from.getDay();

                //document.write($scope.date_from);
                    //console.log($scope.date_from);
                    $scope.employees = response;
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    $scope.count= response.count;
                    $scope.limit =2;
                    $scope.no_of_pages = Math.ceil($scope.count/$scope.limit);
                    $scope.page_array = new Array($scope.no_of_pages);
                    $scope.root_link = $scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&from_date="+$scope.date_from.getFullYear()+"-"+($scope.date_from.getMonth()+1)+"-"+$scope.date_from.getDate();
                    //console.log($scope.name);

                    }

                ).error(function(data, status) {
                     $scope.employees = null;
                     $scope.root_link = null;
                     $scope.no_of_pages = null;
                     $scope.page_array = null;
                     $scope.btnclicked = false;
                     $scope.date_from = null;
                     $scope.date_to =null;
                     $scope.selectedvalues= null;
                      alert("Comment not found");
                    }
                );

           }
            //case 3 : Only date_to field is selected 
            else if($scope.date_from === null && $scope.selectedvalues===null){
            $http.get($scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&to_date="+$scope.date_to.getFullYear()+"-"+($scope.date_to.getMonth()+1)+"-"+$scope.date_to.getDate()+"&limit=2&offset=0")
                .success(function(response) {
                    //var a = $scope.date_from.getDay();

                //document.write($scope.date_from);
                    //console.log($scope.date_from);
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    $scope.count= response.count;
                    $scope.limit =2;
                    $scope.no_of_pages = Math.ceil($scope.count/$scope.limit);
                    $scope.page_array = new Array($scope.no_of_pages);
                    $scope.root_link = $scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&to_date="+$scope.date_to.getFullYear()+"-"+($scope.date_to.getMonth()+1)+"-"+$scope.date_to.getDate();

                    }

                ).error(function(data, status) {
                     $scope.employees = null;
                     $scope.root_link = null;
                     $scope.no_of_pages = null;
                     $scope.page_array = null;
                     $scope.btnclicked = false;
                      $scope.date_from = null;
                     $scope.date_to =null;
                     $scope.selectedvalues= null;
                      alert("Comment not found");
                    }
                );

           }
            //case 4 : Only repository is selected
            else if($scope.date_from === null && $scope.date_to===null){
            $http.get($scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&repository="+$scope.selectedvalues+"&limit=2&offset=0")
                .success(function(response) {
                    //var a = $scope.date_from.getDay();

                //document.write($scope.date_from);
                    //console.log($scope.date_from);
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    $scope.count= response.count;
                    $scope.limit =2;
                    $scope.no_of_pages = Math.ceil($scope.count/$scope.limit);
                    $scope.page_array = new Array($scope.no_of_pages);
                    $scope.root_link = $scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&repository="+$scope.selectedvalues;

                    }

                ).error(function(data, status) {
                     $scope.employees = null;
                     $scope.root_link = null;
                     $scope.no_of_pages = null;
                     $scope.page_array = null;
                     $scope.btnclicked = false;
                      $scope.date_from = null;
                     $scope.date_to =null;
                     $scope.selectedvalues= null;
                      alert("Comment not found");
                    }
                );

           }
           //case 5: When date_from and repository fields are selected
           else if($scope.date_to === null ){
            $http.get($scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&from_date="+$scope.date_from.getFullYear()+"-"+($scope.date_from.getMonth()+1)+"-"+$scope.date_from.getDate()+"&repository="+$scope.selectedvalues+"&limit=2&offset=0")
                .success(function(response) {
                    //var a = $scope.date_from.getDay();

                //document.write($scope.date_from);
                    //console.log($scope.date_from);
                    $scope.employees = response;
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    $scope.count= response.count;
                    $scope.limit =2;
                    $scope.no_of_pages = Math.ceil($scope.count/$scope.limit);
                    $scope.page_array = new Array($scope.no_of_pages);
                    $scope.root_link = $scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&from_date="+$scope.date_from.getFullYear()+"-"+($scope.date_from.getMonth()+1)+"-"+$scope.date_from.getDate()+"&repository="+$scope.selectedvalues;
                    //console.log($scope.selectedvalues);

                    }

                ).error(function(data, status) {
                     $scope.employees = null;
                     $scope.root_link = null;
                     $scope.no_of_pages = null;
                     $scope.page_array = null;
                     $scope.btnclicked = false;
                      $scope.date_from = null;
                     $scope.date_to =null;
                     $scope.selectedvalues=null;
                      alert("Comment not found");
                    }
                );

           }
            //case 6 : When date_to and repository fields are selected
            else if($scope.date_from === null){
            $http.get($scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&to_date="+$scope.date_to.getFullYear()+"-"+($scope.date_to.getMonth()+1)+"-"+$scope.date_to.getDate()+"&repository="+$scope.selectedvalues+"&limit=2&offset=0")
                .success(function(response) {
                    //var a = $scope.date_from.getDay();

                //document.write($scope.date_from);
                //console.log($scope.date_from);
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    $scope.count= response.count;
                    $scope.limit =2;
                    $scope.no_of_pages = Math.ceil($scope.count/$scope.limit);
                    $scope.page_array = new Array($scope.no_of_pages);
                    $scope.root_link = $scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json&to_date="+$scope.date_to.getFullYear()+"-"+($scope.date_to.getMonth()+1)+"-"+$scope.date_to.getDate()+"&repository="+$scope.selectedvalues;

                    }

                ).error(function(data, status) {
                     $scope.employees = null;
                     $scope.root_link = null;
                     $scope.no_of_pages = null;
                     $scope.page_array = null;
                     $scope.btnclicked = false;
                      $scope.date_from = null;
                     $scope.date_to =null;
                     $scope.selectedvalues= null;
                      alert("Comment not found");
                    }
                );

           }
        //case 7: When date_from and date_to fields are selected

        else if($scope.selectedvalues===null && $scope.date_from!= null && $scope.date_to!= null) 
           {
            console.log($scope.date_from);
            console.log($scope.date_to);
            $http.get($scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json"+"&from_date="+$scope.date_from.getFullYear()+"-"+($scope.date_from.getMonth()+1)+"-"+$scope.date_from.getDate()+"&to_date="+$scope.date_to.getFullYear()+"-"+($scope.date_to.getMonth()+1)+"-"+$scope.date_to.getDate()+"&limit=2&offset=0")
                .success(function(response) {
                    //var a = $scope.date_from.getDay();

                //document.write($scope.date_from);
                //console.log($scope.date_from);
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    $scope.count= response.count;
                    $scope.limit =2;
                    $scope.no_of_pages = Math.ceil($scope.count/$scope.limit);
                    $scope.page_array = new Array($scope.no_of_pages);
                    $scope.root_link = $scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json"+"&from_date="+$scope.date_from.getFullYear()+"-"+($scope.date_from.getMonth()+1)+"-"+$scope.date_from.getDate()+"&to_date="+$scope.date_to.getFullYear()+"-"+($scope.date_to.getMonth()+1)+"-"+$scope.date_to.getDate();

                }

            ).error(function(data, status) {
                     $scope.employees = null;
                     $scope.root_link = null;
                     $scope.no_of_pages = null;
                     $scope.page_array = null;
                     $scope.btnclicked = false;
                      $scope.date_from =null;
                     $scope.date_to =null;
                     $scope.selectedvalues= null;
                      alert("Comment not found");
                    }
                );
           }
           //case 8: When all fields are selected
           else
           {
            console.log($scope.name);
            console.log($scope.date_from);
            console.log($scope.date_to);
            $http.get($scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json"+"&from_date="+$scope.date_from.getFullYear()+"-"+($scope.date_from.getMonth()+1)+"-"+$scope.date_from.getDate()+"&to_date="+$scope.date_to.getFullYear()+"-"+($scope.date_to.getMonth()+1)+"-"+$scope.date_to.getDate()+"&repository="+$scope.selectedvalues+"&limit=2&offset=0")
                .success(function(response) {
                    //var a = $scope.date_from.getDay();

                //document.write($scope.date_from);
                //console.log($scope.date_from);
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    $scope.count= response.count;
                    $scope.limit =2;
                    $scope.no_of_pages = Math.ceil($scope.count/$scope.limit);
                    $scope.page_array = new Array($scope.no_of_pages);
                    $scope.root_link = $scope.ip+"gitapi/get_user_comment/"+$scope.name+"/?format=json"+"&from_date="+$scope.date_from.getFullYear()+"-"+($scope.date_from.getMonth()+1)+"-"+$scope.date_from.getDate()+"&to_date="+$scope.date_to.getFullYear()+"-"+($scope.date_to.getMonth()+1)+"-"+$scope.date_to.getDate()+"&repository="+$scope.selectedvalues;

                }

            ).error(function(data, status) {
                     $scope.employees = null;
                     $scope.root_link = null;
                     $scope.no_of_pages = null;
                     $scope.page_array = null;
                     $scope.btnclicked = false;
                      $scope.date_from = "";
                     $scope.date_to ="";
                     $scope.selectedvalues= "";
                      alert("Comment not found");
                    }
                );
           }







         //----------------------------------------------------------
        }
        $scope.go_to_next_page = function(page_index){
           //console.log($scope.page_index);
           //$scope.next_page="dsfsd";
           $scope.page_index1=page_index;
           $scope.offset=$scope.page_index1 *2;
           $scope.page_link = $scope.root_link+"&limit=2&offset="+$scope.offset;
           console.log($scope.page_index1);
           $http.get($scope.page_link)
                .success(function(response) {
                    $scope.employees = response.results;
                    $scope.next_page = response.next;
                    $scope.previous_page = response.previous;
                    //console.log($scope.employees);
                    //console.log($scope.previous_page);
                }

            ).error(function(data, status) {
                     $scope.employees = null;
                      alert("Comment not found");
                    }
                );
           //console.log($scope.next_page);
        }
       
    }
})();

