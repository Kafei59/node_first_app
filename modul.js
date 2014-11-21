/* 
* @Author: kafei
* @Date:   2014-11-21 14:57:58
* @Last Modified by:   kafei
* @Last Modified time: 2014-11-21 15:10:56
*/

var fs = require('fs');
var modul = require('./modul_export');

if (process.argv[2] != null) {
	fs.readdir(process.argv[2], process.argv[3], function foo(callback) {
		console.log("data");
	});
} else {
	console.log("");
}
