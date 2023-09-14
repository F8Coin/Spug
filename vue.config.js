const path = require("path");
function resolve(dir) {
    return path.join(__dirname,dir);
}

module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        open: true,
        host: "172.17.100.118",
        port: 8086,
        proxy: {
            '/api': {
                target: "http://192.168.1.254",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': "/"
                }
            },
            '/fileUrl': {
                target: 'http://192.168.1.1',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/fileUrl': ""
                }
            }
        }
	},
    productionSourceMap: false,
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                path.resolve(__dirname, 'src/assets/skin/color.less')
            ]
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src")
            }
        }
    }
}