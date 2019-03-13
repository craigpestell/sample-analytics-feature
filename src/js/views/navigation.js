import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Navigation from '../collections/navigation';
import template from '../../templates/partials/navigation.hbs';
import '../../scss/navigation.scss';

export default Marionette.ItemView.extend({
  el: '#navigation',
  template,
  collection: new Navigation(),
  collectionEvents: {
    sync: 'render', // re-render each time after successful change from server
  },
  initialize() {
    // only fetch if initial state hasn't already populated collection items
    if (_.isEmpty(this.collection.models)) {
      this.collection.fetch();
    }
  },
  setActive(route) {
    this.collection.findWhere({ selected: true }).set('selected', false);
    this.collection.findWhere({ route }).set('selected', true);
  },
});
