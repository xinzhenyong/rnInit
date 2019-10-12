const archiver = require('archiver');
const fs = require('fs');
const sourcePath = './bundle_zip/file/';
const targetPath = './bundle_zip/bundle.zip';

var output = fs.createWriteStream(targetPath);
var archive = archiver('zip', {
  store: false // Sets the compression method to STORE.
});

// listen for all archive data to be written
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});
// pipe archive data to the file
archive.pipe(output);
// append files from a directory
archive.directory(sourcePath, false);
// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();
