import { RenderModel } from './swagger.service';

/**
 * Generates a self-contained HTML page (no external dependencies) with a
 * read-only viewer + "try it out" console for the given spec render model.
 */
export function buildStandaloneHtml(model: RenderModel): string {
  const data = JSON.stringify(model).replace(/</g, '\\u003c');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(model.title)} — API Documentation</title>
<style>
  :root {
    --navy-950:#020817; --navy-900:#061326; --navy-800:#0b2344;
    --aqua:#00ffd1; --purple:#b625ff; --text-main:#f4fbff; --text-muted:#b9c8db;
  }
  * { box-sizing: border-box; }
  body {
    margin:0; padding:2rem 1rem 4rem;
    font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
    color:var(--text-main);
    background:
      radial-gradient(circle at 15% 8%, rgba(68,91,170,.12), transparent 30rem),
      radial-gradient(circle at 86% 16%, rgba(79,38,120,.12), transparent 30rem),
      linear-gradient(135deg,#020713,#071427 52%,#060d1c);
    background-attachment: fixed;
    min-height:100vh;
  }
  .wrap { max-width: 62rem; margin:0 auto; }
  a { color: var(--aqua); }
  .api-head { margin-bottom:1.6rem; }
  .api-head h1 { margin:0 0 .3rem; font-size:1.8rem;
    background:linear-gradient(90deg,#8ee8ff,#b625ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .chips { display:flex; gap:.5rem; flex-wrap:wrap; margin:.4rem 0 .8rem; }
  .chip { padding:.22rem .7rem; border-radius:999px; font-size:.78rem; font-weight:700;
    color:#8ee8ff; background:rgba(0,208,255,.09); border:1px solid rgba(0,208,255,.32); }
  .api-desc { color:var(--text-muted); font-size:.92rem; line-height:1.55; max-width:50rem; white-space:pre-wrap; }
  .server-bar { display:flex; align-items:center; gap:.6rem; flex-wrap:wrap; margin:1.1rem 0 1.6rem;
    padding:.7rem .9rem; border-radius:.6rem; background:rgba(4,15,34,.85); border:1px solid rgba(91,124,255,.28); }
  .server-bar label { font-size:.82rem; font-weight:700; color:var(--text-muted); }
  select, input[type=text], textarea {
    background:rgba(2,9,23,.92); color:var(--aqua); border:1px solid rgba(91,124,255,.35);
    border-radius:.45rem; padding:.42rem .6rem; font-size:.85rem; font-family:inherit; }
  textarea { font-family:'Courier New',monospace; width:100%; min-height:8rem; line-height:1.45; resize:vertical; }
  select:focus, input:focus, textarea:focus { outline:1px solid rgba(0,255,209,.45); }
  h2.tag-title { margin:2rem 0 .3rem; font-size:1.15rem; color:#8ee8ff; letter-spacing:.02em; }
  .tag-desc { margin:0 0 .8rem; color:var(--text-muted); font-size:.85rem; }
  .op { border:1px solid rgba(91,124,255,.28); border-radius:.6rem; margin-bottom:.6rem; overflow:hidden;
    background:linear-gradient(145deg, rgba(5,17,37,.95), rgba(2,9,22,.97)); }
  .op-head { display:flex; align-items:center; gap:.7rem; padding:.55rem .8rem; cursor:pointer; user-select:none; }
  .op-head:hover { background:rgba(0,208,255,.05); }
  .m { min-width:4.4rem; text-align:center; padding:.3rem 0; border-radius:.4rem; font-weight:800;
    font-size:.74rem; letter-spacing:.06em; text-transform:uppercase; }
  .m-get { background:rgba(0,208,255,.14); color:#7fe7ff; border:1px solid rgba(0,208,255,.45); }
  .m-post { background:rgba(74,222,128,.13); color:#6ee7a8; border:1px solid rgba(74,222,128,.42); }
  .m-put { background:rgba(255,209,102,.12); color:#ffd166; border:1px solid rgba(255,209,102,.4); }
  .m-delete { background:rgba(255,92,122,.12); color:#ff8fa5; border:1px solid rgba(255,92,122,.4); }
  .m-patch { background:rgba(182,37,255,.14); color:#d98bff; border:1px solid rgba(182,37,255,.42); }
  .m-options, .m-head { background:rgba(148,163,184,.13); color:#cbd5e1; border:1px solid rgba(148,163,184,.4); }
  .op-path { font-family:'Courier New',monospace; font-weight:700; font-size:.92rem; }
  .op-sum { color:var(--text-muted); font-size:.83rem; margin-left:auto; text-align:right; }
  .op-body { display:none; padding: .4rem .9rem 1rem; border-top:1px solid rgba(91,124,255,.22); }
  .op.open .op-body { display:block; }
  .sec-t { margin:.9rem 0 .4rem; font-size:.8rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:#8ee8ff; }
  table { width:100%; border-collapse:collapse; font-size:.85rem; }
  th { text-align:left; color:var(--text-muted); font-size:.74rem; text-transform:uppercase; letter-spacing:.06em;
    padding:.3rem .5rem; border-bottom:1px solid rgba(91,124,255,.25); }
  td { padding:.4rem .5rem; border-bottom:1px solid rgba(91,124,255,.12); vertical-align:top; }
  .p-name { font-family:'Courier New',monospace; font-weight:700; }
  .req { color:#ff8fa5; font-size:.72rem; font-weight:700; }
  .p-loc { color:var(--purple); font-size:.76rem; }
  .p-type { color:#6ee7a8; font-size:.8rem; font-family:'Courier New',monospace; }
  .p-desc { color:var(--text-muted); font-size:.8rem; }
  td input, td select { width:100%; }
  .resp-code { font-family:'Courier New',monospace; font-weight:800; color:#ffd166; }
  pre.example { background:rgba(2,9,23,.92); border:1px solid rgba(91,124,255,.22); border-radius:.5rem;
    padding:.7rem .8rem; overflow:auto; font-size:.8rem; color:var(--aqua); max-height:20rem; margin:.3rem 0 0; }
  .exec { margin-top:1rem; display:flex; gap:.7rem; align-items:center; flex-wrap:wrap; }
  button.go { cursor:pointer; border:none; border-radius:.5rem; padding:.55rem 1.4rem; font-weight:800;
    font-size:.85rem; letter-spacing:.03em; color:#021018;
    background:linear-gradient(135deg,#00ffd1,#00a8ff); }
  button.go:hover { filter:brightness(1.1); }
  button.go:disabled { opacity:.5; cursor:default; }
  .result { margin-top:.8rem; }
  .status-ok { color:#6ee7a8; font-weight:800; }
  .status-err { color:#ff8fa5; font-weight:800; }
  .r-meta { font-size:.82rem; color:var(--text-muted); display:flex; gap:1rem; margin-bottom:.3rem; }
  .schema { border:1px solid rgba(91,124,255,.25); border-radius:.6rem; margin-bottom:.7rem;
    background:linear-gradient(145deg, rgba(5,17,37,.95), rgba(2,9,22,.97)); padding:.7rem .9rem; }
  .schema h3 { margin:.1rem 0 .5rem; font-size:.95rem; color:#d98bff; font-family:'Courier New',monospace; }
  .err-line { color:#ff8fa5; font-size:.83rem; margin-top:.5rem; white-space:pre-wrap; }
  footer { margin-top:3rem; text-align:center; color:var(--text-muted); font-size:.78rem; }
</style>
</head>
<body>
<div class="wrap" id="app"></div>
<footer>Generated with utily.tools — Swagger Viewer &amp; Editor</footer>
<script id="spec-model" type="application/json">${data}</script>
<script>
(function () {
  var model = JSON.parse(document.getElementById('spec-model').textContent);
  var app = document.getElementById('app');

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null && text !== '') node.textContent = text;
    return node;
  }

  // ── Header ──
  var head = el('div', 'api-head');
  head.appendChild(el('h1', '', model.title));
  var chips = el('div', 'chips');
  var versionNames = { '2.0': 'Swagger 2.0', '3.0': 'OpenAPI 3.0', '3.1': 'OpenAPI 3.1' };
  chips.appendChild(el('span', 'chip', versionNames[model.specVersion] || model.specVersion));
  if (model.apiVersion) chips.appendChild(el('span', 'chip', 'v' + model.apiVersion));
  head.appendChild(chips);
  if (model.description) head.appendChild(el('p', 'api-desc', model.description));
  app.appendChild(head);

  // ── Server bar ──
  var serverBar = el('div', 'server-bar');
  serverBar.appendChild(el('label', '', 'Server'));
  var serverSel = document.createElement('select');
  (model.servers || []).forEach(function (s) {
    var opt = document.createElement('option'); opt.value = s; opt.textContent = s; serverSel.appendChild(opt);
  });
  var customOpt = document.createElement('option'); customOpt.value = '__custom__'; customOpt.textContent = 'Custom…';
  serverSel.appendChild(customOpt);
  var customInput = document.createElement('input');
  customInput.type = 'text'; customInput.placeholder = 'https://api.example.com'; customInput.style.display = 'none';
  customInput.style.minWidth = '18rem';
  serverSel.addEventListener('change', function () {
    customInput.style.display = serverSel.value === '__custom__' ? '' : 'none';
  });
  serverBar.appendChild(serverSel);
  serverBar.appendChild(customInput);
  app.appendChild(serverBar);

  function baseUrl() {
    return serverSel.value === '__custom__' ? customInput.value.replace(/\\/$/, '') : serverSel.value.replace(/\\/$/, '');
  }

  // ── Operations ──
  (model.groups || []).forEach(function (group) {
    app.appendChild(el('h2', 'tag-title', group.tag));
    if (group.description) app.appendChild(el('p', 'tag-desc', group.description));
    group.ops.forEach(function (op) { app.appendChild(renderOp(op)); });
  });

  function renderOp(op) {
    var box = el('div', 'op');
    var headRow = el('div', 'op-head');
    headRow.appendChild(el('span', 'm m-' + op.method, op.method));
    headRow.appendChild(el('span', 'op-path', op.path));
    headRow.appendChild(el('span', 'op-sum', op.summary || ''));
    headRow.addEventListener('click', function () { box.classList.toggle('open'); });
    box.appendChild(headRow);

    var body = el('div', 'op-body');
    if (op.description) body.appendChild(el('p', 'p-desc', op.description));

    var inputs = {};
    if (op.params && op.params.length) {
      body.appendChild(el('div', 'sec-t', 'Parameters'));
      var table = document.createElement('table');
      var thead = document.createElement('tr');
      ['Name', 'Type', 'Description', 'Value'].forEach(function (h) { thead.appendChild(el('th', '', h)); });
      table.appendChild(thead);
      op.params.forEach(function (p) {
        var tr = document.createElement('tr');
        var name = el('td', '');
        name.appendChild(el('span', 'p-name', p.name));
        if (p.required) name.appendChild(el('div', 'req', 'required'));
        name.appendChild(el('div', 'p-loc', '(' + p.location + ')'));
        tr.appendChild(name);
        tr.appendChild(el('td', 'p-type', p.type || ''));
        tr.appendChild(el('td', 'p-desc', p.description || ''));
        var valueTd = el('td', '');
        var input;
        if (p.enumVals && p.enumVals.length) {
          input = document.createElement('select');
          var blank = document.createElement('option'); blank.value = ''; blank.textContent = '—';
          input.appendChild(blank);
          p.enumVals.forEach(function (v) {
            var opt = document.createElement('option'); opt.value = v; opt.textContent = v; input.appendChild(opt);
          });
        } else {
          input = document.createElement('input'); input.type = 'text'; input.placeholder = p.name;
        }
        inputs[p.location + ':' + p.name] = input;
        valueTd.appendChild(input);
        tr.appendChild(valueTd);
        table.appendChild(tr);
      });
      body.appendChild(table);
    }

    var bodyArea = null;
    if (op.hasBody) {
      body.appendChild(el('div', 'sec-t', 'Request body (' + op.bodyContentType + ')'));
      bodyArea = document.createElement('textarea');
      bodyArea.value = op.bodyExample || '';
      bodyArea.spellcheck = false;
      body.appendChild(bodyArea);
    }

    if (op.responses && op.responses.length) {
      body.appendChild(el('div', 'sec-t', 'Responses'));
      var rtable = document.createElement('table');
      op.responses.forEach(function (r) {
        var tr = document.createElement('tr');
        tr.appendChild(el('td', 'resp-code', r.code));
        var td = el('td', '');
        td.appendChild(el('div', 'p-desc', r.description || ''));
        if (r.exampleText) {
          var pre = el('pre', 'example');
          pre.textContent = r.exampleText;
          td.appendChild(pre);
        }
        tr.appendChild(td);
        rtable.appendChild(tr);
      });
      body.appendChild(rtable);
    }

    var execRow = el('div', 'exec');
    var goBtn = el('button', 'go', 'Execute');
    execRow.appendChild(goBtn);
    body.appendChild(execRow);
    var result = el('div', 'result');
    body.appendChild(result);

    goBtn.addEventListener('click', function () {
      goBtn.disabled = true;
      result.innerHTML = '';
      var path = op.path;
      var query = [];
      var headers = {};
      Object.keys(inputs).forEach(function (key) {
        var idx = key.indexOf(':');
        var loc = key.substring(0, idx), name = key.substring(idx + 1);
        var value = inputs[key].value;
        if (!value) return;
        if (loc === 'path') path = path.split('{' + name + '}').join(encodeURIComponent(value));
        else if (loc === 'query') query.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
        else if (loc === 'header') headers[name] = value;
      });
      var url = baseUrl() + path + (query.length ? '?' + query.join('&') : '');
      var init = { method: op.method.toUpperCase(), headers: headers };
      if (bodyArea && bodyArea.value.trim()) {
        headers['Content-Type'] = op.bodyContentType;
        init.body = bodyArea.value;
      }
      var started = Date.now();
      fetch(url, init).then(function (resp) {
        return resp.text().then(function (text) {
          var ms = Date.now() - started;
          var meta = el('div', 'r-meta');
          meta.appendChild(el('span', resp.ok ? 'status-ok' : 'status-err', resp.status + ' ' + resp.statusText));
          meta.appendChild(el('span', '', ms + ' ms'));
          meta.appendChild(el('span', '', url));
          result.appendChild(meta);
          var pre = el('pre', 'example');
          try { pre.textContent = JSON.stringify(JSON.parse(text), null, 2); }
          catch (e) { pre.textContent = text || '(empty body)'; }
          result.appendChild(pre);
        });
      }).catch(function (err) {
        result.appendChild(el('div', 'err-line',
          'Request failed: ' + err.message + '\\nThis is often caused by CORS restrictions or an unreachable server.'));
      }).then(function () { goBtn.disabled = false; });
    });

    box.appendChild(body);
    return box;
  }

  // ── Schemas ──
  if (model.schemas && model.schemas.length) {
    app.appendChild(el('h2', 'tag-title', 'Schemas'));
    model.schemas.forEach(function (schema) {
      var card = el('div', 'schema');
      card.appendChild(el('h3', '', schema.name));
      if (schema.props.length) {
        var table = document.createElement('table');
        schema.props.forEach(function (p) {
          var tr = document.createElement('tr');
          var name = el('td', '');
          name.appendChild(el('span', 'p-name', p.name));
          if (p.required) name.appendChild(el('div', 'req', 'required'));
          tr.appendChild(name);
          tr.appendChild(el('td', 'p-type', p.type || ''));
          tr.appendChild(el('td', 'p-desc', p.description || ''));
          table.appendChild(tr);
        });
        card.appendChild(table);
      } else {
        card.appendChild(el('div', 'p-desc', schema.type || 'object'));
      }
      app.appendChild(card);
    });
  }
})();
</script>
</body>
</html>
`;
}

function escapeHtml(text: string): string {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
