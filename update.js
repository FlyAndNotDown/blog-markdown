/**
 * blog-markdown repo's README.md update script
 * @author John Kindem
 * @version v1.0
 */

// import modules
let fs = require('fs');

// config
const config = {
    // script debug mode
    debugMode: true,

    // README.md source file path
    sourcePath: './README.md',
    // index block start symbol, after the symbol is the index table(s)
    indexBlockStartSymbol: '# 📇目录'
};

/**
 * read string from source file
 * @returns {string} string in source file
 */
function readSource() {
    // read source and return result
    return fs.readFileSync(config.sourcePath);
}

/**
 * split description block of source
 * @param {string} source string in source file
 * @returns {string} description block of source string
 */
function getDescription(source) {
    // if not found the index block start symbol
    if (source.indexOf(config.indexBlockStartSymbol) === -1) {
        // return a empty string
        return '';
    }

    // return half whick before the index block start symbol
    return source.split(config.indexBlockStartSymbol)[0];
}

/**
 * main function
 */
(function() {
    // read source
    let source = readSource();

    // get description of source string
    let description = getDescription(source);

    // TODO finish it someday
})();
