from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Reponse(db.Model):
    __tablename__ = 'reponse'

    id = db.Column(db.Integer, primary_key=True)

    role = db.Column(db.String(64), nullable=True)
    role_autre = db.Column(db.Text, nullable=True)
    experience = db.Column(db.String(64), nullable=True)
    frequence_utilisation = db.Column(db.String(64), nullable=True)
    anciennete_systeme = db.Column(db.String(64), nullable=True)

    probleme_attente = db.Column(db.Boolean, default=False)
    probleme_saisie = db.Column(db.Boolean, default=False)
    probleme_disponibilite = db.Column(db.Boolean, default=False)
    probleme_autre = db.Column(db.Text, nullable=True)

    obstacle_formation = db.Column(db.Boolean, default=False)
    obstacle_interface = db.Column(db.Boolean, default=False)
    obstacle_support = db.Column(db.Boolean, default=False)
    obstacle_bugs = db.Column(db.Boolean, default=False)
    obstacle_aucun = db.Column(db.Boolean, default=False)

    facilite_utilisation = db.Column(db.String(64), nullable=True)
    satisfaction = db.Column(db.String(64), nullable=True)

    fonction_reservation_en_ligne = db.Column(db.Boolean, default=False)
    fonction_notification = db.Column(db.Boolean, default=False)
    fonction_gestion_rdv = db.Column(db.Boolean, default=False)
    fonction_autre = db.Column(db.Text, nullable=True)

    ameliorer_rapidite = db.Column(db.Boolean, default=False)
    ameliorer_interface = db.Column(db.Boolean, default=False)
    ameliorer_precision = db.Column(db.Boolean, default=False)
    ameliorer_support = db.Column(db.Boolean, default=False)
    ameliorer_doc = db.Column(db.Boolean, default=False)

    souhaite_formation = db.Column(db.String(64), nullable=True)
    prefere_version = db.Column(db.String(64), nullable=True)

    incident_securite = db.Column(db.String(64), nullable=True)
    confiance_securite = db.Column(db.String(64), nullable=True)

    notif_sms = db.Column(db.Boolean, default=False)
    notif_email = db.Column(db.Boolean, default=False)
    notif_app = db.Column(db.Boolean, default=False)
    notif_appel = db.Column(db.Boolean, default=False)
    notif_aucun = db.Column(db.Boolean, default=False)

    souhaite_avis = db.Column(db.String(64), nullable=True)
    commentaire = db.Column(db.Text, nullable=True)
    importance_securite = db.Column(db.String(64), nullable=True)
