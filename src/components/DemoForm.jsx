import { useState } from 'react';
import { useSession } from '../store/sessionStore.js';
import { captureLead } from '../services/api.js';

export default function DemoForm({ formType, onSubmit }) {
  const qualification       = useSession((s) => s.qualification);
  const visitedScreens      = useSession((s) => s.visitedScreens);
  const intentSignals          = useSession((s) => s.intentSignals);
  const backendSessionId       = useSession((s) => s.backendSessionId);
  const qualificationHistory   = useSession((s) => s.qualificationHistory);
  const submissionStatus    = useSession((s) => s.submissionStatus);
  const errorMessage        = useSession((s) => s.errorMessage);
  const setSubmissionStatus = useSession((s) => s.setSubmissionStatus);
  const sessionStart        = useSession((s) => s.sessionStart);

  const [form, setForm] = useState(() => {
    if (formType === 'demo') {
      return {
        ...(qualification.role    ? { ruolo: qualification.role }    : {}),
        ...(qualification.geoArea ? { paese: qualification.geoArea } : {}),
      };
    }
    if (formType === 'contact' || formType === 'genericRequest') {
      return {
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
    if (!form.nome?.trim())    newErrors.nome    = true;
    if (!form.azienda?.trim()) newErrors.azienda = true;
    if (!form.email?.trim())   newErrors.email   = true;
    if (formType === 'demo' && !form.ruolo?.trim()) newErrors.ruolo = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmissionStatus('submitting');

    const sessionDuration = Math.round((Date.now() - sessionStart) / 1000);

    const payload = {
      ...(backendSessionId ? { session_id: backendSessionId } : {}),
      contact: {
        nome:     form.nome     || '',
        azienda:  form.azienda  || '',
        email:    form.email    || '',
        telefono: form.telefono || '',
        ruolo:    form.ruolo    || '',
        paese:    form.paese    || '',
      },
      // Only send qualification fields that were actually captured during the journey.
      // Uses canonical backend field names directly — no shim remapping needed.
      qualification: Object.fromEntries(
        Object.entries({
          target:         qualification.subjectType?.toLowerCase() || null,
          obiettivo:      qualification.intent                     || null,
          request_nature: qualification.interest                   || null,
          func_role:      qualification.funcRole                   || null,
          geografia:      qualification.geoArea                   || null,
          role:           qualification.role                       || null,
          need_type:      qualification.needType                   || null,
          source_flow:    qualification.sourceFlow                 || null,
          entry_screen:   qualification.entryScreen                || null,
        }).filter(([, v]) => v !== null)
      ),
      metadata: {
        source:                   'deepsearch_chatbot_widget',
        session_duration_seconds: sessionDuration,
        engagement_depth:         visitedScreens?.length || 0,
        visited_screens:          visitedScreens       || [],
        intent_signals:           intentSignals        || {},
        source_flow:              qualification.sourceFlow || null,
        qualification_steps:      qualificationHistory || [],
      },
      note: form.note || form.messaggio || '',
    };

    try {
      await captureLead(payload);
      setSubmissionStatus('submitted');
      onSubmit({ ...form, qualification: payload.qualification });
    } catch (err) {
      console.error('[DemoForm] Lead capture failed:', err);

      // Map backend field errors back onto the form so the user sees exactly what's wrong.
      const backendErrors = err.body?.errors ?? [];
      const fieldErrors = {};
      let genericMsg = null;

      for (const { field, message } of backendErrors) {
        if (field === 'contact.email' || field === 'body.contact.email') {
          fieldErrors.email = 'Indirizzo email non valido — verifica il formato (es. nome@azienda.it)';
        } else if (field === 'contact.nome' || field === 'body.contact.nome') {
          fieldErrors.nome = true;
        } else if (field === 'contact.azienda' || field === 'body.contact.azienda') {
          fieldErrors.azienda = true;
        } else {
          genericMsg = message || 'Errore nell\'invio. Riprova o contattaci direttamente.';
        }
      }

      if (Object.keys(fieldErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
        setSubmissionStatus('idle'); // clear submitting state so the user can fix and retry
      } else {
        setSubmissionStatus('error', genericMsg ?? 'Errore nell\'invio. Riprova o contattaci direttamente.');
      }
    }
  };

  const isSubmitting = submissionStatus === 'submitting';

  // ── Qualification summary helper ─────────────────────────────────────────
  const hasQualification = qualification.subjectType || qualification.intent || qualification.interest
    || qualification.geoArea || qualification.role || qualification.funcRole || qualification.needType;

  const qualSummaryEl = !hasQualification ? null : (
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
        {qualification.interest && (
          <div className="ds-qual-row">
            <span className="ds-qual-label">Natura della richiesta</span>
            <span className="ds-qual-value">{qualification.interest}</span>
          </div>
        )}
        {qualification.funcRole && (
          <div className="ds-qual-row">
            <span className="ds-qual-label">Funzione</span>
            <span className="ds-qual-value">{qualification.funcRole}</span>
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
        {qualification.needType && (
          <div className="ds-qual-row">
            <span className="ds-qual-label">Esigenza</span>
            <span className="ds-qual-value">{qualification.needType}</span>
          </div>
        )}
      </div>
    </div>
  );

  const errorMsgEl = submissionStatus === 'error'
    ? <div className="ds-form-error-msg">{errorMessage}</div>
    : null;

  // ── Demo form ────────────────────────────────────────────────────────────
  if (formType === 'demo') {
    return (
      <form className="ds-form ds-form--centered" onSubmit={handleSubmit}>
        {qualSummaryEl}

        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>Nome *</label>
            <input name="nome" type="text" placeholder="Nome" value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} disabled={isSubmitting} />
          </div>
          <div className="ds-form-field">
            <label>Azienda *</label>
            <input name="azienda" type="text" placeholder="Azienda" value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} disabled={isSubmitting} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>Ruolo *</label>
          <input name="ruolo" type="text" placeholder="Ruolo" value={form.ruolo || ''} onChange={handleChange} className={errors.ruolo ? 'ds-field-error' : ''} disabled={isSubmitting} />
        </div>
        <div className="ds-form-field">
          <label>Email *</label>
          <input name="email" type="email" placeholder="email@azienda.com" value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} disabled={isSubmitting} />
          {typeof errors.email === 'string' && <span className="ds-field-error-msg">{errors.email}</span>}
        </div>
        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>Telefono</label>
            <input name="telefono" type="tel" placeholder="Telefono" value={form.telefono || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="ds-form-field">
            <label>Paese</label>
            <input name="paese" type="text" placeholder="Paese" value={form.paese || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>Note</label>
          <textarea name="note" rows="2" placeholder="Informazioni aggiuntive (opzionale)" value={form.note || ''} onChange={handleChange} disabled={isSubmitting} />
        </div>

        <button type="submit" className="ds-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Invio in corso...' : 'Richiedi Demo Riservata'}
        </button>
        {errorMsgEl}
      </form>
    );
  }

  // ── Contact / Generic request form ───────────────────────────────────────
  if (formType === 'contact' || formType === 'genericRequest') {
    const isGeneric = formType === 'genericRequest';
    return (
      <form className="ds-form ds-form--centered" onSubmit={handleSubmit}>
        {qualSummaryEl}

        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>Nome *</label>
            <input name="nome" type="text" placeholder="Nome" value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} disabled={isSubmitting} />
          </div>
          <div className="ds-form-field">
            <label>Azienda *</label>
            <input name="azienda" type="text" placeholder="Azienda" value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} disabled={isSubmitting} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>Email *</label>
          <input name="email" type="email" placeholder="Email" value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} disabled={isSubmitting} />
          {typeof errors.email === 'string' && <span className="ds-field-error-msg">{errors.email}</span>}
        </div>
        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>Telefono</label>
            <input name="telefono" type="tel" placeholder="Telefono" value={form.telefono || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="ds-form-field">
            <label>Paese</label>
            <input name="paese" type="text" placeholder="Paese" value={form.paese || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
        </div>
        {!isGeneric && (
          <div className="ds-form-field">
            <label>Messaggio</label>
            <textarea name="messaggio" rows="3" placeholder="Descrivi la tua richiesta..." value={form.messaggio || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
        )}
        <button type="submit" className="ds-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Invio in corso...' : (isGeneric ? 'Invia Richiesta' : 'Invia Messaggio')}
        </button>
        {errorMsgEl}
      </form>
    );
  }

  // ── Fallback generic form ────────────────────────────────────────────────
  return (
    <form className="ds-form ds-form--centered" onSubmit={handleSubmit}>
      <div className="ds-form-row">
        <div className="ds-form-field">
          <label>Nome *</label>
          <input name="nome" type="text" placeholder="Nome" value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} disabled={isSubmitting} />
        </div>
        <div className="ds-form-field">
          <label>Azienda *</label>
          <input name="azienda" type="text" placeholder="Azienda" value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} disabled={isSubmitting} />
        </div>
      </div>
      <div className="ds-form-field">
        <label>Email *</label>
        <input name="email" type="email" placeholder="Email" value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} disabled={isSubmitting} />
        {typeof errors.email === 'string' && <span className="ds-field-error-msg">{errors.email}</span>}
      </div>
      <div className="ds-form-field">
        <label>Telefono</label>
        <input name="telefono" type="tel" placeholder="Telefono" value={form.telefono || ''} onChange={handleChange} disabled={isSubmitting} />
      </div>
      <button type="submit" className="ds-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
      </button>
      {errorMsgEl}
    </form>
  );
}
