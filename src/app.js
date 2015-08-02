import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Aurelia + Polymer';
    config.map([
      { route: ['','welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title:'Welcome' },
      { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }

  get currentRoute() {
    if (typeof this.router != 'undefined') {
        let active = this.router.navigation.filter(row => row.isActive);
        if (active.length > 0) {
          return active[0].name;
        }
    }
    return '';
  }
}
