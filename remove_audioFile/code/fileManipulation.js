// include
const path = require('path');
const fs = require('fs');
const Max = require('max-api');
const readline = require('readline');


// input message
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', (input) => {
	deleteMediaFile(input);
	});


// observe media folder
fs.watch('../media', {
	persistent: true,
	recursive: false
	}, checkMediaDir
	);


function checkMediaDir(){
	fs.readdir('../media', (err, files) => {
		const result = files.filter((fname) => {
			var check = fname.slice(fname.lastIndexOf('.'));
			if(check == '.wav' || check == '.aif'){
				return 1;
			}
		});
		makeDict(result);
	});
}
	
function deleteMediaFile(fileName){
	fs.unlink('../media/' + String(fileName), (err) => {
		if(err) Max.post(err);
	});
}

function makeDict(array){
	var arrayDict = {};
	for(var i=0; i<array.length; i++){
		arrayDict[String(i+1)] = array[i];
	}
	Max.outlet(arrayDict);
}		

// init
Max.addHandler("init", () => {
	checkMediaDir();
	});

