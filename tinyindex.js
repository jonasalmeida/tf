//tutorial example at https://www.tensorflow.org/js/tutorials
console.log(`TFjs training started at ${Date()}`);





let trainedModel = (async function(){
    const TFjs = await import('https://esm.sh/tensorflow@0.7.0')
    // 1. Create a simple model.
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    
    // 2. Prepare the model for training: Specify the loss and the optimizer.
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    
    // Generate some synthetic data for training. (y = 2x - 1)
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    // Train the model using the data.
    trainedModel = await model.fit(xs, ys, {epochs: 250});

    
    return trainedModel
})()
