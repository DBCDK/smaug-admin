export function html({title, content, id = 'clientlist', state = {}}) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
  </head>
  <body>
    <h1>${title}</h1>
    <div id="content"></div>
    <script id="pagedata" type='application/json'>${JSON.stringify({id, state})}</script>
    <script src="/js/index.js"></script>
    <link href="/jsoneditor.min.css" " media="all" rel="stylesheet" />
  </body>
</html>
`
}
