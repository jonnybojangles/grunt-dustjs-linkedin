var dust = require("dust");
var dustHelpers = require("dust-helpers");

(function(){dust.register("tmp/commonjs/fixtures/test",body_0);function body_0(chk,ctx){return chk.write("<!DOCTYPE HTML><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><title></title></head><body></body></html>");}return body_0;})();

module.exports = {
    render: function(context) {
      if(!context) {
        context = {};
      }

      return Q.nfcall(dust.render, "tmp/commonjs/fixtures/test", context);
    },

    renderSync: function(context) {
      if(!context) {
        context = {};
      }

      var output;

      dust.render("tmp/commonjs/fixtures/test", context, function(error, html) {
        if(error) {
          throw error;
        }

        output = html;
      });

      return output;
    },

    stream: function(context, callback) {
      if(!context) {
        context = {};
      }

      return Q.nfcall(dust.stream, "tmp/commonjs/fixtures/test", context);
    }
  };