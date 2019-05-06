function buildMetadata(input_val) {

  // @TODO: Complete the following function that builds the metadata panel
  
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
  //   // // Use the first sample from the list to build the initial plots
  //   // const firstSample = sampleNames[0];
  //   // buildCharts(firstSample);
  //   // buildMetadata(firstSample);
  // });


    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


// function buildCharts(sample) {

//   // @TODO: Use `d3.json` to fetch the sample data for the plots
//   var sampleData = d3.json(`/samples/<sample>`);

//   // @TODO: Build a Bubble Chart using the sample data
//   var bubtrace = [
//     {
//       x : data.otu_ids,
//       y : data.sample_values,
//       text: data.otu_labels,
//       mode : 'markers',
//       marker : {
//           color : [120, 125, 130, 135, 140, 145],
//           size : data.sample_values
//       }
//     }
//   ];

//   var layout1 = {
//     title: 'Germ Frequency'
//   };
  
//   Plotly.newPlot('bubble', bubtrace, layout1);

//   // @TODO: Build a Pie Chart
//   var pietrace = [{
//     values: data.sample_values,
//     labels: data.otu_labels,
//     type: 'pie'
//   }];
  
//   var layout2 = {
//     height: 400,
//     width: 500
//   };
  
//   Plotly.newPlot('pie', pietrace, layout2);

//     // HINT: You will need to use slice() to grab the top 10 sample_values,
//     // otu_ids, and labels (10 each).
// }

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    // buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();