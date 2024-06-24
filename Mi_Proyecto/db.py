#db.py

import os
import sqlite3

DIETECH_DB = os.path.join(os.path.dirname(__file__), "dietech.db")

def get_db():
    conn = sqlite3.connect(DIETECH_DB)
    return conn

def create_tables():
    tables = [
        """CREATE TABLE IF NOT EXISTS ingredientes (
            nombre TEXT PRIMARY KEY,
            calorias INTEGER NOT NULL,
            tipo TEXT NOT NULL,
            cantidad TEXT NOT NULL
        )""",
        """CREATE TABLE IF NOT EXISTS recetas (
            nombre TEXT PRIMARY KEY,
            ingredientes TEXT NOT NULL,
            dificultad TEXT NOT NULL,
            calorias INTEGER NOT NULL,
            tiempo_coccion TEXT NOT NULL
        )"""
    ]
    db = get_db()
    cursor = db.cursor()
    for table in tables:
        cursor.execute(table)
    db.commit()
    db.close()



