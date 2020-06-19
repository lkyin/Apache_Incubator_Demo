

//var svg_t = d3.select("#right").append("svg").attr("width", 600).attr("height", 400);

var color = d3.scaleOrdinal(d3.schemeCategory20);

UpdateTechnicalNet()

function UpdateTechnicalNet(){

  var svg = d3.select("#rightsvg")

  svg.selectAll("*").remove();

  var data = eval(readTextFile(`final_network/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_commit.json`));

//var svg = d3.select("#rightsvg")

//svg.append("text").attr("x",250).attr("y",70)
//  .attr("class","header").text("Technical Contribution Network");


var g = svg.append("g").attr("transform","translate(300,50)");

var bp=viz.bP()
    .data(data)
    .min(10)
    .pad(1)
    .height(600)
    .width(400)
    .barSize(30)
    .fill(d=>color(d.primary));
    

g.call(bp)

//g.append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Developer");
//g.append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("File Extension");

//g.append("line").attr("x1",-100).attr("x2",0);
//g.append("line").attr("x1",200).attr("x2",300);

//g.append("line").attr("y1",610).attr("y2",610).attr("x1",-100).attr("x2",0);
//g.append("line").attr("y1",610).attr("y2",610).attr("x1",200).attr("x2",300);

g.selectAll(".mainBars")
  .on("mouseover",mouseover)
  .on("mouseout",mouseout);

g.selectAll(".mainBars").append("text").attr("class","label")
  .attr("x",d=>(d.part=="primary"? -30: 30))
  .attr("y",d=>+6)
  .text(d=>d.part=="primary"? d.key: "." + d.key)
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"))
  .style("font-size", "18px");

/*
g.selectAll(".mainBars").append("text").attr("class","perc")
  .attr("x",d=>(d.part=="primary"? -130: 130))
  .attr("y",d=>+6)
  .text(function(d){ return d3.format("0.0%")(d.percent)})
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));


g.selectAll(".mainBars").append("text").attr("class","perc")
  .attr("x",d=>(d.part=="primary"? -130: 130))
  .attr("y",d=>+6)
  .text(function(d){ return d.value})
  .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
*/
g.selectAll(".mainBars")

function mouseover(d){

  bp.mouseover(d);
  //g.selectAll(".mainBars").select(".perc")
  //.text(function(d){ return d3.format("0.0%")(d.percent)});

}

function mouseout(d){
  bp.mouseout(d);
  //g.selectAll(".mainBars").select(".perc")
  //.text(function(d){ return d3.format("0.0%")(d.percent)});
}

//d3.select(self.frameElement).style("height", "800px");

}





//d3.select(self.frameElement).style("height", "800px");


// End tehnical net //////

function updateAll(){

  var this_project = document.getElementById("txt_ide").value
  forceProperties.selected_data.project=name_to_id[this_project]
  
  UpdateTechnicalNet()
  UpdateEmailNet()
  UpdateprojectInfo()
}

