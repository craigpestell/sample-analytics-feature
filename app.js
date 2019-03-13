/**
 * Entry point for running the application.
 * Must export an object with a start() method.
 *
 * Since this is a page, the entry point is used as the main orchestrator for the production-facing application.
 *
 * In order for HMR to work properly, app.start() should be idemptoent. This means start() can be called any number of
 * times without any negative side-effects. Any state should be cleaned up/destroyed each time start() is called.
 *
 * @see https://webpack.js.org/concepts/hot-module-replacement/ for more info about HMR
 * @see https://code.devops.fds.com/polaris/core/build/blob/master/lib/entry.js for core HMR runtime implementation
 */
import Marionette from 'backbone.marionette';
import logger from '@component/common/src/util/Logger';
import '@core/vendor/radio.shim'; // shim app.channel
import Feature from './src/sample-analytics-feature';

const app = new Marionette.Application();

app.on('start', () => {
  logger.log('app started');
  const feature = new Feature();

  feature.on('something:done', (result) => {
    logger.log('the "something:done" event was triggered. result is', result);
  });

  feature.doSomething();
});

export default app;