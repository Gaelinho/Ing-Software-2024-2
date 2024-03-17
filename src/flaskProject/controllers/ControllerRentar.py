from flask import Blueprint, request, render_template, flash, url_for, redirect
from alchemyClasses import db
from alchemyClasses.Rentar import Rentar
from alchemyClasses.Usuario import Usuario
from alchemyClasses.Pelicula import Pelicula
from datetime import date, timedelta, datetime

rentar_blueprint = Blueprint('rentar', __name__, url_prefix='/rentar')


@rentar_blueprint.route('/')
def inicial():
    return render_template('rentar.html')


@rentar_blueprint.route('/agregar', methods=['GET', 'POST'])
def agregar_renta():
    if request.method == 'GET':
        today = date.today().strftime('%Y-%m-%d')
        return render_template('agregar_renta.html', today=today)
    else:
        idUsuario = request.form['idUsuario']
        u = Usuario.query.filter(Usuario.idUsuario == idUsuario).first()
        if not u:
            flash('Usuario con ID {} no encontrado'.format(idUsuario))
            return redirect(url_for('rentar.agregar_renta'))
        idPelicula = request.form['idPelicula']
        p = Pelicula.query.filter(Pelicula.idPelicula == idPelicula).first()
        if not p:
            flash('Película con ID {} no encontrado'.format(idPelicula))
            return redirect(url_for('rentar.agregar_renta'))
        fechaRenta = request.form['fechaRenta']
        print(str(fechaRenta))
        diasRenta = request.form['diasRenta']
        if diasRenta == '':
            diasRenta = 0
        estatus = request.form.get('estatus') == 'on'
        r = Rentar(idUsuario, idPelicula, fechaRenta, diasRenta, estatus)

        db.session.add(r)
        db.session.commit()
        flash('Renta agregada correctamente con el ID: {}'.format(r.idRentar))
        return redirect(url_for('rentar.inicial'))


@rentar_blueprint.route('/actualizar', methods=['GET', 'POST'])
def actualizar_renta_id():
    if request.method == 'GET':
        return render_template('id_renta.html')
    else:
        id = request.form['id']
        renta = Rentar.query.filter(Rentar.idRentar == id).first()
        if renta:
            return redirect(url_for('rentar.actualizar_renta', id=id))
        else:
            flash('ID inexistente')
            return redirect((url_for('rentar.actualizar_renta_id')))

@rentar_blueprint.route('/actualizar/<int:id>', methods=['GET', 'POST'])
def actualizar_renta(id):
    if request.method == 'GET':
        renta = Rentar.query.filter(Rentar.idRentar==id).first()
        return render_template('actualizar_renta.html', renta=renta)
    else:
        r = Rentar.query.filter(Rentar.idRentar==id).first()
        r.estatus = request.form['estatus'] == 'on'
        db.session.commit()
        flash('Renta actualizada correctamente con el ID: {}'.format(r.idRentar))
        return redirect(url_for('rentar.inicial'))


@rentar_blueprint.route('/ver_rentas')
def ver_todas_rentas():
    return render_template('ver_rentas.html', rentas=Rentar.query.all(), timedelta=timedelta, date=date, datetime=datetime)
