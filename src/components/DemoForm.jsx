import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from '../store/sessionStore.js';
import { captureLead } from '../services/api.js';
import { buildLeadPayload } from '../lib/buildLeadPayload.js';
import { resolveQualValue } from '../lib/resolveQualValue.js';

// Qualification summary rows, in display order. `group` is the
// `qualification.*` catalog group used to resolve the display value;
// `null` means the value is free text (rendered as-is).
const QUAL_SUMMARY_ROWS = [
  { key: 'subjectType',   group: 'subjectType' },
  { key: 'intent',        group: 'intent' },
  { key: 'role',          group: 'role' },
  { key: 'geoArea',       group: null },
  { key: 'contactReason', group: 'contactReason' },
  { key: 'needType',      group: 'needType' },
];

export default function DemoForm({ formType, onSubmit }) {
  const { t, i18n } = useTranslation('ui');
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
        ...(qualification.role    ? { ruolo: resolveQualValue(t, i18n, 'role', qualification.role) } : {}),
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

    const payload = buildLeadPayload(form, qualification, {
      sessionStart,
      visitedScreens,
      intentSignals,
      backendSessionId,
      qualificationHistory,
    }, formType);

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
          fieldErrors.email = t('errors.email.invalid');
        } else if (field === 'contact.nome' || field === 'body.contact.nome') {
          fieldErrors.nome = true;
        } else if (field === 'contact.azienda' || field === 'body.contact.azienda') {
          fieldErrors.azienda = true;
        } else {
          genericMsg = message || t('errors.submit.generic');
        }
      }

      if (Object.keys(fieldErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
        setSubmissionStatus('idle'); // clear submitting state so the user can fix and retry
      } else {
        setSubmissionStatus('error', genericMsg ?? t('errors.submit.generic'));
      }
    }
  };

  const isSubmitting = submissionStatus === 'submitting';

  // ── Qualification summary helper ─────────────────────────────────────────
  const hasQualification = QUAL_SUMMARY_ROWS.some(({ key }) => qualification[key]);

  const qualSummaryEl = !hasQualification ? null : (
    <div className="ds-qual-summary">
      <div className="ds-qual-summary-title">{t('demoForm.qualSummary.title')}</div>
      <div className="ds-qual-summary-grid">
        {QUAL_SUMMARY_ROWS.map(({ key, group }) => qualification[key] && (
          <div className="ds-qual-row" key={key}>
            <span className="ds-qual-label">{t(`demoForm.qualSummary.${key}`)}</span>
            <span className="ds-qual-value">
              {group ? resolveQualValue(t, i18n, group, qualification[key]) : qualification[key]}
            </span>
          </div>
        ))}
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
            <label>{t('demoForm.fields.nome.label')}</label>
            <input name="nome" type="text" placeholder={t('demoForm.fields.nome.placeholder')} value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} disabled={isSubmitting} />
          </div>
          <div className="ds-form-field">
            <label>{t('demoForm.fields.azienda.label')}</label>
            <input name="azienda" type="text" placeholder={t('demoForm.fields.azienda.placeholder')} value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} disabled={isSubmitting} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>{t('demoForm.fields.ruolo.label')}</label>
          <input name="ruolo" type="text" placeholder={t('demoForm.fields.ruolo.placeholder')} value={form.ruolo || ''} onChange={handleChange} className={errors.ruolo ? 'ds-field-error' : ''} disabled={isSubmitting} />
        </div>
        <div className="ds-form-field">
          <label>{t('demoForm.fields.email.label')}</label>
          <input name="email" type="email" placeholder={t('demoForm.fields.email.placeholder')} value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} disabled={isSubmitting} />
          {typeof errors.email === 'string' && <span className="ds-field-error-msg">{errors.email}</span>}
        </div>
        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>{t('demoForm.fields.telefono.label')}</label>
            <input name="telefono" type="tel" placeholder={t('demoForm.fields.telefono.placeholder')} value={form.telefono || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="ds-form-field">
            <label>{t('demoForm.fields.paese.label')}</label>
            <input name="paese" type="text" placeholder={t('demoForm.fields.paese.placeholder')} value={form.paese || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>{t('demoForm.fields.note.label')}</label>
          <textarea name="note" rows="2" placeholder={t('demoForm.fields.note.placeholder')} value={form.note || ''} onChange={handleChange} disabled={isSubmitting} />
        </div>

        <button type="submit" className="ds-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? t('demoForm.submit.loading') : t('demoForm.submit.demo')}
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
            <label>{t('demoForm.fields.nome.label')}</label>
            <input name="nome" type="text" placeholder={t('demoForm.fields.nome.placeholder')} value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} disabled={isSubmitting} />
          </div>
          <div className="ds-form-field">
            <label>{t('demoForm.fields.azienda.label')}</label>
            <input name="azienda" type="text" placeholder={t('demoForm.fields.azienda.placeholder')} value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} disabled={isSubmitting} />
          </div>
        </div>
        <div className="ds-form-field">
          <label>{t('demoForm.fields.email.label')}</label>
          <input name="email" type="email" placeholder={t('demoForm.fields.email.placeholderShort')} value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} disabled={isSubmitting} />
          {typeof errors.email === 'string' && <span className="ds-field-error-msg">{errors.email}</span>}
        </div>
        <div className="ds-form-row">
          <div className="ds-form-field">
            <label>{t('demoForm.fields.telefono.label')}</label>
            <input name="telefono" type="tel" placeholder={t('demoForm.fields.telefono.placeholder')} value={form.telefono || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <div className="ds-form-field">
            <label>{t('demoForm.fields.paese.label')}</label>
            <input name="paese" type="text" placeholder={t('demoForm.fields.paese.placeholder')} value={form.paese || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
        </div>
        {!isGeneric && (
          <div className="ds-form-field">
            <label>{t('demoForm.fields.messaggio.label')}</label>
            <textarea name="messaggio" rows="3" placeholder={t('demoForm.fields.messaggio.placeholder')} value={form.messaggio || ''} onChange={handleChange} disabled={isSubmitting} />
          </div>
        )}
        <button type="submit" className="ds-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? t('demoForm.submit.loading') : (isGeneric ? t('demoForm.submit.generic') : t('demoForm.submit.contact'))}
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
          <label>{t('demoForm.fields.nome.label')}</label>
          <input name="nome" type="text" placeholder={t('demoForm.fields.nome.placeholder')} value={form.nome || ''} onChange={handleChange} className={errors.nome ? 'ds-field-error' : ''} disabled={isSubmitting} />
        </div>
        <div className="ds-form-field">
          <label>{t('demoForm.fields.azienda.label')}</label>
          <input name="azienda" type="text" placeholder={t('demoForm.fields.azienda.placeholder')} value={form.azienda || ''} onChange={handleChange} className={errors.azienda ? 'ds-field-error' : ''} disabled={isSubmitting} />
        </div>
      </div>
      <div className="ds-form-field">
        <label>{t('demoForm.fields.email.label')}</label>
        <input name="email" type="email" placeholder={t('demoForm.fields.email.placeholderShort')} value={form.email || ''} onChange={handleChange} className={errors.email ? 'ds-field-error' : ''} disabled={isSubmitting} />
        {typeof errors.email === 'string' && <span className="ds-field-error-msg">{errors.email}</span>}
      </div>
      <div className="ds-form-field">
        <label>{t('demoForm.fields.telefono.label')}</label>
        <input name="telefono" type="tel" placeholder={t('demoForm.fields.telefono.placeholder')} value={form.telefono || ''} onChange={handleChange} disabled={isSubmitting} />
      </div>
      <button type="submit" className="ds-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? t('demoForm.submit.loading') : t('demoForm.submit.generic')}
      </button>
      {errorMsgEl}
    </form>
  );
}
