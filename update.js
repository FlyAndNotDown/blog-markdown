const fs = require('fs');

const config = {
    source: './README.md',
    header: {
        title: '# Kindem的博客Markdown文件',
        description: '[Kindem的博客](http://www.kindemh.cn/)的文章源码'
    },
    noSearch: ['img']
};

let context = '';
context += config.header.title + '\n';
context += config.header.description + '\n\n';
let paths1 = fs.readdirSync('.');
paths1.forEach((path1) => {
    if (fs.statSync(`./${path1}`).isDirectory() && !config.noSearch.includes(path1)) {
        context += `> ${path1}年\n`;
        let paths2 = fs.readdirSync(`./${path1}`);
        paths2.forEach((path2) => {
            if (fs.statSync(`./${path1}/${path2}`).isDirectory() && !config.noSearch.includes(path2)) {
                context += `* [${path2} 月](./${path1}/${path2})\n`;
                let paths3 = fs.readdirSync(`./${path1}/${path2}`);
                paths3.forEach((path3) => {
                    if (fs.statSync(`./${path1}/${path2}/${path3}`).isFile() && !config.noSearch.includes(path3)) {
                        // TODO 迟点再写了
                    }
                });
            }
        });
        context += '\n';
    }
});