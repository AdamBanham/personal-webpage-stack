// CloudFront Function (runtime: cloudfront-js-2.0), event type: viewer request.
//
// The distribution uses the S3 REST origin, which only resolves index.html for the
// root object. vite-ssg writes prerendered pages to <route>/index.html, so map
// extensionless paths onto them:
//
//   /            -> /index.html            (prerendered home)
//   /contact     -> /contact/index.html    (prerendered)
//   /blog/       -> /blog/index.html       (prerendered)
//   /editor/orm  -> /editor/orm/index.html (missing -> 403 -> error page /spa.html)
//   /assets/a.js -> unchanged
//
// Requires the distribution's 403/404 custom error responses to return /spa.html with 200.
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    } else if (uri.split('/').pop().indexOf('.') === -1) {
        request.uri = uri + '/index.html';
    }

    return request;
}
