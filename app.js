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
    "B": "B",
    "F#": "F#",
    "Gb": "Gb",
    "Db": "Db",
    "Ab": "Ab",
    "Eb": "Eb",
    "Bb": "Bb",
    "F": "F",
	// minor
    "a": "C",
    "e": "G",
    "h": "D",
    "f#": "A",
    "c#": "E",
    "g#": "B",
    "d#": "F#",
    "eb": "Gb",
    "bb": "Db",
    "f": "Ab",
    "c": "Eb",
    "g": "Bb",
    "d": "F"
};
var printKey = function(data){
    var element = document.querySelector('.vex-tabdiv textarea');
    var tmp = 'tabstave tablature=false notation=true key=' + keyMapping[data] + ' clef=';
    element.value = tmp + 'treble\n\n' + tmp + 'bass';
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("keyup", false, true);
    element.dispatchEvent(evt);

	var str = 'C major / a minor';
    switch(keyMapping[data]){
		case 'C':
			str = 'C major / a minor';
		break;
		case 'G':
			str = 'G major / e minor';
		break;
		case 'D':
			str = 'D major / h minor';
		break;
		case 'A':
			str = 'A major / fis minor';
		break;
		case 'E':
			str = 'E major / cis minor';
		break;
		case 'B':
			str = 'B major / gis minor';
		break;
		case 'F#':
			str = 'Fis major / dis minor';
		break;
		case 'Gb':
			str = 'Ges major / es minor';
		break;
		case 'Db':
			str = 'Des major / b minor';
		break;
		case 'Ab':
			str = 'As major / f minor';
		break;
		case 'Eb':
			str = 'Es major / c minor';
		break;
		case 'Bb':
			str = 'Bb major / g minor';
		break;
		case 'F':
			str = 'F major / d minor';
		break;
	}
	document.getElementById("major-minor").innerHTML = str;
}

var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2;

var svg = d3.select("#circle").append("svg")
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

var dur = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
var moll = ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'eb', 'bb', 'f', 'c', 'g', 'd'];

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
