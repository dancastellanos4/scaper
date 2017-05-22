
var scaper = (function(fBase){

    var taskTodo = {};
    var formDetails = {};
    var userCount;
    var loginUser = {};
    loginUser.loginToken = null;

    var db = fBase.database().ref().child('users').once('value').then(function(snapshot) {
  // /var username = snapshot.val().username;
  console.log(snapshot.val());
  console.log(JSON.stringify(snapshot.val()[1]));
  userCount = Object.keys(snapshot.val()).length;
  // ...
});
   // console.log(db);

var onSignIn = function(guser){
    //alert(guser);
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
  // The signed-in user info.
            var user = result.user;
            loginUser.loginToken = token;
            loginUser.email = user.email;
            loginUser.firstName = user.displayName.split(' ')[0];
            loginUser.lastName = user.displayName.split(' ')[1];

            $("#fname").val(loginUser.firstName);
            $("#lname").val(loginUser.lastName);
            $("#username").val(loginUser.email);
            $("#cc").val('password');

            console.log(token);
            //alert('welcome pendejo ' +  user.displayName);
            console.log(result);
            //email = result.email;
            //name = result.displayName;
            //photoURL
  // ...
        }).catch(function(error) {
  // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
  // The email of the user's account used.
            var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage);
  // ...
        });
    };


    $(document).ready(function(){


//  INITS
//side nave materialize
    // Initialize collapse button
    $(".button-collapse").sideNav({});
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    //$('.collapsible').collapsible();

//    initialize modal
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .3, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 400, // Transition out duration
            starting_top: '4%', // Starting top style attribute
            ending_top: '10%', // Ending top style attribute
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                //alert("Ready");
                console.log(modal, trigger);
            },
            //complete: function() { alert('Closed'); } // Callback for Modal close
        }
    );

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });



//  TEMP NAV
//    HTML injection step 2
var $time= 180;
    $("#request-scaper, #task-back").click(
        function(){
            setTimeout(
                function(){
                    $("#page-start").toggle();
                    $("#page-task-list").toggle();
                },
                180);
        }
    );

    $("#tasks-done, #level-back").click(
        function(){
            setTimeout(
                function(){
                    taskTodo.tasks = [];

                    $.each($(".selected input"), function(i,itm){
                        taskTodo.tasks.push(itm.getAttribute("name"));
                    });

                    console.log(taskTodo);


        $("#page-task-list").toggle();
        $("#page-scaper-level").toggle();
    },
                180);
        }
    );

$("#s-level-pro").click(
        function(e){
            setTimeout(
                function(){
                //tasks.level = e.currentTarget.getAttribute("id");
                taskTodo.level = e.currentTarget.getAttribute("id");
                console.log(taskTodo.level);

                    $("#page-scaper-level").toggle();
                    $("#page-homeowner-signup").toggle();
                },
                180);
        }
    );

    $("#s-level-am, #s-level-asap, #supplies-back").click(
        function(e){
            setTimeout(
                function(){
                //tasks.level = e.currentTarget.getAttribute("id");
                taskTodo.level = e.currentTarget.getAttribute("id");
                console.log(taskTodo.level);

                    $("#page-scaper-level").toggle();
                    $("#page-scaper-supplies").toggle();
                },
                180);
        }
    );


    $('#confirm-request, #tools-s').click(function(){
        taskTodo.bringTools = true;

        $('#page-scaper-supplies').toggle();
        $('#page-homeowner-signup').toggle();
    });

    $('#submit-h-signup').click(function(){
        if (!loginUser.loginToken) {
            onSignIn('onsubmit');
            return;
        }
        var userDetail = {};
        userDetail.fname = $("#fname").val();
        userDetail.lname = $("#lname").val();
        userDetail.email =  $("#username").val();
        userDetail.password = $("#cc").val();
        taskTodo.userDetail = userDetail;
        //alert("store this in firebase");

        var newUser ={

                "email":userDetail.email,
                "first_name":userDetail.fname,
                "home-tools":true,
                "homeowner":true,
                "last_name":userDetail.lname,
                "s-byo":true,
                "s-level":taskTodo.level,
                "scaper":true,
                "tools":{"hedgetrimmers":true,"lawnmower":true,"plow":false,"rake":true,"shovel":true,"trow":true,"weedwhacker":true},
                "username":userDetail.email


        };

        console.log(newUser);
        var newKey = userCount;

        firebase.database().ref('users/' + userCount).set(newUser);

        $('#page-homeowner-signup').toggle();
        $('#page-finding-scaper').toggle();
    });

//    scaper workflow pages
    $('#find-work, #signup-skill-back').click(function(){
        $('#page-start').toggle();
        $('#page-signup-scaper').toggle();
    });

    $('#signup-skill-done, #signup-level-amateur, #signup-tools-back').click(
        function(){
            setTimeout(
                function(){
        $('#page-signup-tools').toggle();
        $('#page-signup-scaper').toggle();
    },
                180);
        }
    );

$('#signup-tools-done').click(
        function(){
            setTimeout(
                function(){
        $('#page-signup-tools').toggle();
        $('#page-scaper-signup').toggle();
    },
                180);
        }
    );


//task list
    //var tsks = url("../scaper-99c90-export.json.");
    var tsks = {
        "tasks" : [{
            "taskcode" : "mowlawn",
            "taskname" : "Mow the lawn",
            "tasktool" : "mower"
        },{
            "taskcode" : "plant",
            "taskname" : "Plant some plants",
            "tasktool" : "shovel"
        },{
            "taskcode" : "weeding",
            "taskname" : "Weed the weeds",
            "tasktool" : "trashbag"
        },{
            "taskcode" : "rakeleaves",
            "taskname" : "Rake the leaves",
            "tasktool" : "rake"
        },{
            "taskcode" : "trim",
            "taskname" : "Trim the hedges",
            "tasktool" : "trimmer",
            "taskseason" : ""
        },{
            "taskcode" : "plow",
            "taskname" : "Plow the driveway",
            "tasktool" : "Plow",
            "taskseason" : "winter"
        }]};

    var listOfClients = "";
    $.each (tsks.tasks, function(i, item) {

        var season = item.taskseason;
        if (season == "winter"){
            var iconName = "ac_unit";
        }else{
            var iconName = "";
        };
        var icon = '<i class="material-icons task-icon">' + iconName + '</i>';

            //listOfClients = listOfClients + "<li>" + item.taskname + "</li>";
        listOfClients = listOfClients + "<li>" +
            "<input class='checkbox' type='checkbox' name='" +
            item.taskcode +
            "' id='" +
            item.taskcode + "'>" +
            "<label for='" + item.taskcode + "'>" +
            item.taskname + icon + "</label>" +
        "</li>";
    });

    $("#task-list").html(listOfClients);

    $('li').click(function(){
        var checkbox = $(this).children('input');
        checkbox.prop("checked", !checkbox.prop("checked"));
        $(this).toggleClass('selected')

    });

    $('input').change(function(){
        $(this).parent('li').toggleClass('selected');
    });

//    back button learning test
//    $('.back-button').click(function(){
//        var b = $(this).closest('.page')[0]['id'];
//        b.toggle();
//        switch(b){
//            case "page-task-list":
//                $('#page-start').toggle();
//                break;
//            case "page-scaper-level":
//                $('#page-task-list').toggle();
//                break;
//        }
//
//    });



});

return {
    taskTodo:taskTodo,
    dBase: db,
    onSignIn: onSignIn
}

})(firebase);

