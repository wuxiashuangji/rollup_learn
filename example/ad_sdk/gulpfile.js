
var gulp = require('gulp');
var clean = require('gulp-clean');

// var targetDir = './dest/'
var sourceDir = './dist'
var targetDir = ['./dest/', './dist/']
gulp.task('copy', function() {
  return gulp.src(sourceDir + '/**/*')
    .pipe(gulp.dest(targetDir[0]));
});

gulp.task('clean', function() {
  return gulp.src([targetDir[0] + '/*']).pipe(clean({
    force: true
  }));
});

gulp.task('watch', function(event) {
  console.log('' +
    '===============================================\n' +
    '================================================\n' +
    '------ 开启gulp监控,监控路径为: ' + sourceDir + '-----\n' +
    '================================================\n' +
    '===============================================\n'
  )
  gulp.watch(sourceDir + '/**/*', ['copy'], function(event) {
    console.log(event.type, '---------type--------'); // added或deleted或changed
    console.log(event.path, '-------paht------'); // 变化的路径
  });
});
