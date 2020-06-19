
// values for all forces
forceProperties = {
    center: {
        x: 0.5,
        y: 0.5
    },
    charge: {
        enabled: true,
        strength: -30,
        distanceMin: 1,
        distanceMax: 2000
    },
    collide: {
        enabled: true,
        strength: .7,
        iterations: 1,
        radius: 5
    },
    forceX: {
        enabled: false,
        strength: .1,
        x: .5
    },
    forceY: {
        enabled: false,
        strength: .1,
        y: .5
    },
    link: {
        enabled: true,
        distance: 30,
        iterations: 1
    },
    // load the selected data
    selected_data: {
        project: 183,
        month: 1,
        ntype: 'email'
    }
}

// Begin tehnical net //////

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false); // using synchronous call
    var allText;
    rawFile.onreadystatechange = function ()
    {   
    allText = rawFile.responseText;
    }
    rawFile.send(null);
    return allText;
}

//
var projectInfo = JSON.parse(readTextFile(`measures/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}.json`));

var name_to_id = JSON.parse(readTextFile("name_to_id.json"));




