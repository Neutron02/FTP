from flask import Flask, Blueprint, send_from_directory
import os
from flask_cors import CORS

app = Flask(__name__, static_folder='../ftp-frontend/build', template_folder='../ftp-frontend/build')
CORS(app)  # Enable CORS

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(os.path.join(app.static_folder, 'static'), path)

def create_blueprint(instance_name):
    bp = Blueprint(instance_name, __name__, url_prefix=f'/{instance_name}', static_folder=app.static_folder, template_folder=app.template_folder)

    @bp.route('/', defaults={'path': ''})
    @bp.route('/<path:path>')
    def serve(path):
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return bp

if __name__ == '__main__':
    instance_names = ["user1", "user2", "user3"]
    for instance in instance_names:
        app.register_blueprint(create_blueprint(instance))
    app.run(debug=True)
