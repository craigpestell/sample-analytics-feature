import Backbone from 'backbone';

export default ({ mount }) => Backbone.Router.extend({
  routes: {
    // lazy load each page's bundle when someone navigates to the page
    introduction: () => import('./js/views/introduction').then(module => mount('introduction', module.default)),
    benefits: () => import('./js/views/benefits').then(module => mount('benefits', module.default)),
    guide: () => import('./js/views/guide').then(module => mount('guide', module.default)),
    coverage: () => import('./js/views/coverage').then(module => mount('coverage', module.default)),
  },
});
