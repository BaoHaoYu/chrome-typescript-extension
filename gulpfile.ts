import gulp from 'gulp'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import ts from 'gulp-typescript'
import tsconfig from './tsconfig.app.json'
const tsProject = ts.createProject('./tsconfig.app.json', { noImplicitAny: true })

class Tsc {
  public files: string[]
  constructor(path: any) {
    this.files = path
  }
  public run = () => {
    return gulp
      .src(this.files, { base: './src' })
      .pipe(sourcemaps.init())
      .pipe(tsProject())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(tsconfig.compilerOptions.outDir))
  }
}

const files = ['src/*.ts', 'src/**/*.ts']

const tsc = new Tsc(files)

gulp.task('default', () => {
  tsc.run()
})

const w = gulp.watch(files)

w.on('change', (file) => {
  tsc.files = [file]
  gulp.series('default')(() => '')
})
