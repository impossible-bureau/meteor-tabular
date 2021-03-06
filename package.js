/* global Package, Npm */

Package.describe({
  name: 'aldeed:tabular',
  summary: 'Datatables for large or small datasets in Meteor',
  version: '1.5.5',
  git: 'https://github.com/aldeed/meteor-tabular.git'
});

Npm.depends({
  datatables: '1.10.9'
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.4', 'METEOR@1.0']);
  api.use([
    'check',
    'underscore',
    'mongo',
    'blaze',
    'templating',
    'reactive-var',
    'tracker',
    'ecmascript'
  ]);

  // jquery is a weak reference in case you want to use a different package or
  // pull it in another way, but regardless you need to make sure it is loaded
  // before any tabular tables are rendered
  api.use(['jquery'], 'client', {weak: true});

  api.use(['meteorhacks:subs-manager@1.2.0'], ['client', 'server'], {weak: true});

  api.export('Tabular');
  api.export('Util', 'client');

  api.addFiles('common.js');
  api.addFiles('server/tabular.js', 'server');
  api.addFiles([
    '.npm/package/node_modules/datatables/media/js/jquery.dataTables.js',
    'client/lib/dataTables.bootstrap.js',
    'client/lib/dataTables.bootstrap.css',
    'client/tabular.html',
    'client/util.js',
    'client/tableRecords.js',
    'client/tableInit.js',
    'client/pubSelector.js',
    'client/tabular.js'
  ], 'client');

  // images
  if (typeof api.addAssets === 'function') {
    api.addAssets([
      'images/sort_asc.png',
      'images/sort_asc_disabled.png',
      'images/sort_both.png',
      'images/sort_desc.png',
      'images/sort_desc_disabled.png'
    ], 'client');
  } else {
    api.addFiles([
      'images/sort_asc.png',
      'images/sort_asc_disabled.png',
      'images/sort_both.png',
      'images/sort_desc.png',
      'images/sort_desc_disabled.png'
    ], 'client');
  }
});

// Follow this guide: https://github.com/awatson1978/meteor-cookbook/blob/master/cookbook/writing.unit.tests.md
Package.onTest(function(api) {
  // Tiny Test
  api.use(['aldeed:tabular', 'tinytest']);
  api.use([
    'anti:fake',
    'check',
    'underscore',
    'reactive-var',
    'tracker',
    'ecmascript'
  ]);

  // Load this first:
  api.addFiles('tests/reusedFunctions.js', 'client');
  api.addFiles([
    'tests/util.js',
    'tests/mongoDBQuery.js',
    'tests/utilIntegration.js'
  ], 'client' );
});
