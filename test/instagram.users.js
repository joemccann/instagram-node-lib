(function() {
  /*
  Test Setup
  */  var Init, Instagram, app, assert, completed, should, test, to_do;
  console.log("\nInstagram API Node.js Lib Tests :: Users");
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
    'users#info for id#291024': function() {
      return test.helper('users#info for id#291024', Instagram, 'users', 'info', {
        user_id: 291024
      }, function(data) {
        data.should.have.property('id', '291024');
        test.output("data had the property 'id' equal to '291024'");
        data.should.have.property('profile_picture');
        test.output("data had the property 'profile_picture'", data.profile_picture);
        return app.finish_test();
      });
    },
    'users#self for mckelvey': function() {
      return test.helper('users#self for mckelvey', Instagram, 'users', 'self', {}, function(data) {
        data.length.should.be.above(0);
        test.output("data had length greater than 0", data.length);
        data[0].should.have.property('id');
        test.output("data[0] had the property 'id'", data[0].id);
        data[0].should.have.property('user');
        test.output("data[0] had the property 'user'", data[0].user);
        return app.finish_test();
      });
    },
    'users#liked_by_self for mckelvey': function() {
      return test.helper('users#liked_by_self for mckelvey', Instagram, 'users', 'liked_by_self', {}, function(data) {
        data.length.should.be.above(0);
        test.output("data had length greater than 0", data.length);
        data[0].should.have.property('id');
        test.output("data[0] had the property 'id'", data[0].id);
        data[0].should.have.property('user');
        test.output("data[0] had the property 'user'", data[0].user);
        return app.finish_test();
      });
    },
    'users#liked_by_self for mckelvey with count of 3 and max_like_id': function() {
      return test.helper('users#liked_by_self for mckelvey with count of 3', Instagram, 'users', 'liked_by_self', {
        count: 3
      }, function(data, pagination) {
        data.length.should.equal(3);
        test.output("data had length equal to 3");
        pagination.next_url.should.include.string('count=3');
        test.output("pagination next_url included count of 3", pagination.next_url);
        pagination.should.have.property('next_max_like_id');
        test.output("pagination had the property 'next_max_like_id'", pagination.next_max_like_id);
        return test.helper("users#liked_by_self for mckelvey with max_like_id of " + pagination.next_max_like_id, Instagram, 'users', 'liked_by_self', {
          max_like_id: pagination.next_max_like_id
        }, function(data, pagination) {
          data.length.should.be.above(0);
          test.output("data had length greater than 0", data.length);
          return app.finish_test();
        });
      });
    },
    'users#recent for mckelvey': function() {
      return test.helper('users#recent for mckelvey', Instagram, 'users', 'recent', {
        user_id: 291024
      }, function(data) {
        data.length.should.be.above(0);
        data[0].should.have.property('id');
        data[0]['user'].should.have.property('username', 'mckelvey');
        return app.finish_test();
      });
    },
    'users#recent for mckelvey with count 60': function() {
      return test.helper('users#recent for mckelvey with count 60', Instagram, 'users', 'recent', {
        user_id: 291024,
        count: 60
      }, function(data) {
        data.length.should.equal(60);
        test.output("data had length equal to 60", data.length);
        return app.finish_test();
      });
    },
    'users#search for mckelvey': function() {
      return test.helper('users#search for mckelvey', Instagram, 'users', 'search', {
        q: 'mckelvey'
      }, function(data) {
        data.length.should.be.above(0);
        test.output("data had length greater than 0", data.length);
        data[0].should.have.property('username', 'mckelvey');
        test.output("data had the property 'username' equal to 'mckelvey'");
        data[0].should.have.property('id', '291024');
        test.output("data had the property 'id' equal to '291024'");
        return app.finish_test();
      });
    },
    'users#search for i with count': function() {
      return test.helper('users#search for i with count', Instagram, 'users', 'search', {
        q: 'i',
        count: 50
      }, function(data) {
        data.length.should.equal(50);
        test.output("data had length equal to 50", data.length);
        return app.finish_test();
      });
    },
    'users#follows id#291024': function() {
      return test.helper('users#follows id#291024', Instagram, 'users', 'follows', {
        user_id: 291024
      }, function(data, pagination) {
        data.length.should.be.above(0);
        data.length.should.be.below(51);
        return app.finish_test();
      });
    },
    'users#follows id#291024 with count 50': function() {
      return test.helper('users#follows id#291024 with count 50', Instagram, 'users', 'follows', {
        user_id: 291024,
        count: 50
      }, function(data, pagination) {
        data.length.should.equal(50);
        test.output("data had length equal to 50", data.length);
        return app.finish_test();
      });
    },
    'users#followed_by id#291024': function() {
      return test.helper('users#followed_by id#291024', Instagram, 'users', 'followed_by', {
        user_id: 291024
      }, function(data, pagination) {
        data.length.should.be.above(0);
        test.output("data had length greater than 0");
        data.length.should.be.below(51);
        test.output("data had length less than 51", data.length);
        return app.finish_test();
      });
    },
    'users#followed_by id#291024 with count 50': function() {
      return test.helper('users#followed_by id#291024 with count 50', Instagram, 'users', 'followed_by', {
        user_id: 291024,
        count: 50
      }, function(data, pagination) {
        data.length.should.equal(50);
        test.output("data had length equal to 50", data.length);
        return app.finish_test();
      });
    },
    'users#requested_by id#291024': function() {
      return test.helper('users#requested_by id#291024', Instagram, 'users', 'requested_by', {
        user_id: 291024
      }, function(data, pagination) {
        data.should.have.property('length');
        test.output("data had the property 'length'", data.length);
        return app.finish_test();
      });
    },
    'users#relationship with id#291024': function() {
      return test.helper('users#relationship with id#291024', Instagram, 'users', 'relationship', {
        user_id: 291024
      }, function(data, pagination) {
        data.should.have.property('outgoing_status');
        test.output("data had the property 'outgoing_status'", data.outgoing_status);
        data.should.have.property('incoming_status');
        test.output("data had the property 'incoming_status'", data.incoming_status);
        return app.finish_test();
      });
    },
    'users#unfollow id#291024': function() {
      return test.helper('users#unfollow id#291024', Instagram, 'users', 'unfollow', {
        user_id: 291024
      }, function(data, pagination) {
        data.should.have.property('outgoing_status', 'none');
        test.output("data had the property 'outgoing_status' equal to 'none'", data);
        return test.helper('users#block id#291024', Instagram, 'users', 'block', {
          user_id: 291024
        }, function(data, pagination) {
          data.should.have.property('incoming_status', 'blocked_by_you');
          test.output("data had the property 'incoming_status' equal to 'blocked_by_you'", data);
          return test.helper('users#unblock id#291024', Instagram, 'users', 'unblock', {
            user_id: 291024
          }, function(data, pagination) {
            data.should.have.property('incoming_status', 'none');
            test.output("data had the property 'incoming_status' equal to 'none'", data);
            return test.helper('users#ignore id#291024', Instagram, 'users', 'ignore', {
              user_id: 291024
            }, function(data, pagination) {
              data.should.have.property('incoming_status', 'none');
              test.output("data had the property 'incoming_status' equal to 'none'", data);
              return test.helper('users#follow id#291024', Instagram, 'users', 'follow', {
                user_id: 291024
              }, function(data, pagination) {
                data.should.have.property('outgoing_status', 'follows');
                test.output("data had the property 'outgoing_status' equal to 'follows'", data);
                return app.finish_test();
              });
            });
          });
        });
      });
    }
  };
  /*
  for me, returns 9 regardless, requesting with count seems to have no impact � time based only now?
  
    'users#self for mckelvey with count 200': ->
      test.helper 'users#self for mckelvey with count 200', Instagram, 'users', 'self', { count: 200 }, (data) ->
        data.length.should.equal 200
        test.output "data had length equal to 200", data.length
        app.finish_test()
  */
  app.start_tests(module.exports);
}).call(this);
