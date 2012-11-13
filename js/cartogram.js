// Ratio of state delegations in the 43rd Congress
var data = [
,0.263,NaN,0.026,0.184,0.184,0.026,0.184,0.079,0.026,
0.105,0.316,NaN,0.026,0.579,0.395,0.289,0.184,
0.316,0.211,0.184,0.211,0.421,0.316,0.132,0.237,
0.395,0.026,0.079,0.079,0.132,0.237,0.026,1.0,
0.263,0.026,0.605,NaN,0.105,0.789,0.105,0.211,NaN,
0.316,0.211,0.026,0.132,0.316,0.026,0.132,0.263,0.026,NaN
];

var svg = d3.select("#chart").append("svg")
    .attr("width", 960)
    .attr("height", 500);

d3.json("http://rungiraffe.com/clio3/d3cartogram/data/us-states.json", function(json) {
  var path = d3.geo.path();

  // A thick black stroke for the exterior.
  svg.append("g")
      .attr("class", "black")
    .selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path);

  // A white overlay to hide interior black strokes.
  svg.append("g")
      .attr("class", "white")
    .selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path);

  // The polygons, scaled!
  svg.append("g")
      .attr("class", "grey")
    .selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path)
      .attr("transform", function(d) {
        var centroid = path.centroid(d),
            x = centroid[0],
            y = centroid[1];
        return "translate(" + x + "," + y + ")"
            + "scale(" + Math.sqrt(data[+d.id] * 2 || 0) + ")"
            + "translate(" + -x + "," + -y + ")";
      })
      .style("stroke-width", function(d) {
        return 1 / Math.sqrt(data[+d.id] * 5 || 1);
      });

});