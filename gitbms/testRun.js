var vm = require('vm');
var common = require('./tool/Common');
var code = `var square = 3;
console.log(222);
common.pringa();
`;
var fn = new Function('n', code);
var script = vm.createScript(code);

script.runInThisContext();