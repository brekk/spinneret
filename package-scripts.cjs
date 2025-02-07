const sd = (script, description = ``) =>
  description ? { script, description } : { script }

const INPUT = `spinneret.js`

module.exports = {
  scripts: {
    //autotest: {
    //  ...sd('nps -c ./package-scripts.cjs autotest.rebuild test'),
    //  rebuild: sd(
    //    `drgen -i ${['./builder.js', './help.js'].join(
    //      ' '
    //    )} -o autotests --processor doctor-general-jest`,
    //    'use doctor-general to create tests for us!'
    //  ),
    //},
    lint: sd(`eslint --fix .`, `lint!`),
    test: {
      ...sd(`vitest --run --disable-console-intercept`, `test!`),
      ci: sd(`vitest --run`, `test for CI!`),
      watch: sd(`vitest --disable-console-intercept`, `test with watch-mode!`),
    },
    meta: {
      graph: `madge ${INPUT} --image graph.svg`,
    },
  },
}
