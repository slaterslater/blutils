const fs = require( "fs" );
const readline = require( "readline" );

require('dotenv').config();

const readStream = fs.createReadStream(process.env.BULK_QUERY_RESULT);
const writeStream = fs.createWriteStream( "./wishlist-report.csv", { encoding: "utf8"} );


const rl = readline.createInterface({
  input: readStream,
  terminal: false,
  historySize: 0
});

writeStream.write('FIRST NAME,LAST NAME,EMAIL,WISHLIST\n')

rl.on( "line", function(line) {
  const {firstName, lastName, email, metafield} = JSON.parse(line)  
  if(!metafield) return
  const row = `${firstName},${lastName},${email},${metafield.value}\n`
  writeStream.write(row);
});