const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    return ({
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        devServer: {
            compress: true,
            static: false,
            client: {
                logging: "warn",
                overlay: {
                    errors: true,
                    warnings: false,
                },
                progress: true,
            },
            port: 3000, host: '0.0.0.0'
        },
        performance: { hints: false },
        devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,
        optimization: {
            minimize: argv.mode === 'production',
            minimizer: [new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: { drop_console: true },
                    output: { comments: false, beautify: false },
                },
            })],
        },
        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.js',
                '.css'
            ]
        },

        plugins: [
            new CopyPlugin({
                patterns: [{ from: 'static/' }],
            }),

            // Make an index.html from the template
            // new HtmlWebpackPlugin({
            //     template: 'index.html',
            //     hash: true,
            //     minify: false
            // }),
            new HtmlWebpackPlugin({
                template: 'index.html',
                hash: true,
                minify: false
            }),
            new webpack.ProvidePlugin({
                PIXI: 'pixi.js'
            })
        ]
    });
}