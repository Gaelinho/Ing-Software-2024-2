from sqlalchemy import Column, Integer, String, Boolean

from alchemyClasses import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    idUsuario = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200))
    apPat = Column(String(200))
    apMat = Column(String(200), nullable=True)
    password = Column(String(64))
    email = Column(String(500), unique=True, nullable=True)
    profilePicture = Column(String, nullable=True)
    superUser = Column(Boolean)

    def __init__(self, nombre, ap_Pat, password, superUser, email=None, ap_Mat=None, profilePicture=None):
        self.nombre = nombre
        self.apPat = ap_Pat
        self.apMat = ap_Mat
        self.password = password
        self.email = email
        self.profilePicture = profilePicture
        self.superUser = superUser

    def __str__(self):
        s = f'Id Usuario: {self.idUsuario}'
        s += f'\nNombre: {self.nombre} {self.apPat}'
        if self.apMat != None:
            s+= f' {self.apMat}'
        s += f'\nEmail: '
        if self.email != None:
            s+= f'{self.email}'
        else:
            s+= '-'
        s+= f'\nPassword: {self.password}'
        s += f'\nProfilePicture: {self.profilePicture}'
        s += f'\nSuperUser: {self.superUser}\n'
        return s