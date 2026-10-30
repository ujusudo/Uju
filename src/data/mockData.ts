import { Flashcard, QuizQuestion, SubjectId, SubjectInfo, Topic, UserProfile, StudyTask } from '../types';

export const NIGERIAN_UNIVERSITIES = [
  'University of Nigeria, Nsukka (UNN)',
  'University of Ibadan (UI)',
  'University of Lagos (UNILAG)',
  'Ahmadu Bello University, Zaria (ABU)',
  'Obafemi Awolowo University, Ile-Ife (OAU)',
  'University of Benin (UNIBEN)',
  'University of Ilorin (UNILORIN)',
  'Bayero University, Kano (BUK)',
  'Lagos State University (LASU)',
  'Delta State University, Abraka (DELSU)',
  'University of Calabar (UNICAL)',
  'University of Port Harcourt (UNIPORT)',
  'Abia State University, Uturu (ABSU)',
  'Nnamdi Azikiwe University, Awka (UNIZIK)',
  'Usmanu Danfodiyo University, Sokoto (UDUS)',
  'University of Jos (UNIJOS)',
  'University of Maiduguri (UNIMAID)',
  'University of Abuja (UNIABUJA)',
  'University of Uyo (UNIUYO)',
  'Enugu State University of Science and Technology (ESUT)',
  'Imo State University, Owerri (IMSU)',
  'Chukwuemeka Odumegwu Ojukwu University (COOU)',
  'Ebonyi State University (EBSU)',
  'Rivers State University (RSU)',
  'Niger Delta University, Amassoma (NDU)',
  'Olabisi Onabanjo University, Ago-Iwoye (OOU)',
  'Ladoke Akintola University of Technology (LAUTECH)',
  'Ekiti State University, Ado-Ekiti (EKSU)',
  'Benue State University, Makurdi (BSUM)',
  'Kaduna State University (KASU)',
  'Bowen University, Iwo',
  'Afe Babalola University, Ado-Ekiti (ABUAD)',
  'Babcock University, Ilishan-Remo',
  'Bingham University, Karu',
  'Madonna University, Elele',
  'Igbinedion University, Okada',
  'PAMO University of Medical Sciences, Port Harcourt',
  'Redeemer’s University, Ede',
  'Gregory University, Uturu',
  'Lead City University, Ibadan',
  'Other Nigerian Accredited Institution',
];

export const DISCIPLINES = [
  'Medical Sciences',
  'Medicine and Surgery (MBBS)',
  'Nursing Sciences',
  'Medical Laboratory Science (MLS)',
  'Human Physiology',
  'Human Anatomy',
  'Medical Biochemistry',
  'Pharmacology and Therapeutics',
  'Dentistry and Dental Surgery (BDS)',
  'Radiography and Radiological Sciences',
  'Physiotherapy / Medical Rehabilitation',
  'Public Health & Community Medicine',
];

export const ACADEMIC_LEVELS = [
  '100L',
  '200L',
  '300L',
  '400L',
  '500L',
  '600L / Final Year',
  '100L - Final Year (Comprehensive)',
];

// Default profile explicitly set to DR ACHI THE III with Medical Sciences across 100L - Final Year
export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'dr-achi-the-iii',
  name: 'DR ACHI THE III',
  title: 'DR',
  university: 'University of Nigeria, Nsukka (UNN)',
  faculty: 'Faculty of Medical Sciences & Clinical Medicine',
  discipline: 'Medical Sciences',
  level: '100L - Final Year',
  matricNumber: 'MED/SCI/2026/001',
  email: 'dr.achi.iii@nesyringe.med.ng',
  avatarColor: 'from-teal-600 to-cyan-700',
  joinedDate: 'October 2026',
  studyStreakDays: 19,
  quizzesCompleted: 48,
  averageScore: 89,
  flashcardsMastered: 184,
};

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'physiology',
    name: 'Human Physiology',
    category: 'Basic Medical',
    description: 'Physiological mechanisms of the cardiovascular, renal, respiratory, endocrine, and neural systems.',
    iconName: 'Activity',
    levelsCovered: '100L - Final Year',
    topicsCount: 28,
    accentColor: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'anatomy',
    name: 'Anatomy',
    category: 'Basic Medical',
    description: 'Gross anatomy, neuroanatomy, histology, embryology, and osteology with clinical applications.',
    iconName: 'Bone',
    levelsCovered: '100L - Final Year',
    topicsCount: 32,
    accentColor: 'from-teal-600 to-emerald-700',
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry',
    category: 'Basic Medical',
    description: 'Enzymology, bioenergetics, carbohydrate, lipid, and protein metabolism pathways.',
    iconName: 'Dna',
    levelsCovered: '100L - Final Year',
    topicsCount: 24,
    accentColor: 'from-amber-600 to-orange-700',
  },
  {
    id: 'medical-biochemistry',
    name: 'Medical Biochemistry',
    category: 'Basic Medical',
    description: 'Inborn errors of metabolism, clinical enzymology, hemoglobinopathies, and metabolic organ profiles.',
    iconName: 'FlaskConical',
    levelsCovered: '100L - Final Year',
    topicsCount: 22,
    accentColor: 'from-purple-600 to-indigo-700',
  },
  {
    id: 'nursing-sciences',
    name: 'Nursing Sciences',
    category: 'Allied Health',
    description: 'Clinical nursing processes, patient triage, emergency care, maternal-child health, and ethics.',
    iconName: 'HeartHandshake',
    levelsCovered: '100L - Final Year',
    topicsCount: 26,
    accentColor: 'from-rose-600 to-pink-700',
  },
  {
    id: 'medicine-surgery',
    name: 'Medicine and Surgery',
    category: 'Clinical',
    description: 'Clinical medicine, bedside examination, differential diagnosis, surgical emergencies, and management.',
    iconName: 'Stethoscope',
    levelsCovered: '100L - Final Year',
    topicsCount: 36,
    accentColor: 'from-sky-600 to-blue-800',
  },
  {
    id: 'medical-lab-science',
    name: 'Medical Laboratory Science',
    category: 'Allied Health',
    description: 'Diagnostic laboratory science, clinical chemistry, hematology, blood transfusion, and parasitology.',
    iconName: 'Microscope',
    levelsCovered: '100L - Final Year',
    topicsCount: 25,
    accentColor: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'pharmacology',
    name: 'Pharmacology',
    category: 'Paraclinical',
    description: 'Pharmacokinetics, pharmacodynamics, autonomic, antimicrobial, cardiovascular, and CNS drug therapy.',
    iconName: 'Pill',
    levelsCovered: '100L - Final Year',
    topicsCount: 30,
    accentColor: 'from-cyan-600 to-blue-700',
  },
  {
    id: 'pathology',
    name: 'Pathology',
    category: 'Paraclinical',
    description: 'Cellular adaptation, necrosis, acute & chronic inflammation, hemodynamic disorders, and neoplasia.',
    iconName: 'AlertCircle',
    levelsCovered: '100L - Final Year',
    topicsCount: 29,
    accentColor: 'from-red-600 to-rose-800',
  },
  {
    id: 'microbiology-parasitology',
    name: 'Microbiology and Parasitology',
    category: 'Paraclinical',
    description: 'Bacteriology, virology, mycology, and tropical parasitology including Plasmodium, Schistosoma, and Helminths.',
    iconName: 'Bug',
    levelsCovered: '100L - Final Year',
    topicsCount: 27,
    accentColor: 'from-emerald-700 to-green-900',
  },
  {
    id: 'immunology',
    name: 'Immunology',
    category: 'Paraclinical',
    description: 'Innate and adaptive immunity, cell-mediated responses, antibodies, hypersensitivity, and autoimmunity.',
    iconName: 'ShieldAlert',
    levelsCovered: '100L - Final Year',
    topicsCount: 20,
    accentColor: 'from-indigo-600 to-violet-800',
  },
  {
    id: 'genetics',
    name: 'Genetics',
    category: 'Basic Medical',
    description: 'Mendelian inheritance, sickle cell trait/disease molecular genetics, karyotyping, and epigenetics.',
    iconName: 'GitBranch',
    levelsCovered: '100L - Final Year',
    topicsCount: 18,
    accentColor: 'from-fuchsia-600 to-purple-800',
  },
];

export const TOPICS: Topic[] = [
  {
    id: 'physio-starling-forces',
    title: "Starling's Forces & Microvascular Fluid Exchange",
    subjectId: 'physiology',
    subjectName: 'Human Physiology',
    levelRecommended: '200L - 300L (2nd MB & Beyond)',
    summary:
      'Governs the net fluid movement between capillaries and the interstitial space through hydrostatic and oncotic pressures.',
    keyPoints: [
      'Capillary Hydrostatic Pressure (Pc) pushes fluid out into the interstitium (arteriolar end ~30-35 mmHg, venular end ~15 mmHg).',
      'Interstitial Fluid Hydrostatic Pressure (Pif) opposes filtration (usually near 0 to slightly negative).',
      'Plasma Colloid Osmotic Pressure (πp or πc) is exerted predominantly by albumin (~25-28 mmHg) and pulls fluid back into capillaries.',
      'Interstitial Colloid Osmotic Pressure (πif) draws fluid into interstitium (~3-8 mmHg).',
      'Net Filtration Pressure (NFP) = (Pc - Pif) - (πc - πif). Excess filtration is cleared by lymphatic drainage.',
    ],
    clinicalCorrelations:
      'Crucial for understanding peripheral pitting edema in Congestive Cardiac Failure (increased Pc), Nephrotic syndrome and severe Malnutrition/Kwashiorkor in Nigerian pediatrics (hypoalbuminemia causing decreased πc), and Filariasis/Elephantiasis (lymphatic obstruction).',
    mnemonic:
      'P-C-O-L: Pressure Pushes (Hydrostatic), Colloid Collects (Oncotic), Osmosis Orders, Lymphatics Liquidate residue.',
    detailedContent: `
### Fundamentals of Capillary Fluid Exchange

Ernest Starling demonstrated that microvascular filtration is a dynamic equilibrium determined by the balance between opposing hydrostatic and osmotic pressures across semi-permeable capillary membranes.

#### The Four Classical Pressures:
1. **Capillary Hydrostatic Pressure ($P_c$):** Generated by cardiac pumping force and arteriolar vascular tone. At the arteriolar end of human systemic capillaries, $P_c$ averages 30–35 mmHg, diminishing to approximately 15 mmHg at the venular limb.
2. **Interstitial Hydrostatic Pressure ($P_{if}$):** In loose subcutaneous tissues, $P_{if}$ ranges from -3 to +1 mmHg. A positive value opposes outward filtration.
3. **Plasma Oncotic Pressure ($\\pi_c$ or $\\pi_p$):** Produced by non-diffusible plasma macromolecules, principally **Albumin (80%)** and globulins. Normal oncotic pressure is approximately 25–28 mmHg.
4. **Interstitial Oncotic Pressure ($\\pi_{if}$):** Caused by small amounts of plasma proteins leaking into interstitial fluid, typically 3–8 mmHg.

#### Net Filtration Equation:
$$\\text{Net Filtration Pressure} = [(P_c - P_{if}) - \\sigma(\\pi_c - \\pi_{if})]$$
*(where $\\sigma$ is the Staverman reflection coefficient, approximately 0.9–1.0 in normal non-fenestrated muscle and skin).*
    `,
    isVerified: true,
    verifiedBy: 'Nigerian Medical Colleges Academic Board & Senior Physiology Examiners',
    readTimeMinutes: 6,
  },
  {
    id: 'anatomy-femoral-triangle',
    title: 'The Femoral Triangle (Scarpa’s Triangle) & Hernias',
    subjectId: 'anatomy',
    subjectName: 'Anatomy',
    levelRecommended: '200L - 300L (2nd MB Clinical Anatomy)',
    summary:
      'Subfascial triangular space in the upper third of the anterior thigh, vital for vascular cannulation, femoral nerve blocks, and femoral hernia repair.',
    keyPoints: [
      'Superior boundary: Inguinal ligament (Poupart’s ligament).',
      'Medial boundary: Medial border of Adductor Longus muscle.',
      'Lateral boundary: Medial border of Sartorius muscle.',
      'Floor: Pectineus, Iliopsoas, and Adductor Longus.',
      'Roof: Fascia lata, cribriform fascia, superficial fascia, and skin.',
      'Contents from Lateral to Medial: Femoral Nerve, Femoral Artery, Femoral Vein, Femoral Canal (Empty space / Deep lymph node of Cloquet).',
    ],
    clinicalCorrelations:
      'Femoral hernia descends through the rigid Femoral Ring into the Femoral Canal below and lateral to the pubic tubercle. Because the lacunar ligament on its medial border is sharp and unyielding, femoral hernias carry a very high risk of strangulation and require emergent surgical reduction.',
    mnemonic:
      'NAVEL (from Lateral to Medial): Nerve, Artery, Vein, Empty space (Femoral Canal), Lymphatics (Cloquet/Rosenmüller).',
    detailedContent: `
### Boundaries and Surgical Anatomy

The Femoral Triangle is an essential anatomical landmark on the anterior thigh inspected in viva examinations across all Nigerian medical colleges.

#### Boundaries:
* **Superior (Base):** Inguinal ligament stretching from the Anterior Superior Iliac Spine (ASIS) to the Pubic Tubercle.
* **Lateral:** Medial margin of Sartorius muscle.
* **Medial:** Medial margin of Adductor Longus muscle.
* **Floor (Medial to Lateral):** Adductor longus, Pectineus, Psoas major, and Iliacus.
* **Apex:** Points inferiorly where Sartorius crosses Adductor Longus, continuous with the Adductor (Subsartorial / Hunter's) Canal.

#### The Femoral Sheath:
A funnel-shaped fascial prolongation derived anteriorly from fascia transversalis and posteriorly from fascia iliaca. It encloses the femoral artery, vein, and canal, but **NOT** the Femoral Nerve (which lies lateral outside the sheath in the iliopsoas groove).
    `,
    isVerified: true,
    verifiedBy: 'West African College of Surgeons Anatomy Curriculum Guidelines',
    readTimeMinutes: 7,
  },
  {
    id: 'pathology-sickle-cell',
    title: 'Sickle Cell Hemoglobinopathy (HbSS) Pathophysiology',
    subjectId: 'pathology',
    subjectName: 'Pathology',
    levelRecommended: '300L - Final Year (Pathology & Clinical Medicine)',
    summary:
      'Point mutation in the beta-globin gene causing Glu6Val substitution, polymerization upon deoxygenation, vaso-occlusion, and hemolytic anemia.',
    keyPoints: [
      'Genetic defect: Single base substitution (GAG to GTG) at codon 6 of the beta-globin gene on chromosome 11.',
      'Substitution of hydrophilic glutamic acid with hydrophobic valine.',
      'Under hypoxia, acidosis, dehydration, or hypothermia, HbS molecules polymerize into rigid 14-strand helical fibers.',
      'Repeated sickling damages the erythrocyte membrane, causing irreversible sickling and intra/extravascular hemolysis.',
      'Key clinical crises: Vaso-occlusive (bone pain crisis), Sequestration crisis, Aplastic crisis (Parvovirus B19), Hyperhemolytic crisis.',
    ],
    clinicalCorrelations:
      'Endemic in Nigeria (approx. 2-3% of newborns have HbSS, ~25% carry HbAS trait). Hallmark presentations in Nigerian hospitals include dactylitis in infants, acute chest syndrome, avascular necrosis of the femoral head, autosplenectomy leading to encapsulated bacterial sepsis (Streptococcus pneumoniae, Salmonella osteomyelitis), and priapism.',
    mnemonic:
      'PAINS crisis: Presentation with Pain (bone/chest), Acidosis/Anemia, Infection triggers, Necrosis risk, Spleen sequestration.',
    detailedContent: `
### Molecular Mechanism and Cellular Pathology

Sickle Cell Anemia is the most prevalent monogenic hemoglobinopathy in West Africa. Understanding its pathological cascade from nucleotide to clinical ward crisis is paramount for Nigerian medical practitioners.

#### The Molecular Trigger:
1. GAG $\\rightarrow$ GTG transversion on the sixth codon of the $\\beta$-globin chain on chromosome 11p15.5.
2. Polar Glutamic Acid $\\rightarrow$ Non-polar Valine.
3. Upon low oxygen saturation ($pO_2 < 40\\text{ mmHg}$), a hydrophobic sticky patch on deoxygenated $\\beta_1$ and $\\beta_2$ chains docks with adjacent $\\beta$ chains.
4. Formation of insoluble tactile polymers (crystalloid tactoids) that deform the biconcave disc into a rigid crescent ("sickle").
    `,
    isVerified: true,
    verifiedBy: 'Nigerian Society of Hematology & Transfusion Medicine Board',
    readTimeMinutes: 8,
  },
  {
    id: 'pharm-antihypertensives',
    title: 'Antihypertensive Pharmacotherapy in Nigerian Guidelines',
    subjectId: 'pharmacology',
    subjectName: 'Pharmacology',
    levelRecommended: '300L - Final Year (Pharmacology & Internal Medicine)',
    summary:
      'Mechanisms and clinical selection of CCBs, Thiazide-like diuretics, ACE inhibitors, and ARBs in black hypertensive patients.',
    keyPoints: [
      'Black African patients generally have low-renin hypertension with salt sensitivity.',
      'First-line monotherapy or combination for Black patients: Dihydropyridine Calcium Channel Blocker (Amlodipine) + Thiazide-like Diuretic (Chlorthalidone / Indapamide).',
      'ACE Inhibitors (e.g., Lisinopril, Ramipril) and ARBs (e.g., Losartan, Telmisartan) are prioritized when diabetes mellitus, chronic kidney disease with proteinuria, or heart failure is present.',
      'Loop diuretics (Furosemide) are indicated when eGFR < 30 mL/min/1.73m² or in symptomatic volume overload, rather than routine essential hypertension.',
      'Adverse effects: ACEI cough/angioedema (higher bradykinin accumulation), Amlodipine ankle edema (pre-capillary arteriolar dilation), Thiazide hypokalemia & hyperuricemia.',
    ],
    clinicalCorrelations:
      'Hypertension is the leading driver of hemorrhagic and ischemic stroke, heart failure, and end-stage renal disease presenting in Nigerian adult medical wards. Adherence counseling and electrolyte monitoring (U/E/Cr) are compulsory.',
    mnemonic:
      'A-C-D Rule for Black Hypertensives: Calcium blocker (C) or Diuretic (D) first line; Add ACEI/ARB (A) for kidney/cardiac protection.',
    detailedContent: `
### Pharmacodynamics & Therapeutic Algorithm

Nigerian and International Society of Hypertension (ISH) guidelines stratify pharmacotherapy based on age, race, and comorbidities.

#### Class 1: Calcium Channel Blockers (Dihydropyridines)
* **Prototype:** Amlodipine (5–10 mg daily), Nifedipine retard.
* **Mechanism:** Blocks L-type voltage-gated calcium channels in vascular smooth muscle cells, inhibiting $Ca^{2+}$ influx $\\rightarrow$ potent peripheral arteriolar vasodilation $\\rightarrow$ reduced Total Peripheral Resistance (TPR).
* **Clinical Nuance:** Highly efficacious in low-renin hypertension; does not cause bronchospasm or metabolic dysregulation.
    `,
    isVerified: true,
    verifiedBy: 'Nigerian Hypertension Society & Clinical Pharmacology Syllabus',
    readTimeMinutes: 8,
  },
  {
    id: 'biochem-gluconeogenesis',
    title: 'Gluconeogenesis: Bypass Reactions & Regulation',
    subjectId: 'biochemistry',
    subjectName: 'Biochemistry',
    levelRecommended: '200L - 300L (1st & 2nd MB Exams)',
    summary:
      'Synthesis of glucose from non-carbohydrate precursors (lactate, glycerol, glucogenic amino acids) with 4 key bypass enzymes.',
    keyPoints: [
      'Site: Primarily Liver (90%) and Renal cortex (10% under baseline, up to 40% in prolonged starvation).',
      'Occurs during fasting, starvation, or vigorous exercise to maintain blood glucose for brain, RBCs, and renal medulla.',
      'Four irreversible steps of glycolysis are bypassed by 4 unique gluconeogenic enzymes.',
      'Enzyme 1: Pyruvate Carboxylase (Mitochondrial, requires Biotin + ATP + Allosteric Acetyl-CoA).',
      'Enzyme 2: Phosphoenolpyruvate Carboxykinase (PEPCK, requires GTP).',
      'Enzyme 3: Fructose-1,6-Bisphosphatase (Inhibited by AMP and Fructose-2,6-bisphosphate).',
      'Enzyme 4: Glucose-6-Phosphatase (Endoplasmic reticulum lumen, absent in muscle).',
    ],
    clinicalCorrelations:
      'Von Gierke Disease (Glycogen Storage Disease Type I) results from Glucose-6-Phosphatase deficiency, leading to severe fasting hypoglycemia, hepatomegaly, lactic acidosis, and hyperuricemia.',
    mnemonic:
      'Pathway Bypasses: "Pathway Produces Free Glucose" -> Pyruvate carboxylase, PEPCK, Fructose-1,6-BPase, Glucose-6-Phosphatase.',
    detailedContent: `
### Metabolic Crossroads

Gluconeogenesis allows human physiology to survive prolonged fasting and starvation, preventing fatal neuroglycopenia.

#### Key Substrates:
1. **Lactate:** Released by exercising skeletal muscle and mature erythrocytes (Cori Cycle).
2. **Glucogenic Amino Acids:** Principally Alanine (Glucose-Alanine cycle from muscle catabolism).
3. **Glycerol:** Liberated by lipolysis in white adipose tissue via hormone-sensitive lipase.
    `,
    isVerified: true,
    verifiedBy: 'Biochemical Society of Nigeria & Medical College Guidelines',
    readTimeMinutes: 6,
  },
  {
    id: 'micro-malaria-plasmodium',
    title: 'Plasmodium Falciparum Life Cycle & Cerebral Malaria',
    subjectId: 'microbiology-parasitology',
    subjectName: 'Microbiology and Parasitology',
    levelRecommended: '300L - Final Year (Microbiology, Pathology & Paediatrics)',
    summary:
      'Etiology of severe falciparum malaria, cytoadherence via PfEMP1, microvascular sequestration, rosette formation, and antimalarial mechanisms.',
    keyPoints: [
      'Vector: Female Anopheles mosquito transmits sporozoites during blood meal.',
      'Exoerythrocytic schizogony occurs in hepatocytes (asymptomatic, 5-15 days).',
      'Erythrocytic stage: Merozoites invade RBCs, develop into ring form, trophozoite, and schizont.',
      'P. falciparum exports PfEMP-1 (P. falciparum Erythrocyte Membrane Protein 1) to infected RBC knobs.',
      'PfEMP-1 binds endothelial CD36, ICAM-1, and EPCR, sequestering RBCs in cerebral and deep capillaries to avoid splenic clearance.',
      'First-line treatment in Nigeria: Artemisinin-based Combination Therapy (ACT e.g. Artemether-Lumefantrine) for uncomplicated, IV Artesunate for severe/cerebral malaria.',
    ],
    clinicalCorrelations:
      'Severe malaria presents in Nigerian children with prostration, unarousable coma (cerebral malaria with Blantyre score ≤ 2), severe normocytic normochromic anemia (Hb < 5 g/dL), hypoglycemia, and blackwater fever (massive intravascular hemolysis and hemoglobinuria).',
    mnemonic:
      'SEQUESTER: Sequestration, Endothelial binding, Quinine/Artesunate, Unconsciousness, Erythrocyte knobs, Sickle trait protection, Thrombocytopenia, Encephalopathy, Renal shutdown.',
    detailedContent: `
### Parasitology and Pathogenesis of P. Falciparum

Plasmodium falciparum causes over 95% of malaria cases and nearly all malaria mortality across Nigeria and sub-Saharan Africa.
    `,
    isVerified: true,
    verifiedBy: 'Nigerian Ministry of Health Malaria Elimination Program Guidelines',
    readTimeMinutes: 7,
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    subjectId: 'physiology',
    subjectName: 'Human Physiology',
    topic: 'Renal Physiology',
    level: '200L-300L',
    question:
      'Which section of the mammalian nephron is completely impermeable to water regardless of the concentration of Antidiuretic Hormone (ADH/Vasopressin)?',
    options: [
      'Proximal Convoluted Tubule',
      'Descending Limb of the Loop of Henle',
      'Thick Ascending Limb of the Loop of Henle',
      'Medullary Collecting Duct',
    ],
    correctAnswerIndex: 2,
    explanation:
      'The thick ascending limb of the loop of Henle (TAL) actively reabsorbs sodium, potassium, and chloride via the Na+/K+/2Cl- (NKCC2) cotransporter, but its tight junctions are completely impermeable to water. This dilutes luminal fluid and builds the hypertonic medullary interstitium.',
    clinicalRelevance:
      'Loop diuretics like Furosemide specifically target NKCC2 in the TAL, disrupting the medullary gradient and causing profound diuresis.',
    referenceSource: 'Guyton & Hall Textbook of Medical Physiology, 14th Ed.',
  },
  {
    id: 'q2',
    subjectId: 'anatomy',
    subjectName: 'Anatomy',
    topic: 'Upper Limb Anatomy & Nerve Lesions',
    level: '200L-300L',
    question:
      'A 24-year-old medical student fractures the mid-shaft of the humerus in a road traffic collision. On examination, he is unable to extend his wrist and fingers ("wrist drop"). Which nerve is injured?',
    options: ['Median Nerve', 'Ulnar Nerve', 'Radial Nerve', 'Axillary Nerve'],
    correctAnswerIndex: 2,
    explanation:
      'The Radial Nerve runs in the radial (spiral) groove on the posterior surface of the humeral mid-shaft alongside the profunda brachii artery. Mid-shaft fractures frequently lacerate or compress this nerve, paralyzing wrist and digit extensors and producing classic wrist drop.',
    clinicalRelevance:
      'High-yield OSCE station in 2nd MB and orthopaedic clinical rotations across Nigerian teaching hospitals.',
    referenceSource: "Snell's Clinical Anatomy by Regions, 10th Ed.",
  },
  {
    id: 'q3',
    subjectId: 'pathology',
    subjectName: 'Pathology',
    topic: 'Hematology & Hemoglobinopathies',
    level: '300L-400L',
    question:
      'The definitive molecular defect responsible for Sickle Cell Hemoglobin (HbS) is which of the following?',
    options: [
      'Substitution of Valine for Glutamic acid at position 6 of the alpha-globin chain',
      'Substitution of Valine for Glutamic acid at position 6 of the beta-globin chain',
      'Substitution of Lysine for Glutamic acid at position 6 of the beta-globin chain',
      'Deletion of two alpha-globin genes on chromosome 16',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Sickle cell disease is caused by a point mutation (GAG to GTG) in codon 6 of the beta-globin gene on chromosome 11, resulting in the substitution of the hydrophobic amino acid valine for hydrophilic glutamic acid.',
    clinicalRelevance:
      'Option C describes Hemoglobin C (HbC), which also occurs in West Africa. Understanding exact amino acid substitutions is tested regularly in MBBS Part 1 & 2 exams.',
    referenceSource: 'Robbins & Cotran Pathologic Basis of Disease, 10th Ed.',
  },
  {
    id: 'q4',
    subjectId: 'pharmacology',
    subjectName: 'Pharmacology',
    topic: 'Cardiovascular Pharmacology',
    level: '300L-400L',
    question:
      'A 55-year-old Nigerian woman with primary hypertension is initiated on Lisinopril. Two weeks later, she returns complaining of a persistent, distressing dry nocturnal cough. What is the pharmacological mechanism causing this adverse effect?',
    options: [
      'Direct histamine release from pulmonary mast cells',
      'Inhibition of Bradykinin and Substance P degradation in the bronchial mucosa',
      'Reflex sympathetic hyperactivation of bronchial beta-2 receptors',
      'Microvascular pulmonary edema from sodium retention',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Angiotensin-Converting Enzyme (ACE) is identical to Kininase II, the enzyme responsible for degrading bradykinin and substance P. Inhibition of ACE leads to local accumulation of bradykinin in the airways, stimulating unmyelinated C-fibers and producing the characteristic dry cough. Switching to an ARB (e.g., Losartan) bypasses this problem.',
    clinicalRelevance:
      'Common reason for non-adherence in Nigerian medical clinics. Nigerian guidelines recommend ARBs when ACEI cough arises.',
    referenceSource: 'Katzung Basic & Clinical Pharmacology, 15th Ed.',
  },
  {
    id: 'q5',
    subjectId: 'biochemistry',
    subjectName: 'Biochemistry',
    topic: 'Metabolism & Enzymology',
    level: '100L-200L',
    question:
      'Which of the following enzymes catalyzes the committed and primary rate-limiting step of Glycolysis in mammalian tissues?',
    options: [
      'Hexokinase',
      'Phosphofructokinase-1 (PFK-1)',
      'Pyruvate Kinase',
      'Glyceraldehyde-3-Phosphate Dehydrogenase',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Phosphofructokinase-1 (PFK-1) catalyzes the phosphorylation of Fructose-6-Phosphate to Fructose-1,6-Bisphosphate. It is tightly regulated allosterically: inhibited by high ATP and citrate, and activated by AMP and Fructose-2,6-Bisphosphate.',
    clinicalRelevance:
      'Fundamental question in 1st/2nd MB Biochemistry exams across all Nigerian faculties of Basic Medical Sciences.',
    referenceSource: "Harper's Illustrated Biochemistry, 32nd Ed.",
  },
  {
    id: 'q6',
    subjectId: 'microbiology-parasitology',
    subjectName: 'Microbiology and Parasitology',
    topic: 'Infectious Diseases',
    level: '300L-400L',
    question:
      'A 9-year-old boy in rural Anambra State presents with terminal painless hematuria. Microscopic examination of urine sediment reveals large eggs with a distinctive terminal spine. What is the causative pathogen?',
    options: [
      'Schistosoma mansoni',
      'Schistosoma haematobium',
      'Schistosoma japonicum',
      'Wuchereria bancrofti',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Schistosoma haematobium infects the venous plexus of the urinary bladder and pelvic organs. Its ova possess a classic sharp terminal spine. Over time, chronic irritation predisposes to squamous cell carcinoma of the urinary bladder.',
    clinicalRelevance:
      'Key tropical parasite endemic in freshwater river basins across Nigeria. S. mansoni has a prominent lateral spine and affects mesenteric venules causing intestinal schistosomiasis.',
    referenceSource: 'Manson’s Tropical Infectious Diseases, 24th Ed.',
  },
  {
    id: 'q7',
    subjectId: 'medicine-surgery',
    subjectName: 'Medicine and Surgery',
    topic: 'Clinical Medicine & Emergency Care',
    level: '500L-Final Year',
    question:
      'A 32-year-old pregnant woman at 34 weeks of gestation presents to the emergency ward with BP of 170/110 mmHg, 3+ proteinuria, hyperreflexia, and sudden severe frontal headache with epigastric pain. What is the immediate drug of choice for seizure prophylaxis?',
    options: [
      'Intravenous Diazepam',
      'Intravenous Magnesium Sulphate',
      'Intravenous Phenytoin',
      'Oral Methyldopa',
    ],
    correctAnswerIndex: 1,
    explanation:
      'The patient has severe pre-eclampsia with impending eclampsia. The international and Nigerian obstetric standard of care for seizure prevention and treatment in eclampsia is Magnesium Sulphate (Pritchard regimen: 4g IV loading dose + 10g IM, followed by 5g IM every 4 hours, monitoring respiratory rate, knee-jerk reflex, and urine output).',
    clinicalRelevance:
      'Eclampsia remains one of the top causes of maternal mortality in Nigeria. Mag sulphate is vastly superior to diazepam and phenytoin.',
    referenceSource: 'Williams Obstetrics & Nigerian Society of Gynaecology and Obstetrics (SOGON) Guidelines',
  },
  {
    id: 'q8',
    subjectId: 'nursing-sciences',
    subjectName: 'Nursing Sciences',
    topic: 'Patient Safety & Clinical Procedures',
    level: '200L-300L',
    question:
      'When administering an intramuscular injection to an infant under 12 months of age, which anatomical site is recommended by pediatric nursing standards?',
    options: [
      'Dorsogluteal muscle',
      'Deltoid muscle',
      'Vastus Lateralis muscle (anterolateral thigh)',
      'Ventral forearm',
    ],
    correctAnswerIndex: 2,
    explanation:
      'In infants under 12 months, the vastus lateralis muscle of the anterolateral thigh is the most developed muscle mass with thick fascial containment and is distant from major neurovascular structures (unlike the dorsogluteal site, which poses a severe risk of sciatic nerve injury in babies).',
    clinicalRelevance:
      'Core clinical nursing and pediatric foundation examined across Nigerian universities nursing faculties.',
    referenceSource: 'Brunner & Suddarth’s Textbook of Medical-Surgical Nursing & WHO Guidelines',
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc1',
    subjectId: 'anatomy',
    subjectName: 'Anatomy',
    topic: 'Lower Limb & Femoral Region',
    front: 'What are the contents of the Femoral Triangle from LATERAL to MEDIAL?',
    back: 'Femoral Nerve, Femoral Artery, Femoral Vein, Femoral Canal (containing deep inguinal lymph node of Cloquet).',
    mnemonic: 'NAVEL: Nerve, Artery, Vein, Empty space (canal), Lymphatics.',
    clinicalPearl:
      'The femoral nerve lies OUTSIDE the femoral sheath; only the artery, vein, and canal are enclosed within the sheath.',
    status: 'unreviewed',
  },
  {
    id: 'fc2',
    subjectId: 'physiology',
    subjectName: 'Human Physiology',
    topic: 'Cardiovascular Physiology',
    front: 'What is the Frank-Starling Law of the Heart?',
    back: 'Within physiological limits, the force of ventricular myocardial contraction is directly proportional to the initial end-diastolic muscle fiber length (preload).',
    mnemonic: 'Stretch = Squeeze (Increased End-Diastolic Volume leads to greater stroke volume).',
    clinicalPearl:
      'In decompensated heart failure, excess chronic dilation places myocytes beyond optimal sarcomere actin-myosin overlap (Lmax), reducing stroke volume.',
    status: 'unreviewed',
  },
  {
    id: 'fc3',
    subjectId: 'pharmacology',
    subjectName: 'Pharmacology',
    topic: 'Antimicrobials',
    front: 'What is the mechanism of action of Penicillins and Cephalosporins (Beta-lactams)?',
    back: 'Bactericidal inhibition of bacterial cell wall synthesis by irreversibly binding to and inhibiting Transpeptidase enzymes (Penicillin-Binding Proteins / PBPs), preventing peptidoglycan cross-linking.',
    mnemonic: 'PBPs = Penicillin Blocks Peptidoglycan Synthesis.',
    clinicalPearl:
      'Bacterial resistance in Nigerian clinical settings is commonly mediated by plasmid-encoded beta-lactamases; combining with Clavulanic acid or Sulbactam restores efficacy.',
    status: 'unreviewed',
  },
  {
    id: 'fc4',
    subjectId: 'pathology',
    subjectName: 'Pathology',
    topic: 'Cellular Pathology & Necrosis',
    front: 'Which type of necrosis is uniquely characteristic of ischemic injury in the Central Nervous System (Brain)?',
    back: 'Liquefactive Necrosis. Hydrolytic enzymes released by autolytic lysosomes and microglial cells digest necrotic cerebral tissue into a viscous fluid mass.',
    mnemonic: 'Brain liquefies, solid organs coagulate (except CNS infarcts).',
    clinicalPearl:
      'In contrast, myocardial and renal infarctions undergo Coagulative Necrosis, preserving cellular outlines like ghost cells.',
    status: 'unreviewed',
  },
  {
    id: 'fc5',
    subjectId: 'medical-biochemistry',
    subjectName: 'Medical Biochemistry',
    topic: 'Clinical Enzymology',
    front: 'Which cardiac biomarker rises earliest, and which remains elevated longest after an Acute Myocardial Infarction (AMI)?',
    back: 'Rises earliest: Myoglobin (~1–2 hours). Remains elevated longest: Cardiac Troponin I (cTnI) and Troponin T (cTnT) (remain elevated for 7–14 days).',
    clinicalPearl:
      'CK-MB peaks at 24 hours and normalizes within 48–72 hours, making it the preferred marker to diagnose re-infarction.',
    status: 'unreviewed',
  },
  {
    id: 'fc6',
    subjectId: 'microbiology-parasitology',
    subjectName: 'Microbiology and Parasitology',
    topic: 'Bacteriology',
    front: 'What is the causative agent and classic stool appearance of Cholera?',
    back: 'Vibrio cholerae (Gram-negative comma-shaped rod with single polar flagellum). Stool appearance: profuse, painless "Rice-water stool" with a fishy odor.',
    mnemonic: 'Vibrio Vibing in Rice Water.',
    clinicalPearl:
      'Pathogenesis: Cholera toxin permanently ADP-ribosylates Gs alpha subunit, activating adenylyl cyclase and continuously pumping Cl- and water into intestinal lumen. Immediate oral rehydration salts (ORS) save lives.',
    status: 'unreviewed',
  },
];

export const STUDY_TASKS: StudyTask[] = [
  {
    id: 'st1',
    title: 'Review Starling Forces & Capillary Hemodynamics',
    subject: 'Human Physiology',
    dueDate: 'Tomorrow, 8:00 PM',
    completed: true,
    priority: 'high',
    category: 'Exam Prep',
  },
  {
    id: 'st2',
    title: 'Brachial Plexus Anatomy & Upper Limb Nerve Lesions',
    subject: 'Anatomy',
    dueDate: 'In 2 days',
    completed: false,
    priority: 'high',
    category: 'Revision',
  },
  {
    id: 'st3',
    title: 'Antihypertensive Drug Classifications & ISH Guidelines',
    subject: 'Pharmacology',
    dueDate: 'Friday, 10:00 AM',
    completed: false,
    priority: 'medium',
    category: 'Ward Rounds',
  },
  {
    id: 'st4',
    title: 'Vaso-occlusive Crisis & Sickle Cell Pathophysiology',
    subject: 'Pathology',
    dueDate: 'Saturday, 4:00 PM',
    completed: false,
    priority: 'high',
    category: 'Practical / Viva',
  },
  {
    id: 'st5',
    title: 'Krebs Cycle & Gluconeogenesis Bypasses Mnemonic drill',
    subject: 'Biochemistry',
    dueDate: 'Sunday, 6:00 PM',
    completed: false,
    priority: 'low',
    category: 'Revision',
  },
];

// Offline / fallback high-yield medical responses for instant answers if API key is unconfigured
export const HIGH_YIELD_FALLBACK_ANSWERS: Record<string, string> = {
  default: `
### NESYRINGE AI Clinical Summary

**1. Core Concept**:
In medical sciences, understanding the fundamental physiological or anatomical mechanism is the key to solving clinical examination problems and managing patients effectively.

**2. High-Yield Breakdown**:
* Focus on the relationship between structure and function.
* For pharmacological topics: always master **Mechanism of Action (MOA)**, **Indications**, **Key Adverse Effects**, and **Contraindications**.
* For anatomical topics: establish **Boundaries**, **Relations**, **Contents**, and **Innervation / Blood Supply**.
* For pathological topics: link the **Etiology** $\\rightarrow$ **Pathogenesis** $\\rightarrow$ **Morphology (Gross/Micro)** $\\rightarrow$ **Clinical Features**.

**3. Nigerian Clinical Context**:
Nigerian teaching hospitals regularly emphasize tropical infectious diseases (Malaria, Typhoid, TB), endemic hematological conditions (Sickle Cell Anemia), and cardiovascular disorders (Severe Hypertension, Stroke).

**4. High-Yield Mnemonic**:
* **S-O-A-P**: Subjective history, Objective clinical examination, Assessment/Differential, Plan of investigation and management.

**5. Quick Self-Check Questions**:
1. What is the standard pass mark in Nigerian medical school professional examinations? *(Answer: 50%)*
2. What is the fundamental goal of clinical medicine? *(Answer: Accurate diagnosis, evidence-based therapy, compassionate care)*

*Disclaimer: NESYRINGE AI is an educational study companion for medical and health science students across Nigerian universities. Verify critical clinical decisions with current standard textbooks.*
  `,
  starling: `
### Starling's Forces & Microvascular Fluid Exchange

**1. Executive Summary**:
Net fluid movement between intravascular capillaries and the interstitial space is governed by the vector sum of hydrostatic pressure and colloid osmotic (oncotic) pressure.

**2. Detailed Breakdown**:
* **Capillary Hydrostatic Pressure ($P_c$)**: Pushes fluid OUT of the capillary into interstitium (30-35 mmHg arteriolar end, 15 mmHg venular end).
* **Interstitial Fluid Hydrostatic Pressure ($P_{if}$)**: Pushes fluid INTO capillary when positive, or out when subatmospheric (-3 mmHg).
* **Capillary Oncotic Pressure ($\\pi_c$)**: Exerted mostly by serum albumin (25-28 mmHg), pulls fluid INTO capillary.
* **Interstitial Oncotic Pressure ($\\pi_{if}$)**: Exerted by leaked interstitial proteins (3-8 mmHg), pulls fluid OUT into interstitium.

**Equation**:
$$\\text{Net Filtration Pressure (NFP)} = (P_c - P_{if}) - (\\pi_c - \\pi_{if})$$

**3. Clinical Correlations in Nigerian Hospitals**:
* **Kwashiorkor / Severe Acute Malnutrition**: Decreased dietary protein $\\rightarrow$ profound hypoalbuminemia $\\rightarrow$ low $\\pi_c$ $\\rightarrow$ severe generalized pitting edema with ascites.
* **Congestive Cardiac Failure (CCF)**: Venous congestion $\\rightarrow$ elevated systemic venous pressure $\\rightarrow$ increased $P_c$ $\\rightarrow$ bilateral lower extremity pitting edema and pulmonary edema.

**4. Mnemonic**:
* **"P-C"**: **P**ressure **P**ushes fluid out; **C**olloid **C**ollects fluid back in!

**5. Revision Questions**:
1. What is the primary plasma protein responsible for oncotic pressure? *(Albumin)*
2. How does nephrotic syndrome lead to edema? *(Massive proteinuria >3.5g/24h drops plasma oncotic pressure)*
  `,
  sickle: `
### Sickle Cell Disease (HbSS) Pathophysiology

**1. Executive Summary**:
Sickle Cell Anemia is an autosomal recessive hemoglobinopathy caused by a single point mutation in the beta-globin gene, resulting in sickling of erythrocytes under deoxygenation and subsequent vaso-occlusion and chronic hemolysis.

**2. Molecular Mechanism**:
* Single nucleotide transversion: GAG to GTG at codon 6 of the $\\beta$-globin gene on chromosome 11.
* Substitutes polar **Glutamic acid** with non-polar **Valine**.
* Deoxygenation exposes hydrophobic patches, polymerizing HbS into long, rigid crystalline tactoid fibers.
* Polymerization deforms red blood cells into stiff, fragile sickled shapes that occlude the microcirculation.

**3. Nigerian Clinical Considerations**:
Nigeria has the highest burden of sickle cell disease in the world (~2-3% of all newborns).
* **Vaso-occlusive crisis (Pain crisis)**: Bone infarcts, dactylitis ("hand-foot syndrome") in infants.
* **Sequestration crisis**: Sudden pooling of blood in the spleen $\\rightarrow$ acute hypovolemic shock.
* **Aplastic crisis**: Temporary cessation of erythropoiesis triggered by Parvovirus B19.
* **Autosplenectomy**: Repeated splenic micro-infarcts lead to a fibrotic, non-functional spleen by childhood, predisposing to encapsulated bacterial sepsis (*Streptococcus pneumoniae*, *Salmonella* osteomyelitis).

**4. Mnemonic for Management (H-O-P-E)**:
* **H**: Hydration (IV fluids / oral intake)
* **O**: Oxygenation (if hypoxic)
* **P**: Pain relief (Analgesia e.g. Paracetamol + Opioids like Morphine/Pentazocine)
* **E**: Eradicate infection (Prompt broad-spectrum antibiotics)

**5. Revision Questions**:
1. Which chromosome houses the beta-globin gene? *(Chromosome 11)*
2. Why are patients with sickle cell disease functionally asplenic? *(Repeated infarctions cause autosplenectomy)*
  `,
  brachial: `
### Brachial Plexus & High-Yield Nerve Lesions

**1. Executive Summary**:
The Brachial Plexus supplies motor and sensory innervation to the entire upper limb. Formed by anterior rami of spinal nerves **C5 to T1**.

**2. Structural Schema**:
* **Roots**: C5, C6, C7, C8, T1
* **Trunks**: Superior (C5-C6), Middle (C7), Inferior (C8-T1)
* **Divisions**: Each trunk splits into Anterior and Posterior divisions (6 total)
* **Cords**: Lateral, Posterior, Medial (named relative to the Axillary Artery)
* **Terminal Branches**: Musculocutaneous, Axillary, Radial, Median, Ulnar

**3. Classic Exam Lesions in Nigerian Medical Schools**:
* **Erb-Duchenne Palsy (Upper Trunk lesion: C5-C6)**: Caused by excessive separation of head and shoulder (difficult breech delivery or motorcycle fall). "Waiter's tip position" (arm adducted, internally rotated, elbow extended, forearm pronated).
* **Klumpke Palsy (Lower Trunk lesion: C8-T1)**: Caused by upward traction on arm (grabbing tree branch while falling or breech arm traction). Results in intrinsic hand muscle paralysis $\\rightarrow$ "True Claw Hand" + Horner syndrome.
* **Radial Nerve (Spiral groove midshaft humerus fracture)**: "Wrist drop" due to loss of extensors.
* **Median Nerve (Supracondylar fracture of humerus or carpal tunnel)**: "Ape hand" or "Hand of Benediction".
* **Ulnar Nerve (Medial epicondyle fracture or hook of hamate)**: "Ulnar claw hand".

**4. Mnemonic for Divisions**:
* **R-T-D-C-B**: **R**ead **T**hat **D**amn **C**adaver **B**ook (Roots, Trunks, Divisions, Cords, Branches).
  `,
};
