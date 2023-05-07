export default ({ markup, css }) => {
  return `<!DOCTYPE html>
      <html lang="en">
          <head>
              <title>Apex-chat</title>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400" rel="stylesheet">
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">    
          </head>
          <body>
          <div id='root'>${markup}</div>
         <script type="text/javascript" src="/dist/bundle.js"></script>
         <style id="jss-server-side">${css}</style>
          </body>
      </html>`;
};
