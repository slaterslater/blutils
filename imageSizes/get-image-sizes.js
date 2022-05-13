const fs = require( "fs" );
const readline = require( "readline" );
const data = require('./product-data')

const [date] = new Date().toISOString().split('T')
const imageHeadings = Array.from({length:20}).map((_,i) => `IMAGE ${i+1}`).join(',')
const writeStream = fs.createWriteStream( `./image-size-report-${date}.csv`, { encoding: "utf8"} );

writeStream.write(`PRODUCT,${imageHeadings}\n`)

// rl.on( "line", function(line) {
//   const {firstName, lastName, email, metafield} = JSON.parse(line)  
//   if(!metafield) return
//   const row = `${firstName},${lastName},${email},${metafield.value}\n`
//   writeStream.write(row);
// });

// const titles = data.map(prod => prod.title)

data.forEach(({title, images}) => {
  if (!images.length) return
  const product = title.replace(/,/g,' -')
  const imageData = images.map(({width, height}) => `${width} x ${height}`).join(',')
  const row = `${product},${imageData}\n`
  writeStream.write(row);
})

console.log(`Product Image Sizes: ${date}`)