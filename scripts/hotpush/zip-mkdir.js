const fse = require('fs-extra');

fse
  .mkdir('./bundle_zip/file')
  .then(() => {
    console.log('创建目录成功');
  })
  .catch((error) => {
    console.log('创建目录失败');
    if (error.errno === '-4075') {
      console.log('目录已存在');
    }
  });
