define(['module'], function(module) {
  var masterConfig = (module.config && module.config()) || {};

  return {
    load: function(name, req, onload, config) {
      if(config.isBuild || require.defined(name)) {
        req([name], onload);
        return;
      }
      var helperName = masterConfig.helper || false;
      var deps = ['text', 'dust-full'];
      if(typeof helperName === 'string') deps.push(helperName + '-helper');
      req(deps, function(text, dust, helperFunc) {
        var helper = helperFunc || helperName || function() {};
        var url = masterConfig.url = masterConfig.url || config.baseUrl;
        var ext = masterConfig.ext = masterConfig.ext || '.dust';
        var file = name;
        if(file && file[0] !== '.') file = url + file;
        if(file.indexOf(ext, file.length - ext.length) === -1) file += ext;
        text.get(req.toUrl(file), function(source) {
          dust.loadSource(dust.compile(source, name));
          onload(helper(name));
        });
      });
    },

    write: function (pluginName, moduleName, write, config) {
      var contents =
        'define(["' + moduleName + '"], function(value) {' +
          'return value;' +
        '});';
      write.asModule(pluginName + '!' + moduleName, contents);
    }
  };
});