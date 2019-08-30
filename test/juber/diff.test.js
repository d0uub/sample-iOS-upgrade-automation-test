const looksSame = require('looks-Same');
looksSame.createDiff({
    reference: 'iPhone X-11.4.png',
    current: 'iPhone X-12.1.png',
    diff: 'diff.png',
    highlightColor: '#ff00ff', // color to highlight the differences
    strict: false, // strict comparsion
    tolerance: 50,
    antialiasingTolerance: 0,
    ignoreAntialiasing: true, // ignore antialising by default
    ignoreCaret: true // ignore caret by default
}, function (error) {
    console.log(error)
});

looksSame.createDiff({
    reference: 'iPhone X-11.4-7.png',
    current: 'iPhone X-12.1-7.png',
    diff: 'diff-7.png',
    highlightColor: '#ff00ff', // color to highlight the differences
    strict: false, // strict comparsion
    tolerance: 50,
    antialiasingTolerance: 0,
    ignoreAntialiasing: true, // ignore antialising by default
    ignoreCaret: true // ignore caret by default
}, function (error) {
    console.log(error)
});