(function() {
  var InstagramOAuth;

  InstagramOAuth = (function() {

    function InstagramOAuth(parent) {
      this.parent = parent;
    }

    InstagramOAuth.prototype.authorization_url = function(params) {
      params['client_id'] = this.parent._config.client_id;
      params['redirect_uri'] = params['redirect_uri'] === void 0 || params['redirect_uri'] === null ? this.parent._config.redirect_uri : params['redirect_uri'];
      params['response_type'] = 'code';
      return "https://" + this.parent._options['host'] + "/oauth/authorize/?" + (this.parent._to_querystring(params));
    };

    InstagramOAuth.prototype.ask_for_access_token = function(params) {
      var parsed_query, token_params, url;
      url = require('url');
      parsed_query = url.parse(params['request'].url, true).query;
      if (parsed_query.error != null) {
        return this.parent._error("" + parsed_query.error + ": " + parsed_query.error_reason + ": " + parsed_query.error_description, parsed_query, 'handshake');
      } else if (parsed_query.code != null) {
        token_params = {
          complete: params['complete'],
          response: params['response'],
          method: "POST",
          path: "/oauth/access_token",
          post_data: {
            client_id: this.parent._config.client_id,
            client_secret: this.parent._config.client_secret,
            grant_type: 'authorization_code',
            redirect_uri: params['redirect_uri'] === void 0 || params['redirect_uri'] === null ? this.parent._config.redirect_uri : params['redirect_uri'],
            code: parsed_query.code
          }
        };
        this.parent._request(token_params);
        if (params['redirect'] != null) {
          params['response'].redirect(params['redirect']);
          return params['response'].end();
        }
      }
    };

    return InstagramOAuth;

  })();

  module.exports = InstagramOAuth;

}).call(this);
