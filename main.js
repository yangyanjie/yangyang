/**
 * Author: liubin
 * Create Date: 2017-12-21
 * Description: 一键打包部署
 */
module.exports = function() {
    'use strict';
    const
        O = 'app-hebei',
        Q = require('q'),
        argv = process.argv,
        del = require('del'),
        gulp = require('gulp'),
        zip = require('gulp-zip'),
        node_ssh = require('node-ssh'),
        colors = require('colors/safe'),
        dateFormat = require('dateformat'),
        imagemin = require('gulp-imagemin'),
        exec = require('child_process').exec,
        pngquant = require('imagemin-pngquant'),
        IPs = [{
            host: '123.56.29.106',
            post: 22,
            user: 'root',
            dist: '/root',
            privateKey: '/Users/saotx-yyj/.ssh/id_rsa'
        }],
        SERVER = {
            'dev153': {
                type: 'dev',
                host: '172.17.15.153',
                port: 22,
                user: '',
                dist: '/opt/webapps/t-pages',
                privateKey: ''
            },
            'dev189': {
                type: 'dev',
                host: '172.17.15.189',
                port: 22,
                user: '',
                dist: '/opt/webapps/t-pages',
                privateKey: ''
            },
            'test': {
                type: 'test',
                host: '172.17.15.174',
                port: 22,
                user: '',
                dist: '/opt/webapps/t-pages',
                privateKey: ''
            }
        },
        center = new node_ssh(),
        zipfile = O + '-' + dateFormat(new Date(), "yyyy-mm-dd-HH-MM-ss") + '.zip';

    // 判断指令是否正确
    if ('publish' !== argv[2]) {
        process.stdout.write(colors.red('-main: ' + argv[2] + ': command not found\n'));
        process.stdout.write(colors.green('Did you mean "publish" ?\n'));
        return;
    }

    // 判断是否有目标Server
    if (!SERVER[argv[3]]) {
        process.stdout.write(colors.green('\x20SERVER REQUIRED!\n'));
        process.stdout.write(colors.blue('\x20-node main pusblish dev\n'));
        process.stdout.write(colors.blue('\x20-node main pusblish test\n'));
        return;
    }

    // 添加目标地址
    IPs.push(SERVER[argv[3]]);

    // 删除打包文件
    var firstStep = function() {
        var defered = Q.defer();
        process.stdout.write(colors.green('ON STEPS: \n'));
        process.stdout.write(colors.green('1、: del -> \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 del dist...\n'));
        del(['dist'], { force: true }, function(error, stdout, stderr) {
            process.stdout.write(colors.green('\x20\x20\x20 success\n'));
            defered.resolve(true);
        });
        return defered.promise;
    };

    // 打包文件
    var secondStep = function() {
        var defered = Q.defer();
        process.stdout.write(colors.green('2、: build -> \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 build project...\n'));
        exec('npm run build', function(error, stdout, stderr) {
            process.stdout.write(colors.green('\x20\x20\x20 success\n'));
            defered.resolve(true);
        });
        return defered.promise;
    };

    // 处理目标文件
    var thirdStep = function() {
        var defered = Q.defer();
        process.stdout.write(colors.green('3、: copy -> \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 copy project...\n'));
        gulp.src('static/**')
            .pipe(gulp.dest('dist/static'))
            .on('finish', function() {
                process.stdout.write(colors.green('\x20\x20\x20 success\n'));
                defered.resolve(true);
            })
            .on('error', function(error) {
                process.stdout.write(colors.red('\x20\x20\x20 field !\n'));
                defered.reject(new Error(error));
            });
        return defered.promise;
    };

    // 处理图片
    var forthStep = function() {
        var defered = Q.defer();
        process.stdout.write(colors.green('4、: pngquant -> \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 pngquant (png|jpg|gif)...\n'));
        gulp.src([
                '!dist/static/js',
                '!dist/static/css',
                '!dist/static/lib',
                'dist/static/*/*.{png,jpg,gif,ico}'
            ]).pipe(imagemin({
                optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{
                    removeViewBox: false
                }], //不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            }))
            .pipe(gulp.dest('dist/static'))
            .on('finish', function() {
                process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
                defered.resolve(true);
            })
            .on('error', function(error) {
                process.stdout.write(colors.red('\x20\x20\x20 field !\n'));
                defered.reject(new Error(error));
            });
        return defered.promise;
    };

    // 拷贝首页文件
    var fifthStep = function() {
        var defered = Q.defer();
        process.stdout.write(colors.green('5、: index -> \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 copy index...\n'));
        gulp.src(['index.html', 'getlocation.html'])
            .pipe(gulp.dest('dist'))
            .on('finish', function() {
                process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
                defered.resolve(true);
            })
            .on('error', function(error) {
                process.stdout.write(colors.red('\x20\x20\x20 field !\n'));
                defered.reject(new Error(error));
            });
        return defered.promise;
    };

    // 打包前准备
    var sixthStep = function() {
        var defered = Q.defer();
        process.stdout.write(colors.green('6、: app -> \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 new app...\n'));
        gulp.src('dist/**')
            .pipe(gulp.dest('dist/' + O))
            .on('finish', function() {
                process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
                defered.resolve(true);
            })
            .on('error', function(error) {
                process.stdout.write(colors.red('\x20\x20\x20 field !\n'));
                defered.reject(new Error(error));
            });
        return defered.promise;
    };

    // 打包前准备
    var sixdotfiveStep = function() {
        var defered = Q.defer();
        process.stdout.write(colors.green('6.5、: img -> \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 cp img...\n'));
        gulp.src('dist/static/img/**')
            .pipe(gulp.dest('dist/' + O + '/static/css/static/img'))
            .on('finish', function() {
                process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
                defered.resolve(true);
            })
            .on('error', function(error) {
                process.stdout.write(colors.red('\x20\x20\x20 field !\n'));
                defered.reject(new Error(error));
            });
        return defered.promise;
    };

    // 打包目标文件
    var seventhStep = function() {
        var defered = Q.defer();
        process.stdout.write(colors.green('7、: zip -> \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 zip packing...\n'));
        gulp.src([
                'dist/**',
                '!dist/index.html',
                '!dist/views/**/*',
                '!dist/static/**/*'
            ])
            .pipe(zip(zipfile))
            .pipe(gulp.dest('dist'))
            .on('finish', function() {
                process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
                defered.resolve(zipfile);
            })
            .on('error', function(error) {
                process.stdout.write(colors.red('\x20\x20\x20 field !\n'));
                defered.reject(new Error(error));
            });
        return defered.promise;
    };

    // 将打包文件上传至中控
    var eighthStep = function(file) {
        var defered = Q.defer();
        process.stdout.write(colors.green('8、upload: \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 upload ' + file + ' to ' + IPs[0].host + '...\n'));
        exec('scp ./dist/' + file + ' ' + IPs[0].user + '@' + IPs[0].host + ':' + IPs[0].dist, function(error, stdout, stderr) {
            process.stdout.write(colors.blue('\x20\x20\x20 upload to ' + IPs[0].host + ' success\n'));
            defered.resolve(file);
        });
        return defered.promise;
    };

    // 连接中控机
    var ninthStep = function(file) {
        var defered = Q.defer();
        process.stdout.write(colors.green('9、login: \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 login ' + IPs[0].host + '...\n'));
        center.connect({
            host: IPs[0].host,
            port: IPs[0].port,
            username: IPs[0].user,
            privateKey: IPs[0].privateKey
        }).then(function() {
            process.stdout.write(colors.blue('\x20\x20\x20 welcome to ' + IPs[0].host + '!\n'));
            defered.resolve(file);
        });
        return defered.promise;
    };

    // 解压文件
    var tenthStep = function(file) {
        var defered = Q.defer();
        process.stdout.write(colors.green('10、unzip: \n'));
        center.exec('unzip -o ' + IPs[0].dist + '/' + file)
            .then(function(result) {
                process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
                defered.resolve(file);
            });
        return defered.promise;
    };

    // 将文件拷贝到服务器
    var eleventhStep = function(file) {
        var defered = Q.defer();
        process.stdout.write(colors.green('11、copy: \n'));
        process.stdout.write(colors.blue('\x20\x20\x20 copy ' + O + ' to ' + IPs[1].host + '!\n'));
        center.exec('scp -r ' + IPs[0].dist + '/' + O + ' ' + IPs[1].host + ':' + IPs[1].dist)
            .then(function(result) {
                process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
                defered.resolve(file);
            });
        return defered.promise;
    };

    // 删除打包文件
    var twelfthStep = function(file) {
        var defered = Q.defer();
        process.stdout.write(colors.green('12、del: \n'));
        center.exec('rm -rf ' + file + ' ' + O + '/').then(function(result) {
            process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
            defered.resolve(true);
        });
        return defered.promise;
    };

    // 成功提示
    var thirteenthStep = function() {
        var defered = Q.defer();
        center.dispose();
        process.stdout.write(colors.green('\x20PUBLISH SUCCESS\n'));
        defered.resolve(true);
        return defered.promise;
    };

    // 错误统一处理
    var error_catch = function(error) {
        process.stdout.write(colors.red('Field!\n'));
        process.stdout.write(colors.red(error.message + '\n'));
    };

    Q.fcall(firstStep)
        .then(secondStep)
        .then(thirdStep)
        // .then(forthStep)  //对图片处理，多目录太耗时，先注释掉
        .then(fifthStep)
        .then(sixthStep)
        .then(sixdotfiveStep)
        .then(seventhStep)
        .then(eighthStep)
        .then(ninthStep)
        .then(tenthStep)
        .then(eleventhStep)
        .then(twelfthStep)
        .then(thirteenthStep)
        .catch(error_catch)
        .done();
}();