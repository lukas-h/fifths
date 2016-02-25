/**
 * Created by lukas on 25.02.16.
 */
var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(-16.51)");

svg.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 90)
    .attr('fill', 'transparent')
    .attr('stroke', '#000000');

var dur = ['C', 'G', 'D', 'A', 'E', 'H', 'Ges/Fis', 'Des', 'As', 'Es', 'B', 'F'];
var moll = ['a', 'e', 'h', 'fis', 'cis', 'gis', 'es/dis', 'b', 'f', 'c', 'g', 'd'];

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return 1; });

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var arc2 = d3.svg.arc()
    .outerRadius(radius - 100)
    .innerRadius(0);

var g = svg.selectAll(".arc")
    .data(pie(dur))
    .enter()
    .append("g")
    .attr("class", "arc");

var gMoll = svg.selectAll(".arcMoll")
    .data(pie(moll))
    .enter()
    .append("g")
    .attr("class", "arcMoll");

g.append("text")
    .attr('transform', function(d) { return "translate(" + arc.centroid(d) + ") rotate(16.51)"; })
    .attr('fill', '#FF0000')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text(function(d) { return d.data; });

gMoll.append("text")
    .attr('transform', function(d) { return "translate(" + arc2.centroid(d) + ") rotate(16.51)"; })
    .attr('fill', '#FF0000')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text(function(d) { return d.data; });