(function () {

    function createChart(elementId, w, h, data) {
        var margin = { top: 20, right: 20, bottom: 30, left: 60 },
            width = parseInt(d3.select(elementId).style('width'), 10) - margin.left - margin.right,
            height = h - margin.top - margin.bottom;
        var yTopSpace = 1.1;

        function xSelector(d, i) {
            return d.Name;
        }

        function yValueSelector(d, i) {
            return d.Votes;
        }

        function yPercentageSelector(d, i) {
            return d.Percent;
        }

        function yMandateSelector(d, i) {
            return d.Mandates;
        }

        function getSvgWidth() { return width + margin.left + margin.right };

        var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], .2);

        var yScale = d3.scale.linear()
            .range([height, 0]);

        var yValueMax = d3.max(data, yValueSelector) * yTopSpace;
        var yPercentageMax = d3.max(data, yPercentageSelector) * yTopSpace;
        var yMandateMax = d3.max(data, yMandateSelector) * yTopSpace;

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
            .style('fill', function (d) { return d.Color });

        bar.transition()
            .duration(500)
            .delay(function (d, i) { return i * 10; })
            .attr('y', function (d, e) { return yScale(yValueSelector(d, e)); })
            .attr("height", function (d, i) { return height - yScale(yValueSelector(d, i)); });

        d3.selectAll(elementId + ' .mode-switch input').on('change', onModeChange);
        d3.select(window).on('resize', resize);

        function resize() {
            width = parseInt(d3.select(elementId).style('width'), 10) - margin.left - margin.right;

            xScale.rangeRoundBands([0, width], .2);

            svg.attr('width', getSvgWidth())

            bar.attr('x', function (d, e) { return xScale(xSelector(d, e)); })
                .attr('width', xScale.rangeBand());

            chart.select('.x.axis').call(xAxis);
        }

        function onModeChange() {
            var ySelector, yMax;
            switch (this.value) {
                case 'mandate':
                    ySelector = yMandateSelector;
                    yMax = yMandateMax;
                    yAxis.ticks(yMandateMax, 'd');
                    break;
                case 'percent':
                    ySelector = yPercentageSelector;
                    yMax = yPercentageMax;
                    yAxis.ticks(10, '%');
                    break;
                case 'value':
                default:
                    ySelector = yValueSelector;
                    yMax = yValueMax;
                    yAxis.ticks(10, 'd');
                    break;
            }

            yScale.domain([0, yMax]);
            bar.transition()
                .duration(500)
                .delay(function (d, i) { return i * 100; })
                .attr('y', function (d, e) { return yScale(ySelector(d, e)); })
                .attr('height', function (d, e) { return height - yScale(ySelector(d, e)); })

            yAxis.scale(yScale);
            chart.select('.y.axis').call(yAxis);
        }
    };

    var raw = [
        { Number: 4, Votes: 4730, Percent: 20.58, Mandates: 3 },
        { Number: 2, Votes: 3945, Percent: 17.16, Mandates: 3 },
        { Number: 7, Votes: 3351, Percent: 14.58, Mandates: 2 },
        { Number: 3, Votes: 3243, Percent: 14.11, Mandates: 2 },
        { Number: 6, Votes: 3228, Percent: 14.05, Mandates: 2 },
        { Number: 5, Votes: 2374, Percent: 10.33, Mandates: 2 },
        { Number: 1, Votes: 2112, Percent: 9.19, Mandates: 1 }
    ];
    var data = _.map(raw, function (v, k) {
        var candidateList = candidateLists['2014'][v.Number.toString()];
        return {
            Number: v.Number,
            Votes: v.Votes,
            Percent: v.Percent / 100,
            Name: candidateList.Abbr,
            Mandates: v.Mandates,
            Color: candidateList.Color
        };
    });

    createChart('#chart-result', 540, 300, data);
})();