import _ from 'underscore';
import logger from '@component/common/src/util/Logger';
import Marionette from 'backbone.marionette';
import Guide from '../collections/guide';
import template from '../../templates/partials/guide.hbs';
import '../../scss/guide.scss';

export default Marionette.ItemView.extend({
  el: '#guide',
  template,
  collection: new Guide(),
  collectionEvents: {
    sync: 'render', // re-render each time after successful change from server
  },
  initialize() {
    // only fetch if initial state hasn't already populated collection items
    if (_.isEmpty(this.collection.models)) {
      this.collection.fetch();
    }

    logger.log('guide view initialized');
  },
});
