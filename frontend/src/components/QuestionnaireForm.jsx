import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function QuestionnaireForm() {
  const [resultat, setResultat] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    role_autre: '',
    experience: '',
    frequence_utilisation: '',
    anciennete_systeme: '',
    probleme_attente: false,
    probleme_saisie: false,
    probleme_disponibilite: false,
    probleme_autre: '',
    obstacle_formation: false,
    obstacle_interface: false,
    obstacle_support: false,
    obstacle_bugs: false,
    obstacle_aucun: false,
    facilite_utilisation: '',
    satisfaction: '',
    fonction_reservation_en_ligne: false,
    fonction_notification: false,
    fonction_gestion_rdv: false,
    fonction_autre: '',
    ameliorer_rapidite: false,
    ameliorer_interface: false,
    ameliorer_precision: false,
    ameliorer_support: false,
    ameliorer_doc: false,
    souhaite_formation: '',
    prefere_version: '',
    incident_securite: '',
    confiance_securite: '',
    notif_sms: false,
    notif_email: false,
    notif_app: false,
    notif_appel: false,
    notif_aucun: false,
    souhaite_avis: '',
    commentaire: '',
    importance_securite: '',
  });

  const [adminToken, setAdminToken] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingAnalyse, setLoadingAnalyse] = useState(false);

  // Initialiser Materialize select chaque fois que formData change
  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResultat(null);
    setLoadingSubmit(true);
    try {
      const res = await fetch('https://192.168.137.28:5088/api/soumettre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setResultat({ erreur: data.error || 'Erreur lors de la soumission.' });
      } else {
        setResultat({ message: data.message });
        // Réinitialisation des champs: booléens à false, autres à ''
        setFormData((prev) => {
          const resetData = {};
          for (const key in prev) {
            resetData[key] = typeof prev[key] === 'boolean' ? false : '';
          }
          return resetData;
        });
      }
    } catch (err) {
      setResultat({ erreur: 'Erreur réseau : ' + err.message });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleAnalyse = async () => {
    setResultat(null);
    setLoadingAnalyse(true);
    try {
      const res = await fetch('https://192.168.137.28:5088/api/analyse', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setResultat({ erreur: data.error || "Erreur lors de l'analyse." });
      } else {
        setResultat(data);
      }
    } catch (err) {
      setResultat({ erreur: 'Erreur réseau : ' + err.message });
    } finally {
      setLoadingAnalyse(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h4 className="center-align">📋 Questionnaire des besoins</h4>

      <form onSubmit={handleSubmit}>
        {/* Section 1 */}
        <div className="input-field">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Choisir un rôle</option>
            <option value="Usager">Usager</option>
            <option value="Agent">Agent</option>
            <option value="Administrateur">Administrateur</option>
            <option value="Autre">Autre</option>
          </select>
          <label htmlFor="role">Quel est votre rôle ?</label>
        </div>
        {formData.role === 'Autre' && (
          <div className="input-field">
            <input
              type="text"
              name="role_autre"
              value={formData.role_autre}
              onChange={handleChange}
              placeholder="Précisez votre rôle"
            />
          </div>
        )}

        <div className="input-field">
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Choisir une expérience</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
          </select>
          <label htmlFor="experience">Niveau d'expérience</label>
        </div>

        <div className="input-field">
          <select
            id="frequence_utilisation"
            name="frequence_utilisation"
            value={formData.frequence_utilisation}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Fréquence d’utilisation</option>
            <option value="Tous les jours">Tous les jours</option>
            <option value="Plusieurs fois par semaine">Plusieurs fois par semaine</option>
            <option value="Une fois par semaine">Une fois par semaine</option>
            <option value="Moins d’une fois par semaine">Moins d’une fois par semaine</option>
          </select>
          <label htmlFor="frequence_utilisation">Fréquence d'utilisation du système</label>
        </div>

        <div className="input-field">
          <select
            id="anciennete_systeme"
            name="anciennete_systeme"
            value={formData.anciennete_systeme}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Ancienneté</option>
            <option value="Moins de 6 mois">Moins de 6 mois</option>
            <option value="6 mois à 1 an">6 mois à 1 an</option>
            <option value="1 à 3 ans">1 à 3 ans</option>
            <option value="Plus de 3 ans">Plus de 3 ans</option>
          </select>
          <label htmlFor="anciennete_systeme">Ancienneté d’utilisation du système</label>
        </div>

        {/* Section 2 */}
        <h5>Problèmes fréquemment rencontrés</h5>
        {["probleme_attente", "probleme_saisie", "probleme_disponibilite"].map((field) => (
          <p key={field}>
            <label>
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
              />
              <span>{field.replace("probleme_", "").replace(/_/g, " ")}</span>
            </label>
          </p>
        ))}
        <div className="input-field">
          <input
            type="text"
            name="probleme_autre"
            value={formData.probleme_autre}
            onChange={handleChange}
            placeholder="Autre problème (préciser)"
          />
        </div>

        <h5>Obstacles rencontrés</h5>
        {["formation", "interface", "support", "bugs", "aucun"].map((o) => (
          <p key={o}>
            <label>
              <input
                type="checkbox"
                name={`obstacle_${o}`}
                checked={formData[`obstacle_${o}`]}
                onChange={handleChange}
              />
              <span>{o.charAt(0).toUpperCase() + o.slice(1)}</span>
            </label>
          </p>
        ))}

        <div className="input-field">
          <select
            id="facilite_utilisation"
            name="facilite_utilisation"
            value={formData.facilite_utilisation}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Facilité d’utilisation</option>
            {["Très facile", "Facile", "Moyennement facile", "Difficile", "Très difficile"].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
          <label htmlFor="facilite_utilisation">Facilité d'utilisation</label>
        </div>

        <div className="input-field">
          <select
            id="satisfaction"
            name="satisfaction"
            value={formData.satisfaction}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Satisfaction</option>
            {["Très satisfait", "Satisfait", "Neutre", "Insatisfait", "Très insatisfait"].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
          <label htmlFor="satisfaction">Niveau de satisfaction</label>
        </div>

        <h5>Fonctionnalités souhaitées</h5>
        {["fonction_reservation_en_ligne", "fonction_notification", "fonction_gestion_rdv"].map((field) => (
          <p key={field}>
            <label>
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
              />
              <span>{field.replace("fonction_", "").replace(/_/g, " ")}</span>
            </label>
          </p>
        ))}
        <div className="input-field">
          <input
            type="text"
            name="fonction_autre"
            value={formData.fonction_autre}
            onChange={handleChange}
            placeholder="Autre fonctionnalité"
          />
        </div>

        <h5>Améliorations souhaitées</h5>
        {["rapidite", "interface", "precision", "support", "doc"].map((a) => (
          <p key={a}>
            <label>
              <input
                type="checkbox"
                name={`ameliorer_${a}`}
                checked={formData[`ameliorer_${a}`]}
                onChange={handleChange}
              />
              <span>{a.charAt(0).toUpperCase() + a.slice(1)}</span>
            </label>
          </p>
        ))}

        <div className="input-field">
          <select
            id="souhaite_formation"
            name="souhaite_formation"
            value={formData.souhaite_formation}
            onChange={handleChange}
          >
            <option value="" disabled>Souhaitez-vous une formation ?</option>
            <option>Oui</option>
            <option>Non</option>
            <option>Peut-être</option>
          </select>
          <label htmlFor="souhaite_formation">Souhaitez-vous une formation ?</label>
        </div>

        <div className="input-field">
          <select
            id="prefere_version"
            name="prefere_version"
            value={formData.prefere_version}
            onChange={handleChange}
          >
            <option value="" disabled>Préférence de version</option>
            <option>Version mobile</option>
            <option>Version bureau</option>
            <option>Les deux</option>
          </select>
          <label htmlFor="prefere_version">Préférence de version</label>
        </div>

        <h5>Sécurité</h5>
        <div className="input-field">
          <select
            id="incident_securite"
            name="incident_securite"
            value={formData.incident_securite}
            onChange={handleChange}
          >
            <option value="" disabled>Incident sécurité</option>
            <option>Oui</option>
            <option>Non</option>
            <option>Je ne sais pas</option>
          </select>
          <label htmlFor="incident_securite">Incident sécurité</label>
        </div>

        <div className="input-field">
          <select
            id="confiance_securite"
            name="confiance_securite"
            value={formData.confiance_securite}
            onChange={handleChange}
          >
            <option value="" disabled>Confiance en la sécurité</option>
            <option>Tout à fait confiance</option>
            <option>Plutôt confiance</option>
            <option>Peu confiance</option>
            <option>Pas du tout confiance</option>
          </select>
          <label htmlFor="confiance_securite">Confiance en la sécurité</label>
        </div>

        <h5>Préférences de notification</h5>
        {["sms", "email", "app", "appel", "aucun"].map((n) => (
          <p key={n}>
            <label>
              <input
                type="checkbox"
                name={`notif_${n}`}
                checked={formData[`notif_${n}`]}
                onChange={handleChange}
              />
              <span>{n.toUpperCase()}</span>
            </label>
          </p>
        ))}

        <div className="input-field">
          <select
            id="souhaite_avis"
            name="souhaite_avis"
            value={formData.souhaite_avis}
            onChange={handleChange}
          >
            <option value="" disabled>Souhaitez-vous donner un avis ?</option>
            <option>Oui</option>
            <option>Non</option>
            <option>Pas d’opinion</option>
          </select>
          <label htmlFor="souhaite_avis">Souhaitez-vous donner un avis ?</label>
        </div>

        <div className="input-field">
          <textarea
            className="materialize-textarea"
            name="commentaire"
            value={formData.commentaire}
            onChange={handleChange}
            placeholder="Commentaire libre"
          ></textarea>
        </div>

        <div className="input-field">
          <select
            id="importance_securite"
            name="importance_securite"
            value={formData.importance_securite}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Importance de la sécurité</option>
            <option>Très important</option>
            <option>Important</option>
            <option>Peu important</option>
            <option>Pas du tout important</option>
          </select>
          <label htmlFor="importance_securite">Importance de la sécurité</label>
        </div>

        <div className="center">
          <button
            type="submit"
            className="btn blue"
            disabled={loadingSubmit}
            style={{ marginTop: 20 }}
          >
            {loadingSubmit ? 'Envoi...' : '✅ Soumettre la réponse'}
          </button>
        </div>
      </form>

      {/* Admin + Résultats */}
      <hr style={{ margin: '40px 0' }} />
      <div>
        <h5>🔐 Accès administrateur</h5>
        <div className="input-field" style={{ maxWidth: 400 }}>
          <input
            type="password"
            placeholder="Token admin"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
          />
        </div>
        <button
          onClick={handleAnalyse}
          className="btn green"
          disabled={!adminToken || loadingAnalyse}
        >
          {loadingAnalyse ? 'Analyse...' : '📊 Lancer l’analyse ACM'}
        </button>
      </div>

      {resultat && (
        <div className="card white z-depth-2" style={{ marginTop: 30, padding: 20 }}>
          {resultat.erreur && <div className="red-text">❌ {resultat.erreur}</div>}
          {resultat.message && <div className="green-text">✅ {resultat.message}</div>}
          {resultat.coords && (
            <>
              <h5>Résultats de l’analyse ACM</h5>
              <p><strong>Nombre de réponses :</strong> {resultat.nb_reponses}</p>
              <p><strong>Inertie expliquée :</strong> {resultat.explained_inertia.join(', ')}</p>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="0" name="Dim 1" />
                  <YAxis type="number" dataKey="1" name="Dim 2" />
                  <Tooltip />
                  <Legend />
                  <Scatter name="Individus" data={resultat.coords} fill="#007bff" />
                </ScatterChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      )}
    </div>
  );
}

