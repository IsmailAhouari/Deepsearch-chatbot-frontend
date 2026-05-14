import React, { useState } from 'react';
import { useSession } from '../store/sessionStore.js';

export default function DemoForm({ formType, onSubmit }) {
  const qualification = useSession((s) => s.qualification);
  const [form, setForm] = useState(() => {
    if (formType === 'demo') {
      return {
        ...(qualification.role ? { ruolo: qualification.role } : {}),
        ...(qualification.geoArea ? { paese: qualification.geoArea } : {}),
      };
    }
    return {};
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nome?.trim()) newErrors.nome = true;
    if (!form.azienda?.trim()) newErrors.azienda = true;
    if (!form.email?.trim()) newErrors.email = true;

    if (formType === 'demo') {
      if (!form.ruolo?.trim()) newErrors.ruolo = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Merge qualification data into the submission payload with requested schema
    const mappedQual = {
      subject_type: qualification.subjectType?.toLowerCase(),
      motivation: qualification.intent,
      country: qualification.geoArea,
      user_role: qualification.role
    };
    
    onSubmit({
      ...form,
      qualification: mappedQual,
    });
  };

  // Check if we have qualification data to show
  const hasQualification = qualification.subjectType || qualification.intent || qualification.geoArea || qualification.role;

  if (formType === 'demo') {
    return (
      <form className="ds-form ds-form--centered" onSubmit={handleSubmit}>
        {/* Qualification summary — shows all previously collected answers */}
        {hasQualification && (
          <div className="ds-qual-summary">
            <div className="ds-qual-summary-title">Riepilogo qualificazione</div>
            <div className="ds-qual-summary-grid">
              {qualification.subjectType && (
                <div className="ds-qual-row">
                  <span className="ds-qual-label">Soggetto</span>
                  <span className="ds-qual-value">{qualification.subjectType}</span>
                </div>
              )}
              {qualification.intent && (
                <div className="ds-qual-row">
                  <span className="ds-qual-label">Motivazione</span>
                  <span className="ds-qual-value">{qualification.intent}</span>
                </div>
              )}
              {qualification.geoArea && (
                <div className="ds-qual-row">
                  <span className="ds-qual-label">Area geografica</span>
                  <span className="ds-qual-value">{qualification.geoArea}</span>
                </div>
              )}
              {qualification.role && (
                <div className="ds-qual-row">
                  <span className="ds-qual-label">Funzione</span>
                  <span className="ds-qual-value">{qualification.role}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>Nome *</label>
            <input name="nome" type="text" placeholder="Nome" value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} />
          </div>
          <div className="ds-form-field">
            <label>Azienda *</label>
            <input name="azienda" type="text" placeholder="Azienda" value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>Ruolo *</label>
          <input name="ruolo" type="text" placeholder="Ruolo" value={form.ruolo || ''} onChange={handleChange} className={errors.ruolo ? 'ds-field-error' : ''} />
        </div>
        <div className="ds-form-field">
          <label>Email *</label>
          <input name="email" type="email" placeholder="email@azienda.com" value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} />
        </div>
        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>Telefono</label>
            <input name="telefono" type="tel" placeholder="Telefono" value={form.telefono || ''} onChange={handleChange} />
          </div>
          <div className="ds-form-field">
            <label>Paese</label>
            <input name="paese" type="text" placeholder="Paese" value={form.paese || ''} onChange={handleChange} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>Note</label>
          <textarea name="note" rows="2" placeholder="Informazioni aggiuntive (opzionale)" value={form.note || ''} onChange={handleChange} />
        </div>
        <button type="submit" className="ds-submit-btn">Richiedi Demo Riservata</button>
        
      </form>
    );
  }

  if (formType === 'contact' || formType === 'genericRequest') {
    const isGeneric = formType === 'genericRequest';
    return (
      <form className="ds-form ds-form--centered" onSubmit={handleSubmit}>
        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>Nome *</label>
            <input name="nome" type="text" placeholder="Nome" value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} />
          </div>
          <div className="ds-form-field">
            <label>Azienda *</label>
            <input name="azienda" type="text" placeholder="Azienda" value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>Email *</label>
          <input name="email" type="email" placeholder="Email" value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} />
        </div>
        <div className="ds-form-field">
          <label>Telefono</label>
          <input name="telefono" type="tel" placeholder="Telefono" value={form.telefono || ''} onChange={handleChange} />
        </div>
        {!isGeneric && (
          <div className="ds-form-field">
            <label>Messaggio</label>
            <textarea name="messaggio" rows="3" placeholder="Descrivi la tua richiesta..." value={form.messaggio || ''} onChange={handleChange} />
          </div>
        )}
        <button type="submit" className="ds-submit-btn">
          {isGeneric ? 'Invia Richiesta' : 'Invia Messaggio'}
        </button>
        
      </form>
    );
  }

  // Fallback / Generic form (standard)
  return (
    <form className="ds-form ds-form--centered" onSubmit={handleSubmit}>
      <div className="ds-form-row">
        <div className="ds-form-field">
          <label>Nome *</label>
          <input name="nome" type="text" placeholder="Nome" value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} />
        </div>
        <div className="ds-form-field">
          <label>Azienda *</label>
          <input name="azienda" type="text" placeholder="Azienda" value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} />
        </div>
      </div>
      <div className="ds-form-field">
        <label>Email *</label>
        <input name="email" type="email" placeholder="Email" value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} />
      </div>
      <div className="ds-form-field">
        <label>Telefono</label>
        <input name="telefono" type="tel" placeholder="Telefono" value={form.telefono || ''} onChange={handleChange} />
      </div>
      <button type="submit" className="ds-submit-btn">Invia Richiesta</button>
      
    </form>
  );
}
