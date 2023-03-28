const fs = require('fs')
const path = ''

const fileWriter = (path,data)=>{
  fs.writeFile(path, JSON.stringify({data}), (err) => {
    if (err) throw err;
    console.log('endpoints written to file',data);
  });  
}

module.exports = fileWriter;