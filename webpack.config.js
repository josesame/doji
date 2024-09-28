const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js", // Your main React entry point
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Add support for image and SVG files
        type: "asset/resource", // Use Webpack's asset/resource for file handling
        generator: {
          filename: "assets/images/[name][hash][ext]", // Output to `assets/images/` directory
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname), // Add alias `@` to map to the `src` directory
    },
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react", // Automatically includes `React` in all files
    }),
  ],
  mode: "development", // You can switch to 'production' for production builds
  devtool: "inline-source-map", // or 'cheap-module-source-map' for better source maps
};
