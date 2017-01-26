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
        $("#page-task-list").toggle();
        $("#page-scaper-level").toggle();
    },
                180);
        }
    );

    $("#s-level-pro, #s-level-am, #s-level-asap, #supplies-back").click(
        function(){
            setTimeout(
                function(){
                    $("#page-scaper-level").toggle();
                    $("#page-scaper-supplies").toggle();
                },
                180);
        }
    );

    $('#confirm-request').click(function(){

        $('#page-scaper-supplies').toggle();
        $('#page-homeowner-signup').toggle();
    });

    $('#submit-h-signup').click(function(){
        $('#page-homeowner-signup').toggle();
        $('#page-scaper-omw').toggle();
    });

//    scaper workflow pages
    $('#find-work, #signup-skill-back').click(function(){
        $('#page-start').toggle();
        $('#page-signup-scaper').toggle();
    });
    $('#signup-skill-done, #signup-tools-back').click(
        function(){
            setTimeout(
                function(){
        $('#page-signup-tools').toggle();
        $('#page-signup-scaper').toggle();
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

