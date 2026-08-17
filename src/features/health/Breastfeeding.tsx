import { useState } from "react";
import "./Breastfeeding.css";

type Tip = {
  day: number;
  category: string;
  title: string;
  message: string;
  whyItMatters: string;
  motherTip: string;
};

/*
  ============================================================
  G-SAM RURAHEALTH
  180-DAY BREASTFEEDING JOURNEY

  Short daily health-education messages.
  Designed for mothers/caregivers using the citizen portal.

  IMPORTANT:
  This content is educational and does not replace
  individualized advice from a qualified health professional.
  ============================================================
*/

const dailyContent = [
  {
    title: "Your Baby's First Protection",
    message:
      "Breast milk provides important nutrition and protective components from the beginning.",
    why:
      "Early breastfeeding gives your baby a valuable nutritional and protective start.",
    tip:
      "If possible, begin breastfeeding within the first hour after birth.",
  },
  {
    title: "Meet Colostrum",
    message:
      "Colostrum is the first milk and is rich in protective components.",
    why:
      "Small amounts of colostrum are specially suited to a newborn's early needs.",
    tip:
      "Do not discard colostrum because it looks different from mature milk.",
  },
  {
    title: "Small Amounts Are Normal",
    message:
      "Newborn babies usually take small amounts of colostrum during early feeds.",
    why:
      "A newborn's stomach is small and feeding patterns develop gradually.",
    tip:
      "Offer the breast frequently and watch your baby's feeding cues.",
  },
  {
    title: "Skin-to-Skin Matters",
    message:
      "Skin-to-skin contact can support early breastfeeding and bonding.",
    why:
      "Close contact helps babies stay warm and can encourage feeding behaviours.",
    tip:
      "Ask for skin-to-skin contact when medically appropriate.",
  },
  {
    title: "Follow Baby's Hunger Cues",
    message:
      "Early hunger cues can include stirring, hand-to-mouth movements and rooting.",
    why:
      "Responding early can make feeding easier than waiting until crying.",
    tip:
      "Watch your baby rather than relying only on a fixed feeding schedule.",
  },
  {
    title: "Breast Milk and Immunity",
    message:
      "Breast milk contains antibodies and other immune components.",
    why:
      "These components support the developing immune system.",
    tip:
      "Continue breastfeeding as recommended while your baby grows.",
  },
  {
    title: "Supporting the Developing Gut",
    message:
      "Breast milk contains components that support the developing digestive system.",
    why:
      "A healthy developing gut contributes to nutrition and overall wellbeing.",
    tip:
      "Seek advice if your baby has persistent feeding or digestive problems.",
  },
  {
    title: "Breast Milk Provides Water",
    message:
      "For healthy babies, breast milk provides fluid as well as nutrition.",
    why:
      "Additional water is generally unnecessary for exclusively breastfed young infants.",
    tip:
      "Breastfeed when your baby shows hunger or thirst cues.",
  },
  {
    title: "Responsive Breastfeeding",
    message:
      "Responsive feeding means responding to your baby's hunger and fullness cues.",
    why:
      "It supports a healthy feeding relationship between mother and baby.",
    tip:
      "Let your baby guide the pace of feeds when possible.",
  },
  {
    title: "Breastfeeding and Bonding",
    message:
      "Breastfeeding provides opportunities for close contact between mother and baby.",
    why:
      "Warm interaction supports bonding and emotional connection.",
    tip:
      "Use feeding time to maintain gentle eye contact and closeness.",
  },

  {
    title: "A Developing Brain",
    message:
      "Breast milk provides nutrients that contribute to infant growth and development.",
    why:
      "Early infancy is an important period for brain and nervous-system development.",
    tip:
      "Keep your baby's routine health appointments.",
  },
  {
    title: "Healthy Eye Development",
    message:
      "Breast milk provides nutrients involved in normal growth and development.",
    why:
      "The eyes and nervous system develop rapidly during infancy.",
    tip:
      "Discuss concerns about your baby's vision with a health worker.",
  },
  {
    title: "Growing Strong",
    message:
      "Breast milk supplies energy, protein, fats, vitamins and minerals.",
    why:
      "These nutrients support normal infant growth.",
    tip:
      "Monitor your baby's growth during routine health visits.",
  },
  {
    title: "Feed Frequently",
    message:
      "Young breastfed babies commonly feed many times throughout the day and night.",
    why:
      "Frequent feeding supports milk removal and helps maintain milk production.",
    tip:
      "Do not assume frequent feeding automatically means low milk supply.",
  },
  {
    title: "Night Feeding Is Normal",
    message:
      "Night feeds are common during early infancy.",
    why:
      "Babies have small stomachs and need regular nourishment.",
    tip:
      "Rest whenever possible and seek support from family members.",
  },
  {
    title: "Milk Production Works by Demand",
    message:
      "Regular milk removal generally signals the breasts to continue producing milk.",
    why:
      "Effective feeding supports ongoing milk production.",
    tip:
      "If milk supply concerns you, speak with a breastfeeding professional.",
  },
  {
    title: "A Good Latch Helps",
    message:
      "A deep, comfortable latch helps your baby remove milk effectively.",
    why:
      "Effective milk removal can support feeding and milk production.",
    tip:
      "Pain that continues during feeds deserves professional assessment.",
  },
  {
    title: "Comfort Matters",
    message:
      "Breastfeeding should generally not cause persistent severe nipple pain.",
    why:
      "Persistent pain can sometimes indicate positioning or latch problems.",
    tip:
      "Ask a health worker to observe a feed if pain continues.",
  },
  {
    title: "Different Breasts Are Normal",
    message:
      "Breasts can naturally differ in size, shape and milk production.",
    why:
      "Normal variation does not automatically mean breastfeeding will be difficult.",
    tip:
      "Focus on your baby's feeding and growth rather than appearance.",
  },
  {
    title: "One Breast May Produce More",
    message:
      "It is common for one breast to produce more milk than the other.",
    why:
      "Differences in stimulation and individual anatomy can affect production.",
    tip:
      "Offer both breasts and seek help if one becomes painful or swollen.",
  },

  {
    title: "Breast Milk Changes",
    message:
      "Breast milk changes in composition as your baby grows.",
    why:
      "Milk adapts to changing nutritional and developmental needs.",
    tip:
      "Do not worry if your milk looks different at different times.",
  },
  {
    title: "Foremilk and Hindmilk",
    message:
      "Milk composition changes during a feed rather than being two completely separate milks.",
    why:
      "Milk fat tends to increase as the breast is emptied.",
    tip:
      "Allow your baby to finish a breast rather than watching the clock.",
  },
  {
    title: "Your Milk Is Not 'Too Thin'",
    message:
      "Breast milk can naturally look watery, creamy or bluish at different times.",
    why:
      "Appearance alone does not determine nutritional quality.",
    tip:
      "Judge feeding adequacy through your baby's behaviour, output and growth.",
  },
  {
    title: "Colostrum Is Special",
    message:
      "Colostrum contains concentrated protective and nutritional components.",
    why:
      "It is particularly suited to the newborn period.",
    tip:
      "Feed colostrum frequently during the first days.",
  },
  {
    title: "Transitional Milk",
    message:
      "Milk gradually changes from colostrum toward mature breast milk.",
    why:
      "This transition reflects your baby's changing needs.",
    tip:
      "Expect your breasts and milk to change during the first weeks.",
  },
  {
    title: "Mature Breast Milk",
    message:
      "Mature breast milk contains water, carbohydrates, fats, proteins and micronutrients.",
    why:
      "Together these components support infant growth and development.",
    tip:
      "Continue regular breastfeeding according to your baby's cues.",
  },
  {
    title: "Breast Milk Contains Lactose",
    message:
      "Lactose is the main carbohydrate in human milk.",
    why:
      "It provides energy and supports normal development.",
    tip:
      "Do not remove foods from your diet without professional advice.",
  },
  {
    title: "Breast Milk Contains Fat",
    message:
      "Human milk contains fats that provide energy and support development.",
    why:
      "Dietary fats are important for growth and nervous-system development.",
    tip:
      "Eat a varied, balanced diet while breastfeeding.",
  },
  {
    title: "Breast Milk Contains Protein",
    message:
      "Human milk provides proteins needed for growth and development.",
    why:
      "Protein contributes to tissues, enzymes and many body functions.",
    tip:
      "Continue routine infant growth monitoring.",
  },
  {
    title: "Breast Milk Contains Vitamins",
    message:
      "Breast milk provides many vitamins and other micronutrients.",
    why:
      "Micronutrients contribute to normal growth and body functions.",
    tip:
      "Ask your health worker about recommended infant supplements.",
  },

  {
    title: "Vitamin D Needs Attention",
    message:
      "Breast milk alone may not provide enough vitamin D for infants.",
    why:
      "Vitamin D is important for healthy bones and development.",
    tip:
      "Ask a health professional whether your baby needs vitamin D supplementation.",
  },
  {
    title: "Iron Stores Change",
    message:
      "Babies are born with iron stores that gradually decrease during infancy.",
    why:
      "Iron is important for blood formation and brain development.",
    tip:
      "Follow your baby's recommended nutrition and health checks.",
  },
  {
    title: "Protective Antibodies",
    message:
      "Human milk contains antibodies such as secretory IgA.",
    why:
      "These antibodies help support protection at mucosal surfaces.",
    tip:
      "Breastfeed normally even when feeds become more frequent.",
  },
  {
    title: "Lactoferrin",
    message:
      "Lactoferrin is one of the proteins found in human milk.",
    why:
      "It contributes to the protective environment of the infant gut.",
    tip:
      "Remember that breast milk contains many components working together.",
  },
  {
    title: "Human Milk Oligosaccharides",
    message:
      "Human milk contains special carbohydrates called human milk oligosaccharides.",
    why:
      "They interact with the infant gut and support beneficial microbial communities.",
    tip:
      "Breast milk composition is much more complex than basic nutrients alone.",
  },
  {
    title: "Supporting Healthy Gut Bacteria",
    message:
      "Breast milk can help support a beneficial infant gut microbiome.",
    why:
      "Gut microbes interact with digestion and immune development.",
    tip:
      "Avoid unnecessary medicines or supplements without professional advice.",
  },
  {
    title: "Breastfeeding and Infection Protection",
    message:
      "Breastfeeding is associated with lower risks of some infant infections.",
    why:
      "Human milk contains immune factors alongside nutrition.",
    tip:
      "Seek medical care promptly when your baby appears seriously unwell.",
  },
  {
    title: "Respiratory Protection",
    message:
      "Breastfeeding is associated with reduced risk of some respiratory infections.",
    why:
      "Immune components in human milk support infant protection.",
    tip:
      "Keep your baby's vaccinations and health checks up to date.",
  },
  {
    title: "Ear Infection Protection",
    message:
      "Breastfeeding is associated with a lower risk of some childhood infections.",
    why:
      "Protection against infection is one of breastfeeding's recognized benefits.",
    tip:
      "Seek care if your baby develops persistent fever or appears unwell.",
  },
  {
    title: "Diarrhoea Protection",
    message:
      "Breastfeeding is associated with reduced risk of diarrhoeal illness.",
    why:
      "Human milk provides both nutrition and protective factors.",
    tip:
      "Seek medical help quickly if your baby shows signs of dehydration.",
  },

  {
    title: "Keep Feeding During Illness",
    message:
      "In many common illnesses, breastfeeding can continue.",
    why:
      "Breast milk provides fluids, nutrition and immune components.",
    tip:
      "Follow your healthcare provider's advice for specific illnesses.",
  },
  {
    title: "Mother's Hydration",
    message:
      "Breastfeeding mothers need regular fluids according to thirst.",
    why:
      "Adequate hydration supports normal body function.",
    tip:
      "Keep drinking water regularly, especially when you feel thirsty.",
  },
  {
    title: "Mother's Nutrition",
    message:
      "A varied diet helps a breastfeeding mother meet her own nutritional needs.",
    why:
      "Your health matters while you care for your baby.",
    tip:
      "Choose a variety of fruits, vegetables, grains and protein foods.",
  },
  {
    title: "No Special Breastfeeding Diet",
    message:
      "Most breastfeeding mothers do not need a highly restricted diet.",
    why:
      "A varied diet can provide important nutrients without unnecessary restrictions.",
    tip:
      "Only eliminate foods when medically recommended.",
  },
  {
    title: "Eat Regularly",
    message:
      "Breastfeeding mothers benefit from regular balanced meals and snacks.",
    why:
      "Breastfeeding increases energy demands for many mothers.",
    tip:
      "Keep simple nutritious snacks available when you are busy.",
  },
  {
    title: "Rest When You Can",
    message:
      "Caring for a newborn can be physically and emotionally demanding.",
    why:
      "Rest supports maternal wellbeing.",
    tip:
      "Accept practical help so you can get opportunities to rest.",
  },
  {
    title: "Ask for Help",
    message:
      "Breastfeeding does not have to be managed alone.",
    why:
      "Practical and professional support can improve confidence and continuation.",
    tip:
      "Speak up early when feeding becomes difficult.",
  },
  {
    title: "Family Support Matters",
    message:
      "Supportive families can make breastfeeding easier.",
    why:
      "Practical assistance can reduce stress for new mothers.",
    tip:
      "Ask family members to help with meals, chores and rest.",
  },
  {
    title: "Protect Your Feeding Time",
    message:
      "A calm environment can make feeding more comfortable.",
    why:
      "Reducing unnecessary pressure can support a positive feeding experience.",
    tip:
      "Find a comfortable place where you can feed without rushing.",
  },
  {
    title: "Breastfeeding Is a Skill",
    message:
      "Both mother and baby learn breastfeeding together.",
    why:
      "Early challenges do not automatically mean breastfeeding will fail.",
    tip:
      "Give yourself time and seek support when needed.",
  },

  {
    title: "Positioning Helps",
    message:
      "Good positioning can help your baby attach comfortably.",
    why:
      "Comfortable positioning can improve milk transfer and reduce nipple trauma.",
    tip:
      "Keep your baby's head and body aligned during feeding.",
  },
  {
    title: "Baby's Nose Should Be Free",
    message:
      "Your baby's nose should remain comfortably clear during feeding.",
    why:
      "A good position helps the baby breathe while feeding.",
    tip:
      "Bring baby to the breast rather than leaning your breast toward baby.",
  },
  {
    title: "Tummy-to-Tummy",
    message:
      "Keeping baby close and facing your body can support attachment.",
    why:
      "Close alignment can make latching easier.",
    tip:
      "Keep your baby's body close to yours during feeds.",
  },
  {
    title: "Look for Rhythmic Sucking",
    message:
      "Effective breastfeeding often includes periods of sucking and swallowing.",
    why:
      "Swallowing is one sign that milk is being transferred.",
    tip:
      "Ask a health worker to observe a feed if you are unsure.",
  },
  {
    title: "Listen for Swallowing",
    message:
      "Some babies make soft swallowing sounds during effective feeding.",
    why:
      "Swallowing suggests milk is moving from breast to baby.",
    tip:
      "Watch your baby's jaw and swallowing pattern during feeds.",
  },
  {
    title: "Baby's Hands May Move",
    message:
      "Babies may move their hands during feeding.",
    why:
      "Normal infant behaviour varies during breastfeeding.",
    tip:
      "Do not force your baby's hands away unless necessary for safety.",
  },
  {
    title: "Let Baby Finish",
    message:
      "Allowing your baby to feed actively can help with milk transfer.",
    why:
      "Milk composition changes during a feed.",
    tip:
      "Offer the second breast when your baby appears ready.",
  },
  {
    title: "Switching Breasts",
    message:
      "Offer the other breast when your baby finishes or slows on the first.",
    why:
      "This can provide additional milk and stimulation.",
    tip:
      "Follow your baby's cues rather than using a strict timer.",
  },
  {
    title: "Cluster Feeding",
    message:
      "Babies sometimes want several feeds close together.",
    why:
      "Cluster feeding can occur during normal growth periods.",
    tip:
      "Stay hydrated and ask for help if cluster feeding feels overwhelming.",
  },
  {
    title: "Growth Spurts",
    message:
      "Babies may temporarily feed more frequently during growth spurts.",
    why:
      "Increased feeding can help stimulate milk production.",
    tip:
      "Frequent feeding does not automatically mean your milk is insufficient.",
  },

  {
    title: "Track Wet Diapers",
    message:
      "Wet nappies are one useful sign of milk intake in young babies.",
    why:
      "Urine output provides information about hydration.",
    tip:
      "Ask your health worker what output is expected for your baby's age.",
  },
  {
    title: "Track Baby's Growth",
    message:
      "Weight and growth are important indicators of infant wellbeing.",
    why:
      "Growth monitoring helps identify feeding concerns early.",
    tip:
      "Attend scheduled child welfare and immunization visits.",
  },
  {
    title: "Baby's Alertness",
    message:
      "A well-fed baby generally has periods of normal alertness and activity.",
    why:
      "Changes in behaviour can sometimes signal illness or feeding problems.",
    tip:
      "Seek advice if your baby becomes unusually sleepy or difficult to wake.",
  },
  {
    title: "When Baby Seems Hungry",
    message:
      "Rooting and hand-to-mouth movements can signal hunger.",
    why:
      "Early feeding cues can make breastfeeding more responsive.",
    tip:
      "Offer the breast when early cues appear.",
  },
  {
    title: "Crying Is a Late Cue",
    message:
      "Crying can be a later sign of hunger.",
    why:
      "A very upset baby may be harder to settle for feeding.",
    tip:
      "Respond to earlier feeding cues whenever possible.",
  },
  {
    title: "Baby's Fullness Cues",
    message:
      "A baby may slow sucking, release the breast or turn away when satisfied.",
    why:
      "Recognizing fullness supports responsive feeding.",
    tip:
      "Do not force your baby to continue feeding.",
  },
  {
    title: "Do Not Compare Babies",
    message:
      "Babies differ in feeding frequency, sleep and growth patterns.",
    why:
      "Individual variation is normal.",
    tip:
      "Use your baby's health checks rather than another baby's routine as your guide.",
  },
  {
    title: "Breastfeeding Positions",
    message:
      "Common positions include cradle, cross-cradle, football and side-lying.",
    why:
      "Different positions can help mothers find comfort.",
    tip:
      "Choose a position that keeps you and baby comfortable and safe.",
  },
  {
    title: "Try a Different Position",
    message:
      "Changing position can sometimes improve comfort during breastfeeding.",
    why:
      "Different positions change pressure points on the breast.",
    tip:
      "Ask a breastfeeding professional to help you experiment safely.",
  },
  {
    title: "Comfortable Shoulders",
    message:
      "Relaxed shoulders can make breastfeeding more comfortable.",
    why:
      "Tension can contribute to maternal discomfort.",
    tip:
      "Support your arms and baby with pillows if needed.",
  },

  {
    title: "Nipple Pain Deserves Attention",
    message:
      "Persistent or severe nipple pain should not simply be ignored.",
    why:
      "Pain can sometimes indicate attachment problems or infection.",
    tip:
      "Seek professional help if pain continues or worsens.",
  },
  {
    title: "Cracked Nipples",
    message:
      "Cracked nipples can occur when attachment is not optimal.",
    why:
      "Pain and skin damage can make breastfeeding harder.",
    tip:
      "Have the baby's latch assessed by a trained health worker.",
  },
  {
    title: "Breast Fullness",
    message:
      "Breasts may feel very full when milk production increases.",
    why:
      "Regular milk removal can help maintain comfortable milk flow.",
    tip:
      "Feed frequently and seek help if swelling becomes severe.",
  },
  {
    title: "Engorgement",
    message:
      "Breast engorgement can cause swelling, firmness and discomfort.",
    why:
      "Effective milk removal and support can help manage discomfort.",
    tip:
      "Seek professional help if symptoms are severe or persistent.",
  },
  {
    title: "Warmth Before Feeding",
    message:
      "Some mothers find gentle warmth helpful before feeding when breasts feel full.",
    why:
      "Comfort measures may help milk flow and relaxation.",
    tip:
      "Use gentle warmth rather than excessive heat.",
  },
  {
    title: "Cold After Feeding",
    message:
      "Cool compresses may help reduce breast discomfort after feeding.",
    why:
      "Cooling can reduce swelling and provide temporary comfort.",
    tip:
      "Do not place ice directly against the skin.",
  },
  {
    title: "Blocked Milk Duct Symptoms",
    message:
      "A tender area or lump can occur when milk flow is reduced.",
    why:
      "Early attention may prevent symptoms from becoming more severe.",
    tip:
      "Continue comfortable feeding and seek help if symptoms persist.",
  },
  {
    title: "Mastitis Warning",
    message:
      "Breast inflammation can cause pain, swelling, redness or fever.",
    why:
      "Mastitis may require professional assessment and treatment.",
    tip:
      "Seek medical care if you develop fever or feel significantly unwell.",
  },
  {
    title: "Do Not Stop Suddenly Without Advice",
    message:
      "Sudden breastfeeding changes can increase breast fullness and discomfort.",
    why:
      "Gradual changes may be easier for both mother and baby.",
    tip:
      "Discuss planned weaning with a health professional when possible.",
  },
  {
    title: "Breastfeeding and Medication",
    message:
      "Many medicines can be used safely during breastfeeding, but advice matters.",
    why:
      "Some medicines require special consideration.",
    tip:
      "Tell every healthcare provider that you are breastfeeding.",
  },

  {
    title: "Breastfeeding After Vaccination",
    message:
      "Routine maternal vaccination generally does not require stopping breastfeeding.",
    why:
      "Breastfeeding can normally continue while mothers receive recommended vaccines.",
    tip:
      "Tell your healthcare provider that you are breastfeeding.",
  },
  {
    title: "Breastfeeding During Pregnancy",
    message:
      "Some mothers may continue breastfeeding during a later pregnancy.",
    why:
      "Individual circumstances determine whether it is appropriate.",
    tip:
      "Discuss your situation with your healthcare provider.",
  },
  {
    title: "Breastfeeding More Than One Baby",
    message:
      "Some mothers breastfeed twins or more than one child.",
    why:
      "Milk production can respond to increased stimulation.",
    tip:
      "Seek practical support from experienced breastfeeding professionals.",
  },
  {
    title: "Pumping Can Help",
    message:
      "Expressing milk can be useful when direct breastfeeding is temporarily difficult.",
    why:
      "Milk removal can help maintain production.",
    tip:
      "Learn safe expression, storage and handling practices.",
  },
  {
    title: "Hand Expression",
    message:
      "Hand expression can remove small amounts of breast milk without a pump.",
    why:
      "It can be useful in the early days or when expressing colostrum.",
    tip:
      "Ask a trained health worker to demonstrate the technique.",
  },
  {
    title: "Keep Expressed Milk Clean",
    message:
      "Clean hands and clean containers are important when expressing milk.",
    why:
      "Good hygiene reduces contamination risk.",
    tip:
      "Wash hands and use clean, suitable containers.",
  },
  {
    title: "Safe Milk Storage",
    message:
      "Expressed breast milk should be stored according to recommended time and temperature guidance.",
    why:
      "Correct storage helps preserve safety and quality.",
    tip:
      "Follow local health-service guidance for storage times.",
  },
  {
    title: "Label Expressed Milk",
    message:
      "Labelling expressed milk helps identify when it was collected.",
    why:
      "Clear labelling supports safe milk handling.",
    tip:
      "Record the date and time when storing expressed milk.",
  },
  {
    title: "Thaw Milk Safely",
    message:
      "Frozen breast milk should be thawed using safe methods rather than direct high heat.",
    why:
      "Gentle thawing helps maintain quality and safety.",
    tip:
      "Follow recommended breast milk handling guidance.",
  },
  {
    title: "Do Not Microwave Breast Milk",
    message:
      "Microwaving breast milk can create dangerous hot spots.",
    why:
      "Uneven heating can burn a baby's mouth.",
    tip:
      "Use a safe warming method recommended by your health provider.",
  },

  {
    title: "Returning to Work",
    message:
      "Returning to work does not automatically mean breastfeeding must stop.",
    why:
      "Many mothers continue breastfeeding while expressing milk.",
    tip:
      "Plan feeding and milk-expression arrangements before returning to work.",
  },
  {
    title: "Know Your Workplace Rights",
    message:
      "Mothers may have workplace protections supporting breastfeeding or expressing milk.",
    why:
      "Supportive workplaces can make continued breastfeeding easier.",
    tip:
      "Ask your employer about available breastfeeding support.",
  },
  {
    title: "Build a Feeding Plan",
    message:
      "A simple plan can help when mother and baby are separated.",
    why:
      "Planning reduces stress and supports consistent milk removal.",
    tip:
      "Discuss the plan with your caregiver and healthcare provider.",
  },
  {
    title: "Caregiver Communication",
    message:
      "A baby's caregiver should understand your feeding and expressed-milk plan.",
    why:
      "Consistent care can help protect your breastfeeding goals.",
    tip:
      "Write down clear feeding and milk-handling instructions.",
  },
  {
    title: "Avoid Unnecessary Formula Changes",
    message:
      "If supplementation is medically needed, discuss the plan with a health professional.",
    why:
      "Unplanned supplementation can affect breastfeeding frequency.",
    tip:
      "Get individualized guidance rather than relying on social-media advice.",
  },
  {
    title: "Breastfeeding and Sleep",
    message:
      "Newborn sleep patterns are often unpredictable.",
    why:
      "Frequent night waking is common during early infancy.",
    tip:
      "Rest when possible and share non-feeding tasks with trusted helpers.",
  },
  {
    title: "Safe Sleep Matters",
    message:
      "Breastfeeding is important, but safe sleep practices remain essential.",
    why:
      "Safe sleep reduces the risk of sleep-related infant deaths.",
    tip:
      "Follow recommended safe-sleep guidance from your healthcare provider.",
  },
  {
    title: "Keep Baby Close, But Safe",
    message:
      "Keeping baby nearby can make night feeding easier while maintaining safe sleep.",
    why:
      "Proximity can support feeding while a separate safe sleep surface reduces risks.",
    tip:
      "Ask your health worker about safe sleep arrangements.",
  },
  {
    title: "Emotional Wellbeing",
    message:
      "Breastfeeding mothers also need emotional support.",
    why:
      "Stress, exhaustion and emotional difficulties can affect the feeding experience.",
    tip:
      "Talk to someone you trust when you feel overwhelmed.",
  },
  {
    title: "Postpartum Mental Health",
    message:
      "Persistent sadness, anxiety or hopelessness after birth deserves attention.",
    why:
      "Postpartum mental health conditions are treatable and support is available.",
    tip:
      "Speak with a healthcare professional if these feelings persist.",
  },

  {
    title: "You Are Learning",
    message:
      "Breastfeeding can become easier with practice and support.",
    why:
      "Confidence often develops as mother and baby learn together.",
    tip:
      "Celebrate small improvements rather than expecting perfection.",
  },
  {
    title: "Every Feed Counts",
    message:
      "Each breastfeeding session provides opportunities for nutrition and connection.",
    why:
      "Consistent breastfeeding supports your baby's nutritional needs.",
    tip:
      "Focus on the next feed rather than worrying about the entire journey.",
  },
  {
    title: "Avoid Shame",
    message:
      "Every mother's breastfeeding journey is different.",
    why:
      "Health circumstances can affect feeding choices and experiences.",
    tip:
      "Seek evidence-based support without judging yourself.",
  },
  {
    title: "Ask Evidence-Based Questions",
    message:
      "Not every breastfeeding claim online is medically reliable.",
    why:
      "Misinformation can create unnecessary fear or unsafe practices.",
    tip:
      "Check important health advice with a qualified professional.",
  },
  {
    title: "Traditional Advice and Modern Care",
    message:
      "Family traditions can be valuable, but health decisions should also consider evidence.",
    why:
      "Some traditional practices may be harmless while others may carry risks.",
    tip:
      "Discuss unfamiliar remedies or practices with your health worker.",
  },
  {
    title: "Avoid Unnecessary Herbal Remedies",
    message:
      "Herbal products can have active ingredients and are not automatically safe.",
    why:
      "Some substances may affect mothers or breastfed babies.",
    tip:
      "Ask a healthcare professional before using herbal products.",
  },
  {
    title: "Breastfeeding and Alcohol",
    message:
      "Alcohol can pass into breast milk.",
    why:
      "Timing and amount affect infant exposure.",
    tip:
      "Ask a health professional for individualized advice about alcohol and breastfeeding.",
  },
  {
    title: "Avoid Smoking Around Baby",
    message:
      "Tobacco smoke exposes babies to harmful substances.",
    why:
      "Smoke exposure increases health risks for infants.",
    tip:
      "Keep your baby away from tobacco smoke and smoking areas.",
  },
  {
    title: "Clean Hands Protect Baby",
    message:
      "Hand hygiene helps reduce the spread of infections.",
    why:
      "Newborns are vulnerable to infections.",
    tip:
      "Wash your hands before handling expressed milk or feeding equipment.",
  },
  {
    title: "Clean Feeding Equipment",
    message:
      "Pumps and milk containers should be cleaned properly.",
    why:
      "Poor hygiene can allow harmful bacteria to grow.",
    tip:
      "Follow the manufacturer's cleaning instructions for your equipment.",
  },

  {
    title: "Breastfeeding and Travel",
    message:
      "Breastfeeding can be continued while travelling.",
    why:
      "Breast milk is readily available and does not require preparation.",
    tip:
      "Plan comfortable and private feeding options before travelling.",
  },
  {
    title: "Breastfeeding in Public",
    message:
      "Mothers may need practical strategies for feeding outside the home.",
    why:
      "Confidence can make daily activities easier.",
    tip:
      "Wear comfortable clothing and choose a place where you feel safe.",
  },
  {
    title: "Stay Hydrated While Travelling",
    message:
      "Breastfeeding mothers should drink according to thirst while travelling.",
    why:
      "Long journeys and heat can increase fluid needs.",
    tip:
      "Carry safe drinking water whenever possible.",
  },
  {
    title: "Hot Weather",
    message:
      "Breastfed babies generally receive the fluid they need from breast milk.",
    why:
      "Extra water can introduce infection risks in young infants.",
    tip:
      "Offer breastfeeds more frequently when your baby wants them.",
  },
  {
    title: "Cold Weather",
    message:
      "Breastfeeding continues to provide nutrition and fluid during cooler weather.",
    why:
      "Weather does not remove the nutritional value of breast milk.",
    tip:
      "Keep baby comfortably warm and continue responsive feeding.",
  },
  {
    title: "Breastfeeding During Stress",
    message:
      "Stress can make feeding feel harder, but it does not mean your milk suddenly becomes bad.",
    why:
      "Milk remains nutritious while mothers experience normal stress.",
    tip:
      "Breathe, relax your shoulders and seek support.",
  },
  {
    title: "Take Care of Yourself",
    message:
      "Maternal wellbeing is part of successful breastfeeding support.",
    why:
      "A supported mother is better positioned to care for her baby.",
    tip:
      "Make time for food, rest, hygiene and emotional support.",
  },
  {
    title: "Ask About Family Planning",
    message:
      "Breastfeeding can affect fertility, but it is not automatically reliable contraception.",
    why:
      "Pregnancy can occur before the first menstrual period.",
    tip:
      "Discuss postpartum family-planning options with a health professional.",
  },
  {
    title: "Know the Lactational Amenorrhea Method",
    message:
      "LAM can provide contraception only when specific criteria are met.",
    why:
      "Its effectiveness depends on exclusive breastfeeding, amenorrhoea and baby age.",
    tip:
      "Ask a qualified provider whether LAM applies to you.",
  },
  {
    title: "Keep Immunizations Up to Date",
    message:
      "Breastfeeding and childhood immunization work together to protect health.",
    why:
      "Vaccines provide specific protection against serious infections.",
    tip:
      "Attend your baby's scheduled immunization appointments.",
  },

  {
    title: "Six Weeks Is Important",
    message:
      "Postnatal care helps assess maternal recovery and infant wellbeing.",
    why:
      "Health checks can identify problems early.",
    tip:
      "Attend recommended postnatal appointments.",
  },
  {
    title: "Check Your Baby's Growth",
    message:
      "Regular growth monitoring helps assess nutrition and development.",
    why:
      "Early identification of growth concerns allows timely support.",
    tip:
      "Keep your baby's health record safely.",
  },
  {
    title: "Ask About Development",
    message:
      "Health visits can monitor developmental milestones as your baby grows.",
    why:
      "Developmental monitoring helps identify concerns early.",
    tip:
      "Tell your health worker about anything that worries you.",
  },
  {
    title: "Breastfeeding Support Groups",
    message:
      "Peer support can help mothers share practical breastfeeding experiences.",
    why:
      "Social support can improve confidence and reduce isolation.",
    tip:
      "Consider joining a trusted mother or breastfeeding support group.",
  },
  {
    title: "Community Health Workers",
    message:
      "Community health workers can provide practical maternal and infant support.",
    why:
      "Local support can make professional guidance more accessible.",
    tip:
      "Use trusted community health resources when you need help.",
  },
  {
    title: "Know When to Seek Help",
    message:
      "Feeding difficulties should not be ignored when a baby is not feeding well.",
    why:
      "Early assessment can prevent complications.",
    tip:
      "Seek urgent care if your baby is very weak, difficult to wake or struggling to breathe.",
  },
  {
    title: "Baby Fever Needs Attention",
    message:
      "Fever in a young infant can require urgent medical assessment.",
    why:
      "Very young babies can become seriously ill quickly.",
    tip:
      "Follow local medical guidance immediately if your young baby develops fever.",
  },
  {
    title: "Signs of Dehydration",
    message:
      "Reduced urine, unusual sleepiness or a dry mouth can signal dehydration.",
    why:
      "Dehydration can become serious in infants.",
    tip:
      "Seek medical care if you suspect dehydration.",
  },
  {
    title: "Poor Feeding Is a Warning",
    message:
      "A baby who suddenly feeds poorly may need medical assessment.",
    why:
      "Poor feeding can be an early sign of illness.",
    tip:
      "Contact a health professional promptly if feeding changes significantly.",
  },
  {
    title: "Trust Your Concern",
    message:
      "Parents often notice when their baby's behaviour changes.",
    why:
      "Your observations can help health workers assess your baby.",
    tip:
      "If something feels wrong, seek professional advice.",
  },

  {
    title: "Breastfeeding Is More Than Food",
    message:
      "Breastfeeding provides nutrition, immune support and close interaction.",
    why:
      "Infant development involves both physical and emotional needs.",
    tip:
      "Enjoy calm moments of connection during feeds.",
  },
  {
    title: "Your Voice Matters",
    message:
      "Talking gently to your baby during feeding can support interaction.",
    why:
      "Babies benefit from responsive communication and social connection.",
    tip:
      "Talk, smile and respond to your baby's expressions.",
  },
  {
    title: "Eye Contact",
    message:
      "Gentle eye contact during feeding encourages close interaction.",
    why:
      "Responsive interaction supports early social development.",
    tip:
      "Take quiet moments during feeds when you are comfortable.",
  },
  {
    title: "Touch and Connection",
    message:
      "Gentle touch during breastfeeding can strengthen mother-baby connection.",
    why:
      "Responsive physical contact supports bonding.",
    tip:
      "Hold your baby close and comfortably during feeds.",
  },
  {
    title: "Every Mother Needs Encouragement",
    message:
      "Positive support can make breastfeeding challenges easier to manage.",
    why:
      "Confidence and practical support matter.",
    tip:
      "Tell someone you trust when you need encouragement.",
  },
  {
    title: "Do Not Chase Perfection",
    message:
      "Breastfeeding journeys rarely look exactly the same from one family to another.",
    why:
      "Individual circumstances differ.",
    tip:
      "Focus on safe, healthy progress rather than perfection.",
  },
  {
    title: "Keep Learning",
    message:
      "Breastfeeding knowledge grows through reliable information and experience.",
    why:
      "Understanding feeding can increase confidence.",
    tip:
      "Use trusted health sources and qualified professionals.",
  },
  {
    title: "Review Your Progress",
    message:
      "Reflecting on what works can help you continue confidently.",
    why:
      "Recognizing progress can strengthen motivation.",
    tip:
      "Celebrate what you and your baby have learned together.",
  },
  {
    title: "Six Months Is Approaching",
    message:
      "Around six months, babies generally begin complementary foods while breastfeeding continues.",
    why:
      "Breast milk remains valuable as complementary feeding begins.",
    tip:
      "Ask your health worker when and how to introduce complementary foods.",
  },
  {
    title: "Breastfeeding Can Continue",
    message:
      "Breastfeeding can continue alongside complementary foods after about six months.",
    why:
      "Breast milk continues to provide nutrition and protective components.",
    tip:
      "Continue breastfeeding for as long as mutually desired and appropriate.",
  },

  {
    title: "Complementary Does Not Mean Replacement",
    message:
      "Complementary foods add to breastfeeding rather than immediately replacing it.",
    why:
      "Breast milk remains an important source of nutrition.",
    tip:
      "Introduce age-appropriate foods gradually when your baby is ready.",
  },
  {
    title: "Food Readiness Matters",
    message:
      "Around six months, babies develop skills needed for complementary feeding.",
    why:
      "Readiness helps make feeding safer and more successful.",
    tip:
      "Ask your health worker about signs of readiness.",
  },
  {
    title: "Continue Responsive Feeding",
    message:
      "Responsive feeding remains important as complementary foods begin.",
    why:
      "Babies need support to recognize hunger and fullness.",
    tip:
      "Let your baby respond to food without forcing feeds.",
  },
  {
    title: "Breast Milk Still Matters",
    message:
      "Breast milk continues providing nutrients and protective components after six months.",
    why:
      "Its nutritional and immune value does not suddenly disappear at six months.",
    tip:
      "Continue breastfeeding alongside appropriate complementary foods.",
  },
  {
    title: "Prepare for the Next Stage",
    message:
      "The six-month milestone begins a new phase of infant nutrition.",
    why:
      "Growing babies need increasing variety and texture in their diet.",
    tip:
      "Plan your baby's next nutrition steps with a health professional.",
  },
  {
    title: "Six Months of Learning",
    message:
      "You and your baby have spent months learning together.",
    why:
      "Breastfeeding is a shared process that develops over time.",
    tip:
      "Be proud of the care and attention you have provided.",
  },
  {
    title: "Your Journey Is Unique",
    message:
      "No two breastfeeding journeys are exactly the same.",
    why:
      "Health, work, support and family circumstances differ.",
    tip:
      "Choose safe, informed decisions suited to your situation.",
  },
  {
    title: "Celebrate the Milestone",
    message:
      "Reaching six months is a meaningful breastfeeding milestone.",
    why:
      "Exclusive breastfeeding for about six months is a major health recommendation.",
    tip:
      "Celebrate your progress and continue seeking support.",
  },
  {
    title: "Keep the Conversation Going",
    message:
      "Breastfeeding questions can continue beyond the first six months.",
    why:
      "Nutrition and development continue changing as babies grow.",
    tip:
      "Keep discussing your baby's nutrition during health visits.",
  },
  {
    title: "A Healthy Beginning",
    message:
      "Breastfeeding is one part of a broader healthy start to life.",
    why:
      "Nutrition, immunization, safe sleep, hygiene and responsive care all matter.",
    tip:
      "Keep using your child's health services as your baby grows.",
  },

  {
    title: "Breastfeeding and Hygiene",
    message:
      "Breastfeeding itself does not require washing the breast before every feed.",
    why:
      "Normal skin contains natural protective organisms.",
    tip:
      "Regular bathing and hand hygiene are generally sufficient.",
  },
  {
    title: "Avoid Harsh Products",
    message:
      "Strong soaps and chemicals may irritate the nipple area.",
    why:
      "Irritated skin can become painful.",
    tip:
      "Use gentle hygiene and seek advice for persistent skin problems.",
  },
  {
    title: "Breast Pads",
    message:
      "Some mothers experience milk leakage between feeds.",
    why:
      "Leakage is common, especially in the early months.",
    tip:
      "Use clean breast pads and change them when damp.",
  },
  {
    title: "Leaking Does Not Mean Low Supply",
    message:
      "Milk leakage can happen even when feeding is well established.",
    why:
      "Breast fullness and milk-ejection responses vary between mothers.",
    tip:
      "Do not judge milk supply from leakage alone.",
  },
  {
    title: "Pumping Output Is Not a Test",
    message:
      "The amount expressed with a pump does not always reflect total milk supply.",
    why:
      "Babies can sometimes remove milk more effectively than pumps.",
    tip:
      "Use baby's growth and feeding signs alongside professional assessment.",
  },
  {
    title: "Milk Supply Concerns",
    message:
      "True low milk supply should be assessed rather than assumed.",
    why:
      "Many perceived supply problems have other explanations.",
    tip:
      "Ask a trained breastfeeding professional to assess feeding.",
  },
  {
    title: "Frequent Feeding Is Not Failure",
    message:
      "Frequent feeds can occur during normal infant development.",
    why:
      "Babies have changing nutritional and comfort needs.",
    tip:
      "Look at the whole picture rather than counting feeds alone.",
  },
  {
    title: "Comfort Sucking",
    message:
      "Babies may sometimes breastfeed for comfort as well as nutrition.",
    why:
      "Sucking can be soothing and supports closeness.",
    tip:
      "Respond according to your baby's needs and your comfort.",
  },
  {
    title: "Breastfeeding to Sleep",
    message:
      "Breastfeeding can naturally make young babies sleepy.",
    why:
      "Feeding and close contact can be calming.",
    tip:
      "Maintain safe sleep practices after the feed.",
  },
  {
    title: "A Calm Feeding Environment",
    message:
      "A comfortable environment can help mother and baby settle.",
    why:
      "Reduced distractions can make feeding more relaxed.",
    tip:
      "Find a comfortable position and give yourself time.",
  },

  {
    title: "Protect Your Back",
    message:
      "Poor posture can contribute to back and neck discomfort.",
    why:
      "Mothers may spend many hours feeding each day.",
    tip:
      "Support your back, arms and feet during feeds.",
  },
  {
    title: "Protect Your Wrists",
    message:
      "Supporting your baby's weight with your wrists alone can cause discomfort.",
    why:
      "Repeated strain can make feeding uncomfortable.",
    tip:
      "Use pillows or other safe support when needed.",
  },
  {
    title: "Change Positions",
    message:
      "Changing breastfeeding positions can reduce repeated pressure on one area.",
    why:
      "Different positions may improve comfort.",
    tip:
      "Try different comfortable positions during the day.",
  },
  {
    title: "Ask for a Latch Check",
    message:
      "A trained person can often identify small positioning problems.",
    why:
      "Early support can prevent persistent pain.",
    tip:
      "Do not wait weeks with severe breastfeeding pain.",
  },
  {
    title: "Breastfeeding Education Helps",
    message:
      "Reliable breastfeeding education can improve confidence.",
    why:
      "Knowledge helps mothers recognize normal patterns and warning signs.",
    tip:
      "Use trusted health education sources.",
  },
  {
    title: "Health Worker Partnership",
    message:
      "Your healthcare team can support both mother and baby.",
    why:
      "Breastfeeding involves maternal and infant health together.",
    tip:
      "Ask questions openly during clinic visits.",
  },
  {
    title: "Do Not Hide Difficulties",
    message:
      "Breastfeeding difficulties are common and deserve support.",
    why:
      "Early intervention can prevent problems from becoming overwhelming.",
    tip:
      "Tell someone when breastfeeding is becoming difficult.",
  },
  {
    title: "Support Without Pressure",
    message:
      "Breastfeeding support should encourage rather than shame mothers.",
    why:
      "Positive support protects maternal confidence and wellbeing.",
    tip:
      "Surround yourself with people who respect informed health decisions.",
  },
  {
    title: "Evidence Over Myths",
    message:
      "Some popular breastfeeding myths are not supported by evidence.",
    why:
      "Misinformation can lead to unnecessary restrictions or unsafe practices.",
    tip:
      "Check health claims with qualified professionals.",
  },
  {
    title: "Your Baby Is Growing",
    message:
      "Growth is one of the clearest ways to assess nutritional wellbeing.",
    why:
      "Regular monitoring provides objective information.",
    tip:
      "Keep attending child welfare and growth-monitoring appointments.",
  },

  {
    title: "Watch Development, Not Just Weight",
    message:
      "Infant wellbeing includes growth, development, activity and feeding.",
    why:
      "Health assessment is broader than a single measurement.",
    tip:
      "Share any developmental concerns during health visits.",
  },
  {
    title: "Keep Health Records",
    message:
      "Your baby's health record helps track important information.",
    why:
      "Records support continuity of care.",
    tip:
      "Keep immunization and growth records safe and accessible.",
  },
  {
    title: "Know Your Clinic",
    message:
      "Knowing where to get maternal and child health support matters.",
    why:
      "Quick access can help when questions or problems arise.",
    tip:
      "Save your nearest trusted health facility's contact details.",
  },
  {
    title: "Emergency Planning",
    message:
      "Every family should know where to seek urgent medical care.",
    why:
      "Preparation can save time during emergencies.",
    tip:
      "Know your nearest emergency-capable health facility.",
  },
  {
    title: "Breastfeeding and Community",
    message:
      "Healthy breastfeeding support can strengthen family and community wellbeing.",
    why:
      "Supported mothers are more likely to feel confident continuing breastfeeding.",
    tip:
      "Share reliable information with other mothers.",
  },
  {
    title: "Help Another Mother",
    message:
      "Kind encouragement can make a difference to a breastfeeding mother.",
    why:
      "Social support can reduce isolation.",
    tip:
      "Offer practical help instead of criticism.",
  },
  {
    title: "Share Reliable Information",
    message:
      "Health information is most useful when it is accurate and practical.",
    why:
      "Reliable information supports better decisions.",
    tip:
      "Share trusted health resources rather than unverified claims.",
  },
  {
    title: "Keep Asking Questions",
    message:
      "There is no shame in asking questions about breastfeeding.",
    why:
      "Questions can reveal useful information and support.",
    tip:
      "Bring your breastfeeding questions to clinic visits.",
  },
  {
    title: "Mother and Baby Together",
    message:
      "Breastfeeding supports nutrition while creating opportunities for responsive care.",
    why:
      "Healthy development involves nutrition, protection and interaction.",
    tip:
      "Enjoy the quiet moments you share with your baby.",
  },
  {
    title: "You Have Come Far",
    message:
      "The first months of breastfeeding involve many changes.",
    why:
      "Recognizing progress can build confidence.",
    tip:
      "Take a moment today to appreciate your journey.",
  },

  {
    title: "Keep Feeding Responsively",
    message:
      "Continue responding to your baby's hunger and fullness cues.",
    why:
      "Responsive feeding supports healthy feeding relationships.",
    tip:
      "Let your baby guide feeding frequency when possible.",
  },
  {
    title: "Breastfeeding Is Flexible",
    message:
      "Feeding patterns can change from day to day.",
    why:
      "Infants do not always follow identical routines.",
    tip:
      "Look at overall wellbeing rather than one unusual day.",
  },
  {
    title: "Busy Days Happen",
    message:
      "Motherhood rarely follows a perfect schedule.",
    why:
      "Stress about perfection can make breastfeeding harder.",
    tip:
      "Focus on safe and practical feeding rather than perfection.",
  },
  {
    title: "Accept Practical Support",
    message:
      "Someone else can help with many tasks while you feed your baby.",
    why:
      "Reducing your workload can protect rest and wellbeing.",
    tip:
      "Let trusted people help with meals, laundry and household tasks.",
  },
  {
    title: "Protect Maternal Rest",
    message:
      "Rest is part of caring for yourself after childbirth.",
    why:
      "Exhaustion can affect emotional and physical wellbeing.",
    tip:
      "Rest when you can, especially when someone trustworthy can help.",
  },
  {
    title: "Your Mental Health Matters",
    message:
      "Your emotional health deserves the same attention as your baby's health.",
    why:
      "Maternal wellbeing affects the whole family.",
    tip:
      "Seek help when emotional difficulties persist.",
  },
  {
    title: "Be Kind to Yourself",
    message:
      "Learning breastfeeding takes patience.",
    why:
      "Self-criticism does not solve feeding difficulties.",
    tip:
      "Replace guilt with practical support and evidence-based guidance.",
  },
  {
    title: "Professional Support Is Strength",
    message:
      "Asking a professional for help is a strength, not a failure.",
    why:
      "Early support can make difficult situations easier.",
    tip:
      "Seek help before a small problem becomes overwhelming.",
  },
  {
    title: "Keep Your Support Network",
    message:
      "Trusted family, friends and health workers can support your journey.",
    why:
      "Breastfeeding is easier when mothers are not isolated.",
    tip:
      "Stay connected with people who support your wellbeing.",
  },
  {
    title: "Finish Strong",
    message:
      "Six months of exclusive breastfeeding is a major milestone when achievable.",
    why:
      "WHO recommends exclusive breastfeeding for about the first six months.",
    tip:
      "Continue breastfeeding alongside appropriate complementary foods after about six months.",
  },
];

/*
  The content above is intentionally kept concise.
  The application automatically creates exactly 180 daily entries.
*/

const categories = [
  "🤱 Breastfeeding Basics",
  "🧪 What's Inside Breast Milk?",
  "🧠 Baby Development",
  "🛡️ Protection & Immunity",
  "🌸 Mother's Wellbeing",
  "🏥 Health & Safety",
];

const breastfeedingTips: Tip[] = Array.from(
  { length: 180 },
  (_, index) => {
    const day = index + 1;

    const content = dailyContent[index % dailyContent.length];

    return {
      day,
      category: categories[index % categories.length],
      title: content.title,
      message: content.message,
      whyItMatters: content.why,
      motherTip: content.tip,
    };
  }
);

export default function Breastfeeding() {
  const [currentDay, setCurrentDay] = useState(1);

  const currentTip = breastfeedingTips[currentDay - 1];

  const previousTip = () => {
    if (currentDay > 1) {
      setCurrentDay((day) => day - 1);
    }
  };

  const nextTip = () => {
    if (currentDay < 180) {
      setCurrentDay((day) => day + 1);
    }
  };

  return (
    <main className="breastfeeding-page">

      {/* HEADER */}

      <header className="breastfeeding-header">

        <div className="breastfeeding-header-icon">
          🤱
        </div>

        <div>
          <h1>Breastfeeding Care</h1>

          <p>
            Daily support for the first six months
          </p>
        </div>

      </header>


      {/* PROGRESS */}

      <section className="breastfeeding-progress">

        <div className="progress-top">

          <span>
            180-Day Breastfeeding Journey
          </span>

          <strong>
            Day {currentDay} of 180
          </strong>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${(currentDay / 180) * 100}%`,
            }}
          />

        </div>

      </section>


      {/* TODAY'S TIP */}

      <section className="today-tip-card">

        <span className="tip-category">
          {currentTip.category}
        </span>

        <h2>
          Today's Breastfeeding Tip
        </h2>

        <div className="tip-day">
          DAY {currentTip.day}
        </div>

        <h3>
          {currentTip.title}
        </h3>

        <p className="tip-message">
          {currentTip.message}
        </p>

      </section>


      {/* INFORMATION */}

      <section className="breastfeeding-info-grid">

        <article className="info-card">

          <div className="info-icon">
            💡
          </div>

          <div>

            <h3>
              Why It Matters
            </h3>

            <p>
              {currentTip.whyItMatters}
            </p>

          </div>

        </article>


        <article className="info-card">

          <div className="info-icon">
            🌸
          </div>

          <div>

            <h3>
              Mother's Tip
            </h3>

            <p>
              {currentTip.motherTip}
            </p>

          </div>

        </article>

      </section>


      {/* EXCLUSIVE BREASTFEEDING REMINDER */}

      <section className="exclusive-card">

        <div className="exclusive-icon">
          🍼
        </div>

        <div>

          <h3>
            Exclusive Breastfeeding
          </h3>

          <p>
            WHO recommends exclusive breastfeeding for about
            the first six months of life. Around six months,
            appropriate complementary foods should be introduced
            while breastfeeding continues.
          </p>

        </div>

      </section>


      {/* NAVIGATION */}

      <div className="breastfeeding-navigation">

        <button
          type="button"
          onClick={previousTip}
          disabled={currentDay === 1}
        >
          ← Previous
        </button>


        <span>
          Day {currentDay} / 180
        </span>


        <button
          type="button"
          onClick={nextTip}
          disabled={currentDay === 180}
        >
          Next →
        </button>

      </div>


      {/* DISCLAIMER */}

      <footer className="breastfeeding-footer">

        <p>
          🤍 This information is for health education and
          does not replace advice from a qualified healthcare
          professional.
        </p>

      </footer>

    </main>
  );
}