// Build MetaData Panel
function buildMetadata(input_val) {

  // Use `.html("") to clear any existing metadata
  var selector = d3.select("#sample-metadata").html("").append("ul");

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${input_val}`).then(
      // selector.append("li").text("Testing"));
    (samplePanel) => {
      // Use `Object.entries` to add each key and value pair to the panel
      var array = Object.entries(samplePanel);

      array.forEach((row) => selector.append("li").text(`${row[0]} : ${row[1]}`) );
    }
  );
}


// Buiild Pie Chart
function buildCharts(sample) {
  var selector2 = d3.select("#pie").html("")

  d3.json(`/samples/${sample}`).then(
    (sampleData) => {
      var xBub = Object.values(sampleData)[0];
      var yBub = Object.values(sampleData)[2];
      var labelBub = Object.values(sampleData)[1];

      var labelsPie = Object.values(sampleData)[0].slice(0,11);
      var valuesPie = Object.values(sampleData)[2].slice(0,11);
        
      var bubtrace = [
        {
          x : xBub,
          y : yBub,
          text: labelBub,
          mode : 'markers',
          marker : {
              color : [120, 125, 130, 135, 140, 145],
              size : yBub
          }
        }
      ];

      var bubLayout = {
        title: 'Germ Frequency'
      };

      var pietrace = [{
        values: valuesPie,
        labels: labelsPie,
        type: 'pie'
      }];

      //Build a Bubble Chart
      Plotly.newPlot('bubble', bubtrace, bubLayout);

      Plotly.newPlot('pie', pietrace);
    }
  );

}

// Sample dropdown
function init() {
  var selector = d3.select("#selDataset");

  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Rechart based on sample selected
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize dashboard
init();
