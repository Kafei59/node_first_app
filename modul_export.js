/* 
* @Author: kafei
* @Date:   2014-11-21 14:58:36
* @Last Modified by:   kafei
* @Last Modified time: 2014-11-21 15:07:50
*/

module.exports = function foo(dir, ext, callback) {
	bar(function(err, data) {
		if (err) {
			return callback(err);
		} else {
			callback(null, data);
		}
	});
} 