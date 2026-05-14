export const welcomeScreen = {
  id: 'welcome',
  showSidebar: false,
  message: 'La maggior parte degli strumenti cerca dati.\nDeepSearch individua relazioni nascoste.\n\nPosso aiutarti a capire come DeepSearch può supportare le tue esigenze.',
  prompt: 'Stai cercando informazioni su:',
  choices: [
    { label: 'Aziende', sublabel: 'Verifica societaria, due diligence, controparti', target: 'funnel_intent_company', icon: '◈' },
    { label: 'Persone', sublabel: 'Background check, verifica profili, screening', target: 'funnel_intent_person', icon: '❖' },
  ],
};
