d3.csv("static/data/iris.csv").then(function(data){
    // Get dimensions of the parent container
    const parentWidth = document.getElementById('visualization1').clientWidth;
    const parentHeight = document.getElementById('visualization1').clientHeight;

    // Define margins
    const margin = { top: 40, right: 40, bottom: 40, left:40 };
    const width = parentWidth - margin.left - margin.right;
    const height = parentHeight - margin.top - margin.bottom;

    // Append SVG to the div
    const svg = d3.select("#visualization1")
        .append("svg")
        .attr("width", parentWidth)
        .attr("height", parentHeight);
    
    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale functions
    const xScale = d3.scaleLinear().domain(d3.extent(data.map(d => d["sepal.length"]))).range([0, width]);
    const yScale = d3.scaleLinear().domain(d3.extent(data.map(d => d["sepal.width"]))).range([height, 0]);

    // Draw dots
    g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(parseFloat(d["sepal.length"])))
        .attr("cy", d => yScale(parseFloat(d["sepal.width"])))
        .attr("r", 5);

    // Add x axis
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // Add y axis
    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));

    // Add labels
    g.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top - 10) + ")")
        .style("text-anchor", "middle")
        .text("Sepal Length");

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Sepal Width");
});