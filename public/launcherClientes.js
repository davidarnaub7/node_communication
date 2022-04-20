 const { fork } = require('child_process');
var forks = [];


for (let index = 0; index < process.argv[2]; index++) {
    args = [3];
    var forked = fork('cliente.js', args);
    forks.push(forked);
    
    forked.on('close', function(params) {
        forked.kill;
        forks = forks.filter(function(value, index, arr){
            return value !== forks;
        });

        if(!forks)
            process.exit(0);        
    });
}



