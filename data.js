// ========================================
// DATA — Central Knowledge Base
// All data in one place for easy updates
// ========================================

const PRESIDENCY_DATA = {
  // ----- CHATBOT KNOWLEDGE BASE -----
  chatbot: {
    // General greetings
    greetings: {
      'hello': 'Hello! 👋 Welcome to The Presidency of South Africa. How can I assist you today?',
      'hi': 'Hi there! 🇿🇦 I\'m here to help you with information about The Presidency.',
      'hey': 'Hey! How can I help you with information about The Presidency?',
      'good morning': 'Good morning! 🌅 How can I assist you with The Presidency today?',
      'good afternoon': 'Good afternoon! ☀️ What can I help you find?',
      'good evening': 'Good evening! 🌙 How can I assist you with The Presidency?',
      'how are you': 'I\'m doing great! 🇿🇦 Ready to help you with any questions about The Presidency.',
    },
    
    // About the Presidency
    about: {
      'what is the presidency': 'The Presidency is the apex of the executive system of government in South Africa. It supports the President and Deputy President in leading a government that works for all South Africans. The Presidency coordinates Cabinet, national planning, and government-wide oversight. It is located at the Union Buildings in Pretoria and Tuynhuys in Cape Town.',
      'what does the presidency do': 'The Presidency coordinates government action across South Africa. Key functions include: supporting the President and Deputy President, coordinating Cabinet, national planning and oversight, and public communication through speeches, statements, and media services. It also manages the Presidential Hotline (17737) for citizen service delivery complaints.',
      'who is the president': 'President Cyril Ramaphosa is the Head of State and Government of the Republic of South Africa. He was inaugurated for the Seventh Administration on 19 June 2024 at the Union Buildings in Pretoria. He is the 5th President of democratic South Africa.',
      'who is cyril ramaphosa': 'Cyril Ramaphosa is the President of South Africa, inaugurated on 19 June 2024 for the Seventh Administration. He is a former trade union leader, businessman, and played a key role in South Africa\'s transition to democracy. He was the chief negotiator for the ANC during the CODESA talks and helped draft South Africa\'s constitution.',
      'who is the deputy president': 'Deputy President Paul Mashatile serves alongside President Ramaphosa in the Seventh Administration. He supports the President in executive leadership, government coordination, and represents South Africa internationally. He was appointed on 7 March 2023.',
      'seventh administration': 'The Seventh Administration began with the inauguration of President Cyril Ramaphosa on 19 June 2024. It is focused on three strategic priorities: inclusive growth and job creation, reducing poverty and the cost of living, and building a capable, ethical developmental state. The administration includes a Government of National Unity.',
      'history of the presidency': 'The Presidency was established in 1994 with the dawn of democracy in South Africa. Nelson Mandela was the first President of the democratic era. The Presidency has evolved to become the strategic centre of government, coordinating national policy and implementation across all spheres of government.',
    },
    
    // Priorities
    priorities: {
      'what are the priorities': 'The Seventh Administration has three strategic priorities: 1️⃣ Inclusive growth and job creation — accelerate economic reform, infrastructure investment, and pathways to work. 2️⃣ Reduce poverty and the cost of living — strengthen the social wage, support households, and improve access to essential services. 3️⃣ A capable, ethical, and developmental state — build institutions that are professional, accountable, and effective.',
      'national priorities': 'The national priorities are: 1️⃣ Inclusive growth & job creation — driving economic reform and investment. 2️⃣ Reduce poverty & the cost of living — supporting vulnerable households. 3️⃣ A capable, ethical & developmental state — building professional institutions. These are outlined in the Medium-Term Development Plan (MTDP) 2025–2030.',
      'mtdp': 'The Medium-Term Development Plan (MTDP) 2025–2030 sets out the three strategic priorities for the Seventh Administration. It guides government planning and resource allocation across all departments. The plan focuses on inclusive growth, poverty reduction, and building state capability.',
      'medium term development plan': 'The MTDP 2025–2030 is the government\'s strategic framework for the Seventh Administration. It translates the election mandate into actionable priorities and targets. The plan is overseen by The Presidency and National Treasury.',
      'operation vulindlela': 'Operation Vulindlela is a joint reform programme between The Presidency and National Treasury. It focuses on overcoming binding constraints to economic growth, including energy, logistics, and visa reforms. The programme drives structural economic reforms to unlock South Africa\'s growth potential.',
      'what is operation vulindlela': 'Operation Vulindlela (meaning "open the way" in isiZulu) is a reform programme accelerating structural economic reforms in South Africa. It addresses constraints in energy, transport, telecommunications, and water. The programme is coordinated by The Presidency and National Treasury.',
    },
    
    // Programmes
    programmes: {
      'programmes': 'Key flagship programmes coordinated by The Presidency include: Operation Vulindlela (economic reform), District Development Model (integrated planning), Presidential Infrastructure Coordinating Commission (infrastructure investment), Presidential Employment Stimulus (job creation), Government-Business Partnership, Climate coordination, State-owned enterprise reform, and Youth development coordination.',
      'district development model': 'The District Development Model (DDM) is an integrated planning and delivery approach across the three spheres of government. It centres districts as the primary locus of service delivery, bringing together national, provincial, and local government to coordinate development.',
      'ddm': 'DDM stands for District Development Model. It coordinates government planning and delivery across national, provincial, and local government, with districts as the focus for service delivery. The model aims to improve coordination and eliminate silos between spheres of government.',
      'presidential employment stimulus': 'The Presidential Employment Stimulus (PES) supports public employment, livelihoods, and pathways into work for unemployed South Africans. It targets young people particularly and creates opportunities through public employment programmes and livelihood support.',
      'employment stimulus': 'The Presidential Employment Stimulus creates opportunities for unemployed South Africans through public employment, livelihood support, and pathways to work. The programme is a key part of the government\'s response to high unemployment rates.',
      'picc': 'The Presidential Infrastructure Coordinating Commission (PICC) supports strategic infrastructure investment across the economy. It coordinates infrastructure planning and implementation across government and with the private sector.',
      'government business partnership': 'The Government-Business Partnership mobilises business capability alongside government to address priority constraints and accelerate economic recovery. It focuses on energy, logistics, and crime prevention.',
      'soe reform': 'State-owned enterprise reform strengthens the governance, performance, and strategic role of public enterprises. It focuses on energy, logistics, and transport sectors. The reform aims to make SOEs more efficient and effective.',
      'youth development': 'Youth development coordination creates opportunities for learning, employment, entrepreneurship, and participation across government, business, and civil society. It aims to address high youth unemployment rates.',
      'climate coordination': 'Climate coordination supports a just transition and coherent national responses to climate change. It includes adaptation, mitigation, and green growth strategies aligned with South Africa\'s international commitments.',
    },
    
    // Contact & Hotline
    contact: {
      'contact': 'You can contact The Presidency through: 📞 Presidential Hotline: 17737 (toll-free, Mon–Fri, 08:00–16:00). 📧 Email: president@presidency.gov.za. 📍 Union Buildings: Government Avenue, Pretoria, 0001. 📍 Tuynhuys: Plein Street, Cape Town, 8000. Use the enquiry form on our contact page for general enquiries.',
      'hotline': 'The Presidential Hotline is 17737. It gives citizens a route to escalate unresolved government service-delivery matters. It\'s toll-free and available Monday–Friday, 08:00–16:00. The hotline handles complaints about service delivery, government services, and administrative issues.',
      '17737': '17737 is the Presidential Hotline. It\'s toll-free and available Monday–Friday, 08:00–16:00. It handles service-delivery complaints and government service queries. Call from any network in South Africa.',
      'phone number': 'The Presidential Hotline number is 17737. It\'s toll-free and available Monday–Friday, 08:00–16:00. For international calls, use +27 (0)12 300 5200 for the Union Buildings.',
      'email': 'You can use the enquiry form on our contact page to send an email to The Presidency. For urgent service-delivery matters, call the Presidential Hotline at 17737. General email: president@presidency.gov.za.',
      'address': 'The Presidency has two main offices: Union Buildings in Pretoria (Government Avenue, Pretoria, 0001) and Tuynhuys in Cape Town (Plein Street, Cape Town, 8000). The Union Buildings is the seat of government and a national heritage site.',
      'office hours': 'The Presidency offices are open Monday–Friday, 08:00–16:00. The Presidential Hotline operates during these hours. For emergencies, contact relevant emergency services directly.',
    },
    
    // News & Media
    media: {
      'news': 'The Presidency publishes official statements, advisories, and speeches. Visit the News & Statements page for the latest communications. Recent news includes SADC condolences, National Orders nominations, and SAPS Commemoration Day addresses.',
      'statements': 'Official statements from The Presidency include press statements, advisories, and announcements from the President, Deputy President, and Cabinet. All statements are published on the News page with dates and official sources.',
      'speeches': 'Speeches by the President and Deputy President are available on the Speeches page. They include keynotes, addresses, and public remarks on national issues. Recent speeches include the SAPS National Commemoration Day address and the Nokuthula Simelane Memorial Lecture.',
      'media room': 'The Media Room contains statements, advisories, speeches, multimedia resources, publications, and the diary of the Principals. It\'s the central hub for all official Presidency communications.',
      'publications': 'Publications from The Presidency include the Annual Performance Plan, Strategic Plan, and other official documents. These are available in the Media Room resources section. The Annual Performance Plan outlines the Presidency\'s goals and targets for each financial year.',
    },
    
    // Procurement
    procurement: {
      'procurement': 'Procurement opportunities at The Presidency are published on the Procurement page. Current open tenders include cleaning and hygiene consumables, GRC system software, and stationery supplies. All tenders are published in accordance with the Public Finance Management Act.',
      'tenders': 'Tenders and procurement opportunities at The Presidency are listed on the Procurement page. Current opportunities include cleaning services, GRC software, stationery supplies, and catering services. Suppliers can download tender documents from the Procurement page.',
      'tender': 'View all current tenders on the Procurement page. Open opportunities include cleaning and hygiene consumables (PRES/2026/015), GRC system software (PRES/2026/018), and stationery supplies (PRES/2026/020). Deadlines are typically 30 days from publication.',
    },
    
    // Service delivery
    service: {
      'service delivery': 'For unresolved service-delivery matters, call the Presidential Hotline at 17737 (toll-free, Mon–Fri, 08:00–16:00). You can also use the contact form on our website. The hotline tracks and escalates service delivery complaints to relevant departments.',
      'complaint': 'To escalate a service-delivery complaint, call the Presidential Hotline at 17737. It\'s toll-free and available Monday–Friday, 08:00–16:00. Provide your details and the nature of the complaint, and a case number will be created for tracking.',
      'help': 'I\'m here to help! You can ask me about: • The Presidency and its role • National priorities and programmes • Contact information and the hotline • News, statements, and speeches • Procurement opportunities • Service delivery support • The Seventh Administration • The President and Deputy President',
      'information': 'I can provide information about The Presidency, national priorities, programmes, speeches, news, procurement, and how to contact us. What would you like to know? I can also help with FAQs about government services.',
    },
    
    // Default
    default: 'I\'m here to help with information about The Presidency of South Africa. You can ask me about: 🇿🇦 The Presidency and its role 📋 National priorities and programmes 📞 Contact information and the hotline 📰 News, statements, and speeches 📑 Procurement opportunities 🏛️ Service delivery support',
  },

  // ----- SEARCH DATA -----
  search: [
    { title: 'SADC Chairperson President Ramaphosa extends condolences', type: 'Statement', date: '08 Sep 2026', url: 'news.html' },
    { title: 'The Presidency invites nominations for National Orders', type: 'Advisory', date: '08 Sep 2026', url: 'news.html' },
    { title: 'Keynote address at the SAPS National Commemoration Day', type: 'Speech', date: '06 Sep 2026', url: 'speeches.html' },
    { title: 'Inaugural Nokuthula Simelane Memorial Lecture', type: 'Speech', date: '03 Sep 2026', url: 'speeches.html' },
    { title: 'President appoints new head of Special Investigating Unit', type: 'Statement', date: '31 Aug 2026', url: 'news.html' },
    { title: 'Inclusive growth and job creation', type: 'Priority', date: 'Seventh Administration', url: 'priorities.html' },
    { title: 'Operation Vulindlela', type: 'Programme', date: 'Economic reform', url: 'programmes.html' },
    { title: 'Presidential Hotline: 17737', type: 'Public Service', date: 'Citizen support', url: 'contact.html' },
    { title: 'Procurement opportunities', type: 'Tenders', date: 'The Presidency', url: 'procurement.html' },
    { title: 'District Development Model', type: 'Programme', date: 'Integrated planning', url: 'programmes.html' },
    { title: 'Presidential Employment Stimulus', type: 'Programme', date: 'Job creation', url: 'programmes.html' },
    { title: 'Government–Business Partnership', type: 'Programme', date: 'Collaboration', url: 'programmes.html' },
    { title: 'State-owned enterprise reform', type: 'Programme', date: 'Governance', url: 'programmes.html' },
    { title: 'Youth development coordination', type: 'Programme', date: 'Empowerment', url: 'programmes.html' },
    { title: 'Annual Performance Plan 2026/27', type: 'Publication', date: 'Strategic', url: 'index.html' },
    { title: 'President Cyril Ramaphosa', type: 'Leadership', date: 'Seventh Administration', url: 'administration.html' },
    { title: 'Deputy President Paul Mashatile', type: 'Leadership', date: 'Seventh Administration', url: 'administration.html' },
    { title: 'Medium-Term Development Plan 2025–2030', type: 'Planning', date: 'National priorities', url: 'priorities.html' },
    { title: 'Presidential Infrastructure Coordinating Commission', type: 'Programme', date: 'Infrastructure', url: 'programmes.html' },
    { title: 'Cabinet statements', type: 'Media', date: 'Latest news', url: 'news.html' },
    { title: 'Union Buildings', type: 'Location', date: 'Pretoria, 0001', url: 'contact.html' },
    { title: 'Tuynhuys', type: 'Location', date: 'Cape Town, 8000', url: 'contact.html' },
    { title: 'Government of National Unity', type: 'Government', date: 'Seventh Administration', url: 'administration.html' },
    { title: 'Social wage', type: 'Policy', date: 'Poverty reduction', url: 'priorities.html' },
    { title: 'State capacity', type: 'Policy', date: 'Ethical state', url: 'priorities.html' },
    { title: 'Infrastructure investment', type: 'Policy', date: 'Economic growth', url: 'priorities.html' },
    { title: 'Just transition', type: 'Policy', date: 'Climate change', url: 'programmes.html' },
    { title: 'Anti-corruption', type: 'Policy', date: 'State capacity', url: 'priorities.html' },
    { title: 'Presidential Infrastructure Coordinating Commission', type: 'Programme', date: 'Infrastructure', url: 'programmes.html' },
    { title: 'Presidential Employment Stimulus', type: 'Programme', date: 'Job creation', url: 'programmes.html' },
    { title: 'Government-Business Partnership', type: 'Programme', date: 'Collaboration', url: 'programmes.html' },
    { title: 'State-owned enterprise reform', type: 'Programme', date: 'Governance', url: 'programmes.html' },
    { title: 'Youth development coordination', type: 'Programme', date: 'Empowerment', url: 'programmes.html' },
    { title: 'Climate coordination', type: 'Programme', date: 'Just transition', url: 'programmes.html' },
  ],

  // ----- ACCESSIBILITY PANEL DATA -----
  accessibility: {
    fontSizes: {
      min: 0.85,
      max: 1.3,
      step: 0.08,
    },
    preferences: {
      'pres-font-scale': '1',
      'pres-theme': 'light',
    }
  }
};