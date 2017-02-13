export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('aurelia-polymer')
    .plugin('au-select-custom-attribute');

  aurelia.start().then(a => a.setRoot());
}
