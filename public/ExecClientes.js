
const { execFile } = require('child_process');

for (let index = 0; index < process.argv[2]; index++) {

    const child = execFile('node',['cliente.js',index, 3] , (error, stdout, stderr) => {
    if (error) {
    throw error;
    }
    console.log(stdout);
});
}