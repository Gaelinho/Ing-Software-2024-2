from sqlalchemy import Column, Integer, Date, Boolean, ForeignKey
from datetime import date
from alchemyClasses import db

class Rentar(db.Model):
    __tablename__ = 'rentar'
    idRentar = Column(Integer, primary_key=True)
    idUsuario = Column(Integer, ForeignKey('usuarios.idUsuario'))
    idPelicula = Column(Integer, ForeignKey('peliculas.idPelicula'))
    fecha_renta = Column(Date)
    dias_de_renta = Column(Integer, nullable=True)
    estatus = Column(Boolean, nullable=True)

    def __init__(self, idUsuario, idPelicula, fecha_renta=date.today(), dias_de_renta=5, estatus=False):
        self.idUsuario = idUsuario
        self.idPelicula = idPelicula
        self.fecha_renta = fecha_renta
        self.dias_de_renta = dias_de_renta
        self.estatus = estatus

    def __str__(self):
        s = f'Id Renta: {self.idRentar}'
        s += f'\nId Usuario: {self.idUsuario}'
        s += f'\nId Pelicula: {self.idPelicula}'
        s += f'\nFecha Renta: {self.fecha_renta}'
        s += f'\nDías de Renta: {self.dias_de_renta}'
        s += f'\nEstatus: {self.estatus}\n'
        return s
