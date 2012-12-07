var App = Ember.Application.create();

var RADIUS = 250,
    CENTER = 300
var paper = Raphael(10, 10, CENTER*2, CENTER*2);

App.sun = Ember.Object.create({
  x: CENTER,
  y: CENTER,
  circle: null,

  draw: function(){
    this.set('circle', paper.circle(this.get('x'), this.get('y'), 8)
                            .attr("fill", "#f00").attr("stroke", "#f00"));
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
                            .attr("fill", "#00f").attr("stroke", "#00f"));
  },
  move: function(){
    this.set('rot', this.get('rot') + 0.005);
  }
});

//App.moon = Ember.Object.create({
//  earthRotBinding: 'App.earth.rot'
//});

App.ready = function(){
  App.sun.draw();
  App.earth.draw();

  setInterval(function(){ App.earth.move(); }, 100);
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
