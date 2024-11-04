# Main.py

from flask import Flask, jsonify, request
from Controller import add_user, get_user_by_username, add_ingrediente, delete_ingrediente, editar_cantidad_ingrediente, mostrar_ingredientes, obtener_detalles_ingrediente
from Controller import agregar_receta, eliminar_receta, editar_receta, mostrar_recetas, mostrar_receta_por_dificultad, filtrar_recetas_por_ingredientes
from db import create_tables, get_db
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'status': 'error', 'message': 'Faltan campos requeridos'}), 400

    if get_user_by_username(username):
        return jsonify({'status': 'error', 'message': 'El nombre de usuario ya está en uso'}), 400

    if add_user(username, password):
        return jsonify({'status': 'success', 'message': 'Usuario registrado correctamente'}), 201
    else:
        return jsonify({'status': 'error', 'message': 'Error al registrar usuario'}), 500



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'status': 'error', 'message': 'Faltan campos requeridos'}), 400

    user = get_user_by_username(username)

    if user and user[2] == password:
        return jsonify({'status': 'success', 'message': 'Login exitoso'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Credenciales inválidas'}), 401

@app.route('/ingredientes', methods=['GET'])
def obtener_ingredientes():
    ingredientes = mostrar_ingredientes()
    return jsonify({'ingredientes': ingredientes})

@app.route('/ingredientes', methods=['POST'])
def agregar_ingrediente_route():
    data = request.json
    resultado = add_ingrediente(data['nombre'], data['calorias'], data['tipo'], data['cantidad'])
    if resultado:
        return jsonify({'mensaje': 'Ingrediente agregado correctamente'})
    else:
        return jsonify({'mensaje': 'Error al agregar ingrediente'}), 400

@app.route('/ingredientes/<nombre>', methods=['DELETE'])
def eliminar_ingrediente_route(nombre):
    resultado = delete_ingrediente(nombre)
    if resultado:
        return jsonify({'mensaje': 'Ingrediente eliminado correctamente'})
    else:
        return jsonify({'mensaje': 'Error al eliminar ingrediente'}), 400

@app.route('/ingredientes/<nombre>', methods=['PUT'])
def editar_ingrediente_route(nombre):
    data = request.json
    resultado = editar_cantidad_ingrediente(nombre, data['cantidad'])
    if resultado:
        return jsonify({'mensaje': 'Cantidad del ingrediente editada correctamente'})
    else:
        return jsonify({'mensaje': 'Error al editar la cantidad del ingrediente'}), 400

@app.route('/recetas', methods=['GET'])
def obtener_recetas():
    recetas = mostrar_recetas()
    return jsonify({'recetas': recetas})

@app.route('/recetas', methods=['POST'])
def agregar_receta_route():
    data = request.json
    resultado = agregar_receta(data['nombre'], data['ingredientes'], data['dificultad'], data['calorias'], data['tiempo_coccion'])
    if resultado:
        return jsonify({'mensaje': 'Receta agregada correctamente'})
    else:
        return jsonify({'mensaje': 'Error al agregar receta'}), 400

@app.route('/recetas/<nombre>', methods=['DELETE'])
def eliminar_receta_route(nombre):
    resultado = eliminar_receta(nombre)
    if resultado:
        return jsonify({'mensaje': 'Receta eliminada correctamente'})
    else:
        return jsonify({'mensaje': 'Error al eliminar receta'}), 400

@app.route('/recetas/<nombre>', methods=['PUT'])
def editar_receta_route(nombre):
    data = request.json
    resultado = editar_receta(nombre, data['ingredientes'], data['dificultad'], data['calorias'], data['tiempo_coccion'])
    if resultado:
        return jsonify({'mensaje': 'Receta editada correctamente'})
    else:
        return jsonify({'mensaje': 'Error al editar receta'}), 400

@app.route('/recetas/dificultad/<dificultad>', methods=['GET'])
def obtener_recetas_por_dificultad(dificultad):
    recetas = mostrar_receta_por_dificultad(dificultad)
    return jsonify({'recetas': recetas})

@app.route('/recetas/filtrar', methods=['POST'])
def filtrar_recetas():
    data = request.json
    ingredientes_disponibles = data.get('ingredientes', [])
    
    if not ingredientes_disponibles:
        return jsonify({'mensaje': 'Debe proporcionar una lista de ingredientes'}), 400
    
    recetas_filtradas = filtrar_recetas_por_ingredientes(ingredientes_disponibles)
    
    return jsonify({'recetas_filtradas': recetas_filtradas})

@app.route('/ingredientes/detalles/<nombre>', methods=['GET'])
def obtener_detalles_ingrediente_route(nombre):
    detalles = obtener_detalles_ingrediente(nombre)
    return jsonify(detalles)

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)


