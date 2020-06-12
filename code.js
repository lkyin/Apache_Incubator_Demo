
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

var data = eval(readTextFile(`directed_network/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_commit.json`))
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
  .attr("y",d=>+6)
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

var svg = d3.select("svg"),
    width = +svg.node().getBoundingClientRect().width,
    height = +svg.node().getBoundingClientRect().height;

// svg objects
var link, node;

var color = d3.scaleOrdinal(d3.schemeCategory10);
// the data - an object with nodes and links
var graph;

// load the data

d3.json(`directed_network/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_${forceProperties.selected_data.ntype}.json`, function(error, _graph) 
{
  if (error) throw error;
  graph = _graph;
  initializeDisplay();
  initializeSimulation();
});

//////////// FORCE SIMULATION //////////// 

// force simulator
var simulation = d3.forceSimulation();

// set up the simulation and event to update locations after each tick
function initializeSimulation() {
  simulation.nodes(graph.nodes);
  initializeForces();
  simulation.on("tick", ticked);
}


//function resetSlider(){
//	$("#Month").val(1).slider("refresh");
//}

function updateData() {
    // clear the canvas
    d3.selectAll("svg > *").remove();
    //reload data project and month
    d3.json(`directed_network/p${forceProperties.selected_data.project}m${forceProperties.selected_data.month}_${forceProperties.selected_data.ntype}.json`, function(error, _graph) 
    {
      if (error) throw error;
      graph = _graph;
      initializeDisplay();
      initializeSimulation();
    });
}




// add forces to the simulation
function initializeForces() {
    // add forces and associate each with a name
    simulation
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("collide", d3.forceCollide())
        .force("center", d3.forceCenter())
        .force("forceX", d3.forceX())
        .force("forceY", d3.forceY());
    // apply properties to each of the forces
    updateForces();
}

// apply new force properties
function updateForces() {
    // get each force by name and update the properties
    simulation.force("center")
        .x(width * forceProperties.center.x)
        .y(height * forceProperties.center.y);
    simulation.force("charge")
        .strength(forceProperties.charge.strength * forceProperties.charge.enabled)
        .distanceMin(forceProperties.charge.distanceMin)
        .distanceMax(forceProperties.charge.distanceMax);
    simulation.force("collide")
        .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
        .radius(forceProperties.collide.radius)
        .iterations(forceProperties.collide.iterations);
    simulation.force("forceX")
        .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
        .x(width * forceProperties.forceX.x);
    simulation.force("forceY")
        .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
        .y(height * forceProperties.forceY.y);
    simulation.force("link")
        .id(function(d) {return d.id;})
        .distance(forceProperties.link.distance)
        .iterations(forceProperties.link.iterations)
        .links(forceProperties.link.enabled ? graph.links : []);

    // updates ignored until this is run
    // restarts the simulation (important if simulation has already slowed down)
    simulation.alpha(1).restart();
}



//////////// DISPLAY ////////////

// generate the svg objects and force simulation
function initializeDisplay() {

  // set the data and properties of link lines
  link = svg.append("g")
        .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); })
    .style("stroke", function(d) { return color(d.group); });

  // set the data and properties of node circles
  node = svg.append("g")
        .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
    .style("fill", function(d) { return color(d.group); });

  // node tooltip
  node.append("title")
      .text(function(d) { return d.id; });
  link.append("title")
      .text(function(d) { return d.value; });
  // visualize the graph
  updateDisplay();
}

// update the display based on the forces (but not positions)
function updateDisplay() {

    node
        .attr("r", forceProperties.collide.radius)
        //.attr("stroke", forceProperties.charge.strength > 0 ? "blue" : "red")
        .attr("stroke-width", forceProperties.charge.enabled==false ? 0 : Math.abs(forceProperties.charge.strength)/15);
        
    link
        .attr("stroke-width", forceProperties.link.enabled ? 1 : .5)
        .attr("opacity", forceProperties.link.enabled ? 1 : 0);

}

// update the display positions after each simulation tick
function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    d3.select('#alpha_value').style('flex-basis', (simulation.alpha()*100) + '%');
}



//////////// UI EVENTS ////////////

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0.0001);
  d.fx = null;
  d.fy = null;
}

// update size-related forces
d3.select(window).on("resize", function(){
    width = +svg.node().getBoundingClientRect().width;
    height = +svg.node().getBoundingClientRect().height;
    updateForces();
});

// convenience function to update everything (run after UI input)
function updateAll() {
    updateData();
    updateForces();
    updateDisplay();
}