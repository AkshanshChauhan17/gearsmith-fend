const path = require('path');

module.exports = {
    // Other webpack configurations...

    module: {
        rules: [
            // Other rules...

            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images', // Output directory for optimized images
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // Optimize PNG images
                            optipng: {
                                enabled: false,
                            },
                            // Optimize GIF images
                            gifsicle: {
                                interlaced: false,
                            },
                            // Optimize SVG images
                            svgo: {
                                removeViewBox: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
};