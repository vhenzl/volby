(function () {
    function createChart(elementId, w, h, data) {
        var margin = { top: 20, right: 20, bottom: 30, left: 60 },
            width = parseInt(d3.select(elementId).style('width'), 10) - margin.left - margin.right,
            height = h - margin.top - margin.bottom,
            yTopSpace = 1.1,
            barPadding = .2;

        function xSelector(d, i) {
            return d.Order;
        }

        function yValueSelector(d, i) {
            return d.Votes;
        }
        
        function getSvgWidth() { return width + margin.left + margin.right };

        var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], barPadding);

        var yScale = d3.scale.linear()
            .range([height, 0]);

        var yValueMax = d3.max(data, yValueSelector) * yTopSpace;

        xScale.domain(data.map(xSelector));
        yScale.domain([0, yValueMax]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .ticks(10, 'd');

        var svg = d3.select(elementId).append('svg')
            .attr('class', 'chart bar-chart')
            .attr('width', getSvgWidth())
            .attr('height', height + margin.top + margin.bottom);

        var chart = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        var bar = chart.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', function (d, e) { return xScale(xSelector(d, e)); })
            .attr('width', xScale.rangeBand())
            .attr('y', function (d, i) { return height; })
            .attr('height', 0)
            .style('fill', function (d) { return d.Color })
            .style('opacity', function (d) { return d.Mandate ? 1 : .2; });

        bar.transition()
            .duration(500)
            .delay(function (d, i) { return i * 10; })
            .attr('y', function (d, e) { return yScale(yValueSelector(d, e)); })
            .attr("height", function (d, i) { return height - yScale(yValueSelector(d, i)); });

        var border = chart
            .append('line')
            .attr('class', 'border')
            .attr('x1', function (d, e) { return xScale(16) -1 - (xScale.rangeBand() * (1 + barPadding) - xScale.rangeBand()) / 2; })
            .attr("y1", 0)
            .attr("x2", function (d, e) { return xScale(16) -1 - (xScale.rangeBand() * (1 + barPadding) - xScale.rangeBand()) / 2; })
            .attr("y2", height)
            .attr("stroke-width", 1)
            .attr("stroke", "black");

        d3.select(window).on('resize', resize);

        function resize() {
            width = getElementWidth() - margin.left - margin.right;

            xScale.rangeRoundBands([0, width], .2);

            svg.attr('width', getSvgWidth())

            bar.attr('x', function (d, e) { return xScale(xSelector(d, e)); })
                .attr('width', xScale.rangeBand());

            chart.select('.x.axis').call(xAxis);
        }

    };

    var raw = [
        { Number: 4, Votes: 4730.0000 },
        { Number: 2, Votes: 3945.0000 },
        { Number: 7, Votes: 3351.0000 },
        { Number: 3, Votes: 3243.0000 },
        { Number: 6, Votes: 3228.0000 },
        { Number: 5, Votes: 2374.0000 },
        { Number: 4, Votes: 2365.0000 },
        { Number: 1, Votes: 2112.0000 },
        { Number: 2, Votes: 1972.5000 },
        { Number: 7, Votes: 1675.5000 },
        { Number: 3, Votes: 1621.5000 },
        { Number: 6, Votes: 1614.0000 },
        { Number: 4, Votes: 1576.6667 },
        { Number: 2, Votes: 1315.0000 },
        { Number: 5, Votes: 1187.0000 },
        { Number: 4, Votes: 1182.5000 },
        { Number: 7, Votes: 1117.0000 },
        { Number: 3, Votes: 1081.0000 },
        { Number: 6, Votes: 1076.0000 },
        { Number: 1, Votes: 1056.0000 }
    ];

    var data = _.map(raw, function (v, k) {
        var candidateList = candidateLists['2014'][v.Number.toString()];
        return {
            Order: k + 1,
            Votes: v.Votes,
            Name: candidateList.Abbr,
            Mandate: k < 15,
            Color: candidateList.Color
        };
    });
    createChart('#chart-mandates', 540, 300, data);
})();