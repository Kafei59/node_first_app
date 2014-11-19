/* 
* @Author: kafei
* @Date:   2014-11-19 10:38:52
* @Last Modified by:   kafei
* @Last Modified time: 2014-11-19 10:53:29
*/

var fs = require('fs');

if (process.argv[2] != null) {
	var buf =  fs.readFile(process.argv[2], function callback(err, data) {
		var str = data.toString();
		var split = str.split('\n');
		console.log(split.length - 1);
	});
} else {
	console.log("");
}
