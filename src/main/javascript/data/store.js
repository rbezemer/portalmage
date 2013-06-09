/**
 * @author Richard Bezemer
 */
define(['utils/utils',
        'ember', 
        'application',
        'ember_data' 
    ],
  function (Utils, Ember, SLWorkspaces, DS) {
  SLWorkspaces.store = DS.Store.create({
    revision: 12,
    adapter: DS.FixtureAdapter.create()
  });
});