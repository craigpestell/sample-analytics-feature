import Marionette from 'backbone.marionette';
import logger from '@component/common/src/util/Logger';
import template from '../../templates/partials/introduction.hbs';
import '../../scss/introduction.scss';

export default Marionette.ItemView.extend({
  el: '#introduction',
  template,
  initialize() {
    logger.log('intro view initialized');
  },
});
