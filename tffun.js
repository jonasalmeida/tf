
if(typeof(tf)=="undefined"){
    let s = document.createElement('script')
    s.src='https://cdn.jsdelivr.net/npm/@tensorflow/tfjs'
    s.onload=function(){
        console.log('tfjs loaded: ',tf)
        tffun()
    }
    document.head.appendChild(s)
}else{
    tffun()
}

tffun=()=>{
    console.log('initializing @ '+Date())
    tffun.plot()
}

tffun.trainAnn=(x,y)=>{
    return x+y
}

tffun.fun1=()=>{
    // https://js.tensorflow.org/tutorials/core-concepts.html
    // example in "Models and Layers"
    function predict(input) {
      // y = a * x ^ 2 + b * x + c
      // More on tf.tidy in the next section
      return tf.tidy(() => {
        const x = tf.scalar(input);
        const ax2 = a.mul(x.square());
        const bx = b.mul(x);
        const y = ax2.add(bx).add(c);
        return y;
      });
    }

    // Define constants: y = 2x^2 + 4x + 8
    const a = tf.scalar(2);
    const b = tf.scalar(4);
    const c = tf.scalar(8);

    // Predict output for input of 2
    const result = predict(2);
    result.print() // Output: 24
}

tffun.genXY=(n,k)=>{
    var n=n||100, k=k||0.3
    var rg = Array.from(Array(n),(_,i)=>i)
    var x = rg.map(ri=>2*Math.PI*ri/n)
    var y = x.map(xi=>(Math.sin(xi)+k*Math.random()))

    //var dt = rg.map(i=>({x:x[i],y:y[i]}))
    //return JSON.stringify(dt,null,3)
    return {x:x,y:y}
}

tffun.plot=(id,x,y,model)=>{
    // prepare inputs
    if(Array.isArray(id)){ // if no plot div targetted
        x=id;y=x;model=y
    }
    //if(!x&&!y){throw('no data provided')}
    if(!x&&!y){
        let dt = tffun.genXY(200,1)
        x=dt.x; y=dt.y
    }

    // assemble data traces
    traces = [{
        x:x,
        y:y,
        mode: 'markers',
        type: 'scatter'
    }]

    // assemble predictions if available
    // ...

    // find target div, or create one
    if(typeof(id)=='undefined'){
        var div = document.createElement('div')
        div.id="plotlyDiv"
        document.body.appendChild(div)
        //debugger
    }

    // check for plotly 
    if(typeof(Plotly)=='undefined'){
        let s = document.createElement('script')
        s.src="https://cdn.plot.ly/plotly-latest.min.js"
        s.onload=()=>{
            Plotly.plot(div,traces)
            //debugger
        }
        document.head.appendChild(s)
        //debugger
    }

}