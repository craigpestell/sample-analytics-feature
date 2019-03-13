import $ from 'jquery';
import Marionette from 'backbone.marionette';
import '../../scss/color-changer.scss';

export default Marionette.ItemView.extend({
  el: '#color-changer',
  events: {
    'click .color': 'changeColor',
  },
  changeColor(e) {
    const color = $(e.currentTarget).attr('class').split(' ')[1];
    this.trigger('change:color', color);
  },
});
