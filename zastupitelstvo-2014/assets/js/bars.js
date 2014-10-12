function barGraph(elementId, w, h, data) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    // .ticks(10, "%");

    var svg = d3.select(elementId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d.x; }));
    y.domain([0, d3.max(data, function (d) { return d.y; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.x); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.y); })
        .attr("height", function (d) { return height - y(d.y); });

    svg.append("g").selectAll("text")
       .data(data)
     .enter().append("text")
        .attr("x", function (d) { return x(d.x) + 5; })
        .attr("y", function (d) { return y(d.y) + 15; })
        .text(function (d) { return d.y;});


};

var data = _.map(ageOfCandidatesByYears, function (v) { return { x: v.Year, y: v.Age }; });
barGraph('#ageOfCandidatesByYears', 500, 300, data);