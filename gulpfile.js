// Importando o Gulp e os plugins necessários
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

// Tarefa para comprimir JavaScript
gulp.task('uglify', function () {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));
});

// Tarefa para compilar SASS
gulp.task('sass', function () {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
});

// Tarefa para comprimir imagens
gulp.task('imagemin', async function () {
    // Importa dinamicamente o gulp-imagemin
    const imagemin = (await import('gulp-imagemin')).default;

    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
});

// Tarefa padrão que executa todas as tarefas em série
gulp.task('default', gulp.series('sass', 'imagemin', 'uglify'));
