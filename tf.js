// assuming tf is already loaded with something like 
// browser: <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
// node ... npm install @tensorflow/tfjs etc

if(window.tf){
    console.log('tfjs loaded')
}else{
    console.log(`couldn't find tf library`)
}

// Tutorial at https://js.tensorflow.org
// documentation at https://js.tensorflow.org/api/0.10.0/


// Define a model for linear regression.
  const model = tf.sequential();
  model.add(tf.layers.dense({units: 1, inputShape: [1]}));

  // Prepare the model for training: Specify the loss and the optimizer.
  model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

  // Generate some synthetic data for training.
  const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
  const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

  // Train the model using the data.
  model.fit(xs, ys).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    model.predict(tf.tensor2d([5], [1, 1])).print();
  });