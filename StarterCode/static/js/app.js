

int();


function int() {
    d3.json('samples.json').then(data => {
        var names = data.names;
        
        names.forEach(name => {
            d3.select('select').append('option').text(name).attr('value',name)
        });

        showPanel(names[0]);
        showBar(names[0]);
        showBubble(names[0]);
    })
};

function showPanel(name) {
    d3.json('samples.json').then(data => {
        var metadata = data.metadata.filter(obj => obj.id == name)[0];
        var pnl = d3.select('.panel-body');

        pnl.html('');
        Object.entries(metadata).forEach(([key,value]) => {
            pnl.append('h5').text(`${key.toUpperCase()}: ${value}`)
        })
    });
};

function optionChanged(name) {
    showPanel(name);
    showBar(name);
    showBubble(name)
};

function showBar(name) {

    d3.json('samples.json').then(data => {
        var sample = data.samples.filter(obj => obj.id == name)[0]; 
        
        console.log(sample);
        
        var barData = [
            {
                y: sample.otu_ids.slice(0,10).reverse().map(obj => `OTU ${obj}`),
                x: sample.sample_values.slice(0,10).reverse(),
                text: sample.otu_labels.slice(0,10).reverse(),
                orientation: 'h',
                type: 'bar'
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found", 
            margin : {t: 30,l:150}
        };

        Plotly.newPlot("bar",barData,barLayout);

    })

};

function showBubble(name) {

    d3.json('samples.json').then(data => {
        var sample = data.samples.filter(obj => obj.id == name)[0]; 
        
        console.log(sample);
        
        var bubbleData = [
            {
                x: sample.otu_ids,
                y: sample.sample_values,
                text: sample.otu_labels,
                type: 'scatter',
                mode: 'markers',
  marker: {
    size: sample.sample_values,
    color: sample.otu_ids,
  }
            }
        ];

        var bubbleLayout = {
            xaxis:{title: "OTU ID"}, 
            margin : {t: 30,l:150}
        };

        Plotly.newPlot("bubble",bubbleData,bubbleLayout);

    })



};




