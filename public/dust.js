define(['module', 'text'], function(module, text) {
  var masterConfig = (module.config && module.config()) || {};

  return {
    load: function(name, req, onload, config) {
      if(config.isBuild || require.defined(name)) {
        req([name], onload);
        return;
      }
      var helperName = masterConfig.helper || false;
      var deps = ['dust-full'];
      var url = masterConfig.url = masterConfig.url || config.baseUrl;
      var ext = masterConfig.ext = masterConfig.ext || '.dust';
      var file = name;
      var resolve = masterConfig.resolve;
      var namer = masterConfig.name || function(tmplName) {
        if(tmplName.indexOf(config.baseUrl) === 0) return tmplName;
        return config.baseUrl + tmplName;
      };

      name = namer(name);

      if(typeof resolve === 'undefined') resolve = function(name) {
        return name;
      };
      if(file && file[0] !== '.') file = url + file;
      if(file.indexOf(ext, file.length - ext.length) === -1) file += ext;
      if(typeof helperName === 'string') deps.push(helperName + '-helper');

      text.get(req.toUrl(file), function(source) {
        if(resolve) {
          var rx = /\{>"([^"]+)"[^/]\/\}/g;
          var match;

          while((match = rx.exec(source)) !== null) {
            var baseUrl = config.baseUrl.split('/');
            baseUrl = baseUrl[baseUrl.length - 2] + '/';

            var dep = match[1].replace(baseUrl, '');
            if(deps.indexOf(dep) !== -1) continue;
            var resolved = resolve(dep);

            if(!resolved) continue;

            deps.push(module.id + '!' + resolved);
          }
        }

        req(deps, function(dust, helperFunc) {
          var helper = helperFunc || helperName || function() {};
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