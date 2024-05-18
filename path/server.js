const path=require("path");

console.log(__dirname);
console.log(__filename);

console.log(path.basename(__dirname));
console.log(path.basename(__filename));

console.log(path.extname(__dirname));
console.log(path.extname(__filename));

console.log(path.join("folder1","folder2","folder3"))
console.log(path.join("/folder1","folder2","folder3"))
console.log(path.join("/folder1","//folder2","folder3"))
console.log(path.join("/folder1","folder2","../folder3"))

console.log(path.resolve("folder1","folder2","folder3"))
console.log(path.resolve("/folder1","folder2","folder3"))
console.log(path.resolve("/folder1","//folder2","folder3"))
console.log(path.resolve("/folder1","folder2","../folder3"))

//in path module there are many more methods 
//if you want to read go throgh from documentation
