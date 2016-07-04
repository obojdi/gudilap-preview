var gulp = require('gulp');
var webpack = require('gulp-webpack');
var header = require('gulp-header');
var file = require('gulp-file');

const userscript_header = `
// ==UserScript==
// @name        Gudilap preview
// @description Добавляет предпросмотр на форум Гудилапа
// @namespace   https://github.com/pongo
// @include     http://gudilap.ru/commentadd/*
// @include     http://gudilap.ru/topicadd/*
// @version     1
// @grant       console.log
// @grant       GM_addStyle
// @updateURL   https://github.com/pongo/gudilap-preview/raw/master/build/gudilap-preview.meta.js
// @downloadURL https://github.com/pongo/gudilap-preview/raw/master/build/gudilap-preview.user.js
// ==/UserScript==
`.trim() + "\n\n";

gulp.task('copy-meta', function() {
  return file('gudilap-preview.meta.js', userscript_header, {src: true})
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['copy-meta'], function() {
  return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(header(userscript_header))
    .pipe(gulp.dest('build/'));
});
