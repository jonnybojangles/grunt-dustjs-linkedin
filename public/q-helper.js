define(['q', 'dust-helper'], function(Q, dustHelper) {
  return function(name) {
    var helper = dustHelper(name);

    helper.renderAsync = Q.nfbind(helper.render);
    helper.streamAsync = Q.nfbind(helper.stream);

    return {
      render: function(context, callback) {
        if(callback || typeof context === 'function') {
          return helper.render(context, callback);
        }
        return helper.renderAsync(context);
      },

      renderSync: function(context) {
        return helper.renderSync(context);
      },

      stream: function(context, callback) {
        if(callback || typeof context === 'function') {
          return helper.stream(context, callback);
        }
        return helper.streamAsync(context);
      },

      streamSync: function(context) {
        return helper.streamSync(context);
      }
    };
  };
});