import Marionette from 'backbone.marionette';
import {AnalyticsViewBehavior} from '@component/analytics';
import logger from '@component/common/src/util/Logger';
import template from '../../templates/partials/introduction.hbs';
import '../../scss/introduction.scss';

export default Marionette.ItemView.extend({
  el: '#introduction',
  template,
  behaviors: {
    analytics: {
      behaviorClass: AnalyticsViewBehavior
    }
  },
  initialize() {
    logger.log('intro view initialized');
  },
});
