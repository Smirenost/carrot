import * as path from "path";
import ParcelBundler = require("parcel-bundler");

async function runBuild(options: ParcelBundler.ParcelOptions): Promise<void> {
    const entry: string = path.resolve(__dirname, 'index.js');
    const builder: ParcelBundler = new ParcelBundler(entry, options);
    await builder.bundle();
}

const browserProduction: ParcelBundler.ParcelOptions = {
    outDir: path.resolve(__dirname, '../dist/production'),
    outFile: path.resolve(__dirname, '../dist/production/index.browser.min.js'),
    minify: true,
    watch: false,
    target: 'browser',
    bundleNodeModules: true,
    global: 'carrot',
};
const browserDev: ParcelBundler.ParcelOptions = {
    outDir: path.resolve(__dirname, '../dist/dev'),
    outFile: path.resolve(__dirname, '../dist/dev/index.browser.js'),
    minify: false,
    watch: true,
    target: 'browser',
    bundleNodeModules: true,
    global: 'carrot',
};
const nodeProduction: ParcelBundler.ParcelOptions = {
    outDir: path.resolve(__dirname, '../dist/production'),
    outFile: path.resolve(__dirname, '../dist/production/index.min.js'),
    minify: true,
    watch: false,
    target: "node",
    global: 'carrot',
};
const nodeDev: ParcelBundler.ParcelOptions = {
    outDir: path.resolve(__dirname, '../dist/dev'),
    outFile: path.resolve(__dirname, '../dist/dev/index.js'),
    minify: false,
    watch: true,
    target: "node",
    global: 'carrot',
};
Promise.all([runBuild(browserProduction), runBuild(browserDev), runBuild(nodeProduction), runBuild(nodeDev)])
    .then(() => process.exit(0));