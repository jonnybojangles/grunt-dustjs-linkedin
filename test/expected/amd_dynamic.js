define(["dust", "dust-helpers"], function(dust, dustHelpers) {
  (function(){dust.register("fixtures/test",body_0);function body_0(chk,ctx){return chk.write("<!DOCTYPE HTML><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><title></title></head><body></body></html>");}return body_0;})();

  return {
    render: function(context, callback) {
      dust.render("fixtures/test", context, function(error, out) {
        callback(error, out);
      });
    },

    stream: function(context, callback) {
      dust.stream("fixtures/test", context, function(error, out) {
        callback(error, out);
      });
    }
  };
});