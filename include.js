

function UpdateprojectInfo(){
    projectInfo = JSON.parse(readTextFile(`measures/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}.json`));
    //document.getElementById("leftp").innerHTML = "<p><label>Project Name </label> </p>\
    //<p><label>Project Name </label> </p>\
    //eval('document.write(projectInfo.project_name)')";

    //$("#leftp").html("<script> document.write(projectInfo.project_name) </script>;");

    //document.getElementById("project_name").innerHTML = projectInfo.project_name;
    document.getElementById("link").innerHTML = '<a href="' + projectInfo.link + '"> ' + projectInfo.project_name + '</a>';
    document.getElementById("status").innerHTML = projectInfo.status;
    document.getElementById("sponsor").innerHTML = projectInfo.sponsor;
    
    document.getElementById("intro").innerHTML = projectInfo.intro;
    document.getElementById("start").innerHTML = projectInfo.start_time;
    document.getElementById("end").innerHTML = projectInfo.end_time;

    document.getElementById("num_emails").innerHTML = projectInfo.num_emails;
    document.getElementById("num_senders").innerHTML = projectInfo.num_senders;
    document.getElementById("email_per_dev").innerHTML = projectInfo.email_per_dev;

    document.getElementById("num_commits").innerHTML = projectInfo.num_commits;
    document.getElementById("num_committers").innerHTML = projectInfo.num_committers;
    document.getElementById("commit_per_dev").innerHTML = projectInfo.commit_per_dev;
    document.getElementById("from").innerHTML = projectInfo.from;
    document.getElementById("to").innerHTML = projectInfo.to;
    //document.getElementById("incubation_time").innerHTML = '<input id = "incubation_time" type="range" min="1" max=' + projectInfo.incubation_time + ' value="1" step="1" oninput="d3.select("#Month").text(value); forceProperties.selected_data.month=value; updateAll();">;'
    //document.getElementById("incubation_time").innerHTML = '<input type="range" id = "incubation_time" min="1" max=' + projectInfo.incubation_time + ' value="1" step="1">;'
        
}



function UpdateMaxIncubation(){

var slider = document.getElementById('MaxIncubation');

slider.max = projectInfo.incubation_time
slider.min = 1
slider.value = slider.min

document.getElementById('Month').innerHTML = '<output id="Month">' + slider.min + '</output>'

//$("MaxIncubation").slider('option',{min: 5, max: 50});

}





