export interface SectionEvaluation {
  sectionName: string;
  score: number;
  currentAssessment: string;
  actionableSuggestions: string[];
}

export interface ReviewResult {
  overallScore: number;
  feedbackSummary: string;
  strengths: string[];
  suggestions: string[];
  sectionEvaluations: SectionEvaluation[];
  revisedEssay: string;
}

export interface TemplatePaper {
  id: string;
  documentType: 'general_essay' | 'formal_letter' | 'thesis' | 'blog_post';
  title: string;
  summary: string;
  imageUrl?: string;
  essayText: string;
  reviewResult: ReviewResult;
}

// Full template mock reviews database
export const TEMPLATE_PAPERS: TemplatePaper[] = [
  {
    id: 'ai-education',
    documentType: 'general_essay',
    title: 'The Impact of AI in Modern Education',
    summary: 'An analysis of how artificial intelligence is reshaping pedagogical approaches, focusing on adaptive learning systems and automated grading.',
    essayText: `<p>The rapid evolution of artificial intelligence has introduced significant transformations in modern educational landscapes. Adaptive learning systems are increasingly integrated into elementary and secondary curriculum structures. These automated platforms analyze student performance metrics in real-time, tailoring subsequent exercises to match student competencies. However, automated grading engines face considerable skepticism regarding their capacity to assess creative and subjective arguments. While proponents argue that machine evaluation offers objective impartiality, educational traditionalists fear the loss of nuanced qualitative feedback.</p>`,
    reviewResult: {
      overallScore: 8.2,
      feedbackSummary: 'The essay presents a strong, highly structured analysis of machine learning in pedagogical settings. To improve, strengthen the thesis statement in the introduction and incorporate direct statistical evidence in the body paragraphs.',
      strengths: [
        'Excellent transition between technological benefits and creative limitations.',
        'Maintains a highly objective, formal academic tone throughout.'
      ],
      suggestions: [
        'Incorporate direct statistical evidence or case study citations.',
        'Extend the concluding remarks to propose future research paths.'
      ],
      sectionEvaluations: [
        {
          sectionName: 'Introduction & Thesis',
          score: 8.0,
          currentAssessment: 'The core argument is present but could be more explicitly stated upfront as a definitive thesis.',
          actionableSuggestions: ['Rewrite the last sentence of the intro to form a clearer, stronger thesis statement.']
        },
        {
          sectionName: 'Body Paragraphs & Evidence',
          score: 7.5,
          currentAssessment: 'Relies heavily on generalized statements rather than specific data regarding adaptive learning.',
          actionableSuggestions: ['Include concrete statistics showing the effectiveness of adaptive learning systems.']
        },
        {
          sectionName: 'Grammar & Mechanics',
          score: 9.0,
          currentAssessment: 'Grammar and syntax are highly polished with no major mechanical errors.',
          actionableSuggestions: ['Maintain current proofreading standards.']
        }
      ],
      revisedEssay: 'The rapid evolution of artificial intelligence has introduced profound transformations in modern educational landscapes...'
    }
  },
  {
    id: 'renewable-energy',
    documentType: 'thesis',
    title: 'Renewable Energy Policy Analysis',
    summary: 'A comprehensive evaluation of recent legislative shifts in the European Union regarding solar and wind infrastructure subsidies.',
    imageUrl: '/renewable_energy_policy.png',
    essayText: `<p>Transitioning global energy grids away from carbon dependencies requires robust legislative coordination. In the European Union, recent policy modifications have altered the subvention structures for solar and wind infrastructure development. While direct subsidies successfully catalyzed private sector investments over the preceding decade, current market frameworks seek to integrate renewable suppliers directly into competitive auction blocks. This analysis measures the relative impact of subsidy retractions on infrastructural expansion within central European member states.</p>`,
    reviewResult: {
      overallScore: 8.8,
      feedbackSummary: 'The thesis provides an excellent, deeply analytical look at subvention structures in the EU. The methodology is sound, but the literature review needs more recent citations.',
      strengths: [
        'Strong, concise abstract and introduction.',
        'Excellent use of primary sources regarding auction blocks.',
        'Highly professional, objective, and analytical tone.'
      ],
      suggestions: [
        'Add more comparative literature citations.',
        'Clarify the sample size in the methodology section.'
      ],
      sectionEvaluations: [
        {
          sectionName: 'Abstract / Introduction',
          score: 9.0,
          currentAssessment: 'Clear and concise framing of the research question and its relevance to global energy grids.',
          actionableSuggestions: ['Consider explicitly stating your primary hypothesis at the end of the abstract.']
        },
        {
          sectionName: 'Literature & Methodology',
          score: 8.0,
          currentAssessment: 'Strong references to EU policy, but the transition into the methodology lacks clarity regarding data collection.',
          actionableSuggestions: ['Specify the exact member states surveyed and the time period of the data collection in the first methodology paragraph.']
        },
        {
          sectionName: 'Results & Analysis',
          score: 8.5,
          currentAssessment: 'The analysis of capital fluidities is deep, but smaller local suppliers are grouped too broadly.',
          actionableSuggestions: ['Break down the impact on local suppliers by specific energy sector (e.g., wind vs. solar).']
        },
        {
          sectionName: 'Conclusion & Academic Tone',
          score: 9.5,
          currentAssessment: 'Exceptional academic tone throughout. Passive voice is used correctly for scientific objectivity.',
          actionableSuggestions: ['None required. Tone is perfect for a doctoral-level thesis.']
        }
      ],
      revisedEssay: 'Transitioning global energy grids away from carbon dependencies requires robust legislative coordination...'
    }
  },
  {
    id: 'remote-work',
    documentType: 'blog_post',
    title: 'Cognitive Behavioral Nuances in Remote Work',
    summary: 'Investigating the long-term psychological effects of prolonged telecommuting.',
    essayText: `<p>The transition to widespread telecommuting has radically restructured professional environments and psychological boundaries. Remote operations remove standard spatial boundaries that historically segregated domestic spheres from professional commitments. This qualitative investigation analyzes stress indicators and cognitive behavioral patterns among middle management within technology-focused organizations.</p>`,
    reviewResult: {
      overallScore: 7.9,
      feedbackSummary: 'The blog post contains great insights but currently reads too much like an academic paper. It needs a catchier hook and a more conversational tone.',
      strengths: [
        'Excellent insights into domestic spatial boundaries.',
        'Great analytical depth regarding middle management burnout.'
      ],
      suggestions: [
        'Rewrite the intro to be more engaging for a casual audience.',
        'Break up long paragraphs for better scannability.'
      ],
      sectionEvaluations: [
        {
          sectionName: 'Title & Hook',
          score: 6.5,
          currentAssessment: 'The title is too academic, and the opening sentence fails to immediately hook a casual reader.',
          actionableSuggestions: ['Change the title to something punchier, like "Why Working From Home is Burning You Out."']
        },
        {
          sectionName: 'Body Paragraphs (Scannability)',
          score: 7.0,
          currentAssessment: 'Paragraphs are too dense for a blog format, and the vocabulary is unnecessarily complex.',
          actionableSuggestions: ['Break the text into 2-3 sentence chunks.', 'Use bullet points to list stress indicators.']
        },
        {
          sectionName: 'Conclusion & Call to Action',
          score: 8.0,
          currentAssessment: 'The post concludes with a strong point, but lacks a clear call to action for the reader.',
          actionableSuggestions: ['End with a question asking readers how they manage their own work-from-home boundaries in the comments.']
        }
      ],
      revisedEssay: 'Have you ever felt like you never truly leave the office anymore? The transition to widespread telecommuting has radically restructured...'
    }
  },
  {
    id: 'microplastics',
    documentType: 'formal_letter',
    title: 'Microplastics in Urban Waterways',
    summary: 'A quantitative study assessing the concentration of synthetic microfibers.',
    essayText: `<p>Environmental accumulation of microplastics poses severe ecological hazards to regional aquatic frameworks. This quantitative exploration monitors microfiber concentrations across five major urban river basins. Water sampling was conducted over an eighteen-month interval, assessing concentrations relative to agricultural runoff and urban water treatment centers.</p>`,
    reviewResult: {
      overallScore: 6.8,
      feedbackSummary: 'The text provides useful data, but it completely lacks the structure of a formal letter. It currently reads like a report abstract.',
      strengths: [
        'Strong quantitative data and clear findings.',
        'Appropriately urgent and serious tone.'
      ],
      suggestions: [
        'Add proper letter formatting (heading, salutation, sign-off).',
        'State the specific request or reason for writing in the very first paragraph.'
      ],
      sectionEvaluations: [
        {
          sectionName: 'Heading & Salutation',
          score: 2.0,
          currentAssessment: 'The letter entirely lacks a sender address, date, recipient address, and formal salutation.',
          actionableSuggestions: ['Add a formal header block.', 'Include a standard salutation such as "Dear Director [Name]:"']
        },
        {
          sectionName: 'Letter Body',
          score: 8.5,
          currentAssessment: 'The body clearly states the problem and backs it up with an 18-month sampling metric.',
          actionableSuggestions: ['Move the primary call to action (the regulatory alarms) to the very beginning of the letter to respect the recipient\'s time.']
        },
        {
          sectionName: 'Sign-off & Professional Tone',
          score: 4.0,
          currentAssessment: 'The letter ends abruptly without any formal sign-off.',
          actionableSuggestions: ['Conclude with a professional sign-off like "Sincerely," followed by your name and title.']
        }
      ],
      revisedEssay: '[Sender Address]\n[Date]\n\n[Recipient Address]\n\nDear Director,\n\nEnvironmental accumulation of microplastics...'
    }
  }
];
