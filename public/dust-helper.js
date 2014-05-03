define(['dust-full'], function(dust) {
  return function(name) {
    return {
      render: function(context, callback) {
        if(!callback && typeof context === 'function') {
          callback = context;
          context = {};
        }
        dust.render(name, context || {}, callback);
      },

      renderSync: function(context) {
        var output;
        dust.render(name, context || {}, function(error, html) {
          if(error) throw error;
          output = html;
        });
        return output;
      }
    };
  };
});