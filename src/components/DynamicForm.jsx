import { useState } from 'react';

export function DynamicForm({ formType, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState({
    consent1: false,
    consent2: false,
    consent3: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setConsent(prev => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formType === 'qualification') {
      if (!formData.fname?.trim()) newErrors.fname = 'Name required';
      if (!formData.lname?.trim()) newErrors.lname = 'Last name required';
      if (!formData.email?.trim()) newErrors.email = 'Email required';
      if (!formData.org?.trim()) newErrors.org = 'Organization required';
      if (!consent.consent1) newErrors.consent1 = 'Level 1 consent required';
    } else if (formType === 'contact') {
      if (!formData.cname?.trim()) newErrors.cname = 'Name required';
      if (!formData.corg?.trim()) newErrors.corg = 'Organization required';
      if (!formData.cemail?.trim()) newErrors.cemail = 'Email required';
      if (!formData.cmessage?.trim()) newErrors.cmessage = 'Message required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Completa tutti i campi obbligatori');
      return;
    }
    
    onSubmit({
      ...formData,
      consent,
      refId: `DS-${Date.now().toString(36).toUpperCase().slice(-8)}`
    });
  };

  if (formType === 'qualification') {
    return (
      <form className="ds-form ds-form--centered" onSubmit={handleSubmit}>
        <div className="ds-form-row">
          <div className="ds-form-field">
            <label htmlFor="fname">Nome *</label>
            <input
              id="fname"
              type="text"
              name="fname"
              placeholder="Nome"
              className={errors.fname ? 'ds-field-error' : ''}
              value={formData.fname || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="ds-form-field">
            <label htmlFor="lname">Cognome *</label>
            <input
              id="lname"
              type="text"
              name="lname"
              placeholder="Cognome"
              className={errors.lname ? 'ds-field-error' : ''}
              value={formData.lname || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="ds-form-field">
          <label htmlFor="email">Email aziendale *</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="nome@azienda.com"
            value={formData.email || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="ds-form-field">
          <label htmlFor="org">Azienda *</label>
          <input
            id="org"
            type="text"
            name="org"
            placeholder="Nome azienda o studio"
            value={formData.org || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="ds-form-row">
          <div className="ds-form-field">
            <label htmlFor="role">Ruolo *</label>
            <select
              id="role"
              name="role"
              value={formData.role || ''}
              onChange={handleInputChange}
            >
              <option value="">Seleziona ruolo</option>
              <option>Security / Risk</option>
              <option>Legale</option>
              <option>Compliance</option>
              <option>HR</option>
              <option>Direzione</option>
              <option>Altro</option>
            </select>
          </div>
          <div className="ds-form-field">
            <label htmlFor="orgType">Tipo di organizzazione *</label>
            <select
              id="orgType"
              name="orgType"
              value={formData.orgType || ''}
              onChange={handleInputChange}
            >
              <option value="">Seleziona</option>
              <option>Azienda</option>
              <option>Studio legale</option>
              <option>Istituto finanziario</option>
              <option>Consulenza</option>
              <option>Fondo</option>
              <option>Pubblico</option>
              <option>Altro</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '18px', borderTop: '1px solid var(--ds-border)', paddingTop: '16px' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--ds-text-3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', display: 'block' }}>
            Dichiarazione di consenso (GDPR Art. 7 / FADP)
          </label>
          
          <div className="ds-form-field" style={{ flexDirection: 'row', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
            <input
              type="checkbox"
              id="consent1"
              name="consent1"
              style={{ width: 'auto', marginTop: '3px' }}
              checked={consent.consent1}
              onChange={handleConsentChange}
            />
            <label htmlFor="consent1" style={{ textTransform: 'none', fontSize: '12px', color: 'var(--ds-text-2)' }}>
              <strong>Livello 1 — Elaborazione contatto</strong><br />
              Acconsento a che DeepSearch elabori i miei dati di contatto per rispondere a questa richiesta.
            </label>
          </div>

          <div className="ds-form-field" style={{ flexDirection: 'row', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
            <input
              type="checkbox"
              id="consent2"
              name="consent2"
              style={{ width: 'auto', marginTop: '3px' }}
              checked={consent.consent2}
              onChange={handleConsentChange}
            />
            <label htmlFor="consent2" style={{ textTransform: 'none', fontSize: '12px', color: 'var(--ds-text-2)' }}>
              <strong>Livello 2 — Marketing &amp; Arricchimento</strong> (Opzionale)<br />
              Acconsento a ricevere aggiornamenti sui prodotti.
            </label>
          </div>

          <div className="ds-form-field" style={{ flexDirection: 'row', gap: '10px', alignItems: 'flex-start' }}>
            <input
              type="checkbox"
              id="consent3"
              name="consent3"
              style={{ width: 'auto', marginTop: '3px' }}
              checked={consent.consent3}
              onChange={handleConsentChange}
            />
            <label htmlFor="consent3" style={{ textTransform: 'none', fontSize: '12px', color: 'var(--ds-text-2)' }}>
              <strong>Livello 3 — Condivisione dati</strong> (Opzionale)<br />
              Acconsento alla condivisione con partner certificati DeepSearch.
            </label>
          </div>
        </div>

        <button type="submit" className="ds-submit-btn">
          Invia richiesta — Instradamento al team umano
        </button>
        
      </form>
    );
  }

  if (formType === 'contact') {
    return (
      <form className="ds-form ds-form--centered" onSubmit={handleSubmit}>
        <div className="ds-form-row">
          <div className="ds-form-field">
            <label htmlFor="cname">Nome *</label>
            <input
              id="cname"
              type="text"
              name="cname"
              placeholder="Nome completo"
              value={formData.cname || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="ds-form-field">
            <label htmlFor="corg">Azienda *</label>
            <input
              id="corg"
              type="text"
              name="corg"
              placeholder="Azienda"
              value={formData.corg || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="ds-form-field">
          <label htmlFor="cemail">Email *</label>
          <input
            id="cemail"
            type="email"
            name="cemail"
            placeholder="Email"
            value={formData.cemail || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="ds-form-field">
          <label htmlFor="cphone">Telefono</label>
          <input
            id="cphone"
            type="tel"
            name="cphone"
            placeholder="Numero di telefono"
            value={formData.cphone || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="ds-form-field">
          <label htmlFor="cmessage">Messaggio *</label>
          <textarea
            id="cmessage"
            name="cmessage"
            placeholder="Descrivi la tua richiesta..."
            rows="3"
            value={formData.cmessage || ''}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="ds-submit-btn">Invia al team</button>
        
      </form>
    );
  }

  return null;
}

export default DynamicForm;
