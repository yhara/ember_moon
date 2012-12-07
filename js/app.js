var App = Ember.Application.create();

var RADIUS = 250,
    CENTER = 300
var paper = Raphael("raphael-canvas", CENTER*2, CENTER*2);

App.sun = Ember.Object.create({
  x: CENTER,
  y: CENTER,
  circle: null,

  draw: function(){
    this.set('circle', paper.circle(this.get('x'), this.get('y'), 8)
                            .attr("fill", "#f00").attr("stroke", "#000"));
  }
});

App.earth = Ember.Object.create({
  sunXBinding: 'App.sun.x',
  sunYBinding: 'App.sun.y',
  rot: 0,
  circle: null,

  x: function(){
    return this.get('sunX') + RADIUS * Math.cos(this.get('rot'));
  }.property('sunX', 'rot'),

  y: function(){
    return this.get('sunY') + RADIUS * Math.sin(this.get('rot'));
  }.property('sunY', 'rot'),

  onMove: function(){
    this.get('circle').attr('cx', this.get('x'))
                      .attr('cy', this.get('y'));
  }.observes('rot'),

  draw: function(){
    this.set('circle', paper.circle(this.get('x'), this.get('y'), 5)
                            .attr("fill", "#00f").attr("stroke", "#000"));
  },
  move: function(){
    this.set('rot', this.get('rot') + 0.005);
  }
});

App.moon = Ember.Object.create({
  earthXBinding: 'App.earth.x',
  earthYBinding: 'App.earth.y',
  rot: 0,
  circle: null,

  x: function(){
    return this.get('earthX') + 10 * Math.cos(this.get('rot'));
  }.property('earthX', 'rot'),

  y: function(){
    return this.get('earthY') + 10 * Math.sin(this.get('rot'));
  }.property('earthY', 'rot'),

  onMove: function(){
    this.get('circle').attr('cx', this.get('x'))
                      .attr('cy', this.get('y'));
  }.observes('rot', 'earthX'),

  draw: function(){
    this.set('circle', paper.circle(this.get('x'), this.get('y'), 2)
                            .attr("fill", "#dd0").attr("stroke", "#000"));
  },
  move: function(){
    this.set('rot', this.get('rot') + 0.05);
  }
});

App.ready = function(){
  App.sun.draw();
  App.earth.draw();
  App.moon.draw();

  setInterval(function(){ App.earth.move(); }, 100);
  setInterval(function(){ App.moon.move(); }, 80);
};

//App.ApplicationController = Ember.Controller.extend();
//App.ApplicationView = Ember.View.extend({
//  templateName: 'application'
//});

//App.Router = Ember.Router.extend({
//  root: Ember.Route.extend({
//    index: Ember.Route.extend({
//      route: '/'
//    })
//  })
//})

//App.initialize();
