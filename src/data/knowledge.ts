export interface KnowledgeItem {
  topic: string;
  keywords: string[];
  responses: string[];
}

export const knowledge: KnowledgeItem[] = [

{
  topic: "headache",
  keywords: [
    "headache",
    "head hurts",
    "my head hurts",
    "head pain",
    "aching head",
    "my head is aching",
    "migraine",
    "pounding head",
    "throbbing head",
    "pain in my head",
    "my head is hurting"
  ],
  responses: [
    "🤕 Headaches can result from stress, dehydration, lack of sleep, eye strain, or illness. Drink plenty of water, get some rest, and seek medical attention if the headache is severe, sudden, or persists."
  ]
},

{
  topic: "fever",
  keywords: [
    "fever",
    "high temperature",
    "hot body",
    "body is hot",
    "burning up",
    "i feel hot"
  ],
  responses: [
    "🌡 Fever may indicate an infection. Drink plenty of fluids and seek medical care if it persists."
  ]
},

{
  topic: "malaria",
  keywords: [
    "malaria",
    "having malaria",
    "i have malaria",
    "malaria symptoms",
    "tested positive for malaria"
  ],
  responses: [
    "🦟 Malaria commonly causes fever, chills, headache, and body pains. Visit a healthcare facility for testing and treatment."
  ]
},

{
  topic: "cough",
  keywords: [
    "cough",
    "coughing",
    "dry cough",
    "wet cough",
    "persistent cough",
    "can't stop coughing"
  ],
  responses: [
    "😷 A cough may be caused by allergies, a cold, or an infection. Seek medical advice if it lasts more than two weeks."
  ]
},

{
  topic: "diarrhea",
  keywords: [
    "diarrhea",
    "running stomach",
    "loose stool",
    "watery stool"
  ],
  responses: [
    "💧 Drink Oral Rehydration Solution (ORS) and plenty of clean water to prevent dehydration."
  ]
},

{
  topic: "vomiting",
  keywords: [
    "vomiting",
    "vomit",
    "throwing up",
    "nausea"
  ],
  responses: [
    "🤢 Drink small amounts of water frequently to avoid dehydration. Seek medical attention if it continues."
  ]
},
];

