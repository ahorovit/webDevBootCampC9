function average(array) {
    var total = 0;
    
    array.forEach(function(val){
        total += val;
    });
    
    console.log(Math.round(total/array.length));
}

average([1,2,3, 100]);