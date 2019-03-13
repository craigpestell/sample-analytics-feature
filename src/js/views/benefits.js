import Marionette from 'backbone.marionette';
import _ from 'underscore';
import logger from '@component/common/src/util/Logger';
import Benefits from '../collections/benefits';
import template from '../../templates/partials/benefits.hbs';
import '../../scss/benefits.scss';

export default Marionette.ItemView.extend({
  el: '#benefits',
  template,
  collection: new Benefits(),
  collectionEvents: {
    sync: 'render', // re-render each time after successful change from server
  },
  initialize() {
    // only fetch if initial state hasn't already populated collection items
    if (_.isEmpty(this.collection.models)) {
      this.collection.fetch();
    }

    logger.log('benefits view initialized');
  },
});
