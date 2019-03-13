import Backbone from 'backbone';
import store from '@core/lib/store';

const guide = store.get('guide'); // check for initial state in the shared data store set by server

export default Backbone.Collection.extend({
  url: '/xapi/custom-guide-endpoint',
  initialize() {
    if (guide) {
      this.set(guide); // populate collection with initial state set by server
    }
  },
});
