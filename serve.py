"""Local static server with clean URLs: /grid serves grid.html."""
import http.server, os, sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        translated = super().translate_path(path)
        if not os.path.exists(translated) and os.path.exists(translated + '.html'):
            return translated + '.html'
        return translated

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8137
    http.server.ThreadingHTTPServer(('', port), Handler).serve_forever()
