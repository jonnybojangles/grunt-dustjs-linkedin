define(['bluebird', 'dust-helper'], function(Promise, dustHelper) {
  return function(name) {
    var helper = dustHelper(name);

    Promise.promisifyAll(helper);

    return {
      render: function(context, callback) {
        if(callback || typeof context === 'function') {
          return helper.render(context, callback);
        }
        return helper.renderAsync(context);
      },

      renderSync: function(context) {
        return helper.renderSync(context);
      }
    };
  };
});