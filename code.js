
// values for all forces
tProperties = {

    // load the selected data
    selected_data: {
        project: 49,
        month: 1
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
var data = eval(readTextFile(`directed_network/p${tProperties.selected_data.project}m${tProperties.selected_data.month}_commit.json`))

var color ={Elite:"#3366CC", Grand:"#DC3912",  Lite:"#FF9900", Medium:"#109618", Plus:"#990099", Small:"#0099C6"};
var svg_t = d3.select("body").append("svg").attr("width", 960).attr("height", 800);

var g = svg_t.append("g").attr("transform","translate(200,50)");

var bp=viz.bP()
    .data(data)
    .min(12)
    .pad(1)
    .height(600)
    .width(500)
    .barSize(35)
    .fill(d=>color[d.primary]);
      
g.call(bp);

g.selectAll(".mainBars")
  .on("mouseover",mouseover)
  .on("mouseout",mouseout)


g.selectAll(".mainBars").append("text").attr("class","label")
  .attr("x",d=>(d.part=="primary"? -30: 30))
  .attr("y",d=>+6)
  .text(d=>d.key)
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));


g.selectAll(".mainBars").append("text").attr("class","perc")
  .attr("x",d=>(d.part=="primary"? -100: 80))
  .attr("y",d=>+20)
  .text(function(d){ return d3.format("0.0%")(d.percent)})
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

function mouseover(d){
  bp.mouseover(d);
  g.selectAll(".mainBars")
  .select(".perc")
  .text(function(d){ return d3.format("0.0%")(d.percent)})
}
function mouseout(d){
  bp.mouseout(d);
  g.selectAll(".mainBars")
    .select(".perc")
  .text(function(d){ return d3.format("0.0%")(d.percent)})
}
d3.select(self.frameElement).style("height", "800px");


// End tehnical net //////
