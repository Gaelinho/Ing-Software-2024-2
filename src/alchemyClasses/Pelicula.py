from sqlalchemy import Column, Integer, String

from alchemyClasses import db

class Pelicula(db.Model):
    __tablename__ = 'peliculas'
    idPelicula = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200))
    genero = Column(String(45), nullable=True)
    duracion = Column(Integer, nullable=True)
    inventario = Column(Integer)

    def __init__(self, nombre, genero=None, duracion=None, inventario=1):
        self.nombre = nombre
        self.genero = genero
        self.duracion = duracion
        self.inventario = inventario

    def __str__(self):
        s = f'Id Pelicula: {self.idPelicula}'
        s += f'\nNombre: {self.nombre}'
        s += f'\nGenero: {self.genero}'
        s += f'\nDuración: {self.duracion}'
        s += f'\nInventario: {self.inventario}\n'
        return s