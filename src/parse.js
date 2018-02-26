const fs        = require('fs');
const markdown  = require('markdown').markdown;

let paragraph   = [];
let mdstream    = new String();
let htmlstream  = [];
let tempstream  = new String();
let sourcepath, templatepath, generatepath;
let replacable  = 0;

try {
  for (var i = 0; i < process.argv.length; i++) {
    switch (i) {
      case 2:
        sourcepath = process.argv[i];
        break;
      case 3:
        templatepath = process.argv[i];
        break;
      case 4:
        generatepath = process.argv[i];
      default:
    }
  }
  fs.statSync(sourcepath);
  mdstream = fs.readFileSync(sourcepath, 'utf8');
  paragraph = mdstream.split(/[\n]{2}/);
  for (var i = 0; i < paragraph.length; i++) {
    htmlstream[i] = markdown.toHTML(paragraph[i]);
  }
  fs.statSync(templatepath);
  tempstream = fs.readFileSync(templatepath, 'utf8');
  // console.log(tempstream);
  replacable = (tempstream.match(/\{\{\%\}\}/g) || []).length;
  console.log(replacable);
  for (var i = 0; i < replacable; i++) {
    tempstream = tempstream.replace(/\{\{\%\}\}/, htmlstream[i]);
    // console.log(tempstream);
  }
  fs.writeFileSync(generatepath, tempstream);
} catch (e) {
  console.log(e);
}
