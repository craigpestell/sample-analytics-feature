/**
 * Common node web server interface used for development and production.
 * This server is only used for development purposes, since this feature is consumed by a page.
 *
 * @see https://code.devops.fds.com/polaris/core/server/blob/master/README.md
 */
const Server = require('@core/server');
const _ = require('lodash');

const server = new Server({
  mock: true, // enable mocks in dev mode (@see server/mocks.js)
});

const { app } = server; // attach custom express middleware - http://expressjs.com/en/guide/using-middleware.html

if (!process.env.XAPI_HOST) {
  throw new Error('Missing required process.env.XAPI_HOST. Try "m server --env=./envconfigs/local/mcom/.env"');
}

app.get('/', (req, res) => {
  res.redirect('/introduction');
});

/**
 * Examples of using server.jsonProxy to make a request to an external API (i.e. xAPI), and store the results for SSR.
 * @see https://code.devops.fds.com/polaris/core/server/blob/master/README.md#serverjsonproxyoptions
 */
app.get('/benefits', server.jsonProxy({ host: process.env.XAPI_HOST, url: '/xapi/custom-benefits-endpoint', propPath: 'benefits' }));
app.get('/guide', server.jsonProxy({ host: process.env.XAPI_HOST, url: '/xapi/custom-guide-endpoint', propPath: 'guide' }));
app.get('/analytics', server.jsonProxy({ host: process.env.XAPI_HOST, url: '/xapi/custom-analytics-endpoint', propPath: 'analytics' }));

/**
 * Examples of using server.jsonProxy to make a request to an external API (i.e. xAPI), then respond with the JSON result.
 * @see https://code.devops.fds.com/polaris/core/server/blob/master/README.md#serverjsonproxyoptions
 */
app.get('/xapi/custom-navigation-endpoint', server.jsonProxy({ host: process.env.XAPI_HOST, completeRequest: true }));
app.get('/xapi/custom-benefits-endpoint', server.jsonProxy({ host: process.env.XAPI_HOST, completeRequest: true }));
app.get('/xapi/custom-guide-endpoint', server.jsonProxy({ host: process.env.XAPI_HOST, completeRequest: true }));
app.get('/xapi/custom-analytics-endpoint', server.jsonProxy({ host: process.env.XAPI_HOST, completeRequest: true }));

/**
 * An example of using server-side rendering for all routes.
 *
 * A single template is always rendered: src/templates/main.hbs. That template can do a "lookup" to determine which
 * partial to render, based on the route. For example, assume main.hbs has the following template HTML:
 *
 *     <div id="{{id}}">
 *         {{> (lookup . 'id') (lookup . id)}}
 *     </div>
 *
 * On the server side, req.locals.context defines the context that handlebars will use to compile the template.
 * Assuming the following context:
 *
 *     req.locals.context = { id: 'foo', partial: 'foo', foo: { someKey: 'some value' } };
 *
 * ... the lookup helper will resolve the template HTML to:
 *
 *     <div id="{{id}}">
 *         {{> foo foo}}
 *     </div>
 *
 * More on Handlebars built-in lookup helper is here: http://handlebarsjs.com/builtin_helpers.html
 *
 * When this template HTML is compiled, {{id}} will be replaced by req.locals.context.id, which is "foo".
 * Also {{> foo foo}} will look for a file named "foo.hbs" inside the src/templates/partials directory, and
 * render it with req.locals.context.foo
 *
 * Assuming src/templates/partials/foo.hbs has:
 *
 *     <p>This is {{someKey}}</p>
 *
 * ... the final output will become:
 *
 *     <div id="foo">
 *         <p>This is some value</p>
 *     </div>
 */
app.get('/:page', [
  (req, res, next) => {
    // DO NOT override anything in req.locals.context. Use _.defaults instead.
    _.defaults(req.locals.context, {
      id: req.params.page, // introduction, benefits, etc.
    });

    next();
  },

  server.jsonProxy({ host: process.env.XAPI_HOST, url: '/xapi/custom-navigation-endpoint', propPath: 'navigation' }),

  (req, res, next) => {
    const active = _.find(req.locals.context.navigation, { path: req.url });
    if (active) {
      active.selected = true;
    }

    next();
  }
]);

server.start();
