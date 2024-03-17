from flask import Blueprint, request, render_template, flash, url_for, redirect
from alchemyClasses import db
from alchemyClasses.Pelicula import Pelicula

pelicula_blueprint = Blueprint('pelicula', __name__, url_prefix='/pelicula')


@pelicula_blueprint.route('/')
def inicial():
    return render_template('pelicula.html')


@pelicula_blueprint.route('/agregar', methods=['GET', 'POST'])
def agregar_pelicula():
    if request.method == 'GET':
        return render_template('agregar_pelicula.html')
    else:
        nombre = request.form['nombre']
        genero = request.form['genero']
        if genero == '':
            genero = None
        duracion = request.form['duracion']
        if duracion == '':
            duracion = None
        inventario = request.form['inventario']
        p = Pelicula(nombre, genero, duracion, inventario)
        db.session.add(p)
        db.session.commit()
        flash('Película agregada correctamente con el ID: {}'.format(p.idPelicula))
        return redirect(url_for('pelicula.inicial'))


@pelicula_blueprint.route('/eliminar', methods=['GET', 'POST'])
def eliminar_pelicula():
    if request.method == 'GET':
        return render_template('eliminar_pelicula.html')
    else:
        id = request.form['id']
        p = Pelicula.query.filter(Pelicula.idPelicula == id).first()
        if not p:
            flash('ID inexistente')
            return redirect(url_for('pelicula.eliminar_pelicula'))
        db.session.delete(p)
        db.session.commit()
        flash('Película con ID {} y todas las rentas en que participaba fueron eliminadas correctamente'.format(id))
        return redirect(url_for('pelicula.inicial'))


@pelicula_blueprint.route('/actualizar', methods=['GET', 'POST'])
def actualizar_pelicula_id():
    if request.method == 'GET':
        return render_template('id_pelicula.html')
    else:
        id = request.form['id']
        pelicula = Pelicula.query.filter(Pelicula.idPelicula == id).first()
        if pelicula:
            return redirect(url_for('pelicula.actualizar_pelicula', id=id))
        else:
            flash('ID inexistente')
            return redirect((url_for('pelicula.actualizar_pelicula_id')))

@pelicula_blueprint.route('actualizar/<int:id>', methods=['GET', 'POST'])
def actualizar_pelicula(id):
    if request.method == 'GET':
        pelicula = Pelicula.query.filter(Pelicula.idPelicula==id).first()
        return render_template('actualizar_pelicula.html', pelicula=pelicula)
    else:
        p = Pelicula.query.filter(Pelicula.idPelicula==id).first()
        p.nombre = request.form['nombre']
        p.genero = request.form['genero']
        if p.genero == '':
            p.genero = None
        p.duracion = request.form['duracion']
        if p.duracion == '':
            p.duracion = None
        p.inventario = request.form['inventario']
        db.session.commit()
        flash('Película actualizada correctamente con el ID: {}'.format(p.idPelicula))
        return redirect(url_for('pelicula.inicial'))


@pelicula_blueprint.route('/ver_peliculas')
def ver_todos_usuarios():
    return render_template('ver_peliculas.html', peliculas=Pelicula.query.all())
