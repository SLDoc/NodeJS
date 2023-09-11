const https = require("http");
const fs = require("fs");

const server = https.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url == "/") {
    res.write(`

  <html>
   <head>
    <title>Cybesto</title>
   </head>
   <body>
     <form action="/output" method="POST">
          <p>${url}</p>
          <input type="text" name="message" placeholder="Enter message"/>
          <input type="submit" value="Data"/>
     </form>
   </body>

  </html>
  
  `);

    return res.end();
  } else if (url == "/output" && method === "POST") {
    const dataPackage = [];
    let message;
    req.on("data", (chunk) => {
      console.log(chunk);
      dataPackage.push(chunk);
    });

    req.on("end", () => {
      const data = Buffer.concat(dataPackage).toString();
      message = data.split("=")[1];
      // res.setHeader("Content-Type", "text/html");
      fs.writeFileSync("Data.txt", message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");

    res.write(`

    // <html>
    //  <head>
    //   <title>Cybesto</title>
    //  </head>
    //  <body>
    //    <form action="/" method="POST">
    //         <p>OUTPUT</p>
    //         <p>${url}</p>
    //         <input type="text" placeholder="Enter message"/>
    //         <input type="submit" value="Data"/>
    //    </form>
    //  </body>
  
    // </html>
    
    // `);

    return res.end();
  }
});

server.listen(3000, () => {
  console.log(":::Server listening ::: ");
});
