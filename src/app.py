from flask import Flask
from sqlalchemy import and_, or_

from alchemyClasses import db
from alchemyClasses.Usuario import Usuario
from alchemyClasses.Pelicula import Pelicula
from alchemyClasses.Rentar import Rentar
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://lab:Developer123!@localhost:3306/lab_ing_software'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)

def elegir_tabla(texto):
    dec = 0
    while dec < 1 or dec > 3:
        try:
            dec = int(input(f"Elige la tabla {texto}:\n" +
                            "1. Usuarios\n" +
                            "2. Películas\n" +
                            "3. Rentar\n"))
            if dec == 1:
                return "Usuarios"
            elif dec == 2:
                return "Peliculas"
            elif dec == 3:
                return "Rentar"
            else:
                print("Opción inválida")
        except ValueError:
            print("Opción inválida")

def ver_registros():
    tabla = elegir_tabla("de la cual se quieren ver todos los registros")
    print(f"Registros de la tabla: {tabla}\n")
    with app.app_context():
        if tabla == "Usuarios":
            for usuario in Usuario.query.all():
                print(usuario)
        elif tabla == "Peliculas":
            for pelicula in Pelicula.query.all():
                print(pelicula)
        elif tabla == "Rentar":
            for renta in Rentar.query.all():
                print(renta)

def filtrar_registros():
    tabla = elegir_tabla("de la cual se quiere filtrar por ID")
    while True:
        try:
            id = int(input("Ingrese el ID a buscar: "))
            break
        except ValueError:
            print("Un ID válido debe ser un int")
    with app.app_context():
        try:
            if tabla == "Usuarios":
                registro = Usuario.query.filter(Usuario.idUsuario == id).first()
            elif tabla == "Peliculas":
                registro = Pelicula.query.filter(Pelicula.idPelicula == id).first()
            elif tabla == "Rentar":
                registro = Rentar.query.filter(Rentar.idRentar == id).first()

            if registro != None:
                print(registro)
            else:
                print(f'ID {id} no encontrado')
        except Exception as e:
            print(f'Error al filtrar')

def actualizar():
    tabla = elegir_tabla("de la cual se quiere actualizar información (nombre/fecha de renta) de un registro")
    while True:
        try:
            id = int(input("Ingrese el ID para actualizar: "))
            break
        except ValueError:
            print("Un ID válido debe ser un int")
    with app.app_context():
        try:
            if tabla == "Usuarios":
                registro = Usuario.query.filter(Usuario.idUsuario == id).first()
            elif tabla == "Peliculas":
                registro = Pelicula.query.filter(Pelicula.idPelicula == id).first()
            elif tabla == "Rentar":
                registro = Rentar.query.filter(Rentar.idRentar == id).first()

            if registro != None:
                if tabla == "Usuarios":
                    nuevo = input("Ingresa el nuevo nombre del usuario: ")
                    registro.nombre = nuevo
                elif tabla == "Peliculas":
                    nuevo = input("Ingresa el nuevo nombre de la película: ")
                    registro.nombre = nuevo
                elif tabla == "Rentar":
                    while True:
                        try:
                            nuevo = input("Ingresa la nueva fecha de renta (YYYY-MM-DD): ")
                            nuevo = datetime.strptime(nuevo, "%Y-%m-%d")
                            registro.fecha_renta = nuevo
                            break
                        except ValueError:
                            print("Formato de fecha incorrecto")
                db.session.commit()
                print(f"Actualización en la tabla {tabla} completada")
            else:
                print(f'ID {id} no encontrado')
        except Exception:
            print(f'Error al actualizar')

def eliminar_id():
    tabla = elegir_tabla("de la cual se quiere eliminar un registro por ID")
    while True:
        try:
            id = int(input("Ingrese el ID a eliminar: "))
            break
        except Exception as e:
            print("Un ID válido debe ser un int")
    with app.app_context():
        try:
            if tabla == "Usuarios":
                registro = Usuario.query.filter(Usuario.idUsuario == id).first()
            elif tabla == "Peliculas":
                registro = Pelicula.query.filter(Pelicula.idPelicula == id).first()
            elif tabla == "Rentar":
                registro = Rentar.query.filter(Rentar.idRentar == id).first()

            if registro != None:
                db.session.delete(registro)
                db.session.commit()
                print(f"Eliminación en la tabla {tabla} completada")
            else:
                print(f'ID {id} no encontrado')
        except Exception as e:
            print(f'Error al eliminar')

def eliminar_todo():
    tabla = elegir_tabla("de la cual se quieren eliminar todos los registros")
    with app.app_context():
        try:
            if tabla == "Usuarios":
                db.session.query(Usuario).delete()
            elif tabla == "Peliculas":
                db.session.query(Pelicula).delete()
            elif tabla == "Rentar":
                db.session.query(Rentar).delete()
            db.session.commit()
            print(f"Tabla {tabla} vaciada correctamente")
        except Exception as e:
            print("Error al eliminar")

if __name__ == '__main__':
    print("Bienvenido\n")
    dec = -1
    while dec != 0:
        try:
            dec = int(input("¿Qué deseas hacer?\n" +
                            "1. Ver los registros de una tabla\n" +
                            "2. Filtrar los registros de una tabla por ID\n" +
                            "3. Actualizar información (nombre/fecha de renta) de un registro\n" +
                            "4. Eliminar registro de una tabla por ID\n" +
                            "5. Eliminar todos los registros de una tabla\n" +
                            "0. Salir\n"))
        except ValueError:
            pass
        if dec == 0:
            pass
        elif dec == 1:
            ver_registros()
        elif dec == 2:
            filtrar_registros()
        elif dec == 3:
            actualizar()
        elif dec == 4:
            eliminar_id()
        elif dec == 5:
            eliminar_todo()
        else:
            print("Opción inválida")
    print("Hasta luego")