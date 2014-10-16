(function () {

    function createChart(elementId, h, data, selectors) {
        var margin = { top: 50, right: 20, bottom: 30, left: 50 },
            width = parseInt(d3.select(elementId).style('width'), 10) - margin.left - margin.right,
            height = h - margin.top - margin.bottom,
            yTopSpace = 1.2,
            mode = 'votes';
        
        function nameSelector(d, i) {
            var name = d.Name.split(' ');
            return name[0] + ' ' + name[1][0] + '.';
        }
        function xSelector(d, i) {
            return d.Year;
        }
        function colorSelector(d, i) {
            var hsl = d3.hsl('darkslategray');
            return d.Mandate
                ? hsl
                : hsl.brighter();
        }

        function ySelector(d, i) {
            return selectors[mode](d, i);
        }

        function yMax() {
            return d3.max(data, ySelector) * yTopSpace;
        }
        function yMin() {
            var min = d3.min(data, ySelector);
            return min < 0 ? min * yTopSpace : 0;
        }
                
        function getSvgWidth() { return width + margin.left + margin.right };

        var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], .2);

        var yScale = d3.scale.linear()
            .range([height, 0]);


        xScale.domain(data.map(xSelector));
        yScale.domain([yMin(), yMax()]);

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

        var yBaseCalculator = function (d, i) { return yScale(0); };
        var yCalculator = function (d, e) {
            var a = yScale(ySelector(d, e));
            var base = yBaseCalculator();
            return a > base ? base : a;
        };
        var hightCalculator = function (d, i) {
            var base = yBaseCalculator();
            var h = yScale(ySelector(d, i));
            return Math.abs(base-h);
        };

        var bar = chart.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', function (d, e) { return xScale(xSelector(d, e)); })
            .attr('width', xScale.rangeBand())
            .attr('y', yBaseCalculator)
            .attr('height', 0)
            .style('fill', colorSelector)
            .style('opacity', function (d) { return d.Mandate ? 1 : .5; });

        bar.transition()
            .duration(500)
            .delay(function (d, i) { return i * 10; })
            .attr('y', yCalculator)
            .attr("height", hightCalculator);
       
        function resize(w) {
            width = w - margin.left - margin.right;

            redrawX();
        }

        function changeMode(m) {
            mode = m;
            redrawY();
        }

        function redrawX() {
            xScale.rangeRoundBands([0, width], .2);
            xScale.domain(data.map(xSelector));

            svg.attr('width', getSvgWidth())

            bar.attr('x', function (d, e) { return xScale(xSelector(d, e)); })
                .attr('width', xScale.rangeBand());
            
            chart.select('.x.axis').call(xAxis);
        }

        function changeData(d) {
            data = d;

            bar.data(data).style('fill', colorSelector);

            redrawY();
            redrawX();
        }

        function redrawY() {
            switch (mode) {
                case 'percent':
                case 'percent_total':
                    yAxis.ticks(10, '%');
                    break;
                case 'votes':
                default:
                    yAxis.ticks(10, 'd');
                    break;
            }

            yScale.domain([yMin(), yMax()]);
            bar.transition()
                .duration(500)
                .delay(function (d, i) { return i * 10; })
                .attr('y', yCalculator)
                .attr("height", hightCalculator)
                .style('opacity', function (d) { return d.Mandate ? 1 : .5; });
                        
            yAxis.scale(yScale);
            chart.select('.y.axis').call(yAxis);
        }

        return {
            changeMode: changeMode,
            resize: resize,
            changeData: changeData
        };
    };

    var raw = {
        'Neumannová Zdena':[350,16.5720,1.5229,1,361,15.4339,1.5209,1,362,12.2878,1.6486,1,369,11.5529,1.5173,1,526,15.1848,2.0647,1,761,13.0554,2.5188,1],
        'Omes Michael':[574,14.5501,2.4975,1,526,14.3207,2.2160,1,539,12.8793,2.4547,1,578,15.8313,2.3766,1,397,8.3738,1.5583,1,475,8.0101,1.5722,0],
        'Henzl Václav':[486,12.3194,2.1146,1,436,11.8704,1.8369,1,436,10.4182,1.9856,1,303,8.2991,1.2459,1,338,7.1293,1.3267,0,null,null,null,null],
        'Jaroš Libor':[328,8.3143,1.4271,1,313,8.5216,1.3187,0,317,7.5747,1.4437,0,217,5.9436,0.8923,0,null,null,null,null,null,null,null,null],
        'Křesťanová Marie':[525,16.1887,2.2843,1,649,15.6047,2.7342,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        'Thomayer Jan':[379,11.6867,1.6490,1,405,9.7379,1.7063,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        'Kamarád Martin':[629,13.2981,2.7368,1,609,10.3925,2.5657,1,625,9.9081,2.8463,1,603,9.8272,2.4794,1,253,10.6706,0.9931,0,null,null,null,null],
        'Benc Ota':[548,11.5856,2.3844,1,655,11.1775,2.7595,1,601,9.5276,2.7370,1,577,9.4035,2.3725,1,398,7.4143,1.5623,0,568,6.4058,1.8800,0],
        'Šnýdlová Anna':[405,8.5624,1.7622,1,565,9.6416,2.3804,1,580,9.1947,2.6414,1,546,8.8983,2.2451,1,481,8.9605,1.8881,1,683,7.7027,2.2606,0],
        'Štefáček Jan':[302,12.7211,1.3140,1,466,13.4838,1.9633,1,452,10.0870,2.0585,1,816,13.2986,3.3553,1,552,10.2832,2.1667,1,757,8.5373,2.5055,1],
        'Hladík Ladislav':[202,8.5088,0.8789,1,298,8.6227,1.2555,0,335,7.4760,1.5256,0,319,5.1988,1.3117,0,403,7.5075,1.5819,0,631,7.1163,2.0885,0],
        'Zábrana Václav':[503,15.5824,2.1886,1,415,7.0819,1.7484,0,570,9.0361,2.5959,1,590,9.6154,2.4260,1,548,10.2086,2.1510,1,953,10.7477,3.1543,1],
        'Pelikán Josef':[287,8.8910,1.2487,1,332,7.9827,1.3987,1,null,null,null,null,369,10.1068,1.5173,1,null,null,null,null,null,null,null,null],
        'Slezáková Jaroslava':[384,11.4593,1.6708,1,null,null,null,null,null,null,null,null,537,24.9188,2.2081,1,null,null,null,null,null,null,null,null],
        'Joukl Libor':[438,13.0707,1.9058,1,637,14.9918,2.6837,1,409,10.1288,1.8626,1,368,10.1826,1.5132,1,225,5.1558,0.8832,0,null,null,null,null]
    };

    var data1 = {};
    _.each(raw, function (x, k) {
        var r = [];
        var xl = x.length / 4;
        for (var i = 0; i < xl; i++) {
            var v = x.shift(),
                p = x.shift(),
                t = x.shift(),
                m = x.shift();

            var y = v === null ? {
                Year: 2014 - (i * 4),
                Votes: 0,
                Percent: 0,
                PercentTotal: 0,
                Mandate: false
            } : {
                Year: 2014 - (i * 4),
                Votes: v,
                Percent: p/100,
                PercentTotal: t/100,
                Mandate: m === 1
            };
            r.push(y);
        }
        data1[k] = _.sortBy(r, function (s) { return s.Year; });
    });
    

    var names = _.sortBy(_.keys(data1), function (k) { return k;});

    var $menu = $('#chart-members-menu');
    _.each(names, function (k) {
        var $option = $('<option>', { value: k, text: k });
        $menu.append($option);
    });

    var chart1 = createChart('#chart-members', 300, data1[names[0]], {
        'votes': function (d, i) { return d.Votes; },
        'percent': function (d, i) { return d.Percent; },
        'percent_total': function (d, i) { return d.PercentTotal; }
    });
    buildTable(data1[names[0]]);

    $menu.on('change', function () {
        var data = data1[this.value];
        chart1.changeData(data);
        buildTable(data);
    });
    $('#chart-members .mode-switch input').on('change', function () {
        chart1.changeMode(this.value);
    });

    
    $(window).on('resize', function () {
        var w1 = $('#chart-members').width();
        chart1.resize(w1);
    });

    function buildTable(data) {
        var $t = $('#table-members tbody');
        $t.empty();
        var c1 = _.template('<tr><td><%=Year%></td><td><%=Votes%></td><td><%=Percent%></td><td><%=PercentTotal%></td></tr>');
        var c2 = _.template('<tr><td><%=Year%></td><td></td><td></td><td></td></tr>');
        
        function map(d) {
            var r = _.clone(d);
            r.Percent = Math.round(r.Percent * 10000)/100;
            r.PercentTotal = Math.round(r.PercentTotal * 10000)/100;
            return r;
        }

        _.each(data, function (d) {
            var t = d.Votes > 0 ? c1(map(d)) : c2(d);
            $t.append($(t));
        });
    }
    
})();