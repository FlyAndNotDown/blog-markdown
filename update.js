/**
 * /update.js blog-markdown repo's README.md update script
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
    indexBlockStartSymbol: '# 📇 目录\n',

    // some regex
    regex: {
        year: /^[0-9]{4}$/,
        month: /^[0-9]{1,2}$/,
        postFile: /^.+\.md$/
    }
};

/**
 * read string from source file
 * @returns {Object} source object
 */
function readSource() {
    // read source and return result
    return {
        // all the string in the source
        all: fs.readFileSync(config.sourcePath).toString(),
        // description block of source
        description: '',
        // post structure list
        posts: []
    };
}

/**
 * split description block of source
 * @param {Object} source source object
 */
function getDescription(source) {
    // if not found the index block start symbol
    if (source.all.indexOf(config.indexBlockStartSymbol) === -1) {
        // return
        return;
    }

    // return half which before the index block start symbol
    source.description = source.all.split(config.indexBlockStartSymbol)[0];
}

/**
 * get some info from file name and return a object
 * @param {string} fileName file name
 * @returns {Object} info object
 */
function getInfoFromFileName(fileName) {
    // get the file name without file type
    let newFileName = fileName.replace('.md', '');

    // split the file name with ' '
    let slices = newFileName.split(' ');

    // get the date and the true name
    let date = '';
    let name = '';
    let count = 0;
    for (let i = 0; i < slices.length; i++) {
        if (i === 0) {
            date += slices[i];
        } else {
            name += ++count === 0 ? slices[i] : slices[i] + ' ';
        }
    }

    // return the object
    return {
        date: date,
        name: name
    }
}

/**
 * read post file to the structure list
 * @param {Object} source source object
 */
function readPosts(source) {
    // at first, read all the objects in root path
    let rootPathObjects = fs.readdirSync('.');

    // for each root path object, do something
    for (let i = 0; i < rootPathObjects.length; i++) {
        // judge if it is a year dir
        if (
            fs.statSync(`./${rootPathObjects[i]}`).isDirectory() &&
            rootPathObjects[i].match(config.regex.year)
        ) {
            // if it is, ready a object
            let yearObject = {
                year: rootPathObjects[i],
                posts: []
            };

            // read all the year path objects
            let yearPathObjects = fs.readdirSync(`./${rootPathObjects[i]}`);

            // for each year path object, do something
            for (let j = 0; j < yearPathObjects.length; j++) {
                // judge if it is a month dir
                if (
                    fs.statSync(`./${rootPathObjects[i]}/${yearPathObjects[j]}`).isDirectory() &&
                    yearPathObjects[j].match(config.regex.month)
                ) {
                    // if it is, ready a object
                    let monthObject = {
                        month: yearPathObjects[j],
                        posts: []
                    };

                    // read all the month path objects
                    let monthPathObjects = fs.readdirSync(`./${rootPathObjects[i]}/${yearPathObjects[j]}`);

                    // for each month path object, do something
                    for (let k = 0; k < monthPathObjects.length; k++) {
                        // judge if it is a post file
                        if (
                            fs.statSync(`./${rootPathObjects[i]}/${yearPathObjects[j]}/${monthPathObjects[k]}`).isFile() &&
                            monthPathObjects[k].match(config.regex.postFile)
                        ) {
                            console.log('[log] find a new post:', monthPathObjects[k]);

                            // if it is, get the info object and push it to posts list
                            let postObject = getInfoFromFileName(monthPathObjects[k]);
                            postObject.link = `./${rootPathObjects[i]}/${yearPathObjects[j]}/${monthPathObjects[k]}`;
                            monthObject.posts.push(postObject);
                        }
                    }

                    // append the temp object to posts list
                    yearObject.posts.push(monthObject);
                }
            }

            // append the temp object to posts list
            source.posts.push(yearObject);
        }
    }
}

/**
 * re write the source file
 * @param {Object} source source object
 * @returns {string} string after re write
 */
function reWrite(source) {
    let result = '';

    // at first, re write the description block
    result += source.description;
    // re write the index symbol
    result += config.indexBlockStartSymbol;

    // draw the table
    // summary info
    result += '| 统计信息键 | 值 |\n';
    result += '| - | - |\n';

    let count = 0;
    for (let i = 0; i < source.posts.length; i++) {
        for (let j = 0; j < source.posts[i].posts.length; j++) {
            for (let k = 0; k < source.posts[i].posts[j].posts.length; k++) {
                count ++;
            }
        }
    }
    result += `| 文章总数 | ${count} |\n\n`;

    // post info
    // sort
    source.posts.sort((a, b) => {
        let yearA = parseInt(a.year);
        let yearB = parseInt(b.year);
        return yearB - yearA;
    });
    for (let i = 0; i < source.posts.length; i++) {
        result += `#### ${source.posts[i].year}年\n\n`;
        result += '| 日期 | 名称 | 链接 |\n';
        result += '| - | - |\n';
        // sort
        source.posts[i].posts.sort((a, b) => {
            let monthA = parseInt(a.month);
            let monthB = parseInt(b.month);
            return monthB - monthA;
        });
        for (let j = 0; j < source.posts[i].posts.length; j++) {
            // sort
            source.posts[i].posts[j].posts.sort((a, b) => {
                let splitResultA = a.date.split('-');
                let splitResultB = b.date.split('-');
                let timeA = parseInt(splitResultA[0]) * 1000 + parseInt(splitResultA[1]);
                let timeB = parseInt(splitResultB[0]) * 1000 + parseInt(splitResultB[1]);
                return timeB - timeA;
            });
            for (let k = 0; k < source.posts[i].posts[j].posts.length; k++) {
                let object = source.posts[i].posts[j].posts[k];
                result += `| ${object.date} | ${object.name} | [戳我传送](${object.link}) |\n`;
            }
        }
        result += '\n';
    }
    result += '\n\n';

    // rewrite the string to the file
    fs.writeFileSync(config.sourcePath, result);
}

/**
 * main function
 */
(function() {
    // read source
    let source = readSource();

    // get description of source string
    getDescription(source);

    // read posts
    readPosts(source);

    // rewrite
    reWrite(source);
})();
