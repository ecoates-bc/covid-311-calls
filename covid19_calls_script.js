// Visualization 1 of 2: The different types of covid-19-related calls

// Create the title of the graph
d3.select("#covid_call_types_chart1")
    .select("#chart_title")
    .append("h3")
    .text("Vancouver 3-1-1 Calls relating to COVID-19: March 2020");

// Define the size of the graph
var height = 300,
    barWidth = 30,
    scaleChart1 = function(n) {
        let scale = d3.scaleLinear()
            .domain([0, 2774])
            .range([1, height - 50])
        return scale(n);
    };

// Create the graph element
var graph1 = d3.select("#covid_call_types_chart1")
    .select("#chart_body")
    .append("svg")
    .attr("width", (barWidth * covid_data.length))
    .attr("height", height);

// Create the bar elements, stretch them to the height of each data point,
//  add data points to each element in the HTML
for (let i=0; i<covid_data.length; i++) {
    let dataPoint = scaleChart1(covid_data[i][1]);

    let barX = i * barWidth;
    let barY = Math.round(height-dataPoint);

    let bar = graph1.append("g")
        .attr("x", barX)
        .attr("y", barY)
        .attr("transform", function() {
            return "translate(" + barX + ',' + barY + ')';
        })
    bar.append("rect").attr("height", function() {
        return Math.round(dataPoint);
    })
    .attr("width", barWidth - 10)
    .attr("fill", "steelblue");

    // Add labels to each bar, representing the number of calls of that type for each month
    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", -10)
        .text(covid_data[i][1])
        .style("fill", 'black')
        .style("text-anchor", "middle")
        .style("font", "10px sans-serif");
}

// functions for updating the graph
function updateChart1Height(index) {
    graph1.selectAll("g").each(function(d, i) {
        // update the top corners of the bars
        var dataPoint = covid_data[i][index];
        var newY = 0;
        d3.select(this)
            .transition()
            .attr("transform", function() {
                newY = Math.round(height-scaleChart1(dataPoint));
                return("translate(" + d3.select(this).attr("x") + ',' + newY + ")");
            })
            .attr("y", newY);
        
        // Update the bottoms to stay at the bottom of the chart
        d3.select(this)
            .select("rect")
            .transition()
            .attr("height", function() {
                return Math.round(scaleChart1(dataPoint));
            });

        // Update the labels
        d3.select(this)
            .select("text")
            .transition()
            .text(function() {
                return dataPoint;
            })

    });

    // Update the title label
    d3.select("#covid_call_types_chart1")
        .select("#chart_title")
        .select("h3")
        .text(function() {
            if (index === 1) {
                return "Vancouver 3-1-1 Calls relating to COVID-19: March 2020";
            } else {
                return "Vancouver 3-1-1 Calls relating to COVID-19: April 2020"
            }
        });
}

// Create the axis
var labels = []
for (let i = 0; i < covid_data.length; i++) {
    labels.push(covid_data[i][0]);
}
var linearScale = d3.scaleLinear()
    .domain([0, covid_data.length])
    .range([0, barWidth * covid_data.length]);

var axis1 = d3.select("#covid_call_types_chart1")
    .select("#chart_labels")
    .append('svg')
    .attr("width", barWidth * covid_data.length)
    .attr("height", 250);
for (var i = 0; i < covid_data.length; i++) {
    axis1.append("text")
        //.attr('x', linearScale(i))
        .attr('y', 10)
        .text(covid_data[i][0])
        .style("text-anchor", "end")
        .style("font", "10px sans-serif")
        .attr("dx", "-1em")
        .attr("dy", (linearScale(i) / 10) + "em")
        .attr("transform", "rotate(-90)");
    }