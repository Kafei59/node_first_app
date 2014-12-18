/* 
* @Author: kafei
* @Date:   2014-11-21 14:58:36
* @Last Modified by:   kafei
* @Last Modified time: 2014-12-15 12:43:55
*/

module.exports = function(dir, ext, callback) {

	function bar(callback) {
		foo(function (err, data) {
			if (err) {
				return callback(err);
			} else {
				callback(null, data);
			}
		})
	}

}
