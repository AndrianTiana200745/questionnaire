from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Reponse(db.Model):
    __tablename__ = 'reponse'

    id = db.Column(db.Integer, primary_key=True)

    # Section 1 : Informations générales
    role = db.Column(db.Enum('Usager', 'Agent', 'Administrateur', 'Autre'), nullable=True)
    role_autre = db.Column(db.Text, nullable=True)
    experience = db.Column(db.Enum('Débutant', 'Intermédiaire', 'Avancé'), nullable=True)
    frequence_utilisation = db.Column(db.Enum(
        'Tous les jours',
        'Plusieurs fois par semaine',
        'Une fois par semaine',
        'Moins d’une fois par semaine'
    ), nullable=True)
    anciennete_systeme = db.Column(db.Enum(
        'Moins de 6 mois',
        '6 mois à 1 an',
        '1 à 3 ans',
        'Plus de 3 ans'
    ), nullable=True)

    # Section 2 : Besoins et satisfaction
    probleme_attente = db.Column(db.Boolean, default=False)
    probleme_saisie = db.Column(db.Boolean, default=False)
    probleme_disponibilite = db.Column(db.Boolean, default=False)
    probleme_autre = db.Column(db.Text, nullable=True)

    obstacle_formation = db.Column(db.Boolean, default=False)
    obstacle_interface = db.Column(db.Boolean, default=False)
    obstacle_support = db.Column(db.Boolean, default=False)
    obstacle_bugs = db.Column(db.Boolean, default=False)
    obstacle_aucun = db.Column(db.Boolean, default=False)

    facilite_utilisation = db.Column(db.Enum(
        'Très facile', 'Facile', 'Moyennement facile', 'Difficile', 'Très difficile'
    ), nullable=True)

    satisfaction = db.Column(db.Enum(
        'Très satisfait', 'Satisfait', 'Neutre', 'Insatisfait', 'Très insatisfait'
    ), nullable=True)

    # Section 3 : Fonctionnalités souhaitées
    fonction_reservation_en_ligne = db.Column(db.Boolean, default=False)
    fonction_notification = db.Column(db.Boolean, default=False)
    fonction_gestion_rdv = db.Column(db.Boolean, default=False)
    fonction_autre = db.Column(db.Text, nullable=True)

    ameliorer_rapidite = db.Column(db.Boolean, default=False)
    ameliorer_interface = db.Column(db.Boolean, default=False)
    ameliorer_precision = db.Column(db.Boolean, default=False)
    ameliorer_support = db.Column(db.Boolean, default=False)
    ameliorer_doc = db.Column(db.Boolean, default=False)

    souhaite_formation = db.Column(db.Enum('Oui', 'Non', 'Peut-être'), nullable=True)
    prefere_version = db.Column(db.Enum('Version mobile', 'Version bureau', 'Les deux'), nullable=True)

    # Section 4 : Sécurité et confiance
    incident_securite = db.Column(db.Enum('Oui', 'Non', 'Je ne sais pas'), nullable=True)
    confiance_securite = db.Column(db.Enum(
        'Tout à fait confiance', 'Plutôt confiance', 'Peu confiance', 'Pas du tout confiance'
    ), nullable=True)

    # Section 5 : Communication et notifications
    notif_sms = db.Column(db.Boolean, default=False)
    notif_email = db.Column(db.Boolean, default=False)
    notif_app = db.Column(db.Boolean, default=False)
    notif_appel = db.Column(db.Boolean, default=False)
    notif_aucun = db.Column(db.Boolean, default=False)

    souhaite_avis = db.Column(db.Enum('Oui', 'Non', 'Pas d’opinion'), nullable=True)

    # Question ouverte
    commentaire = db.Column(db.Text, nullable=True)

    # Dernier champ
    importance_securite = db.Column(db.Enum(
        'Très important', 'Important', 'Peu important', 'Pas du tout important'
    ), nullable=True)

