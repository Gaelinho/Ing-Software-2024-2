from flask import Blueprint, request, render_template, flash, url_for, redirect
from alchemyClasses import db
from alchemyClasses.Usuario import Usuario

usuario_blueprint = Blueprint('usuario', __name__, url_prefix='/usuario')


@usuario_blueprint.route('/')
def inicial():
    return render_template('usuario.html')


@usuario_blueprint.route('/agregar', methods=['GET', 'POST'])
def agregar_usuario():
    if request.method == 'GET':
        return render_template('agregar_usuario.html')
    else:
        nombre = request.form['nombre']
        apPat = request.form['apPat']
        apMat = request.form['apMat']
        if apMat == '':
            apMat = None
        password = request.form['password']
        email = request.form['email']
        if email == '':
            email = None
        else:
            u = Usuario.query.filter_by(email=email).first()
            if u:
                flash('El email ya se encuentra registrado')
                return redirect(url_for('usuario.agregar_usuario'))
        superUser = request.form.get('superUser') == 'on'
        u = Usuario(nombre=nombre, ap_Pat=apPat, password=password, email=email, superUser=superUser, ap_Mat=apMat)
        db.session.add(u)
        db.session.commit()
        flash('Usuario agregado correctamente con el ID: {}'.format(u.idUsuario))
        return redirect(url_for('usuario.inicial'))


@usuario_blueprint.route('/eliminar', methods=['GET', 'POST'])
def eliminar_usuario():
    if request.method == 'GET':
        return render_template('eliminar_usuario.html')
    else:
        id = request.form['id']
        u = Usuario.query.filter(Usuario.idUsuario == id).first()
        if not u:
            flash('ID inexistente')
            return redirect(url_for('usuario.eliminar_usuario'))
        db.session.delete(u)
        db.session.commit()
        flash('Usuario con ID {} y todas las rentas en que participaba fueron eliminados correctamente'.format(id))
        return redirect(url_for('usuario.inicial'))

@usuario_blueprint.route('/actualizar', methods=['GET', 'POST'])
def actualizar_usuario_id():
    if request.method == 'GET':
        return render_template('id_usuario.html')
    else:
        id = request.form['id']
        usuario = Usuario.query.filter(Usuario.idUsuario==id).first()
        if usuario:
            return redirect(url_for('usuario.actualizar_usuario', id=id))
        else:
            flash('ID inexistente')
            return redirect((url_for('usuario.actualizar_usuario_id')))

@usuario_blueprint.route('actualizar/<int:id>', methods=['GET', 'POST'])
def actualizar_usuario(id):
    if request.method == 'GET':
        usuario = Usuario.query.filter(Usuario.idUsuario==id).first()
        return render_template('actualizar_usuario.html', usuario=usuario)
    else:
        email = request.form['email']
        u = Usuario.query.filter(Usuario.idUsuario==id).first()
        if email != '':
            u_e = Usuario.query.filter_by(email=email).first()
            if u_e and email != u.email:
                flash('El email ya se encuentra registrado')
                return redirect(url_for('usuario.actualizar_usuario', id=id))

        u.nombre = request.form['nombre']
        u.apPat = request.form['apPat']
        u.apMat = request.form['apMat']
        if u.apMat == '':
            u.apMat = None
        u.email = request.form['email']
        if u.email == '':
            u.email = None
        u.password = request.form['password']
        u.superUser = request.form.get('superUser') == 'on'
        db.session.commit()
        flash('Usuario actualizado correctamente con el ID: {}'.format(u.idUsuario))
        return redirect(url_for('usuario.inicial'))


@usuario_blueprint.route('/ver_usuarios')
def ver_todos_usuarios():
    return render_template('ver_usuarios.html', usuarios=Usuario.query.all())
