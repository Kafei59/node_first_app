/* 
* @Author: kafei
* @Date:   2014-11-19 10:22:51
* @Last Modified by:   kafei
* @Last Modified time: 2014-11-19 10:30:17
*/

var sum = 0;
for (i = 2; i < process.argv.length; i++) {
	sum += +process.argv[i];
}

console.log(sum);
