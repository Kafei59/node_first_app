/*
* @Author: Kafei59
* @Date:   2016-05-20 11:42:45
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-20 11:52:04
*/

module.exports.index = function(req, res) {
    res.render('index', {
        title: 'Home'
    });
}
