import $ from 'jquery';
import Backbone from 'backbone';
import EventEmitter from 'events';
import logger from '@component/common/src/util/Logger';
import ColorChangerView from './js/views/color-changer';
import NavigationView from './js/views/navigation';
import r from './router';
import './scss/sample-analytics-feature.scss';

export default class Feature extends EventEmitter {
  constructor() {
    super(); // calls EventEmitter's constructor

    this.$wrapper = $('#wrapper'); // outer wrapper that contains view $el id
    this.navigation = new NavigationView();
    this.colorChanger = new ColorChangerView();

    // Example of listening to child view and performing action on the feature
    this.colorChanger.on('change:color', (color) => {
      $('body')
        .removeClass('Crimson DarkOrange DarkGreen Tan CornSilk')
        .addClass(color);

      logger.log('color changed', color);
    });

    this.setupRouter();
  }

  doSomething() {
    // example of emitting an event that consumers can attach listeners to
    this.emit('something:done', 'foobar');
  }

  setupRouter() {
    Feature.teardownRouter(); // prevent events from getting re-attached if the feature is newed again

    const Router = r({
      mount: (route, View) => this.mount(route, View),
    });

    const router = new Router();

    $(document).on('click', 'a[href]:not([href^="#"])', (e) => {
      const route = e.currentTarget.pathname.substr(1);
      if (e.currentTarget.host === window.location.host && router.routes[route]) {
        e.preventDefault();
        router.navigate(e.currentTarget.pathname, { trigger: true });
      }
    });

    Backbone.history.start({ pushState: true, silent: false });
  }

  // router sets up global state. This undoes it
  static teardownRouter() {
    $(document).off('click', 'a[href]:not([href^="#"])');
    Backbone.history.stop();
  }

  /**
   * Called by the router when backbone history is triggered (i.e. Backbone.history.start(), router.navigate()).
   *
   * When Backbone.history.start() is called (by setupRouter()), this route handler is triggered for the matching route.
   *
   * In addition, router.navigate() triggers this same route handler whenever a click happens. This is due to the click
   * handler set up (also in setupRouter()).
   *
   * Because the entire DOM is rendered server-side, the behavior differs between the initial mount, and when navigating
   * client-side:
   *     - When routing client-side, the old view needs to be torn down
   *     - When routing client-side, the view container needs to bo replaced with the new $el id before instantiating
   *       the new view
   *     - When routing client-side, the navigation menu needs to be updated to reflect the active state
   *     - When routing client-side, the view needs to be rendered after instantiation with whatever initial state has
   *       been populated
   *     - For the initial mount, all of the above can be skipped. Simply instantiating the view will be sufficient
   * For these reasons, the `initialMount` flag exists to make the distinction clear.
   *
   * @see ./router.js
   */
  mount(route, View) {
    // flag to distinguish initial mount (history.start()) vs client-side routing (router.navigate()).
    const routingClientSide = this.currentView;

    if (routingClientSide) {
      // the old view needs to be torn down
      this.currentView.destroy();

      // the view container needs to bo replaced with the new $el id before instantiating the new view
      this.$wrapper.html(`<div id="${route}"</div>`);

      // the navigation menu needs to be updated to reflect the active state
      this.navigation.setActive(route);
      this.navigation.render();
    }

    /**
     * Instantiate the view, which will mount to the DOM at the matching $el id.
     *
     * The individual views/models/collections are responsible for populating their initial state, or fetching +
     * re-rendering if it doesn't exist.
     *
     * @see https://code.devops.fds.com/polaris/core/lib/tree/master/store/README.md
     */
    this.currentView = new View();

    if (routingClientSide) {
      // the view needs to be rendered after instantiation with whatever initial state has been populated
      this.currentView.render();
    }
  }
}
