export const intertiaHtml = (pageString, view) => {
    const { viewData } = view;
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
  
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <meta name="description" content="${viewData.description}">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/site.css" />
    <script defer type="module" src="/js/bundle.js"></script>

  </head>

  <body>
    <div id="app" data-page='${pageString}'></div>
  </body>
</html>
`;
};
