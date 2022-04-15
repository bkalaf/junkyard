import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
// import webpackNodeExternals from 'webpack-node-externals';
import NodePolyfillWebpackPlugin from 'node-polyfill-webpack-plugin';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

console.log('running in: ' + mode)
module.exports = {
    entry: {
        index: {
            import: './src/index.tsx',
            dependOn: 'vendor'
        },
        vendor: ['react', 'react-dom', 'realm-web', 'react-router', 'react-router-dom', '@apollo/client', 'graphql']
    },
    target: 'web',
    mode,
    output: {
        path: [__dirname, 'public'].join('/'),
        filename: '[name]bundle.js',
        assetModuleFilename: '[hash][ext][query]'
    },
    plugins: [
        new NodePolyfillWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     React: 'react',
        //     ReactDOM: 'react-dom',
        //     Realm: 'realm-web'
        // }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Junk in the Trunk Inc - JITT'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
    optimization: mode === 'production' ? {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                test: /\.js(\?.*)?$/i
            })
        ]
    } : {},
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.html', '.json', '.css', '.jpg', '.svg', '.png', '.woff', '.webp', '.ttf', '.otf']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-import', 'tailwindcss', 'postcss-nesting', 'postcss-custom-properties', 'autoprefixer', 'postcss-preset-env']
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff2?|otf|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            },
            { test: /\.tsx?$/, use: 'ts-loader' }
        ]
    }
};
