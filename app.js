// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width= svgWidth - margin.left - margin.right;
var height= svgHeight - margin.top - margin.bottom;

var svg= d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
  .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
		  
d3.csv("assets/data/data.csv").then(function(healthData) {
      healthData.forEach(function(data) {
        data.poverty= +data.poverty;
        data.obesityHigh= +data.obesityHigh;
      });
	var y= d3.scaleLinear()
        .domain([15, (d3.max(healthData, d => d.obesityHigh)) + 5])
        .range([height, 0]);

	var x= d3.scaleLinear()
        .domain([6, (d3.max(healthData, d => d.poverty)) + 5])
        .range([0, width]);

    svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));
	
	var box= svg.append('g')
        .selectAll("dot")
        .data(healthData)
        .enter()
		
	box.append("circle")
          .attr("cx", function (d) { return x(d.poverty); } )
          .attr("cy", function (d) { return y(d.obesityHigh); } )
          .attr("r", 10)
          .style("fill", "blue")
          .attr("opacity", "black")
		
	svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height /2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Obesity");
		
	svg.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Poverty");
		
	box.append("text")
        .attr("text-anchor", "middle")
        .attr("x", function(d) { return x(d.poverty); })
        .attr("y", function(d) { return y(d.obesityHigh); })
        .attr("font-size", "8px")
        .text(function(d) { return d.abbr})
});
	//	}