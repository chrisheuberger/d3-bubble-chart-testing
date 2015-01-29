(function() {

  var json = {"country_data": {
    "Brazil": 15, "Croatia": 30, "Chile": 50
  }};

  // var json = {
  //    parent: '',
  //    children: [
  //       {country: 'Chile', percentage: 100},
  //       {country: 'Brazil', percentage: 200}
  //    ]
  // };

  // console.table()

  var diameter = 500;

  var svg = d3.select("#embed").append("svg")
    .attr("width", diameter)
    .attr("height", diameter);

  var bubble = d3.layout.pack()
    .size([diameter, diameter])
    //.value(function(d) {return d.size;})
    .value(function(d) {return d.percentage; })
    .padding(5);

  var nodes = bubble.nodes(processData(json))
    .filter(function(d) { return !d.children; });

  // console.log(nodes);
  // [{x:0, y:0, r: 10}, ...]

  var vis = svg.selectAll("circle.country")
    .data(nodes);

  vis.enter().append("circle")
    // .classed('country', true)
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("r", function(d) { return d.r; })
  //.each(function(d) {
  //    d3.select(this).classed(d.name, true);
  // })
//  .classed( function(d) { return d.country; });
//  .classed( function(d) { return d.name; });
    .attr("class", function(d) { return d.className; })
  //.on('mouseover', function() {
  //  d3.select(this).classed('active', true);
  // });

  // circle (x: 5, y: 10)
  //  - text (x: 5, y: 10)

  var nameLabel = vis.enter().append("text")
    .html(function(d) {
      return d.name;
    })
    .attr("text-anchor", "middle")
    //.attr("x", function(d) { return d.x; })
    //.attr("y", function(d) { return d.y; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "white");

  var valueLabel = vis.enter().append("text")
    .html(function(d) {
      return d.value; // d.size, d.percentage
    })
    .attr("text-anchor", "middle")
  //    .attr("x", function(d) { return d.x; })
  //    .attr("y", function(d) { return d.y; })
    .attr("dx", 0)
    .attr("dy", 14)
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "white");

  function processData(data) {

    var obj = data.country_data;

    var newDataSet = [];

    for(var prop in obj) {
      newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
    }

    // data.country_data.forEach(function(row) {
    //   newDataSet.push({
    //      name: row.country,
    //      className: row.country.toLowerCase(),
    //      size: +row.percentage
    //   });
    // });

    // for(var prop in obj) {
    //   newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
    // }

    return {children: newDataSet};

  }

})();
