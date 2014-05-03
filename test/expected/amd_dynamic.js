define(["dust", "dust-helpers"], function(dust, dustHelpers) {
  (function(){dust.register("fixtures/test",body_0);function body_0(chk,ctx){return chk.write("<!DOCTYPE HTML><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><title></title></head><body></body></html>");}return body_0;})();

  return {
  render: function(context, callback) {
    if(!callback && typeof context === 'function') {
      callback = context;
      context = {};
    }
    dust.render("fixtures/test", context || {}, callback);
  },

  renderSync: function(context) {
    var output;
    dust.render("fixtures/test", context || {}, function(error, html) {
      if(error) throw error;
      output = html;
    });
    return output;
  }
};
});