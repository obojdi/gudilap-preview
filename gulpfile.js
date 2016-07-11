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
// @include     http://www.gudilap.ru/commentadd/*
// @include     http://gudilap.ru/topicadd/*
// @include     http://www.gudilap.ru/topicadd/*
// @version     4
// @grant       console.log
// @grant       GM_addStyle
// @updateURL   https://github.com/pongo/gudilap-preview/raw/master/build/gudilap-preview.meta.js
// @downloadURL https://github.com/pongo/gudilap-preview/raw/master/build/gudilap-preview.user.js
// ==/UserScript==
`.trim() + "\n\n";

gulp.task('create-meta-file', function() {
  return file('gudilap-preview.meta.js', userscript_header, {src: true})
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['create-meta-file'], function() {
  return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(header(userscript_header))
    .pipe(gulp.dest('build/'));
});
