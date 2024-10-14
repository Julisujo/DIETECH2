# ingrediente.py
class Ingrediente:
    def __init__(self, nombre, calorias, tipo, cantidad):
        self.nombre = nombre
        self.calorias = calorias
        self.tipo = tipo
        self.cantidad = cantidad

    def a_dic(self):
        return {
            'nombre': self.nombre,
            'calorias': self.calorias,
            'tipo': self.tipo,
            'cantidad': self.cantidad
        }