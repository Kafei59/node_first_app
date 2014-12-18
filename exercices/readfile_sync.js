/* 
* @Author: kafei
* @Date:   2014-11-19 10:32:40
* @Last Modified by:   kafei
* @Last Modified time: 2014-11-19 10:38:25
*/

var fs = require('fs');

if (process.argv[2] != null) {
	var buf = fs.readFileSync(process.argv[2], 'utf8');
	var split = buf.split('\n');
	console.log(split.length - 1);
} else {
	console.log("");
}
