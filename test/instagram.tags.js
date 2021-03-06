(function() {
  /*
  Test Setup
  */  var Init, Instagram, app, assert, completed, should, test, to_do;
  console.log("\nInstagram API Node.js Lib Tests :: Tags");
  Init = require('./initialize');
  Instagram = Init.Instagram;
  app = Init.app;
  assert = require('assert');
  should = require('should');
  test = require('./helpers');
  completed = 0;
  to_do = 0;
  /*
  Tests
  */
  module.exports = {
    'tags#info for blue': function() {
      return test.helper('tags#info for blue', Instagram, 'tags', 'info', {
        name: 'blue'
      }, function(data) {
        data.should.have.property('name', 'blue');
        test.output("data had the property 'name' equal to 'blue'");
        data.media_count.should.be.above(0);
        test.output("data had the property 'media_count' greater than zero", data.media_count);
        return app.finish_test();
      });
    },
    'tags#recent for blue': function() {
      return test.helper('tags#recent for blue', Instagram, 'tags', 'recent', {
        name: 'blue'
      }, function(data, pagination) {
        data.length.should.equal(20);
        test.output("data had length equal to 20");
        data[0].should.have.property('id');
        test.output("data[0] had the property 'id'", data[0]);
        pagination.should.have.property('next_url');
        test.output("pagination had the property 'next_url'", pagination.next_url);
        pagination.should.have.property('next_max_id');
        test.output("pagination had the property 'next_max_id'", pagination.next_max_id);
        pagination.should.have.property('next_min_id');
        test.output("pagination had the property 'next_min_id'", pagination.next_min_id);
        return app.finish_test();
      });
    },
    'tags#recent for blue with count of 50': function() {
      return test.helper('tags#recent for blue with count of 50', Instagram, 'tags', 'recent', {
        name: 'blue',
        count: 50
      }, function(data, pagination) {
        data.length.should.equal(50);
        test.output("data had length equal to 50");
        return app.finish_test();
      });
    },
    'tags#search for blue': function() {
      return test.helper('tags#search for blue', Instagram, 'tags', 'search', {
        q: 'blue'
      }, function(data) {
        data.length.should.be.above(0);
        test.output("data had length greater than 0", data.length);
        data[0].should.have.property('name', 'blue');
        test.output("data[0] had the property 'name' equal to 'blue'");
        data[0].media_count.should.be.above(0);
        test.output("data[0] had the property 'media_count' greater than zero", data[0].media_count);
        return app.finish_test();
      });
    },
    'tags#subscription for blue': function() {
      return test.helper("tags#subscriptions subscribe to 'blue'", Instagram, 'tags', 'subscribe', {
        object_id: 'blue'
      }, function(data) {
        var subscription_id;
        data.should.have.property('id');
        test.output("data had the property 'id'");
        data.id.should.be.above(0);
        test.output("data.id was greater than 0", data.id);
        data.should.have.property('type', 'subscription');
        test.output("data had the property 'type' equal to 'subscription'", data);
        subscription_id = data.id;
        return test.helper('tags#subscriptions list', Instagram, 'subscriptions', 'list', {}, function(data) {
          var found, i;
          data.length.should.be.above(0);
          test.output("data had length greater than 0", data.length);
          found = false;
          for (i in data) {
            if (data[i].id === subscription_id) {
              found = true;
            }
          }
          if (!found) {
            throw "subscription not found";
          }
          test.output("data had the subscription " + subscription_id);
          return test.helper("tags#subscriptions unsubscribe from 'blue'", Instagram, 'tags', 'unsubscribe', {
            id: subscription_id
          }, function(data) {
            if (data !== null) {
              throw "tag 'blue' unsubscribe failed";
            }
            test.output("data was null; we unsubscribed from the subscription " + subscription_id);
            return app.finish_test();
          });
        });
      });
    }
  };
  /*
  seems to max out at 49 rather than 100 (ruby api docs) otherwise works perfectly
  
    'tags#search for sex with count 200': ->
      test.helper 'tags#search for sex with count 200', Instagram, 'tags', 'search', { q: 'sex', count: 200 }, (data) ->
        data.length.should.equal 200
        test.output "data had length equal to 200", data.length
        app.finish_test()
  */
  app.start_tests(module.exports);
}).call(this);
