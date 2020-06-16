
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
        project: 49,
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




//var svg_t = d3.select("#right").append("svg").attr("width", 600).attr("height", 400);


UpdateTechnicalNet()

function UpdateTechnicalNet(){

var svg = d3.select("#rightsvg")

svg.selectAll("*").remove();

var data = eval(readTextFile(`directed_network/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_commit.json`))

var color = d3.scaleOrdinal(d3.schemeCategory20);
//var svg = d3.select("#rightsvg")

//svg.append("text").attr("x",250).attr("y",70)
//  .attr("class","header").text("Technical Contribution Network");


var g = svg.append("g").attr("transform","translate(150,100)");

var bp=viz.bP()
    .data(data)
    .min(12)
    .pad(1)
    .height(400)
    .width(400)
    .barSize(35)
    .fill(d=>color(d.primary));
    

g.call(bp)

//g.append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Channel");
//g.append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("State");

g.append("line").attr("x1",-100).attr("x2",0);
g.append("line").attr("x1",200).attr("x2",300);

g.append("line").attr("y1",610).attr("y2",610).attr("x1",-100).attr("x2",0);
g.append("line").attr("y1",610).attr("y2",610).attr("x1",200).attr("x2",300);

g.selectAll(".mainBars")
  .on("mouseover",mouseover)
  .on("mouseout",mouseout);

g.selectAll(".mainBars").append("text").attr("class","label")
  .attr("x",d=>(d.part=="primary"? -30: 30))
  .attr("y",d=>+6)
  .text(d=>d.part=="primary"? d.key: "." + d.key)
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

g.selectAll(".mainBars").append("text").attr("class","perc")
  .attr("x",d=>(d.part=="primary"? -110: 130))
  .attr("y",d=>+6)
  .text(function(d){ return d3.format("0.0%")(d.percent)})
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

g.selectAll(".mainBars")

function mouseover(d){

  bp.mouseover(d);
  g.selectAll(".mainBars").select(".perc")
  .text(function(d){ return d3.format("0.0%")(d.percent)});

}

function mouseout(d){
  bp.mouseout(d);
  g.selectAll(".mainBars").select(".perc")
  .text(function(d){ return d3.format("0.0%")(d.percent)});
}

//d3.select(self.frameElement).style("height", "800px");

}





//d3.select(self.frameElement).style("height", "800px");


// End tehnical net //////

function updateAll(){
  UpdateTechnicalNet()
  UpdateEmailNet()
}

