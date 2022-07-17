d3.json('samples.json').then(({ names }) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    showData()
});


function showData() {
    var name = d3.select('select').property('value');

    d3.json('samples.json').then(({ metadata, samples }) => {
        var metadata = metadata.filter(obj => obj.id == name)[0];
        var sample = samples.filter(obj => obj.id == name)[0];
        var { otu_ids, sample_values, otu_labels } = sample;
        
        d3.select('.panel-body').html('');
        Object.entries(metadata).forEach(([key,val])=>{
            d3.select('.panel-body').append('h5').text(key.toUpperCase()+': '+val);
        });


        var barData = [
            {
                //y: [0, 100, 150],
                x : sample_values.slice(0,10).reverse(),
                y: otu_ids.slice(0,10).reverse().map(x=>'OTU '+ x),
            orientation: 'h',
              type: 'bar'
              
            }
          ];

          var barLayout = {
            title: 'Top 10 Bacteria Cultures'
          };          
          
          Plotly.newPlot('bar', barData, barLayout);

          var trace1 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: 'Earth'
            }
          };
          
          var bubbleData = [trace1];
          
          var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
          };

          
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);

console.log(metadata);
          var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: metadata.wfreq,
              title: { text: "Belly Button Washing Frequency<br>Scrbs per Week" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [0, 9] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);

    });
};

function optionChanged(name) {
    showData();
};