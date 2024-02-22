
# Gael Garcia Aguilera

import pymysql
from datetime import datetime, timedelta
from faker import Faker
import random

conexion = pymysql.connect(
    host='localhost',
    user='lab',
    password='Developer123!',
    database='lab_ing_software'
)

generos_peliculas = [
    "Acción", "Aventura", "Animación", "Comedia", "Documental", "Drama", "Familiar",
    "Terror", "Misterio", "Romance", "Ciencia ficción", "Deporte", "Suspenso", "Western"
]

# Inserta 1 registro con datos aleatorios en cada tabla
def insertar_registros():
    insertar_usuario()
    insertar_pelicula()
    insertar_renta()

# Inserta 1 registro de usuario
def insertar_usuario():
    fake = Faker()
    try:
        with conexion.cursor() as cursor:
            # Registro de un usuario
            nombre = fake.first_name()
            apPat = fake.last_name()
            apMat = fake.last_name()
            email = fake.email()
            password = fake.password()
            superUser = random.randint(0, 1)
            inst = "INSERT INTO usuarios (nombre, apPat, apMat, password, email, superUser) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(inst, (nombre, apPat, apMat, password, email, superUser))
        conexion.commit()
    except Exception as e:
        print(str(e))

# Inserta 1 registro de pelicula
def insertar_pelicula():
    fake = Faker()
    try:
        with conexion.cursor() as cursor:
            nombre = fake.sentence(nb_words=3)
            genero = random.choice(generos_peliculas)
            duracion = random.randint(60,120)
            inventario = random.randint(1,50)
            inst = "INSERT INTO peliculas (nombre, genero, duracion, inventario) VALUES (%s, %s, %s, %s)"
            cursor.execute(inst, (nombre, genero, duracion, inventario))
        conexion.commit()
    except Exception as e:
        print(str(e))

# Inserta 1 registro de renta
def insertar_renta():
    try:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT idUsuario FROM usuarios")
            users = cursor.fetchall()
            id_usuario = random.choice(users)[0]

            cursor.execute("SELECT idPelicula FROM peliculas")
            pelis = cursor.fetchall()
            id_pelicula = random.choice(pelis)[0]

            fecha_renta = (datetime.now() - timedelta(days=random.randint(1, 30))).date()
            dias_renta = random.randint(1, 9)
            estatus = random.randint(0, 1)
            inst = "INSERT INTO rentar (idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(inst, (id_usuario, id_pelicula, fecha_renta, dias_renta, estatus))
        conexion.commit()
    except Exception as e:
        print(str(e))

# Filtra a la tabla Usuarios a todos los usuarios cuyo apellido termine en alguna cadena especificada
def filtrar_final_apellido(apellido):
    try:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT * FROM usuarios WHERE apPat LIKE %s OR apMat LIKE %s", (f'%{apellido}', f'%{apellido}'))
            for registro in cursor.fetchall():
                print(registro)
    except Exception as e:
        print(str(e))

# Cambia el genero de una pelicula, si existe, al indicado
def cambiar_genero(pelicula, genero):
    try:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM peliculas WHERE nombre = %s", (pelicula))
            if cursor.fetchone()[0] > 0:
                cursor.execute("UPDATE peliculas SET genero = %s WHERE nombre = %s", (genero, pelicula))
                print("Género actualizado correctamente")
            else:
                print("La película no existe en inventario")
                return
        conexion.commit()
    except Exception as e:
        print(str(e))

# Elimina las rentas anteriores a 3 dias a la fecha actual
def eliminar_rentas_anteriores():
    try:
        with conexion.cursor() as cursor:
            fecha_corte = (datetime.now() - timedelta(days=3)).date()
            cursor.execute("DELETE FROM rentar WHERE fecha_renta < %s", (fecha_corte))
            print("Rentas actualizadas")
        conexion.commit()
    except Exception as e:
        print(str(e))


#insertar_registros()
#cambiar_genero('Will well meet.', 'Amor')
#eliminar_rentas_anteriores()
#filtrar_final_apellido('ez')