var array=[];
var mesobj={}
var app = angular.module('mainApp',['ngRoute']);
var fromName = [];

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
        templateUrl:'login.html',
        controller:'loginCtrl'


    })
        .when('/registration',{
        templateUrl:'registration.html',
        controller:'registerCtrl'

        })
        .when('/welcome', {


            templateUrl : "profile.html",
            controller : "profileCtrl as profile"


    })
        .when('/message', {

        templateUrl : "message.html",
        controller : "chatCtrl"
    })

//        .otherwise({
//        redirectTo:'/'
//    });


});





app.controller('registerCtrl',function($scope,$location){
    $scope.validateInput = function(){
        console.log("hi")
        console.log($scope.regData);
        var firstname = $scope.regData.firstname;

        console.log(firstname);
        var lastname =$scope.regData.lastname ;
        console.log(lastname);
        var username =$scope.regData.username ;
        console.log(username);
        var email = $scope.regData.email;
        console.log(email);
        var password =$scope.regData.password ;
        console.log(password);
        var confirmPassword =$scope.regData.confirmPassword;

        // validate input fields
        // check if firstname is not number or symbols and length <= 20

        var pattern1 = new RegExp(/[~`!#$%\^&*@+=\-\[\]\\';.,/{}|\\":<>\?]/);
        var pattern2 = new RegExp(/[0-9]/);

        var firstNameLength = firstname.length;

        if (pattern1.test(firstname) || pattern2.test(firstname) || firstNameLength >= 20) {
            document.getElementById("invalidFirstname").setAttribute("style","display:;");
        }else{
            if(document.getElementById("invalidFirstname").getAttribute("style") == "display:;"){
                document.getElementById("invalidFirstname").setAttribute("style","display:none;");
            }
        }

        // check if lastname is not number or symbols and length <= 20

        var lastNameLength = lastname.length;

        if (pattern1.test(lastname) || pattern2.test(lastname) || lastNameLength >= 20) {
            document.getElementById("invalidLastname").setAttribute("style","display:;");
        }else{
            if(document.getElementById("invalidLastname").getAttribute("style") == "display:;"){
                document.getElementById("invalidLastname").setAttribute("style","display:none;");
            }
        }

        // check if lastname is not number or symbols and length <= 20
        console.log(username);
        var usernameLength = username.length;

        if (usernameLength > 20) {
            document.getElementById("invalidusername").setAttribute("style","display:;");
        }else{
            if(document.getElementById("invalidusername").getAttribute("style") == "display:;"){
                document.getElementById("invalidusername").setAttribute("style","display:none;");
            }
        }

        // check for valid email has "@" and ".com"

        var emailLength = email.length;
        var CheckEmail1 = email.includes("@");

        if(email == ""){
            document.getElementById("invalidEmail").setAttribute("style","display:none;");
        }else{
            if (!CheckEmail1) {
                document.getElementById("invalidEmail").setAttribute("style","display:;");
            }else{

                if(document.getElementById("invalidEmail").getAttribute("style") == "display:;"){
                    document.getElementById("invalidEmail").setAttribute("style","display:none;");
                }
            }
        }



        var passwordLength = password.length;

        if(password == ""){
            document.getElementById("invalidPassword").setAttribute("style","display:none;");
        }else{
            if (passwordLength < 6 || passwordLength > 15) {
                document.getElementById("invalidPassword").setAttribute("style","display:;");
            }else{
                if(document.getElementById("invalidPassword").getAttribute("style") == "display:;"){
                    document.getElementById("invalidPassword").setAttribute("style","display:none;");
                }
            }
        }
        // check if password === confirm password

        if(confirmPassword == ""){
            document.getElementById("invalidConfirmPassword").setAttribute("style","display:none;");
        }else{
            if (confirmPassword != password) {
                document.getElementById("invalidConfirmPassword").setAttribute("style","display:;");
            }else{
                if(document.getElementById("invalidConfirmPassword").getAttribute("style") == "display:;"){

                    document.getElementById("invalidConfirmPassword").setAttribute("style","display:none;");
                }
            }

        }
        var stuobj={Firstname:firstname,Lastname:lastname,Emailid:email,Userid:username,password:password,message:[]};
        //array=JSON.parse(localStorage.getItem('details'));
        array.push(stuobj);
        console.log(array);
        localStorage.setItem("details", JSON.stringify(array));
        $location.path("/login")

    }

});

app.controller('loginCtrl',function($scope,$location,$rootScope){
    $scope.submit = function() {
        var user=$scope.redData.username;
        console.log(user);
        var pass=$scope.redData.password;
        console.log(pass);
        var array1=JSON.parse(localStorage.getItem('details'));
        for(var i=0;i<array1.length;i++){
            var c = array1[i];
            console.log($rootScope.test);
            if(c.Userid == user && c.password == pass){
                $rootScope.loggedIn=true;
                $rootScope.fromName = c.Userid;

                $rootScope.test=c;
                var indexvalue;
                $rootScope.indexvalue=array1.indexOf(c);
                var userindex=$rootScope.indexvalue;
                localStorage.setItem("indexvalue", JSON.stringify(userindex));
                console.log($rootScope.indexvalue);
                console.log(c.Userid);
                alert("login successful");

                $location.path("/welcome");
                var userlogin={};
                userlogin=$rootScope.test;
                localStorage.setItem("userlogin", JSON.stringify(userlogin));
                { break; }

            }
        }
        if(!(c.Userid == user && c.password == pass)){
            alert("please enter valid username and password");
        }


    };

    $scope.registrationpage=function(){
        $location.path('/registration');}
});



app.controller('profileCtrl',function($scope,$location,$rootScope,$http){
    if(localStorage.userlogin){
        //var array=[];
        var array=JSON.parse(localStorage.getItem('userlogin'));
        var user;
        $scope.user=array;
        console.log($scope.user)
        this.editMode = false;
        var scope = this;

        this.trigerEditMode = function(){
            this.editMode = !this.editMode;
        }
    }
    else{
        $location.path('/login');
    }



    this.saveUpdatedInfo=function(){
        // console.log($rootScope.test)
        // console.log($rootScope.indexvalue);

        array1=JSON.parse(localStorage.getItem('details'));
        array2=JSON.parse(localStorage.getItem('indexvalue'));
        array=JSON.parse(localStorage.getItem('userlogin'));

        console.log(array1[array2]);
        var fs =document.getElementById("fname").value;
        var ls=document.getElementById("lname").value;
        console.log();
        var us=document.getElementById("uname").value;;
        var em=document.getElementById("ename").value;;
        var ps=document.getElementById("pname").value;;
        console.log(fs);
        array1[array2]={Firstname:fs,Lastname:ls,Emailid:em,Userid:us,password:ps};
        array={Firstname:fs,Lastname:ls,Emailid:em,Userid:us,password:ps};
        //console.log($rootScope.indexvalue);
        localStorage.setItem("details", JSON.stringify(array1));
        localStorage.setItem("userlogin", JSON.stringify(array));

    }

});


app.controller('chatCtrl',function($scope,$location,$rootScope,$http){
    var array3=JSON.parse(localStorage.getItem('userlogin'));
    $scope.user3=array3.message;

    console.log(array3.message);
    $rootScope.fromName;
    $scope.messagepage=function(){
        $location.path('/message');}
    $scope.sendmessage=function() {
        var sender=document.getElementById("to").value;
        console.log(sender);
        var array1=JSON.parse(localStorage.getItem('details'));
        for(var i=0;i<array1.length;i++){
            var b = array1[i];
            //console.log($rootScope.test);
            if(b.Emailid == sender){
                console.log(b);

                var  email=document.getElementById("message").value;

                mesobj={mess:email,sender:array3.Firstname}
                console.log(mesobj);
                b.message.push(mesobj);

                localStorage.setItem("details", JSON.stringify(array1));
                document.getElementById("message").value="";
                document.getElementById("to").value="";
                alert("your message has been sent");
            }

        }
        if(!(b.Emailid == sender)){
            alert("please enter vaild Emailid");

        }
    }

    $scope.clearmessage=function(){

        console.log("i m clear controller");
        document.getElementById("message").value="";
        alert("i m clear");
    }
    $scope.removeRow = function(name){
        var index = -1;
        var comArr = eval( $scope.user3 );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            ///alert( "Something gone wrong" );
        }
        $scope.user3.splice( index, 1 );

        //        localStorage.setItem("details", JSON.stringify(array3));
        localStorage.setItem("userlogin", JSON.stringify(array3));
        array1=JSON.parse(localStorage.getItem('details'));
        array2=JSON.parse(localStorage.getItem('indexvalue'))
        array1[array2]=array3;
        localStorage.setItem("details", JSON.stringify(array1));

    };
    $scope.logout=function(){
        localStorage.removeItem("userlogin");
        localStorage.removeItem("indexvalue");
        $location.path('/')
    }


});
