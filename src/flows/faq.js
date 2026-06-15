export const FAQ = [
  {
    questionKey: 'faq.items.whatIsDeepSearch.question',
    answerKey: 'faq.items.whatIsDeepSearch.answer',
    target: "flowA",
    relevance: [],
  },
  {
    questionKey: 'faq.items.isChatbot.question',
    answerKey: 'faq.items.isChatbot.answer',
    relevance: [],
  },
  {
    questionKey: 'faq.items.requestDemo.question',
    answerKey: 'faq.items.requestDemo.answer',
    action: { type: 'startDemo' },
    relevance: [],
  },
  {
    questionKey: 'faq.items.whoIsItFor.question',
    answerKey: 'faq.items.whoIsItFor.answer',
    target: "flowC",
    relevance: ['HR', 'Compliance / AML', 'Security / Risk', 'Legale / Contenzioso'],
  },
];

export const faqScreens = [
  {
    id: 'faq',
    showSidebar: true,
    component: 'faq',
    titleKey: 'faq.title',
  },
  {
    id: 'fallback',
    showSidebar: true,
    messageKey: 'faq.fallback.message',
    choices: [
      { labelKey: 'welcome.choices.platform_overview.label', target: 'flowA' },
      { labelKey: 'welcome.choices.use_cases.label', target: 'flowB' },
      { personalizable: true, action: { type: 'startDemo' } },
      { labelKey: 'ui:sidebar.nav.flowF', target: 'flowF' },
    ],
  },
];
