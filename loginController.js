app.controller('loginCtrl',function($scope){
  $scope.submit = function() {
    var username=$scope.username;
    var password=$scope.password;
    if($scope.username == ""){
      alert("please enter valid ");}
    
    else if($scope.password ==""){
      alert("please enter valid ");}
      
    }

  }
);


//var stuobj={username:username.};
//
//                                array = JSON.parse(localStorage.getItem('details'));
//
//                                array.push(stuobj);
//
//                                localStorage.setItem("details", JSON.stringify(array));
//                                clear_values();
//
//                                console.log(len)
