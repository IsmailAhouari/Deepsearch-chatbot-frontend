export const welcomeScreen = {
  id: 'welcome',
  showSidebar: false,
  columns: 2,
  messageKey: 'welcome.message',
  promptKey:  'welcome.prompt',
  choices: [
    {
      labelKey:    'welcome.choices.platform_overview.label',
      sublabelKey: 'welcome.choices.platform_overview.sublabel',
      target: 'flowA',
      icon: '◈',
    },
    {
      labelKey:    'welcome.choices.use_cases.label',
      sublabelKey: 'welcome.choices.use_cases.sublabel',
      target: 'flowB',
      icon: '◇',
    },
    {
      labelKey:    'welcome.choices.personas.label',
      sublabelKey: 'welcome.choices.personas.sublabel',
      target: 'flowC',
      icon: '❖',
    },
    {
      labelKey:    'welcome.choices.demo_request.label',
      sublabelKey: 'welcome.choices.demo_request.sublabel',
      action: { type: 'startDemo' },
      icon: '◆',
    },
    {
      labelKey:    'welcome.choices.contact_team.label',
      sublabelKey: 'welcome.choices.contact_team.sublabel',
      target: 'flowF',
      icon: '✉',
    },
    {
      labelKey:    'welcome.choices.other.label',
      sublabelKey: 'welcome.choices.other.sublabel',
      target: 'flowG_intro',
      icon: '···',
    },
    {
      labelKey:    'welcome.choices.faq.label',
      sublabelKey: 'welcome.choices.faq.sublabel',
      target: 'faq',
      icon: '?',
    },
  ],
};
