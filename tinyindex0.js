//tutorial example at https://www.tensorflow.org/js/tutorials
console.log(`TFjs training started at ${Date()}`);


// Create a simple model.
(async function(){
    
    // --- MODEL START ---
    
    model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    
    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    
    // Generate some synthetic data for training. (y = 2x - 1)
    n=21
    x = [...Array(n)].map((_,i)=>i-10)
    y = x.map(d=>d*2-1+Math.random()*20-10)
    xs = tf.tensor2d(x, [n, 1]);
    ys = tf.tensor2d(y, [n, 1]);
    
    // Train the model using the data.
    fitLog = await model.fit(xs, ys, {epochs: 250});
    
    // --- MODEL END ---
    
    // extract the parameters
    A=model.getWeights()[0].arraySync()[0][0].toFixed(3)
    B=model.getWeights()[1].arraySync()[0].toFixed(3)
    // plot trained model
    let modelDiv = document.getElementById('modelDiv')
    modelDiv.innerHTML='' // clear div
    let regressionDiv=document.createElement('div')
    regressionDiv.id="regressionDiv"
    modelDiv.appendChild(regressionDiv)
    // traces - regression
    let dataTrace={
        x:xs.arraySync().map(d=>d[0]),
        y:ys.arraySync().map(d=>d[0]),
        mode: 'markers',
        type: 'scatter',
        marker: { 
            size: 12,
            symbol: 'circle-open'
        },
        name:'training data'
    }
    // traces prediction
    let yp = model.predict(tf.tensor2d(x, [n, 1])).arraySync().map(d=>d[0])
    let predictionTrace={
        x:x,
        y:yp,
        name:'model'
    }
    Plotly.newPlot(regressionDiv,
        [
            dataTrace,
            predictionTrace
        ],
        { // layout
            title:`<b>Regression plot</b>: <i style="color:brown">y = 2x - 1</i><br><span style="font-size:medium;color:navy">A=${A} , B=${B}</span>`,
            xaxis:{
                title:'X'
            },
            yaxis:{
                title:'Y= A*X + B'
            }
        }
    )
})()