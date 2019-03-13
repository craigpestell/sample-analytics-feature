import Backbone from 'backbone';
import store from '@core/lib/store';

const navigation = store.get('navigation'); // check for initial state in the shared data store set by server

export default Backbone.Collection.extend({
  url: '/xapi/custom-navigation-endpoint',
  initialize() {
    if (navigation) {
      this.set(navigation); // populate collection with initial state set by server
    }
  },
});
