(function () {

    function createChart(elementId, h, data, orderFn) {
        orderFn = orderFn || function (d) { return d; };
        var margin = { top: 50, right: 20, bottom: 30, left: 50 },
            width = parseInt(d3.select(elementId).style('width'), 10) - margin.left - margin.right,
            height = h - margin.top - margin.bottom,
            yTopSpace = 1.2,
            mode = 'value';

        var totalVotes = _.reduce(data, function (memo, v) { return memo + v.Votes; }, 0);
        var average = totalVotes / data.length;

        function nameSelector(d, i) {
            var name = d.Name.split(' ');
            return name[0] + ' ' + name[1][0] + '.';
        }
        function xSelector(d, i) {
            return i+1;
        }
        function colorSelector(d, i) {
            var hsl = d3.hsl(d.Color);
            return d.Mandate
                ? hsl
                : hsl.brighter();
        }

        function yValueSelector(d, i) {
            return d.Votes;
        }

        function yPercentageSelector(d, i) {
            return d.Percent;
        }
        
        function getSvgWidth() { return width + margin.left + margin.right };

        var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], .2);

        var yScale = d3.scale.linear()
            .range([height, 0]);

        var yValueMax = d3.max(data, yValueSelector) * yTopSpace;
        var yPercentageMax = d3.max(data, yPercentageSelector) * yTopSpace;

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
            .style('fill', colorSelector)
            .style('opacity', function (d) { return d.Mandate ? 1 : .5; });

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
        
        var avg = chart
            .insert('line', ':first-child')
            .attr('class', 'border')
            .attr("x1", 0)
            .attr("x2", width)
            .attr('y1', function (d, e) { return yScale(average) })
            .attr("y2", function (d, e) { return yScale(average) });

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

            avg.attr("x2", width);

            label.attr('x', function (d, e) { return xScale(xSelector(d, e)) + xScale.rangeBand() / 2; })

            chart.select('.x.axis').call(xAxis);
        }


        function redrawY() {
            var ySelector, yMax;
            switch (mode) {
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
                .delay(function (d, i) { return i * 10; })
                .attr('y', function (d, e) { return yScale(ySelector(d, e)); })
                .attr('height', function (d, e) { return height - yScale(ySelector(d, e)); })
                .style('opacity', function (d) { return d.Mandate ? 1 : .5; });

            label.transition()
                .duration(500)
                .delay(function (d, i) { return i * 10; })
                .attr('y', function (d, e) { return yScale(yValueSelector(d, e)) - 5; });

            avg.attr('y1', function (d, e) { return yScale(average) })
                .attr("y2", function (d, e) { return yScale(average) });

            yAxis.scale(yScale);
            chart.select('.y.axis').call(yAxis);
        }

        return {
            changeMode: changeMode,
            resize: resize
        };
    };

    var raw = [
        { ListNumber: 1, Number: 1, Age: 60, Votes: 350, Order: 1, Mandate: true, Name: 'Neumanová Zdena Mgr.' },
        { ListNumber: 1, Number: 2, Age: 29, Votes: 130, Order: 3, Mandate: false, Name: 'Havlíček Ondřej' },
        { ListNumber: 1, Number: 3, Age: 63, Votes: 224, Order: 1, Mandate: false, Name: 'Krčál Zdeněk' },
        { ListNumber: 1, Number: 4, Age: 53, Votes: 164, Order: 2, Mandate: false, Name: 'Rezničenko Luděk Ing.' },
        { ListNumber: 1, Number: 5, Age: 38, Votes: 131, Order: 4, Mandate: false, Name: 'Dobrý Zdeněk' },
        { ListNumber: 1, Number: 6, Age: 58, Votes: 121, Order: 5, Mandate: false, Name: 'Černá Božena' },
        { ListNumber: 1, Number: 7, Age: 59, Votes: 109, Order: 6, Mandate: false, Name: 'Křesťanová Jaroslava' },
        { ListNumber: 1, Number: 8, Age: 56, Votes: 133, Order: 7, Mandate: false, Name: 'Čermák Jaroslav' },
        { ListNumber: 1, Number: 9, Age: 67, Votes: 125, Order: 8, Mandate: false, Name: 'Neumann Zdeněk' },
        { ListNumber: 1, Number: 10, Age: 65, Votes: 105, Order: 9, Mandate: false, Name: 'Novotný Miloslav' },
        { ListNumber: 1, Number: 11, Age: 63, Votes: 115, Order: 10, Mandate: false, Name: 'Vaverka Josef' },
        { ListNumber: 1, Number: 12, Age: 63, Votes: 105, Order: 11, Mandate: false, Name: 'Pibyl Miloslav' },
        { ListNumber: 1, Number: 13, Age: 64, Votes: 110, Order: 12, Mandate: false, Name: 'Smejkal Ladislav' },
        { ListNumber: 1, Number: 14, Age: 65, Votes: 102, Order: 13, Mandate: false, Name: 'Dvořák Josef' },
        { ListNumber: 1, Number: 15, Age: 61, Votes: 88, Order: 14, Mandate: false, Name: 'Chmelík Jaroslav' },
        { ListNumber: 2, Number: 1, Age: 46, Votes: 574, Order: 1, Mandate: true, Name: 'Omes Michael' },
        { ListNumber: 2, Number: 2, Age: 54, Votes: 486, Order: 2, Mandate: true, Name: 'Henzl Václav' },
        { ListNumber: 2, Number: 3, Age: 37, Votes: 328, Order: 3, Mandate: true, Name: 'Jaroš Libor' },
        { ListNumber: 2, Number: 4, Age: 45, Votes: 255, Order: 1, Mandate: false, Name: 'Ledvinka Lubomír MUDr.' },
        { ListNumber: 2, Number: 5, Age: 41, Votes: 194, Order: 2, Mandate: false, Name: 'Miškovská Jana Mgr.' },
        { ListNumber: 2, Number: 6, Age: 28, Votes: 232, Order: 3, Mandate: false, Name: 'Málek Jan Mgr. et Mgr.' },
        { ListNumber: 2, Number: 7, Age: 55, Votes: 234, Order: 4, Mandate: false, Name: 'Pleslová Marie' },
        { ListNumber: 2, Number: 8, Age: 42, Votes: 230, Order: 5, Mandate: false, Name: 'Kasal Roman' },
        { ListNumber: 2, Number: 9, Age: 48, Votes: 237, Order: 6, Mandate: false, Name: 'Matoušek Jiří Mgr.' },
        { ListNumber: 2, Number: 10, Age: 24, Votes: 183, Order: 7, Mandate: false, Name: 'Močubová Anežka' },
        { ListNumber: 2, Number: 11, Age: 51, Votes: 197, Order: 8, Mandate: false, Name: 'Málek Petr' },
        { ListNumber: 2, Number: 12, Age: 58, Votes: 195, Order: 9, Mandate: false, Name: 'Bechyně Jan PhDr.' },
        { ListNumber: 2, Number: 13, Age: 66, Votes: 163, Order: 10, Mandate: false, Name: 'Jajtnerová Ludmila' },
        { ListNumber: 2, Number: 14, Age: 34, Votes: 151, Order: 11, Mandate: false, Name: 'Zrzavá Marie Mgr.' },
        { ListNumber: 2, Number: 15, Age: 52, Votes: 286, Order: 12, Mandate: false, Name: 'Horský Jaroslav' },
        { ListNumber: 3, Number: 1, Age: 46, Votes: 525, Order: 1, Mandate: true, Name: 'Křesťanová Marie Ing.' },
        { ListNumber: 3, Number: 2, Age: 35, Votes: 379, Order: 2, Mandate: true, Name: 'Thomayer Jan Ing.' },
        { ListNumber: 3, Number: 3, Age: 40, Votes: 219, Order: 3, Mandate: false, Name: 'Kachlík Milan Mgr.' },
        { ListNumber: 3, Number: 4, Age: 55, Votes: 229, Order: 4, Mandate: false, Name: 'Doubková Anna Mgr.' },
        { ListNumber: 3, Number: 5, Age: 28, Votes: 245, Order: 1, Mandate: false, Name: 'Vlček Jakub' },
        { ListNumber: 3, Number: 6, Age: 30, Votes: 190, Order: 5, Mandate: false, Name: 'Doubková Anna Mgr. Bc.' },
        { ListNumber: 3, Number: 7, Age: 45, Votes: 242, Order: 2, Mandate: false, Name: 'Křesťan Jiří' },
        { ListNumber: 3, Number: 8, Age: 55, Votes: 233, Order: 6, Mandate: false, Name: 'Henzl Josef' },
        { ListNumber: 3, Number: 9, Age: 32, Votes: 173, Order: 7, Mandate: false, Name: 'Vykoukalová Hana' },
        { ListNumber: 3, Number: 10, Age: 31, Votes: 136, Order: 8, Mandate: false, Name: 'Jajtner Petr Bc.' },
        { ListNumber: 3, Number: 11, Age: 30, Votes: 100, Order: 9, Mandate: false, Name: 'Fišer Luděk' },
        { ListNumber: 3, Number: 12, Age: 24, Votes: 160, Order: 10, Mandate: false, Name: 'Ležák Lukáš Bc. DiS.' },
        { ListNumber: 3, Number: 13, Age: 38, Votes: 164, Order: 11, Mandate: false, Name: 'Loužecká Kristýna' },
        { ListNumber: 3, Number: 14, Age: 39, Votes: 114, Order: 12, Mandate: false, Name: 'Bártová Petra Mgr.' },
        { ListNumber: 3, Number: 15, Age: 71, Votes: 134, Order: 13, Mandate: false, Name: 'Kalina František' },
        { ListNumber: 4, Number: 1, Age: 39, Votes: 629, Order: 1, Mandate: true, Name: 'Kamarád Martin' },
        { ListNumber: 4, Number: 2, Age: 49, Votes: 548, Order: 2, Mandate: true, Name: 'Benc Ota Mgr.' },
        { ListNumber: 4, Number: 3, Age: 66, Votes: 405, Order: 3, Mandate: true, Name: 'Šnýdlová Anna Mgr.' },
        { ListNumber: 4, Number: 4, Age: 66, Votes: 373, Order: 2, Mandate: false, Name: 'Hamerník Josef' },
        { ListNumber: 4, Number: 5, Age: 29, Votes: 308, Order: 4, Mandate: false, Name: 'Šnýdl Jakub' },
        { ListNumber: 4, Number: 6, Age: 39, Votes: 373, Order: 3, Mandate: false, Name: 'Adam Petr Mgr.' },
        { ListNumber: 4, Number: 7, Age: 38, Votes: 270, Order: 5, Mandate: false, Name: 'Stehno Vladislav RNDr.' },
        { ListNumber: 4, Number: 8, Age: 36, Votes: 375, Order: 1, Mandate: false, Name: 'Loužecká Ilona DiS.' },
        { ListNumber: 4, Number: 9, Age: 44, Votes: 226, Order: 6, Mandate: false, Name: 'Krejčí Jan' },
        { ListNumber: 4, Number: 10, Age: 30, Votes: 227, Order: 7, Mandate: false, Name: 'Žáková Jana' },
        { ListNumber: 4, Number: 11, Age: 35, Votes: 228, Order: 8, Mandate: false, Name: 'Musil Martin Ing.' },
        { ListNumber: 4, Number: 12, Age: 67, Votes: 188, Order: 9, Mandate: false, Name: 'Stolínová Marta' },
        { ListNumber: 4, Number: 13, Age: 59, Votes: 174, Order: 10, Mandate: false, Name: 'Pavlíček Petr' },
        { ListNumber: 4, Number: 14, Age: 34, Votes: 193, Order: 11, Mandate: false, Name: 'Veselík Michal' },
        { ListNumber: 4, Number: 15, Age: 33, Votes: 213, Order: 12, Mandate: false, Name: 'Peřina Tomáš' },
        { ListNumber: 5, Number: 1, Age: 64, Votes: 302, Order: 1, Mandate: true, Name: 'Štefáček Jan Mgr. Bc.' },
        { ListNumber: 5, Number: 2, Age: 65, Votes: 202, Order: 2, Mandate: true, Name: 'Hladík Ladislav Ing.' },
        { ListNumber: 5, Number: 3, Age: 51, Votes: 126, Order: 4, Mandate: false, Name: 'Němec Jiří Mgr.' },
        { ListNumber: 5, Number: 4, Age: 31, Votes: 178, Order: 3, Mandate: false, Name: 'Pejzl Jan' },
        { ListNumber: 5, Number: 5, Age: 36, Votes: 157, Order: 5, Mandate: false, Name: 'Štefanová Dagmar' },
        { ListNumber: 5, Number: 6, Age: 41, Votes: 146, Order: 6, Mandate: false, Name: 'Macek Jindřich Bc.' },
        { ListNumber: 5, Number: 7, Age: 57, Votes: 190, Order: 1, Mandate: false, Name: 'Šauerová Anna' },
        { ListNumber: 5, Number: 8, Age: 40, Votes: 127, Order: 7, Mandate: false, Name: 'Sobotková Lenka' },
        { ListNumber: 5, Number: 9, Age: 65, Votes: 143, Order: 8, Mandate: false, Name: 'Kulhánek Karel' },
        { ListNumber: 5, Number: 10, Age: 51, Votes: 186, Order: 2, Mandate: false, Name: 'Šimanovský Ivo' },
        { ListNumber: 5, Number: 11, Age: 54, Votes: 164, Order: 9, Mandate: false, Name: 'Pochop Stanislav' },
        { ListNumber: 5, Number: 12, Age: 53, Votes: 163, Order: 10, Mandate: false, Name: 'Smejkalová Naděžda Mgr.' },
        { ListNumber: 5, Number: 13, Age: 42, Votes: 88, Order: 11, Mandate: false, Name: 'Štáflová Marta' },
        { ListNumber: 5, Number: 14, Age: 57, Votes: 99, Order: 12, Mandate: false, Name: 'Mošťková Miroslava Ing.' },
        { ListNumber: 5, Number: 15, Age: 68, Votes: 103, Order: 13, Mandate: false, Name: 'Dolák Vladimír' },
        { ListNumber: 6, Number: 1, Age: 52, Votes: 503, Order: 1, Mandate: true, Name: 'Zábrana Václav Ing.' },
        { ListNumber: 6, Number: 2, Age: 65, Votes: 287, Order: 2, Mandate: true, Name: 'Pelikán Josef' },
        { ListNumber: 6, Number: 3, Age: 47, Votes: 266, Order: 1, Mandate: false, Name: 'Hintnaus Jiří' },
        { ListNumber: 6, Number: 4, Age: 38, Votes: 237, Order: 2, Mandate: false, Name: 'Pelikán Josef Ing.' },
        { ListNumber: 6, Number: 5, Age: 43, Votes: 215, Order: 3, Mandate: false, Name: 'Rosický František' },
        { ListNumber: 6, Number: 6, Age: 51, Votes: 227, Order: 4, Mandate: false, Name: 'Musil Radovan' },
        { ListNumber: 6, Number: 7, Age: 42, Votes: 168, Order: 5, Mandate: false, Name: 'Kocourek František' },
        { ListNumber: 6, Number: 8, Age: 40, Votes: 215, Order: 6, Mandate: false, Name: 'Hospodka Stanislav' },
        { ListNumber: 6, Number: 9, Age: 61, Votes: 170, Order: 7, Mandate: false, Name: 'Čejka Jan' },
        { ListNumber: 6, Number: 10, Age: 23, Votes: 167, Order: 8, Mandate: false, Name: 'Vomela Jakub' },
        { ListNumber: 6, Number: 11, Age: 44, Votes: 155, Order: 9, Mandate: false, Name: 'Števuljak Tomáš' },
        { ListNumber: 6, Number: 12, Age: 39, Votes: 210, Order: 10, Mandate: false, Name: 'Michl Pavel' },
        { ListNumber: 6, Number: 13, Age: 66, Votes: 159, Order: 11, Mandate: false, Name: 'Janáček František' },
        { ListNumber: 6, Number: 14, Age: 65, Votes: 134, Order: 12, Mandate: false, Name: 'Musil Jan' },
        { ListNumber: 6, Number: 15, Age: 61, Votes: 115, Order: 13, Mandate: false, Name: 'Vanický Jiří' },
        { ListNumber: 7, Number: 1, Age: 42, Votes: 311, Order: 1, Mandate: false, Name: 'Hyksová Hana Mgr.' },
        { ListNumber: 7, Number: 2, Age: 62, Votes: 384, Order: 2, Mandate: true, Name: 'Slezáková Jaroslava Ing.' },
        { ListNumber: 7, Number: 3, Age: 31, Votes: 286, Order: 2, Mandate: false, Name: 'Mach Ivo Mgr.' },
        { ListNumber: 7, Number: 4, Age: 37, Votes: 270, Order: 3, Mandate: false, Name: 'Orgoníková Lucie Ing.' },
        { ListNumber: 7, Number: 5, Age: 60, Votes: 238, Order: 4, Mandate: false, Name: 'Uhlíř František' },
        { ListNumber: 7, Number: 6, Age: 63, Votes: 174, Order: 5, Mandate: false, Name: 'Bártová Zdeňka' },
        { ListNumber: 7, Number: 7, Age: 39, Votes: 174, Order: 6, Mandate: false, Name: 'Kerbr Zdeněk' },
        { ListNumber: 7, Number: 8, Age: 50, Votes: 211, Order: 7, Mandate: false, Name: 'Rezničenková Irena Ing.' },
        { ListNumber: 7, Number: 9, Age: 39, Votes: 175, Order: 8, Mandate: false, Name: 'Holub Aleš' },
        { ListNumber: 7, Number: 10, Age: 48, Votes: 438, Order: 1, Mandate: true, Name: 'Joukl Libor Ing.' },
        { ListNumber: 7, Number: 11, Age: 65, Votes: 156, Order: 9, Mandate: false, Name: 'Veselá Emilie' },
        { ListNumber: 7, Number: 12, Age: 56, Votes: 131, Order: 10, Mandate: false, Name: 'Prnka Roman' },
        { ListNumber: 7, Number: 13, Age: 52, Votes: 141, Order: 11, Mandate: false, Name: 'Venzhöfer Vojtěch' },
        { ListNumber: 7, Number: 14, Age: 63, Votes: 138, Order: 12, Mandate: false, Name: 'Štěpán Miroslav' },
        { ListNumber: 7, Number: 15, Age: 59, Votes: 124, Order: 13, Mandate: false, Name: 'Hološ Zdeněk' }
    ];

    var sorted = _.sortBy(raw, function (v) { return -1*v.Votes; });
    var data = _.map(sorted, function (v, i) {
        var candidateList = candidateLists['2014'][v.ListNumber.toString()];
        return {
            Number: v.ListNumber + '.' + v.Number,
            Age: v.Age,
            Votes: v.Votes,
            Mandate: v.Mandate,
            Name: v.Name,
            Color: candidateList.Color
        }
    });

    var chart1 = createChart('#chart-popularity-votes', 300, data);
    chart1.resize(2500);
    
})();