function linesGraph(elementId, w, h, data) {

    //data = {
    //    X: [x1, x2,...],
    //    'Nazev 1': [y11, y12,...],
    //    'Nazev 2': [y21, y22,...]
    //};

    var margin = { top: 20, right: 80, bottom: 30, left: 50 },
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

//var parseDate = d3.time.format("%Y%m%d").parse;

    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("linear")
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.temperature); });

var svg = d3.select(elementId).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.tsv("data.tsv", function (error, data) {
    color.domain(d3.keys(data[0]).filter(function (key) { return key !== "X"; }));
    //data.forEach(function (d) {
    //    d.date = parseDate(d.date);
    //});

    var cities = color.domain().map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return { date: d.X, temperature: +d[name] };
            })
        };
    });

    console.log(data);
    console.log(cities);
    console.log(d3.extent(data, function (d) { return d.X; }));
    console.log(data.map(function (d) { return d.X; }));
  //  x.domain(d3.extent(data, function (d) { return d.X; }));
    x.domain(data.map(function (d) { return d.X; }));
    x.domain().map(function (d) { console.log(d);});
    y.domain([
      //d3.min(cities, function (c) { return d3.min(c.values, function (v) { return v.temperature; }); }),
      0,
      d3.max(cities, function (c) { return d3.max(c.values, function (v) { return v.temperature; }); })
    ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      //.append("text")
      //  .attr("transform", "rotate(-90)")
      //  .attr("y", 6)
      //  .attr("dy", ".71em")
      //  .style("text-anchor", "end")
      //  .text("Temperature (ºF)");

    var city = svg.selectAll(".city")
        .data(cities)
      .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function (d) { console.log(line(d.values), d.values); return line(d.values); })
        .style("stroke", function (d) { return color(d.name); });

    city.append("text")
        .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
        .attr("transform", function (d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function (d) { return d.name; });
//});



};

//var data = _.map(ageOfCandidatesByYears, function (v) { return { x: v.Year, y: v.Age }; });
//linesGraph('#ageOfCandidatesByYears', 500, 300, data);

//var data = {};
//data.X = _.map(maxMinAgeByYear, function (v) { return v.Year; });
//data['Nejnižší věk'] = _.map(maxMinAgeByYear, function (v) { return v.Min; });
//data['Nejvyšší věk'] = _.map(maxMinAgeByYear, function (v) { return v.Max; });
var data = _.map(maxMinAgeByYear, function (v) { return { X: v.Year, 'Nejnižší věk': v.Min, 'Nejvyšší věk': v.Max }; });
linesGraph('#maxMinAgeByYear', 500, 300, data);