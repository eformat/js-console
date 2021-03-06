### js-console

Keycloak
```
podman run --rm -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:latest -Djboss.bind.address.private=127.0.0.1 -Djboss.bind.address=127.0.0.1
```

Messing with Keycloak
```
mkdir ~/git/js-console && cd ~/git/js-console
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="http://localhost:8080/auth/js/keycloak.js"></script>
  <link rel="stylesheet" type="text/css" href="/node_modules/patternfly/dist/css/patternfly.css">
  <link rel="stylesheet" type="text/css" href="/node_modules/patternfly/dist/css/patternfly-additions.css">
</head>
<body>
  <div class="container">
    <!-- Just enjoy various PatternFly components -->
    <div class="alert alert-success">
      <span class="pficon pficon-ok"></span>
      <strong>Great job!</strong> This Patternfly is really working out <a href="#" class="alert-link">great for us</a>.
    </div>
    <ul>
        <li><a href="#" onclick='window.location.href="http://localhost:8080/auth/realms/master/account"'>Manage Account</a></li>
    </ul>
  </div>
  <script src="/node_modules/jquery/dist/jquery.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
</body>
</html>
EOF

cat <<EOF > server.js
const port = 8080
const express = require('express')
const path = require('path')
const app = express()
app.use(
  express.static(__dirname)
);
app.get('*/', function(req, res) {
  console.log('OK')
  res.sendFile(__dirname + '/index.html');
});
app.listen(port)
EOF

npm init -f
npm i express patternfly --save

--
oc new-project pfly
oc new-build --binary --name=pfly -i nodejs
oc start-build pfly --from-dir=. --follow
oc new-app pfly
oc expose svc pfly
```
