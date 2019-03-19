import Marionette from 'backbone.marionette';
import _ from 'underscore';
import logger from '@component/common/src/util/Logger';
import SampleAnalyticsComponent from '@component/sample-analytics-component';
import Analytics from '../collections/analytics';
import {AnalyticsViewBehavior} from '@component/analytics';
import template from '../../templates/partials/analytics.hbs';
import '../../scss/analytics.scss';

export default Marionette.LayoutView.extend({
  el: '#analytics',
  template,
  behaviors: {
    analytics: {
        behaviorClass: AnalyticsViewBehavior
    }
  },
  regions: {
    sampleComponent: ".sample-component-section",
    content: '#content'
  },
  collection: new Analytics(),
  collectionEvents: {
    sync: 'render', // re-render each time after successful change from server
  },
  ui: {
    sampleComponent: '.sample-component',
    sampleComponentSection: '.sample-component-section'
  },

  events: {
    // 'click @ui.sampleComponent': 'onClickBuyButton'
  },

  regions: {
    sampleComponentSection: '@ui.sampleComponentSection'
  },

  onShow: function() {
    this.getRegion('sampleComponentSection').show(new SampleComponent('.sample-component'));
  },
  initialize() {
    // only fetch if initial state hasn't already populated collection items
    if (_.isEmpty(this.collection.models)) {
      this.collection.fetch();
    }

    console.log('SampleAnaltyicsComponent:', SampleAnalyticsComponent);

    logger.log('analytics view initialized');
  },
});
