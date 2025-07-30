from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from models.models import db, Reponse
from prince import MCA

app = Flask(__name__)

# Configuration MariaDB
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://andrian:tonmotdepasse@localhost:3306/questionnaire'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Activer CORS pour toutes les routes /api/*, autoriser toutes origines (à restreindre en prod)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

# Token admin (à stocker plus sécuritairement en prod)
SECRET_ADMIN_TOKEN = "lolipop-c-le-top"

@app.route('/')
def index():
    return 'Hello'

@app.route('/init-db')
def init_db():
    with app.app_context():
        db.create_all()
    return 'Tables créées avec succès.'

def safe_bool(value):
    # Convertit une valeur en booléen, même si None ou autre
    return bool(value) if value is not None else False

@app.route('/api/soumettre', methods=['POST'])
def soumettre():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Données manquantes ou mal formatées."}), 400

    try:
        reponse = Reponse(
            role=data.get('role'),
            role_autre=data.get('role_autre'),
            experience=data.get('experience'),
            frequence_utilisation=data.get('frequence_utilisation'),
            anciennete_systeme=data.get('anciennete_systeme'),

            probleme_attente=safe_bool(data.get('probleme_attente')),
            probleme_saisie=safe_bool(data.get('probleme_saisie')),
            probleme_disponibilite=safe_bool(data.get('probleme_disponibilite')),
            probleme_autre=data.get('probleme_autre'),

            obstacle_formation=safe_bool(data.get('obstacle_formation')),
            obstacle_interface=safe_bool(data.get('obstacle_interface')),
            obstacle_support=safe_bool(data.get('obstacle_support')),
            obstacle_bugs=safe_bool(data.get('obstacle_bugs')),
            obstacle_aucun=safe_bool(data.get('obstacle_aucun')),

            facilite_utilisation=data.get('facilite_utilisation'),
            satisfaction=data.get('satisfaction'),

            fonction_reservation_en_ligne=safe_bool(data.get('fonction_reservation_en_ligne')),
            fonction_notification=safe_bool(data.get('fonction_notification')),
            fonction_gestion_rdv=safe_bool(data.get('fonction_gestion_rdv')),
            fonction_autre=data.get('fonction_autre'),

            ameliorer_rapidite=safe_bool(data.get('ameliorer_rapidite')),
            ameliorer_interface=safe_bool(data.get('ameliorer_interface')),
            ameliorer_precision=safe_bool(data.get('ameliorer_precision')),
            ameliorer_support=safe_bool(data.get('ameliorer_support')),
            ameliorer_doc=safe_bool(data.get('ameliorer_doc')),

            souhaite_formation=data.get('souhaite_formation'),
            prefere_version=data.get('prefere_version'),

            incident_securite=data.get('incident_securite'),
            confiance_securite=data.get('confiance_securite'),

            notif_sms=safe_bool(data.get('notif_sms')),
            notif_email=safe_bool(data.get('notif_email')),
            notif_app=safe_bool(data.get('notif_app')),
            notif_appel=safe_bool(data.get('notif_appel')),
            notif_aucun=safe_bool(data.get('notif_aucun')),

            souhaite_avis=data.get('souhaite_avis'),
            commentaire=data.get('commentaire'),
            importance_securite=data.get('importance_securite')
        )
        db.session.add(reponse)
        db.session.commit()
        return jsonify({"message": "Réponse enregistrée avec succès."}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erreur interne serveur : " + str(e)}), 500


@app.route('/api/analyse', methods=['GET'])
def analyse():
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '')
    if token != SECRET_ADMIN_TOKEN:
        return jsonify({"error": "Accès refusé. Administrateur requis."}), 403

    try:
        reponses = Reponse.query.all()
        if len(reponses) < 2:
            return jsonify({"error": "Pas assez de données pour une analyse ACM."}), 400

        data = [{
            'role': r.role,
            'role_autre': r.role_autre,
            'experience': r.experience,
            'frequence_utilisation': r.frequence_utilisation,
            'anciennete_systeme': r.anciennete_systeme,

            'probleme_attente': r.probleme_attente,
            'probleme_saisie': r.probleme_saisie,
            'probleme_disponibilite': r.probleme_disponibilite,
            'probleme_autre': r.probleme_autre,

            'obstacle_formation': r.obstacle_formation,
            'obstacle_interface': r.obstacle_interface,
            'obstacle_support': r.obstacle_support,
            'obstacle_bugs': r.obstacle_bugs,
            'obstacle_aucun': r.obstacle_aucun,

            'facilite_utilisation': r.facilite_utilisation,
            'satisfaction': r.satisfaction,

            'fonction_reservation_en_ligne': r.fonction_reservation_en_ligne,
            'fonction_notification': r.fonction_notification,
            'fonction_gestion_rdv': r.fonction_gestion_rdv,
            'fonction_autre': r.fonction_autre,

            'ameliorer_rapidite': r.ameliorer_rapidite,
            'ameliorer_interface': r.ameliorer_interface,
            'ameliorer_precision': r.ameliorer_precision,
            'ameliorer_support': r.ameliorer_support,
            'ameliorer_doc': r.ameliorer_doc,

            'souhaite_formation': r.souhaite_formation,
            'prefere_version': r.prefere_version,

            'incident_securite': r.incident_securite,
            'confiance_securite': r.confiance_securite,

            'notif_sms': r.notif_sms,
            'notif_email': r.notif_email,
            'notif_app': r.notif_app,
            'notif_appel': r.notif_appel,
            'notif_aucun': r.notif_aucun,

            'souhaite_avis': r.souhaite_avis,
            'commentaire': r.commentaire,
            'importance_securite': r.importance_securite
        } for r in reponses]

        df = pd.DataFrame(data).fillna("Inconnu")

        mca = MCA(n_components=2, random_state=42)
        coords = mca.fit(df).transform(df)
        coords_dict = coords.to_dict(orient='records')

        inertia = []
        try:
            inertia = list(mca.explained_inertia_)
        except AttributeError:
            inertia = []

        return jsonify({
            "coords": coords_dict,
            "explained_inertia": inertia,
            "nb_reponses": len(reponses)
        })

    except Exception as e:
        return jsonify({"error": "Erreur interne serveur : " + str(e)}), 500


if __name__ == '__main__':
    # En dev uniquement, pour prod utiliser gunicorn ou autre WSGI
    app.run(host='0.0.0.0', port=5088, debug=True)

