const fs = require('fs')
const path = require('path')
let dir = 'newFs/fs.js'

function statFn (path){
    return new Promise((resolve,reject) => {
        fs.stat(path,(error,stats) => {
            resolve(stats)
        })
    })
}
/*(async() => {
    let dir = 'newFs'
    if (!await isDir(dir)) {
        fs.mkdir(dir, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('创建目录成功');
            }
        })
    }

    /!*fs.writeFile(dir + '/fs4.js',new Date().toString(),err => {
        if (err) {
            console.log(err);
        } else{
            console.log('创建文件成功');
        }
    })*!/
    fs.appendFile(dir + '/fs4.js',new Date().toString(),err => {
        if (err) {
            console.log(err);
        } else{
            console.log('追加文件成功');
        }
    })

})()*/


/*fs.mkdir('newFs1',err => {
    if (err) {
        console.log(err);
    } else {
        console.log('创建成功');
    }
})*/

/*fs.rmdir('newFs', err => {
    if (err) {
        console.log(err);
    } else {
        console.log('删除成功');
    }
})*/

function isExit (path) {
    return new Promise((resolve,reject) => {
        fs.stat(path, (err,stats) => {
            if (err) {
                console.log('该目录或文件不存在！');
            }
            resolve(!err)
        })
    })
}
function isDir (path) {
    return new Promise((resolve,reject) => {
        fs.stat(path, (err,stats) => {
            if (err) {
                console.log('该目录或文件不存在！');
                resolve(false)
            }else {
                resolve(stats.isDirectory())
            }
        })
    })
}
function isFile (path) {
    return new Promise((resolve,reject) => {
        fs.stat(path, (err,stats) => {
            if (err) {
                console.log('该目录或文件不存在！');
                resolve(false)
            }else {
                resolve(stats.isFile())
            }
        })
    })
}

// 删除文件或目录（包含目录下所有文件）
/*async function delFileAndDir (path) {
    if (!await isExit(path)) {
        return
    }
    if (await isFile(path)) {
        fs.unlink(path, err => {
            if (!err) {
                console.log('删除文件成功');
            }
        })
    } else if (await isDir(path)){
        fs.readdir(path,(err,data) => {
            if (err) {
                console.log(err);
            } else{
                console.log(data);
                if (data.length) {
                    data.forEach(itemPath =>{
                        delFileAndDir(path+'/'+itemPath)
                    })
                    delFileAndDir(path)
                } else {
                    fs.rmdir(path, rmdirErr => {
                        console.log('移除目录成功！');
                    })
                }
            }
        })
    } else {
        console.log('删除失败');
    }
}*/
async function delFileAndDir (path) {
    fs.stat(path,(err,stats) => {
        if (err) {
            console.log('删除失败,文件或目录不存在');
        } else if(stats.isDirectory()){
            fs.readdir(path,(err,data) => {
                if (err) {
                    console.log(err);
                } else{
                    console.log(data);
                    if (data.length) {
                        data.forEach(itemPath =>{
                            delFileAndDir(path+'/'+itemPath)
                        })
                        delFileAndDir(path)
                    } else {
                        fs.rmdir(path, rmdirErr => {
                            console.log('移除目录成功！');
                        })
                    }
                }
            })

        } else if(stats.isFile()){
            fs.unlink(path, err => {
                if (!err) {
                    console.log('删除文件成功');
                }
            })
        }
    })
}
// delFileAndDir('newFs')

/*(async () => {
    if (!await isDir(dir = 'newFs')) {
        fs.mkdirSync(dir, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('创建目录成功');
            }
        })
    }
    fs.appendFile(dir + '/fs4.js',new Date().toString() + '\r\n',err => {
        if (err) {
            console.log(err);
        } else{
            console.log('追加文件成功');
        }
    })
})()*/

// 修改文件名或移动文件到指定目录
async function transfer (originPath, targetPath) {
    // console.log('baseName:',path.basename(originPath))
    // console.log('dirName:',path.dirname(originPath))
    if (!await isDir(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath))
    }
    fs.rename(originPath,targetPath, (err,data) => {
        if (err) {
            console.log({err})
        } else {
            console.log({data})
        }
    })
}
// transfer('05_fs.js', 'fs.js')

let fileReadStream = fs.createReadStream('fs.js')
let res = ''
let count = 0
fileReadStream.on('data',(chunk) => {
    res += chunk
    count++
    // console.log(res);

})
fileReadStream.on('end',() => {
// console.log({res});
})



let writeStream = fs.createWriteStream('fs/index.js')
let data = 'fs.stat3 检测是件还是目录'
writeStream.write(data, () => {
    console.log('写入完成');
})
