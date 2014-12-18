/* 
* @Author: kafei
* @Date:   2014-11-21 14:29:53
* @Last Modified by:   kafei
* @Last Modified time: 2014-11-21 14:51:44
*/

var fs = require('fs');
var path = require('path');

if (process.argv[2] != null && process.argv[3] != null) {
	fs.readdir(process.argv[2], function callback(err, list) {
		list.forEach(function(file) {
			if (path.extname(file) == '.'+process.argv[3]) {
				console.log(file);
			}
		});
	});
} else {
	console.log("");
}
