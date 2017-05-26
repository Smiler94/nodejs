var Q = require('q');
var fs = require('fs');
var defer = Q.defer();

/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
    return defer.promise;
}

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled)将新的promise赋给outputPromise
 * 未完成改变为reject
 * @private
 */
var outputPromise = getInputPromise().then(function(fulfilled){
    var myDefer = Q.defer();
    fs.readFile('test.txt','utf8',function(err,data){
        if(!err && data) {
            myDefer.resolve(data);
        }
    });
    return myDefer.promise;
},function(rejected){
    throw new Error('rejected');
});

/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)，控制台打印test.txt文件内容。
 *
 */
outputPromise.then(function(fulfilled){
    // console.log('111')
    console.log(fulfilled);
},function(rejected){
    console.log(rejected);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
//defer.reject();

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
defer.resolve(); //控制台打印出 test.txt 的内容
defer.resolve(); //控制台打印出 test.txt 的内容