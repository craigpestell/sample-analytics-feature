import Backbone from 'backbone';
import store from '@core/lib/store';

const benefits = store.get('benefits'); // check for initial state in the shared data store set by server

export default Backbone.Collection.extend({
  url: '/xapi/custom-benefits-endpoint',
  initialize() {
    if (benefits) {
      this.set(benefits); // populate collection with initial state set by server
    }
  },
});
