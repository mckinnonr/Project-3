var gulp = require('gulp');  // Load Gulp!
// Install command for uglify: "npm install --save-dev gulp-uglify" (from gulpjs.com/plugins)
// Now that we've installed the uglify package we can require it!
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// Minify the JS files - removes comments and spaces
gulp.task('compress-js', function(){
  gulp.src('js/*.js') // The files we want gulp to consume
  .pipe(concat('main.min.js')) // Conbine (concatenate) all the files
  .pipe(uglify()) // Call the Uglify function on these files from the require above
  .pipe(gulp.dest('build/js')) // Where we put the result
});

// Minify the CSS files - removes comments and spaces
// For JS methods, write as above but can write on seperate lines to read better
gulp.task('compress-css', function(){
  gulp.src('css/*.css').pipe(concat('style.min.css')).pipe(minify()).pipe(gulp.dest('build/css'))
});

// "gulp browser-sync" to run this task:
// Do multiple tasks by adding task names to an aray
gulp.task('browser-sync', ['compress-js', 'compress-css'], function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  // call these 2 tasks from above on change (save)
  gulp.watch('js/*.js', ['compress-js']);
  gulp.watch('css/*.css', ['compress-css']);
  // make browser reload on change
  gulp.watch('js/*.js').on('change', browserSync.reload);
  gulp.watch('css/*.css').on('change', browserSync.reload);
});


// Unused code ///////////////////////////////////////////////////////
gulp.task('message', function(){
  console.log('ALL DONE! GO HAVE LUNCH!')
});

// To run the 'default' task, only use the "gulp" command, no need to specify the tasks
gulp.task('default', ['compress-js', 'message', 'compress-css', 'watch']);
