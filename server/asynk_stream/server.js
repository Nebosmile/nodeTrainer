const fs = require('fs');

// хотим читать данные из потока в цикле

function readStream(file_item) {
    // TBD
    var errarr=[];
    function pusherr(err) {
        errarr.push(err)
    }
    file_item.on('error',pusherr);
    return function(){
        file_item.removeAllListeners();
        return new Promise(function(resolve, reject) {

            file_item.resume();
            file_item.once('data', (data_item) => {
                file_item.pause();
                return resolve(data_item)
            });
            file_item.once('error', (err) => {
                reject(new Error('file is not'))

            })
            file_item.once('end',()=>{
                resolve(null);
            })
        })

    }

}

async function read(path) {

    let stream = fs.createReadStream(path, {
        highWaterMark: 60,
        encoding: 'utf-8'
    });

    let data;

    // ЗАДАЧА: написать такой readStream
    let reader = readStream(stream);

    while (data = await reader()) {
        console.log(data);
    }
    // stream finished
};

read(__filename).catch(console.error);
