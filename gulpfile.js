var gulp = require('gulp');
var webpack = require('gulp-webpack');
var header = require('gulp-header');

const userscript_header = `
// ==UserScript==
// @name        Gudilap preview
// @namespace   my
// @include     http://localhost:8000/commentadd/*
// @include     http://localhost:8000/topicadd/*
// @version     1
// @grant       console.log
// @grant       GM_addStyle
// ==/UserScript==
`.trim() + "\n\n";

gulp.task('default', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(header(userscript_header))
    .pipe(gulp.dest('build/'));
});
