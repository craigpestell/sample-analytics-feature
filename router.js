import Backbone from 'backbone';

export default (app) => {
  const update = (route) => {
    const triggerViewUpdate = (View) => {
      app.channel.trigger('sample-analytics-feature:update:view', route, View);
    };

    return triggerViewUpdate;
  };

  return Backbone.Router.extend({
    routes: {
      // lazy load each page's bundle when someone navigates to the page
      introduction: () => import('./src/js/views/introduction').then(View => update('introduction')(View.default)),
      benefits: () => import('./src/js/views/benefits').then(View => update('benefits')(View.default)),
      guide: () => import('./src/js/views/guide').then(View => update('guide')(View.default)),
      coverage: () => import('./src/js/views/coverage').then(View => update('coverage')(View.default)),
    },
  });
};
