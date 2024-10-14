# receta.py
class Receta:
    def __init__(self, nombre, ingredientes, dificultad, calorias, tiempo_coccion):
        self.nombre = nombre
        self.ingredientes = ingredientes
        self.dificultad = dificultad
        self.calorias = calorias
        self.tiempo_coccion = tiempo_coccion

    def a_dic(self):
        return {
            'nombre': self.nombre,
            'ingredientes': self.ingredientes,
            'dificultad': self.dificultad,
            'calorias': self.calorias,
            'tiempo_coccion': self.tiempo_coccion
        }
    



