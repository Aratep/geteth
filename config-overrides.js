// react-app-rewired, for some reason data URIs won't work

module.exports = {
    webpack: function(config, env) {
        config.module.rules[2].oneOf[0].options.limit = 1;
        return config;
    }
};
