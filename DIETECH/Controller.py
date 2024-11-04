# Controller.py

import sqlite3
from db import get_db
import requests

# Función para agregar un nuevo usuario a la base de datos
def add_user(username, password):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        db.commit()
        return True
    except sqlite3.Error as error:
        print(f"Error al agregar usuario: {error}")
        return False
    finally:
        if db:
            db.close()


# Función para buscar un usuario por su nombre de usuario
def get_user_by_username(username):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = cursor.fetchone()
        return user
    except sqlite3.Error as error:
        print(f"Error al buscar usuario: {error}")
        return None
    finally:
        if db:
            db.close()

# Función para agregar un ingrediente
def add_ingrediente(nombre, calorias, tipo, cantidad):
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "INSERT INTO ingredientes (nombre, calorias, tipo, cantidad) VALUES (?, ?, ?, ?)"
        cursor.execute(statement, [nombre, calorias, tipo, cantidad])
        db.commit()
        return True
    except sqlite3.Error as error:
        print(f"Error al agregar ingrediente: {error}")
        return False
    finally:
        if db:
            db.close()

# Función para eliminar un ingrediente
def delete_ingrediente(nombre):
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "DELETE FROM ingredientes WHERE nombre = ?"
        cursor.execute(statement, [nombre])
        db.commit()
        return True
    except sqlite3.Error as error:
        print(f"Error al eliminar ingrediente: {error}")
        return False
    finally:
        if db:
            db.close()

# Función para editar la cantidad de un ingrediente
def editar_cantidad_ingrediente(nombre, cantidad):
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "UPDATE ingredientes SET cantidad = ? WHERE nombre = ?"
        cursor.execute(statement, [cantidad, nombre])
        db.commit()
        return True
    except sqlite3.Error as error:
        print(f"Error al editar la cantidad del ingrediente: {error}")
        return False
    finally:
        if db:
            db.close()

# Función para mostrar todos los ingredientes
def mostrar_ingredientes():
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "SELECT nombre, calorias, tipo, cantidad FROM ingredientes"
        cursor.execute(statement)
        ingredientes = cursor.fetchall()
        return ingredientes
    except sqlite3.Error as error:
        print(f"Error al obtener ingredientes: {error}")
        return []
    finally:
        if db:
            db.close()

# Función para agregar una receta
def agregar_receta(nombre, ingredientes, dificultad, calorias, tiempo_coccion):
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "INSERT INTO recetas (nombre, ingredientes, dificultad, calorias, tiempo_coccion) VALUES (?, ?, ?, ?, ?)"
        cursor.execute(statement, [nombre, ingredientes, dificultad, calorias, tiempo_coccion])
        db.commit()
        return True
    except sqlite3.Error as error:
        print(f"Error al agregar receta: {error}")
        return False
    finally:
        if db:
            db.close()

# Función para eliminar una receta
def eliminar_receta(nombre):
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "DELETE FROM recetas WHERE nombre = ?"
        cursor.execute(statement, [nombre])
        db.commit()
        return True
    except sqlite3.Error as error:
        print(f"Error al eliminar receta: {error}")
        return False
    finally:
        if db:
            db.close()

# Función para editar una receta
def editar_receta(nombre, ingredientes, dificultad, calorias, tiempo_coccion):
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "UPDATE recetas SET ingredientes = ?, dificultad = ?, calorias = ?, tiempo_coccion = ? WHERE nombre = ?"
        cursor.execute(statement, [ingredientes, dificultad, calorias, tiempo_coccion, nombre])
        db.commit()
        return True
    except sqlite3.Error as error:
        print(f"Error al editar receta: {error}")
        return False
    finally:
        if db:
            db.close()

# db.py (Función para mostrar las recetas desde la base de datos)
def mostrar_recetas():
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "SELECT nombre, ingredientes, dificultad, calorias, tiempo_coccion FROM recetas"
        cursor.execute(statement)
        recetas = cursor.fetchall()

        recetas_formateadas = []
        for receta in recetas:
            recetas_formateadas.append({
                'nombre': receta[0],
                'ingredientes': receta[1],
                'dificultad': receta[2],
                'calorias': receta[3],
                'tiempo_coccion': receta[4]
            })
        return recetas_formateadas

    except sqlite3.Error as error:
        print(f"Error al obtener recetas: {error}")
        return []
    finally:
        if db:
            db.close()

# Función para mostrar todas las recetas
'''def mostrar_recetas():
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "SELECT nombre, ingredientes, dificultad, calorias, tiempo_coccion FROM recetas"
        cursor.execute(statement)
        recetas = cursor.fetchall()
        return recetas
    except sqlite3.Error as error:
        print(f"Error al obtener recetas: {error}")
        return []
    finally:
        if db:
            db.close()'''

# Función para mostrar recetas según la dificultad
def mostrar_receta_por_dificultad(dificultad):
    try:
        db = get_db()
        cursor = db.cursor()
        statement = "SELECT nombre, ingredientes, dificultad, calorias, tiempo_coccion FROM recetas WHERE dificultad = ?"
        cursor.execute(statement, [dificultad])
        recetas = cursor.fetchall()
        return recetas
    except sqlite3.Error as error:
        print(f"Error al obtener recetas por dificultad: {error}")
        return []
    finally:
        if db:
            db.close()

# Función para filtrar recetas por ingredientes disponibles
def filtrar_recetas_por_ingredientes(ingredientes_disponibles):
    try:
        db = get_db()
        cursor = db.cursor()
        
        statement = "SELECT nombre, ingredientes, dificultad, calorias, tiempo_coccion FROM recetas"
        cursor.execute(statement)
        recetas = cursor.fetchall()
        
        recetas_filtradas = []
        for receta in recetas:
            nombre, ingredientes, dificultad, calorias, tiempo_coccion = receta
            ingredientes_receta = ingredientes.split(',')
            
            if any(ingrediente.strip() in ingredientes_disponibles for ingrediente in ingredientes_receta):
                recetas_filtradas.append({
                    'nombre': nombre,
                    'ingredientes': ingredientes,
                    'dificultad': dificultad,
                    'calorias': calorias,
                    'tiempo_coccion': tiempo_coccion
                })
        
        return recetas_filtradas
    except sqlite3.Error as error:
        print(f"Error al filtrar recetas: {error}")
        return []
    finally:
        if db:
            db.close()

# Función para obtener detalles de un ingrediente utilizando la API de Edamam
def obtener_detalles_ingrediente(nombre_ingrediente):
    app_id = "1cac8b2c"
    app_key = "3b3ebb5648f51854d2c695d1c68174ca"
    url = f"https://api.edamam.com/api/food-database/v2/parser?ingr={nombre_ingrediente}&app_id={app_id}&app_key={app_key}&lang=es"

    try:
        response = requests.get(url)
        if response.status_code == 200:
            datos = response.json()
            if datos.get('parsed'):
                ingrediente = datos['parsed'][0]['food']
                detalles = {
                    'nombre': ingrediente['label'],
                    'categoria': ingrediente['category'],
                    'nutrientes': ingrediente['nutrients']
                }
                return detalles
            else:
                return {'mensaje': 'No se encontraron detalles para el ingrediente proporcionado'}
        else:
            return {'mensaje': 'Error en la solicitud a la API'}
    except requests.RequestException as e:
        print(f"Error en la solicitud a la API: {e}")
        return {'mensaje': 'Error al comunicarse con la API de Edamam'}
    