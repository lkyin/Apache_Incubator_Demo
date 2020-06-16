

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

var project_info = eval(readTextFile(`measures/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}.json`))




