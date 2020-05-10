let path = require('path');

module.exports = {
    mode: "development",
    entry: ["./src/index.tsx"],
    devtool: 'inline-source-map',
    context: __dirname,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {        
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
