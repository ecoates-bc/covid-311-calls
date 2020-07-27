// Visualization 2 of 2: the different trends in the data based off of keyword filters

// Create the title of the graph
d3.select("#mar_apr_comp_chart2")
    .select("#chart_title")
    .append("h3")
    .text("Vancouver 311 interactions by keyword: Mar/Apr 2019 and Mar/Apr 2020");

// Create the keyword
d3.select("#mar_apr_comp_chart2")
    .select("#chart_keyword")
    .append("h4")
    .text("Total interactions");

// Define the size of the graph
var height = 300,
    barWidth = 60,
    yearSpace = 60,
    scaleChart2 = function(n, data) {
        let scale = d3.scaleLinear()
            .domain([1, d3.max(data)])
            .range([0, height - 50])
        return scale(n);
    };

// Create the graph element
var graph2 = d3.select("#mar_apr_comp_chart2")
    .select("#chart_body")
    .append("svg")
    .attr("width", (barWidth * calls_1920_data['Total'].length) + yearSpace)
    .attr("height", height);

// Create the bar elements, stretch them to the height of each data point,
//  add data points to each element in the HTML
for (let i=0; i<4; i++) {
    let dataPoint = scaleChart2(calls_1920_data['Total'][i], calls_1920_data['Total']);
    let spacing;
    if (i > 1) {
        spacing = yearSpace;
    } else {
        spacing = 0;
    }

    let barX = i * barWidth + spacing;
    let barY = Math.round(height-dataPoint);

    let bar = graph2.append("g")
        .attr("x", barX)
        .attr("y", barY)
        .attr("transform", function() {
            return "translate(" + barX + ',' + barY + ')';
        })
    bar.append("rect").attr("height", function() {
        return Math.round(dataPoint);
    })
    .attr("width", barWidth - 10)
    .attr("fill", function() {
        if (spacing) {
            return "orangered";
        } else {
            return "steelblue";
        }
    });

    // Add labels to each bar, representing the number of calls of that type for each month
    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", -10)
        .text(calls_1920_data['Total'][i])
        .style("fill", 'black')
        .style("text-anchor", "middle")
        .style("font", "14px sans-serif");
}

// functions for updating the graph
function updateChart2Height(key) {
    graph2.selectAll("g").each(function(d, i) {
        // update the top corners of the bars
        var dataPoint = calls_1920_data[key][i];
        var newY = 0;
        d3.select(this)
            .transition()
            .attr("transform", function() {
                newY = Math.round(height-scaleChart2(dataPoint, calls_1920_data[key]));
                return("translate(" + d3.select(this).attr("x") + ',' + newY + ")");
            })
            .attr("y", newY);
        
        // Update the bottoms to stay at the bottom of the chart
        d3.select(this)
            .select("rect")
            .transition()
            .attr("height", function() {
                return Math.round(scaleChart2(dataPoint, calls_1920_data[key]));
            });

        // Update the labels
        d3.select(this)
            .select("text")
            .transition()
            .text(function() {
                return dataPoint;
            })

    });

    // Update the keyword label
    d3.select("#mar_apr_comp_chart2")
        .select("#chart_keyword")
        .select("h4")
        .text(function() {
            if (key != 'Total') {
                return key + "-related interactions"
            } else{
                return "Total interactions"
            }
        });
}

// Write the month labels
var axis = d3.select("#mar_apr_comp_chart2")
    .select("#chart_labels")
    .append("svg")
    .attr("width", graph2.attr("width"))
    .attr("height", 50);

var month_labels = ["March", "April", "March", "April"];
var year_labels = ["2019", "2019", "2020", "2020"]

graph2.selectAll("g").each(function(d, i) {
    axis.append("text")
        .attr("x", Number(d3.select(this).attr("x")) + 10)
        .attr("y", 15)
        .append('svg:tspan')
        .attr("x", Number(d3.select(this).attr("x")) + 10)
        .attr("dy", 0)
        .text(month_labels[i])
        .style("fill", 'black')
        .style("font", "12px sans-serif")
        .append('svg:tspan')
        .attr("x", Number(d3.select(this).attr("x")) + 10)
        .attr('dy', 20)
        .text(year_labels[i])
        .style("fill", 'black')
        .style("font", "12px sans-serif");
})