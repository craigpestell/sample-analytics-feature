import Marionette from 'backbone.marionette';
import logger from '@component/common/src/util/Logger';
import template from '../../templates/partials/coverage.hbs';
import '../../scss/coverage.scss';

export default Marionette.ItemView.extend({
  el: '#coverage',
  template,
  initialize() {
    logger.log('coverage view initialized');
  },
});
