export function html({title, content = '', links = [], id = 'clientlist', userLoggedIn = false, state = {}}) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <link async href="https://fonts.googleapis.com/css?family=Open+Sans:400,800" rel="stylesheet">
    <link async href="/css/index.css" rel="stylesheet">
  </head>
  <body>
      <div id="content">${content}</div>
      <script id="pagedata" type='application/json'>${JSON.stringify({id, title, userLoggedIn, state, links})}</script>
      <script src="/js/index.js"></script>
      <link href="/jsoneditor.min.css" " media="all" rel="stylesheet" />
  </body>
</html>
`;
}
