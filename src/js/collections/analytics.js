import Backbone from 'backbone';
import store from '@core/lib/store';

const analytics = store.get('analytics'); // check for initial state in the shared data store set by server

export default Backbone.Collection.extend({
  url: '/xapi/custom-analytics-endpoint',
  initialize() {
    if (analytics) {
      this.set(analytics); // populate collection with initial state set by server
    }
  },
});
