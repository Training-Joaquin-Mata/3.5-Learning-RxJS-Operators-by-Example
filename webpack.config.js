module.exports={
    entry: './src/app.ts',
    // entry: './src/buffering.ts',
    // entry: './src/errorHandling.ts',
    // entry: './src/filteringToMultipleResults.ts',
    // entry: './src/filteringToOneResult.ts',
    // entry: './src/groupingObservables.ts',
    // entry: './src/multicasting.ts',
    // entry: './src/observableTransformation.ts',
    // entry: './src/timeDurationAndScheduled.ts',
    // entry: './src/utilities.ts',
    // entry: './src/valueTransformation.ts',
    output:{
        filename: 'app.js',
        path: __dirname+ './dist'
    },

    resolve:{
        extensions:['.ts', '.js']
    },

    module:{
        rules:[
            {test:/\.ts$/, use:'awesome-typescript-loader'}
        ]
    },

    devServer:{
        port: 3000,
    },
};