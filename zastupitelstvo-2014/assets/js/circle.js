var matrix = [
[0, 0, 0, 0, 0, 0, 0, 8, 7, 0],
[0, 7, 1, 0, 0, 0, 0, 0, 7, 0],
[0, 0, 9, 0, 0, 0, 0, 0, 6, 0],
[0, 0, 0, 9, 0, 0, 0, 0, 6, 0],
[0, 0, 0, 0, 9, 0, 0, 0, 6, 0],
[0, 0, 0, 0, 0, 11, 0, 0, 5, 0],
[0, 0, 0, 0, 1, 2, 0, 0, 12, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 8, 5, 6, 5, 2, 0, 7, 0, 0]
];

var names = ['ANO 2011',
'ČSSD',
'KSČM',
'KDU-ČSL',
'NEZÁVISLÍ PRO PŘIBYSLAV',
'ODS',
'PŘIBYSLAV 2014',
'SNK Přibyslav',
'Nekandidovali 2010',
'Nekandidují 2014'];

var colors = ['aqua', 'orange', 'red', 'yellow', 'purple', 'blue', 'brown', 'pink', 'grey', 'black'];

var chord = d3.layout.chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .matrix(matrix);

var width = 960,
    height = 500,
    innerRadius = Math.min(width, height) * .41,
    outerRadius = innerRadius * 1.1;

var fill = d3.scale.ordinal()
    .domain(d3.range(4))
    .range(colors);

var svg = d3.select("#circle").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = svg.append("g");

var mxx = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius + 5);

svg.append("defs")
    .selectAll("path")
    .data(chord.groups)
    .enter().append("path")
    .attr("id", function (t, e) {
        return "textPath-" + e
    })
    .attr("d", mxx);

g.selectAll("text")
    .data(chord.groups)
    .enter().append("text")
    .append("textPath")
    .attr("xlink:href", function (t, e) {
        return "#textPath-" + e
    })
    .text(function (t, e) {
        return names[e];
    });



g.selectAll("path")
    .data(chord.groups)
    .enter()
    .append("path")
    .style("fill", function (d) { return fill(d.index); })
    .style("stroke", function (d) { return fill(d.index); })
    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));



svg.append("g")
    .attr("class", "chord")
    .selectAll("path")
    .data(chord.chords)
    .enter().append("path")
    .attr("d", d3.svg.chord().radius(innerRadius))
    .style("fill", function (d) { return fill(d.target.index); })
    .style("opacity", 1)
    .attr("data-tooltip", "");


function fade(opacity) {
    return function (g, i) {
        svg.selectAll(".chord path")
            .filter(function (d) { return d.source.index != i && d.target.index != i; })
          .transition()
            .style("opacity", opacity);
    };
}
