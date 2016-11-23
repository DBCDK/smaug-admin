export function html({title, content = '', id = 'clientlist', state = {}}) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <link async href="https://fonts.googleapis.com/css?family=Open+Sans:400,800" rel="stylesheet">
    <link async href="/css/index.css" rel="stylesheet">
  </head>
  <body>
    <header class="header">
      <div class="wrapper">
        <div class="logo"><a href="/">Smaug Admin</a></div>
        <nav>
          <ul>
            <li><a href="/">Client List</a></li>
            <li><a href="/add">Create Client</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="wrapper page ${id}">
      <h1>${title}</h1>
      <div id="content">${content}</div>
      <script id="pagedata" type='application/json'>${JSON.stringify({id, state})}</script>
      <script src="/js/index.js"></script>
      <link href="/jsoneditor.min.css" " media="all" rel="stylesheet" />
    </div>    
  </body>
</html>
`
}
