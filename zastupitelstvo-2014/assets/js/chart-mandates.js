(function () {
    function createChart(elementId, w, h, data) {
        var margin = { top: 50, right: 20, bottom: 30, left: 60 },
            width = parseInt(d3.select(elementId).style('width'), 10) - margin.left - margin.right,
            height = h - margin.top - margin.bottom,
            yTopSpace = 1.2,
            barPadding = .3;

        function nameSelector(d, i) {
            var name = d.Name.split(' ');
            return name[0] + ' ' + name[1][0] + '.';
        }

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

        var label = chart.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('svg')
            .style('overflow', 'visible')
            .attr('class', 'bar-label')
            .attr('x', function (d, e) { return xScale(xSelector(d, e)) + xScale.rangeBand() / 2; })
            .attr('y', function (d, i) { return height; });

        label.append('text')
            .attr('transform', 'rotate(-75)')
            .text(nameSelector)
            .style("text-anchor", "start")

        label.transition()
            .duration(500)
            .delay(function (d, i) { return i * 10; })
            .attr('y', function (d, e) { return yScale(yValueSelector(d, e)) - 5; });

        var border = chart
            .append('line')
            .attr('class', 'border')
            .attr('x1', function (d, e) { return xScale(16) -1 - (xScale.rangeBand() * (1 + barPadding) - xScale.rangeBand()) / 2; })
            .attr("y1", 0)
            .attr("x2", function (d, e) { return xScale(16) -1 - (xScale.rangeBand() * (1 + barPadding) - xScale.rangeBand()) / 2; })
            .attr("y2", height);

        $(window).on('resize', resize);

        function resize() {
            width = parseInt(d3.select(elementId).style('width'), 10) - margin.left - margin.right;

            xScale.rangeRoundBands([0, width], .2);

            svg.attr('width', getSvgWidth())

            bar.attr('x', function (d, e) { return xScale(xSelector(d, e)); })
                .attr('width', xScale.rangeBand());

            label.transition()
                .duration(500)
                .delay(function (d, i) { return i * 10; })
                .attr('x', function (d, e) { return xScale(xSelector(d, e)) + xScale.rangeBand() / 2; })
                .attr('y', function (d, e) { return yScale(yValueSelector(d, e)) - 5; });

            border.attr('x1', function (d, e) { return xScale(16) - 1 - (xScale.rangeBand() * (1 + barPadding) - xScale.rangeBand()) / 2; })
                .attr("y1", 0)
                .attr("x2", function (d, e) { return xScale(16) - 1 - (xScale.rangeBand() * (1 + barPadding) - xScale.rangeBand()) / 2; })
                .attr("y2", height);

            chart.select('.x.axis').call(xAxis);
        }

    };

    var raw = [
        { Number: 4, Votes: 4730.0000, Name: 'Kamarád Martin' },
        { Number: 2, Votes: 3945.0000, Name: 'Omes Michael' },
        { Number: 7, Votes: 3351.0000, Name: 'Joukl Libor Ing.' },
        { Number: 3, Votes: 3243.0000, Name: 'Křesťanová Marie Ing.' },
        { Number: 6, Votes: 3228.0000, Name: 'Zábrana Václav Ing.' },
        { Number: 5, Votes: 2374.0000, Name: 'Štefáček Jan Mgr. Bc.' },
        { Number: 4, Votes: 2365.0000, Name: 'Benc Ota Mgr.' },
        { Number: 1, Votes: 2112.0000, Name: 'Neumanová Zdena Mgr.' },
        { Number: 2, Votes: 1972.5000, Name: 'Henzl Václav' },
        { Number: 7, Votes: 1675.5000, Name: 'Slezáková Jaroslava Ing.' },
        { Number: 3, Votes: 1621.5000, Name: 'Thomayer Jan Ing.' },
        { Number: 6, Votes: 1614.0000, Name: 'Pelikán Josef' },
        { Number: 4, Votes: 1576.6667, Name: 'Šnýdlová Anna Mgr.' },
        { Number: 2, Votes: 1315.0000, Name: 'Jaroš Libor' },
        { Number: 5, Votes: 1187.0000, Name: 'Hladík Ladislav Ing.' },
        { Number: 4, Votes: 1182.5000, Name: 'Loužecká Ilona DiS.' },
        { Number: 7, Votes: 1117.0000, Name: 'Hyksová Hana Mgr.' },
        { Number: 3, Votes: 1081.0000, Name: 'Vlček Jakub' },
        { Number: 6, Votes: 1076.0000, Name: 'Hintnaus Jiří' },
        { Number: 1, Votes: 1056.0000, Name: 'Krčál Zdeněk' }
    ];

    var data = _.map(raw, function (v, k) {
        var candidateList = candidateLists['2014'][v.Number.toString()];
        return {
            Order: k + 1,
            Votes: v.Votes,
            Name: v.Name,
            Mandate: k < 15,
            Color: candidateList.Color
        };
    });
    createChart('#chart-mandates', 540, 330, data);
})();