module.exports = {
  '/xapi/custom-navigation-endpoint': [
    { route: 'introduction', path: '/introduction', label: 'Introduction' },
    { route: 'benefits', path: '/benefits', label: 'Benefits' },
    { route: 'guide', path: '/guide', label: 'Guide' },
    { route: 'coverage', path: '/coverage', label: 'Coverage' },
    { route: 'analytics', path: '/analytics', label: 'Analytics' },
  ],
  '/xapi/custom-benefits-endpoint': [
    {
      title: 'General',
      list: [
        'No need for grunt/gulp scripts, webpack handles via npm script aliases',
        "Built-in karma/jasmine, 'npm run test'",
        'Built-in Istanbul coverage reports',
        'Built-in bundlling using webpack 2.x',
        'ES6 support using babel out of the box',
      ],
    },
    {
      title: 'Templating with Handlebars',
      list: [
        'No longer need to manaually register partials and/or helpers',
        'Isomorphic, templates, partials, helpers shared server and client side',
      ],
    },
    {
      title: 'Backbone/Marionette dependencies scaffolded with every new project',
      list: [
        'Promote development in isolation',
        'Each feature individually version for better maitenance and support',
        'Loosely coupled application architecture',
        'No script aliases(require.config)',
        'No longer need to manage optimization config files(rjsbo/)',
        'Page level architecture',
      ],
    },
    {
      title: 'Modular CSS',
      list: [
        'scss files can now be required at the javascript module level',
        'full support for modular css using scss',
        'full support for postcss functionality and features',
      ],
    },
  ],
  '/xapi/custom-guide-endpoint': [
    {
      title: 'Install required software',
      code: [
        {
          comments: '<a href="https://nodejs.org/en/">Download and install 5.x version of nodejs</a>',
        },
      ],
    },
    {
      title: 'Configure npm to use our interal npm registry',
      code: [
        {
          cmd: '_auth=ZGVwbG95ZXI6QVA0bnNQRVIzQ0JCcXJqRlVBeURiZnJibmRL<br>always-auth=true<br>email=macys.com_SF_DevOps@macys.com<br>@core:registry=http://ci-artifacts.devops.fds.com/artifactory/api/npm/macys-npm-private/<br>@page:registry=http://ci-artifacts.devops.fds.com/artifactory/api/npm/macys-npm-private/<br>@feature:registry=http://ci-artifacts.devops.fds.com/artifactory/api/npm/macys-npm-private/<br>@example:registry=http://ci-artifacts.devops.fds.com/artifactory/api/npm/macys-npm-private/<br>registry=http://registry.npmjs.org/<br>prefix=~/.npm-global',
          comments: 'Open or create the file \'~/.npmrc\' in your home directory and paste the following',
        },
      ],
    },
    {
      title: 'Verify it\'s working',
      code: [
        {
          image: '/feature/sample-analytics-feature/latest/images/verify-working.jpg',
          comments: 'In a new terminal window type \'npm view @feature/header\'. You should see similar output.',
        },
      ],
    },
    {
      title: 'Install global libraries',
      code: [
        {
          cmd: 'npm install -g yo',
          comments: 'yeoman scaffolding framework',
        },
        {
          cmd: 'npm install -g @core/generator-macys',
          comments: 'macys specific yeoman generator',
        },
      ],
    },
  ],
  '/xapi/custom-analytics-endpoint': [
    {
      title: 'Overview',
      list: [
        'We need to record user events across all of our web domains.  We have used Coremetrics, and are currently transitioning to Adobe Analytics. These services provide a common end-point to send user event data to, as well as a UI to preset the data in a format we can use to guide out decision making process when choosing which features we want to add, change, or remove, tmprove the customer\'s experience.',
      ],
    },
    {
      title: 'Opportunities this work will seize',
      list:[
        'Analytics vendor library abstraction',
        'Asynchronous (non-blocking) & memoized fetching of data sent to analytics',
        'Can\'t see the forest through the trees',
        'Identify common functionality, refactor into reusable components:',
        ' - reduce fetching of data passed to event actions down to common functions that can be reused across applications',
        'Centralize configuration - aggregate all analytics configurations for an application so we can use the entire dataset for easier documentation, debugging & analysis of event tracking implementations per application.',
        'Decrease effort to add & modify event tracking - with reduced duplication of logic to fetch data, and the aggregation of tracking configuration per application, we can provide tools to attach event listeners to an application at the application-level (in one place), allowing us to "bootstrap" an application with avalytics event listeners.  <br/>e.g.:<br/> import Analytics from \'@component/analytics\'; // importing the Analytics module will automatically attach some stardard event listeners to report user acctions. <br/>import {{pbulishAnalyticsConfig} from \'@component/analytics\' // This is a utility function we implement in each component or feature that needs analytics event tracking.  The Analytis module acts on the config passed in publishAnalyticsConfig by attaching any tracking events specified on the DOM.',
        'Decrease the rate of defects, which is a multi-pronged approach:',
        'Manage code complexity and become better custodians of our cddebase managing the requirents, complexity & expectations of our event tracking code.  By providing a pre-defined list of events we report, stakeholders can be provided a concise list of events we provide tracking abilities for "out of the box".  Similar to https://segment.com/docs/spec/ecommerce/v2/.  This will give us the added benefit of aligning our data layer industry-standard tools. If we decide to move towards an industry-standard approach, we will already have much of the work done.',
        'automated test generation - we can write unit tests using this module and against any configurations we wish.',
        'automated documentation - with the publication of all event configurations to a common place (within the analytics module), we can construct a complete dataset of all events being tracked in an application.',
        'MAYBE: Remove coupling of analytics implementation and Tealium / dynamic tag manager',
      ]
    },
    {
      title: 'Analytics vendor library abstraction',
      list: [
        'The current state of Macy\'s analytics is... undesirable. We\re currently moving from one analytics platform to another, and attempting to address issues with the original implemention.',
        'There is an ongoing effort, at this time only on paper, to remove proprietary Coremetrics code throughout our applications. A missed opportunity of the Coremetrics analytics implementation was the abstraction of our Analytics service provider from the code implementation. Therefore we have "Coremetrics" literally written throughout our codebase. For our new Adobe implementation, our event tracking is implemented using Tealium with Adobe Analytics as a plugin.',
      ],
    },
    {
      title: 'Analytics module',
      list: [
        '@component/analytics',
        'publishAnalyticsConfig - pub/sub schema to aggregate analytics configuration  from all features & components on a page/application',
        'Analytics.page(page_name, data) - track page view',
        'Analytics.track((event_name, data)) - track custom event',
      ],
    },
    {
      title: 'Track user actions/events',
      list: [
        'Manually call Analytics.track()','Marionette views can implement a behavior to inherit pre-defined events'
        
      ],
    },
    {
      title: 'Marionette Analytics View Behavior',
      list: []

    },
  ],
};
