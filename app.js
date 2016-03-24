/**
 * Created by lukas on 25.02.16.
 */

var keyMapping = {
    // major
    "C": "C",
    "G": "G",
    "D": "D",
    "A": "A",
    "E": "E",
    "H": "B",
    "Fis": "F#",
    "Ges": "Gb",
    "Des": "Db",
    "As": "Ab",
    "Es": "Eb",
    "B": "Bb",
    "F": "Fb"
};
var printKey = function(data){
    var element = document.querySelector('.vex-tabdiv textarea');
    var tmp = 'tabstave tablature=false notation=true key=' + keyMapping[data] + ' clef=';
    element.value = tmp + 'treble\n\n' + tmp + 'bass';
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("keyup", false, true);
    element.dispatchEvent(evt);
}

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

var dur = ['C', 'G', 'D', 'A', 'E', 'H', 'Fis', 'Ges', 'Des', 'As', 'Es', 'B', 'F'];
var moll = ['a', 'e', 'h', 'fis', 'cis', 'gis', 'dis', 'es', 'b', 'f', 'c', 'g', 'd'];

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
    .attr("class", "arc")
    .attr('transform', function(d) { return "translate(" + arc.centroid(d) + ") rotate(16.51)"; });

var gMoll = svg.selectAll(".arcMoll")
    .data(pie(moll))
    .enter()
    .append("g")
    .attr("class", "arcMoll")
    .attr('transform', function(d) { return "translate(" + arc2.centroid(d) + ") rotate(16.51)"; });

g.append("text")
    .attr('fill', '#FF0000')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text(function(d) { return d.data; });
g.append("rect")
    .attr('x', -27.5)
    .attr('y', -10)
    .attr('width', 55)
    .attr('height', 20)
    .attr('fill', 'transparent')
    .on('click', function(d){ printKey(d.data);});


gMoll.append("text")
    .attr('fill', '#FF0000')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text(function(d) { return d.data; });

gMoll.append("rect")
    .attr('x', -17.5)
    .attr('y', -10)
    .attr('width', 35)
    .attr('height', 20)
    .attr('fill', 'transparent')
    .on('click', function(d){ printKey(d.data);});
