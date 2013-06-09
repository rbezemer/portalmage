define(['utils/utils',
        'ember', 
        'application',
        'ember_data',
        'data/store'
    ],
  function (Utils, Ember, SLWorkspaces, DS ) {
  

  SLWorkspaces.Participants = DS.Model.extend({
    firstName:DS.attr('string'),
    lastName:DS.attr('string'),
    role:DS.attr('string'),
    color:DS.attr('string'),
    online:DS.attr('boolean'),
    avatar:DS.attr('string'),
    fullName: function() {
      return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),
    colorStyle: function() {
      return 'color: '+ this.get('color')+';';
    }.property('color')
  });

  SLWorkspaces.Participants.FIXTURES = [
    {
      id:0,
      firstName:'Maester',
      lastName:'Luwin',
      role:'Teacher',
      color:'blue',
      online:true,
      avatar:'icon-beaker'
    },
    {
      id:1,
      firstName:'Rob',
      lastName:'Stark',
      role:'student',
      color:'red',
      online:true,
      avatar:'icon-user'
    },
    {
      id:1,
      firstName:'Rob',
      lastName:'Stark',
      role:'student',
      color:'red',
      online:true,
      avatar:'icon-user'
    },
    {
      id:1,
      firstName:'Rob',
      lastName:'Stark',
      role:'student',
      color:'red',
      online:true,
      avatar:'icon-user'
    },{
      id:2,
      firstName:'John',
      lastName:'Snow',
      role:'student',
      color:'green',
      online:true,
      avatar:'icon-user'
    },
    {
      id:3,
      firstName:'Sansa',
      lastName:'Stark',
      role:'student',
      color:'pink',
      online:true,
      avatar:'icon-user'
    },
    {
      id:4,
      firstName:'Arya',
      lastName:'Stark',
      role:'student',
      color:'purple',
      online:false,
      avatar:'icon-user'
    },
    {
      id:5,
      firstName:'Bran',
      lastName:'Stark',
      role:'student',
      color:'black',
      online:false,
      avatar:'icon-user'
    },
    {
      id:6,
      firstName:'Rickard',
      lastName:'Stark',
      role:'student',
      color:'orange',
      online:true,
      avatar:'icon-user'
    },
    {
      id:7,
      firstName:'Hodor',
      lastName:'Hodor',
      role:'student',
      color:'brown',
      online:true,
      avatar:'icon-user'
    }
  ];
  
  return SLWorkspaces.Participants;
});