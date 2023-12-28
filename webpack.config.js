const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {
    mode = "production";
}

console.log("mode", mode);

module.exports = {
    mode: mode,
    entry: {
        app: "./src/js/app.js",
        // fancybox: "./src/js/fancybox.js",
    },
    ignoreWarnings: [
        {
            module: /module2\.js\?[34]/,
        },
        {
            module: /[13]/,
            message: /homepage/,
        },
        /warning from compiler/,
        (warning) => true,
    ],
    devServer: {
        port: 9000,
        compress: true,
        static: ["dist"],
    },
    output: {
        filename: "[name].js",
        assetModuleFilename: "assets/images/[name][ext][query]",
        clean: true,
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/index.html",
            inject: "body",
            chunks: ["app"],
            filename: "index.html",
            minify: {collapseWhitespace: false}
        }),
        // new HtmlWebpackPlugin({
        //     template: "./src/pages/index/index.html",
        //     inject: "body",
        //     chunks: ["app"],
        //     filename: "index.html",
        // }),
        // new HtmlWebpackPlugin({
        //     template: "./src/pages/error/error.html",
        //     inject: "body",
        //     chunks: ["app", "sliders", "fancybox"],
        //     filename: "error.html",
        // }),
        new MiniCssExtractPlugin({
            filename: "app.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: {
                        collapseWhitespace: false,
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    mode === "development"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(gif|svg|png|jpg|jpeg|mp4)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|)$/i,
                type: "asset/resource",
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
