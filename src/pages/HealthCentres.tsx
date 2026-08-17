import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HealthCentres.css";

/* =========================================================
   TYPES
========================================================= */

type HealthCentre = {
  id: number;
  name: string;
  location: string;
  lga: string;
  type: string;
  phone: string;

  // GPS coordinates
  latitude: number | null;
  longitude: number | null;
};

/* =========================================================
   AKWA IBOM LGAs
========================================================= */

const lgas = [
  "All LGAs",
  "Abak",
  "Eastern Obolo",
  "Eket",
  "Esit Eket",
  "Essien Udim",
  "Etim Ekpo",
  "Etinan",
  "Ibeno",
  "Ibesikpo Asutan",
  "Ibiono Ibom",
  "Ika",
  "Ikono",
  "Ikot Abasi",
  "Ikot Ekpene",
  "Ini",
  "Itu",
  "Mbo",
  "Mkpat Enin",
  "Nsit Atai",
  "Nsit Ibom",
  "Nsit Ubium",
  "Obot Akara",
  "Okobo",
  "Onna",
  "Oron",
  "Oruk Anam",
  "Udung Uko",
  "Ukanafun",
  "Uruan",
  "Urue-Offong/Oruko",
  "Uyo",
];

/* =========================================================
   FACILITY TYPES
========================================================= */

const facilityTypes = [
  "All Types",
  "Teaching Hospital",
  "General Hospital",
  "Primary Health Centre",
  "Specialist Hospital",
  "Private Hospital",
  "Medical Centre",
  "Maternity Centre",
  "Laboratory",
  "Pharmacy",
];

/* =========================================================
   HEALTH CENTRE DATA
   ---------------------------------------------------------
   IMPORTANT:
   - Do not invent facilities.
   - Do not invent phone numbers.
   - Do not invent GPS coordinates.
   - Coordinates remain null until verified.
========================================================= */

const healthCentres: HealthCentre[] = [
  {
    id: 1,
    name: "University of Uyo Teaching Hospital",
    location: "Abak Road, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Teaching Hospital",
    phone: "08033086930",
    latitude: 5.0122117,
    longitude: 7.8614667,
  },

  {
    id: 2,
    name: "Uyo Operational Base Primary Health Centre",
    location: "Uyo Urban 2, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 3,
    name: "Aka Offot Health Centre",
    location: "Aka Offot, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 4,
    name: "Ewet Offot Health Post",
    location: "Ewet Offot, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

{
    id: 36,
    name: "Ikot Ayan Ikono Health Centre",
    location: "Ikono 1, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 37,
    name: "Mbak Etoi Primary Health Centre",
    location: "Ikot Ekpene Road, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 38,
    name: "Idoro Obio Health Centre",
    location: "Idoro Road, Oku 1, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 39,
    name: "Ikot Okubo Health Centre",
    location: "Offot 1, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 40,
    name: "Afaha Idoro Health Centre",
    location: "Afaha Idoro, Oku 1, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 5,
    name: "Uyo NCI Medical Centre",
    location: "Uyo Urban 1, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Medical Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 6,
    name: "Premier Hospital Uyo",
    location:
      "3 High Tension Line, Off Edet Akpan Avenue, Uyo",
    lga: "Uyo",
    type: "Private Hospital",
    phone: "08169461598",
    latitude: null,
    longitude: null,
  },

  {
    id: 7,
    name: "San Dominique Hospital",
    location: "Ewet Housing Estate, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Private Hospital",
    phone: "08033510775",
    latitude: null,
    longitude: null,
  },

  {
    id: 8,
    name: "St. Athanasius Hospital",
    location:
      "1 Ufeh Street, Federal Housing Estate, Abak Road, Uyo",
    lga: "Uyo",
    type: "Private Hospital",
    phone: "08039235370",
    latitude: null,
    longitude: null,
  },

  {
    id: 9,
    name: "Ubongabasi Specialist Clinic",
    location:
      "5 Clement Isong Street, Federal Housing Estate, Uyo",
    lga: "Uyo",
    type: "Specialist Hospital",
    phone: "09039280003",
    latitude: null,
    longitude: null,
  },

/* =========================================================
     UYO SPECIALIST / PRIVATE HEALTH FACILITIES
     ---------------------------------------------------------
     GPS coordinates remain null until independently verified.
  ========================================================= */

  {
    id: 45,
    name: "Mitch-Don Specialist Hospital",
    location:
      "Old Ring Road, Afaha Ube Road, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Specialist Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 46,
    name: "Ibom Specialist Hospital",
    location:
      "Ikot Ekpene-Uyo Road, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Specialist Hospital",
    phone: "08021814674",
    latitude: null,
    longitude: null,
  },

  {
    id: 47,
    name: "Hope Specialist Clinic & Fertility Centre",
    location:
      "4 Church Road Extension, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Specialist Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 48,
    name: "Good Health Specialist Clinic",
    location:
      "30 Akpa Ube Street, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Specialist Hospital",
    phone: "07036487618",
    latitude: null,
    longitude: null,
  },

  {
    id: 49,
    name: "Willow Green Family Hospital",
    location:
      "3 Anietie Ukpe Street, Behind Obio Etoi Primary School, New Stadium Road, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Private Hospital",
    phone: "09025691065",
    latitude: null,
    longitude: null,
  },

  {
    id: 10,
    name: "Unwana Family Hospital",
    location: "16 Nkemba Street, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Private Hospital",
    phone: "08068223082",
    latitude: null,
    longitude: null,
  },

  {
    id: 11,
    name: "Uwakmfon Hospital",
    location: "27 Nwaniba Road, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Private Hospital",
    phone: "08023082382",
    latitude: null,
    longitude: null,
  },

  {
    id: 12,
    name: "Our Lady of Lourdes Infirmary",
    location: "23 Ekpanya Street, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Medical Centre",
    phone: "08098030958",
    latitude: null,
    longitude: null,
  },

  {
    id: 13,
    name: "Nedeke Children's Hospital",
    location: "34 Udo Ekpo Mkpo, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Specialist Hospital",
    phone: "08035087666",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     UYO MATERNITY CENTRES
     ---------------------------------------------------------
     GPS coordinates remain null until independently verified.
  ========================================================= */

  {
    id: 41,
    name: "Enwongo-Abasi Medical Centre",
    location:
      "40A Robert Street, Off Oron Road, Etoi, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Maternity Centre",
    phone: "09011059509",
    latitude: null,
    longitude: null,
  },

  {
    id: 42,
    name: "Etido Hospital and Maternity",
    location:
      "Ikot Akpan Abia Road, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 43,
    name: "Coray Specialist Clinic and Maternity",
    location:
      "Ibiam Street, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 44,
    name: "Dyme Hospital & Maternity",
    location:
      "10 Edem Urua Street, Off Nsikak Eduok Avenue, Uyo, Akwa Ibom",
    lga: "Uyo",
    type: "Maternity Centre",
    phone: "08034713240",
    latitude: null,
    longitude: null,
  },

/* =========================================================
   UYO PHARMACIES
========================================================= */

{
  id: 14,
  name: "Bez Pharmaceuticals & Stores Ltd",
  location: "20 Abak Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "08063927685",
  latitude: null,
  longitude: null,
},

{
  id: 15,
  name: "Tommie Pharmacy",
  location: "29 General Edet Akpan Avenue, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "08020789229",
  latitude: null,
  longitude: null,
},

{
  id: 16,
  name: "Beemas Pharmacy",
  location: "75 Aka Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "08033849002",
  latitude: null,
  longitude: null,
},

{
  id: 17,
  name: "Bekam Pharmacy",
  location: "318 Nwaniba Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "08024623701",
  latitude: null,
  longitude: null,
},

{
  id: 18,
  name: "Pharmablaze Pharmacy",
  location: "235 Abak Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "09128286533",
  latitude: null,
  longitude: null,
},

{
  id: 19,
  name: "Pharmablaze Pharmacy",
  location: "264 General Edet Akpan Avenue, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "09032980736",
  latitude: null,
  longitude: null,
},

{
  id: 20,
  name: "Amela Pharmacy",
  location: "117 Oron Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "07089020257",
  latitude: null,
  longitude: null,
},

{
  id: 21,
  name: "Spark Health Pharmacy",
  location: "51 Ukana Offot Street, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "",
  latitude: null,
  longitude: null,
},

{
  id: 22,
  name: "Alpha Pharmacy & Stores",
  location: "5 IBB Avenue, Opposite Secretariat, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "07073391091",
  latitude: null,
  longitude: null,
},

{
  id: 23,
  name: "Sonja Pharmacy",
  location: "223 Abak Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "08064523849",
  latitude: null,
  longitude: null,
},

{
  id: 24,
  name: "Med-Del Pharmacy and Mini-Mart",
  location: "413 Nwaniba Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "09156039070",
  latitude: null,
  longitude: null,
},

{
  id: 25,
  name: "County Pharmacy & Medical Diagnostic",
  location: "255 Nwaniba Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Pharmacy",
  phone: "08058859090",
  latitude: null,
  longitude: null,
},

/* =========================================================
   UYO MEDICAL LABORATORIES
   ---------------------------------------------------------
   GPS coordinates remain null until independently verified.
========================================================= */

{
  id: 26,
  name: "Biosystems Healthcare Uyo",
  location:
    "260 Abak Road, Opposite University of Uyo Teaching Hospital, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "08120000148",
  latitude: null,
  longitude: null,
},

{
  id: 27,
  name: "OZONE DIAGNOSTICS",
  location:
    "Nung Oku Junction, by Stadium Road, Ring Road 3, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "08062165122",
  latitude: null,
  longitude: null,
},

{
  id: 28,
  name: "Soblesd Medical Diagnostic Laboratory",
  location:
    "86 Oron Road, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "08037179599",
  latitude: null,
  longitude: null,
},

{
  id: 29,
  name: "EDUA MEMORIAL DIAGNOSTIC LABORATORIES",
  location:
    "12A Prince O.U. Utuk Street, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "07035967532",
  latitude: null,
  longitude: null,
},

{
  id: 30,
  name: "Beaconhealth Diagnostics, Uyo Center",
  location:
    "1 Ibokette Crescent, Behind DEKON Filling Station, Aka Road, by IBB Avenue, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "09073520328",
  latitude: null,
  longitude: null,
},

{
  id: 31,
  name: "Bela Medical Diagnostic Laboratory",
  location:
    "1 Udoegbu Street, After Deeper Life Church, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "08023642544",
  latitude: null,
  longitude: null,
},

{
  id: 32,
  name: "Basclef Medical Diagnostic Laboratory",
  location:
    "138 Ikot Ekpene-Uyo Road, Opposite Eco Bank, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "07036055603",
  latitude: null,
  longitude: null,
},

{
  id: 33,
  name: "Amex Diagnostics & Genomics Limited",
  location:
    "Aka Obot Idim Road, Opposite Sacred Heart Catholic Church, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "09048179137",
  latitude: null,
  longitude: null,
},

{
  id: 34,
  name: "ESTATE MEDICAL DIAGNOSTIC LABORATORIES",
  location:
    "143 Abak Road, Opposite Esuene Street, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "08039110656",
  latitude: null,
  longitude: null,
},

{
  id: 35,
  name: "Invicto Medical Diagnostic Laboratory",
  location:
    "175 Ikot Ekpene-Uyo Road, Beside Total Town Service Station, Uyo, Akwa Ibom",
  lga: "Uyo",
  type: "Laboratory",
  phone: "08034602525",
  latitude: null,
  longitude: null,
},

 /* =========================================================
     ABAK LGA — HOSPITALS
     ---------------------------------------------------------
     GPS coordinates remain null until independently verified.
  ========================================================= */

  {
    id: 50,
    name: "General Hospital Ukpom",
    location: "Ukpom, Abak, Akwa Ibom",
    lga: "Abak",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 51,
    name: "Mercy Hospital, Abak",
    location: "95 Hospital Road, Abak, Akwa Ibom",
    lga: "Abak",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     ABAK LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     Phone numbers and GPS remain blank/null until verified.
  ========================================================= */

  {
    id: 52,
    name: "Operational Base Primary Health Centre Abak",
    location: "Abak Urban 3, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 53,
    name: "Ukpom-Abak Primary Health Centre",
    location: "Abak Urban 1, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 54,
    name: "Health Centre Itung",
    location: "Abak Urban 2, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 55,
    name: "Ikot Osom Health Post",
    location: "Otoro 2, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 56,
    name: "Ibanang Ediene Health Centre",
    location: "Abak Urban 1, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     ABAK LGA — LABORATORIES
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 57,
    name: "Bestlife Diagnostics",
    location: "3 Ikot Ekpene - Abak Road, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Laboratory",
    phone: "08166026177",
    latitude: null,
    longitude: null,
  },

  {
    id: 58,
    name: "Stills Diagnostics",
    location: "57 Independence Avenue, off Offot Road, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Laboratory",
    phone: "07048429017",
    latitude: null,
    longitude: null,
  },

  {
    id: 59,
    name: "Stills Diagnostic Centre",
    location: "114 Ikot Ekpene - Abak Road, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Laboratory",
    phone: "07048429017",
    latitude: null,
    longitude: null,
  },

  {
    id: 60,
    name: "Frontline Laboratories Annex",
    location: "60 Hospital Road, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Laboratory",
    phone: "08063985412",
    latitude: null,
    longitude: null,
  },

  {
    id: 61,
    name: "Depressob Diagnostics",
    location: "Hospital Road, Abak, Akwa Ibom",
    lga: "Abak",
    type: "Laboratory",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     EASTERN OBOLO LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 62,
    name: "Okoroette Primary Health Centre",
    location: "Okoroette, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 63,
    name: "Amadaka Health Centre",
    location: "Amadaka, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 64,
    name: "Iko Town Health Centre",
    location: "Iko Town, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 65,
    name: "Emereoke Health Centre",
    location: "Emereoke, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 66,
    name: "Amauka/Amanglas Health Centre",
    location: "Amauka/Amanglas, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 67,
    name: "Okorombokho Health Post",
    location: "Okorombokho, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 68,
    name: "Atabrikang Health Post",
    location: "Atabrikang, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 69,
    name: "Elekpon Health Post",
    location: "Elekpon, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 70,
    name: "Okoroinyong Health Centre",
    location: "Okoroinyong, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 71,
    name: "Ikonta/Oblanga Health Centre",
    location: "Ikonta/Oblanga, Eastern Obolo, Akwa Ibom",
    lga: "Eastern Obolo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     EKET LGA — HOSPITAL
     ---------------------------------------------------------
     GPS remains null until separately verified.
  ========================================================= */

  {
    id: 72,
    name: "Immanuel General Hospital",
    location: "Marina Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     EKET LGA — PRIMARY HEALTH CENTRE
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 73,
    name: "Ikot Ebok Primary Health Centre",
    location: "Ikot Ebok, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     EKET LGA — PHARMACIES
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 74,
    name: "Anitam Pharmacy Ltd",
    location: "1 Nkumbia Street, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Pharmacy",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 75,
    name: "De-Zaki Pharm Chemist Ltd",
    location: "1 Afaha-Eket Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Pharmacy",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 76,
    name: "Histripes Pharmacy Ltd",
    location: "75 Atabong Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Pharmacy",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 77,
    name: "Jakova Pharmacy Ltd",
    location: "13 Idua Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Pharmacy",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 78,
    name: "Lily Pharmacy & Stores Ltd",
    location: "88 Eket-Oron Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Pharmacy",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     EKET LGA — LABORATORIES
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 79,
    name: "Celscare Medical Laboratories",
    location: "44 Eket-Oron Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Laboratory",
    phone: "08021234569",
    latitude: null,
    longitude: null,
  },

  {
    id: 80,
    name: "3D Laboratories Limited",
    location: "38 Afaha Uqua Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Laboratory",
    phone: "08034775938",
    latitude: null,
    longitude: null,
  },

  {
    id: 81,
    name: "House of Diagnosis",
    location: "3-4 Main School Road, by Hospital Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Laboratory",
    phone: "08034804350",
    latitude: null,
    longitude: null,
  },

  {
    id: 82,
    name: "Ideal Medical Laboratories Ltd",
    location: "23B Eket-Oron Road, beside Union Bank, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Laboratory",
    phone: "08130046529",
    latitude: null,
    longitude: null,
  },

  {
    id: 83,
    name: "SURECARE Diagnostic and Laboratory Services",
    location: "37 Edem Udo Street, Enen Ekpene Close, off Enen Ekpene Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Laboratory",
    phone: "07083394112",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     EKET LGA — MATERNITY CENTRES
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 84,
    name: "His Grace Maternity Home",
    location: "Eket Urban 2, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 85,
    name: "Mkpok Favour Maternity Home",
    location: "Eket Urban 4, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Maternity Centre",
    phone: "08026041332",
    latitude: null,
    longitude: null,
  },

  {
    id: 86,
    name: "Solution Clinic and Maternity",
    location: "Eket, Akwa Ibom",
    lga: "Eket",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 87,
    name: "Udeme Jehovah Clinic Hospital Maternity",
    location: "Edem Udo Street, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

    /* =========================================================
     EKET LGA — SPECIALIST HOSPITALS / CLINICS
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 88,
    name: "Abasiekeme Specialist Clinic",
    location: "11 Nana Street, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Specialist Hospital",
    phone: "08056044550",
    latitude: null,
    longitude: null,
  },

  {
    id: 89,
    name: "Cozar Specialist Hospital",
    location: "45 Afia Nsit Road, Off Idua Road, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Specialist Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 90,
    name: "Romivic Specialist Hospital",
    location: "18 Isong Udoito Street, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Specialist Hospital",
    phone: "08036695707",
    latitude: null,
    longitude: null,
  },

  {
    id: 91,
    name: "RCC Holifield Specialist Hospital",
    location: "53 RCC Road, Opposite AKTC, Eket, Akwa Ibom",
    lga: "Eket",
    type: "Specialist Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     ESIT EKET LGA — HOSPITAL
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 92,
    name: "Cottage Hospital, Ekpene Obo",
    location: "Ekpene Obo, Esit Eket, Akwa Ibom",
    lga: "Esit Eket",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     ESIT EKET LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 93,
    name: "Etebi Mbak Uyo Health Centre",
    location: "Etebi, Esit Eket, Akwa Ibom",
    lga: "Esit Eket",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 94,
    name: "Uquo Town Operational Base Primary Health Centre",
    location: "Uquo Town, Esit Eket, Akwa Ibom",
    lga: "Esit Eket",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 95,
    name: "Idung Assan Health Post",
    location: "Idung Assan, Esit Eket, Akwa Ibom",
    lga: "Esit Eket",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

 /* =========================================================
     ESSIEN UDIM LGA — HOSPITALS
     ---------------------------------------------------------
     Verified facility identity and LGA.
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 102,
    name: "St. Mary's Hospital, Urua Akpan",
    location: "Urua Akpan, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 103,
    name: "General Hospital, Annang",
    location: "Ikpe Annang, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 104,
    name: "Ukana Cottage Hospital",
    location: "Ukana West 2, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     ESSIEN UDIM LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     Verified from the 2025 HOPE-PHC programme data.
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 96,
    name: "Adiasim Health Centre",
    location: "Adiasim, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 97,
    name: "Afaha Ikot Ebak Primary Health Care Operational Base",
    location: "Afaha Ikot Ebak, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     ESSIEN UDIM LGA — PHARMACIES
     ---------------------------------------------------------
     Current business listings place these facilities in
     Essien Udim. GPS coordinates remain null until verified.
  ========================================================= */

  {
    id: 98,
    name: "Mariam Pharmacy",
    location: "80 Ikot Oku, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "Pharmacy",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 99,
    name: "Nseobong Chemists",
    location: "Km 5 Ikot Ekpene - Abak Road, Ukana Ikot Oku Etim, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "Pharmacy",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 100,
    name: "Nseobong Pharmacy",
    location: "109 Oku Etim, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "Pharmacy",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     ESSIEN UDIM LGA — MATERNITY
     ---------------------------------------------------------
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 101,
    name: "Trinity Medical and Maternity Center, Ikot Oko",
    location: "Afaha Ikot Ebak, Essien Udim, Akwa Ibom",
    lga: "Essien Udim",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

/* =========================================================
     ETIM EKPO LGA — HOSPITAL
     ---------------------------------------------------------
     Verified hospital facility.
     GPS coordinates remain null until separately verified.
  ========================================================= */

   {
    id: 105,
    name: "General Hospital, Uruk Ata Ikot Ekpor",
    location: "Uruk Ata Ikot Ekpor, Etim Ekpo, Akwa Ibom",
    lga: "Etim Ekpo",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 111,
    name: "Divine Love Hospital",
    location: "Etim Ekpo, Akwa Ibom",
    lga: "Etim Ekpo",
    type: "Private Hospital",
    phone: "08064684046",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     ETIM EKPO LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     Verified against 2025 HOPE-PHC data and Akwa Ibom
     State Government records.
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 106,
    name: "Atan Eka Uruk Eshiet Health Centre",
    location: "Atan Eka, Uruk Eshiet, Etim Ekpo, Akwa Ibom",
    lga: "Etim Ekpo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 107,
    name: "Nkwot Ikot Ebo Health Centre",
    location: "Nkwot Ikot Ebo, Etim Ekpo, Akwa Ibom",
    lga: "Etim Ekpo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 108,
    name: "Ikot Udobong Health Centre",
    location: "Ikot Udobong, Etim Ekpo, Akwa Ibom",
    lga: "Etim Ekpo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 109,
    name: "Model Primary Health Centre, Utu Ikot Okpo",
    location: "Utu Ikot Okpo, Etim Ekpo, Akwa Ibom",
    lga: "Etim Ekpo",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     ETIM EKPO LGA — MATERNITY
     ---------------------------------------------------------
     Verified facility location.
     GPS coordinates remain null until separately verified.
  ========================================================= */

  {
    id: 110,
    name: "Iwukem Maternity Unit",
    location: "Iwukem, Etim Ekpo, Akwa Ibom",
    lga: "Etim Ekpo",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

 /* =========================================================
     ETINAN LGA — HOSPITAL
     ---------------------------------------------------------
     Verified through Akwa Ibom State Government records.
     GPS coordinates intentionally left null pending
     separate coordinate verification.
  ========================================================= */

  {
    id: 112,
    name: "General Hospital, Etinan",
    location: "Hospital Road, Etinan, Akwa Ibom",
    lga: "Etinan",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     ETINAN LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     Verified against the 2025 HOPE-PHC programme annex.
     GPS coordinates intentionally left null pending
     separate verification.
  ========================================================= */

  {
    id: 113,
    name: "Ekpene Ukpa Health Centre",
    location: "Ekpene Ukpa, Etinan, Akwa Ibom",
    lga: "Etinan",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 114,
    name: "Ikot Obio Inyang Health Centre",
    location: "Ikot Obio Inyang, Etinan, Akwa Ibom",
    lga: "Etinan",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 115,
    name: "Efa PHC",
    location: "Efa, Etinan, Akwa Ibom",
    lga: "Etinan",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     IBENO LGA — HOSPITAL
     ---------------------------------------------------------
     Verified through Akwa Ibom State Government records.
     GPS coordinates intentionally left null pending
     separate coordinate verification.
  ========================================================= */

  {
    id: 116,
    name: "Cottage Hospital, Ibeno",
    location: "Ibeno, Akwa Ibom",
    lga: "Ibeno",
    type: "Cottage Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

    /* =========================================================
     IBENO LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     Verified against the 2025 HOPE-PHC programme annex.
     GPS coordinates intentionally left null pending
     separate coordinate verification.
  ========================================================= */

  {
    id: 117,
    name: "Ukpenekang Operational Base Primary Health Centre",
    location: "Ukpenekang, Ibeno, Akwa Ibom",
    lga: "Ibeno",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 118,
    name: "Ndito Eka Iba Health Centre",
    location: "Ndito Eka Iba, Ibeno, Akwa Ibom",
    lga: "Ibeno",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     IBIONO IBOM LGA — HOSPITAL
     ---------------------------------------------------------
     Verified through Akwa Ibom State Government records.
     GPS coordinates intentionally left null pending
     separate verification.
  ========================================================= */

  {
    id: 119,
    name: "General Hospital, Ibiono Ibom",
    location: "Ibiono Ibom, Akwa Ibom",
    lga: "Ibiono Ibom",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     IBIONO IBOM LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     Verified against the 2025 HOPE-PHC programme annex.
     GPS coordinates intentionally left null pending
     separate verification.
  ========================================================= */

  {
    id: 120,
    name: "Ikot Adaidem Primary Health Centre",
    location: "Ikot Adaidem, Ibiono Ibom, Akwa Ibom",
    lga: "Ibiono Ibom",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 121,
    name: "Ikot Idaha Health Centre",
    location: "Ikot Idaha, Ibiono Ibom, Akwa Ibom",
    lga: "Ibiono Ibom",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     IBIONO IBOM LGA — MATERNITY
     ---------------------------------------------------------
     Licensed facility record identifies this as a
     Clinic and Maternity in Ibiono Ibom LGA.
     GPS coordinates intentionally left null pending
     separate verification.
  ========================================================= */

  {
    id: 122,
    name: "Ntan Akpan Udom Eduwen Clinic and Maternity",
    location: "Ibiono Ibom 9, Ibiono Ibom, Akwa Ibom",
    lga: "Ibiono Ibom",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     IKONO LGA — HOSPITAL
     ---------------------------------------------------------
     Verified through Akwa Ibom State Government records.
     GPS coordinates intentionally left null pending
     separate coordinate verification.
  ========================================================= */

  {
    id: 123,
    name: "General Hospital, Ikono",
    location: "Odoro Ikpe, Ikono, Akwa Ibom",
    lga: "Ikono",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

   /* =========================================================
     IKONO LGA — PRIMARY HEALTH CENTRE
     ---------------------------------------------------------
     Verified facility record.
     GPS coordinates intentionally left null pending
     separate coordinate verification.
  ========================================================= */

  {
    id: 124,
    name: "Nkwot Edem Edet Health Post",
    location: "Nkwot, Ikono, Akwa Ibom",
    lga: "Ikono",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

/* =========================================================
     IKONO LGA — MATERNITY
     ---------------------------------------------------------
     Verified facility record.
     GPS coordinates intentionally left null pending
     separate coordinate verification.
  ========================================================= */

  {
    id: 125,
    name: "Prince of Peace Clinic and Maternity",
    location: "Ediene 1, Ikono, Akwa Ibom",
    lga: "Ikono",
    type: "Maternity Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

 /* =========================================================
     INI LGA — HOSPITAL
     ---------------------------------------------------------
     Verified through Akwa Ibom State Government budget records.
     GPS coordinates intentionally left null pending
     separate verification.
  ========================================================= */

  {
    id: 126,
    name: "General Hospital, Ini",
    location: "Ini, Akwa Ibom",
    lga: "Ini",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     INI LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     Verified against the 2025 HOPE-PHC programme annex.
     GPS coordinates intentionally left null pending
     separate verification.
  ========================================================= */

  {
    id: 127,
    name: "Mbiabong Ikot Udofia Health Centre",
    location: "Mbiabong Ikot Udofia, Ini, Akwa Ibom",
    lga: "Ini",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 128,
    name: "Odoro Ikpe Primary Health Centre",
    location: "Odoro Ikpe, Ini, Akwa Ibom",
    lga: "Ini",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 129,
    name: "Ikpe Ikot Nkon Health Centre",
    location: "Ikpe 2, Ini, Akwa Ibom",
    lga: "Ini",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     IKOT ABASI LGA — HOSPITAL
     ---------------------------------------------------------
     Verified through Akwa Ibom State Government records.
     GPS coordinates intentionally left null pending
     separate coordinate verification.
  ========================================================= */

  {
    id: 130,
    name: "General Hospital, Ikot Abasi",
    location: "Ikot Abasi, Akwa Ibom",
    lga: "Ikot Abasi",
    type: "General Hospital",
    phone: "",
    latitude: null,
    longitude: null,
  },

  /* =========================================================
     IKOT ABASI LGA — PRIMARY HEALTH CENTRES
     ---------------------------------------------------------
     Verified against the 2025 HOPE-PHC programme annex.
     GPS coordinates intentionally left null pending
     separate verification.
  ========================================================= */

  {
    id: 131,
    name: "Ikot Ekara PHC",
    location: "Ikot Ekara, Ikot Abasi, Akwa Ibom",
    lga: "Ikot Abasi",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 132,
    name: "Ikot Abasi Primary Health Centre",
    location: "Ikpa Ibekwe, Ikot Abasi, Akwa Ibom",
    lga: "Ikot Abasi",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
    id: 133,
    name: "Ikot Akan Primary Health Centre",
    location: "Ikot Akan, Ikot Abasi, Akwa Ibom",
    lga: "Ikot Abasi",
    type: "Primary Health Centre",
    phone: "",
    latitude: null,
    longitude: null,
  },

  {
  id: 134,
  name: "God'stime Hospital, Scanning Laboratory/Maternity",
  location: "Ikpa Ibekwe 1, Ikot Abasi, Akwa Ibom",
  lga: "Ikot Abasi",
  type: "Maternity Centre",
  phone: "08035510634",
  latitude: null,
  longitude: null,
},

];

/* =========================================================
   HAVERSINE DISTANCE CALCULATION
   ---------------------------------------------------------
   Returns distance between two GPS coordinates in KM.
========================================================= */

function calculateDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
): number {
  const earthRadiusKm = 6371;

  const latitudeDifference =
    ((latitude2 - latitude1) * Math.PI) / 180;

  const longitudeDifference =
    ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(latitudeDifference / 2) *
      Math.sin(latitudeDifference / 2) +
    Math.cos((latitude1 * Math.PI) / 180) *
      Math.cos((latitude2 * Math.PI) / 180) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
}

/* =========================================================
   PAGE
========================================================= */

export default function HealthCentres() {
  const navigate = useNavigate();

  /* =======================================================
     SEARCH
  ======================================================= */

  const [searchTerm, setSearchTerm] = useState("");

  /* =======================================================
     LGA
  ======================================================= */

  const [selectedLga, setSelectedLga] =
    useState("All LGAs");

  /* =======================================================
     FACILITY TYPE
  ======================================================= */

  const [selectedType, setSelectedType] =
    useState("All Types");

  /* =======================================================
     USER LOCATION
  ======================================================= */

  const [userLocation, setUserLocation] =
    useState<{
      latitude: number;
      longitude: number;
    } | null>(null);

  /* =======================================================
     LOCATION STATUS
  ======================================================= */

  const [locationLoading, setLocationLoading] =
    useState(false);

  /* =======================================================
     GET USER LOCATION
  ======================================================= */

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Location services are not supported by this browser."
      );

      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          "===== G-SAM GPS DEBUG ====="
        );

        console.log(
          "Latitude:",
          position.coords.latitude
        );

        console.log(
          "Longitude:",
          position.coords.longitude
        );

        console.log(
          "Accuracy:",
          position.coords.accuracy,
          "meters"
        );

        console.log(
          "==========================="
        );

        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationLoading(false);
      },

      (error) => {
        console.error(
          "Location error:",
          error
        );

        setLocationLoading(false);

        alert(
          "Unable to access your location. Please allow location permission in your browser and try again."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /* =======================================================
     FILTER + DISTANCE
  ======================================================= */

  const filteredHealthCentres = useMemo(() => {
    const search =
      searchTerm
        .toLowerCase()
        .trim();

    const filtered = healthCentres.filter(
      (centre) => {
        const matchesSearch =
          search === "" ||
          centre.name
            .toLowerCase()
            .includes(search) ||
          centre.location
            .toLowerCase()
            .includes(search) ||
          centre.lga
            .toLowerCase()
            .includes(search) ||
          centre.type
            .toLowerCase()
            .includes(search);

        const matchesLga =
          selectedLga === "All LGAs" ||
          centre.lga === selectedLga;

        const matchesType =
          selectedType === "All Types" ||
          centre.type === selectedType;

        return (
          matchesSearch &&
          matchesLga &&
          matchesType
        );
      }
    );

    /* =====================================================
       ADD DISTANCE
    ===================================================== */

    const centresWithDistance =
      filtered.map((centre) => {
        if (
          userLocation &&
          centre.latitude !== null &&
          centre.longitude !== null
        ) {
          return {
            ...centre,

            distance: calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              centre.latitude,
              centre.longitude
            ),
          };
        }

        return {
          ...centre,
          distance: null,
        };
      });

    /* =====================================================
       WHEN GPS IS ACTIVE
       SORT NEAREST FIRST
    ===================================================== */

    if (userLocation) {
      centresWithDistance.sort(
        (a, b) => {
          if (
            a.distance === null &&
            b.distance === null
          ) {
            return 0;
          }

          if (a.distance === null) {
            return 1;
          }

          if (b.distance === null) {
            return -1;
          }

          return a.distance - b.distance;
        }
      );
    }

    return centresWithDistance;
  }, [
    searchTerm,
    selectedLga,
    selectedType,
    userLocation,
  ]);

  /* =======================================================
     CALL
  ======================================================= */

  const handleCall = (phone: string) => {
    if (!phone) {
      return;
    }

    window.location.href =
      `tel:${phone}`;
  };

  /* =======================================================
     DIRECTIONS
  ======================================================= */

  const handleDirections = (
    centre: HealthCentre
  ) => {
    let destination = centre.name;

    if (
      centre.latitude !== null &&
      centre.longitude !== null
    ) {
      destination =
        `${centre.latitude},${centre.longitude}`;
    } else if (centre.location) {
      destination =
        `${centre.name}, ${centre.location}`;
    }

    const url =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        destination
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedLga("All LGAs");
    setSelectedType("All Types");
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="health-centres-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="health-centres-header">

        <button
          type="button"
          className="health-centres-back"
          onClick={() =>
            navigate(
              "/citizen-dashboard"
            )
          }
        >
          ←
        </button>

        <div>
          <h1>
            Find a Health Centre
          </h1>

          <p>
            Find healthcare services near you.
          </p>
        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="health-centres-main">

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="health-centres-search">

          <span>
            🔍
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            placeholder="Search health centre..."
          />

        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="health-centres-filters">

          {/* LGA */}

          <div className="filter-group">

            <label htmlFor="lga-filter">
              📍 Local Government Area
            </label>

            <select
              id="lga-filter"
              value={selectedLga}
              onChange={(event) =>
                setSelectedLga(
                  event.target.value
                )
              }
            >
              {lgas.map(
                (lga) => (
                  <option
                    key={lga}
                    value={lga}
                  >
                    {lga}
                  </option>
                )
              )}
            </select>

          </div>

          {/* FACILITY TYPE */}

          <div className="filter-group">

            <label htmlFor="type-filter">
              🏥 Facility Type
            </label>

            <select
              id="type-filter"
              value={selectedType}
              onChange={(event) =>
                setSelectedType(
                  event.target.value
                )
              }
            >
              {facilityTypes.map(
                (type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                )
              )}
            </select>

          </div>

        </div>

        {/* =================================================
            GPS BUTTON
        ================================================= */}

        <button
          type="button"
          className="location-btn"
          onClick={
            handleUseLocation
          }
          disabled={locationLoading}
        >
          {locationLoading
            ? "📍 Detecting location..."
            : "📍 Use My Location"}
        </button>

        {/* =================================================
            GPS STATUS
        ================================================= */}

        {userLocation && (
          <div className="gps-success">

            <span>
              📍
            </span>

            <div>
              <strong>
                Location detected
              </strong>

              <p>
                Facilities with verified GPS
                coordinates are now sorted
                from nearest to farthest.
              </p>
            </div>

          </div>
        )}

        {/* =================================================
            PROTOTYPE NOTICE
        ================================================= */}

        <div className="prototypeNotice">

          <span>
            ℹ️
          </span>

          <p>
            <strong>
              Prototype Directory:
            </strong>{" "}
            Facility information will be
            connected to a verified healthcare
            facility database in the production
            version.
          </p>

        </div>

        {/* =================================================
            RESULTS
        ================================================= */}

        <section className="health-centres-section">

          <div className="section-title">

            <div>

              <h2>
                Available Health Centres
              </h2>

              <p>
                {userLocation
                  ? "Nearest facilities with verified locations are shown first."
                  : "Healthcare facilities in your community"}
              </p>

            </div>

            <span>
              {
                filteredHealthCentres.length
              }
            </span>

          </div>

          {/* =================================================
              FACILITY LIST
          ================================================= */}

          {filteredHealthCentres.length >
          0 ? (

            <div className="health-centres-list">

              {filteredHealthCentres.map(
                (centre) => (

                  <article
                    className="health-centre-card"
                    key={centre.id}
                  >

                    {/* ICON */}

                    <div className="centre-icon">
                      🏥
                    </div>

                    {/* INFORMATION */}

                    <div className="centre-info">

                      <span className="centre-type">
                        {centre.type}
                      </span>

                      <h3>
                        {centre.name}
                      </h3>

                      <p>
                        📍{" "}
                        {centre.location}
                      </p>

                      <p>
                        🗺️{" "}
                        {centre.lga} LGA
                      </p>

                      {/* =================================================
                          DISTANCE
                      ================================================= */}

                      {userLocation &&
                        centre.distance !==
                          null && (
                          <p className="centre-distance">
                            📏{" "}
                            {centre.distance < 1
                              ? `${Math.round(
                                  centre.distance *
                                    1000
                                )} m away`
                              : `${centre.distance.toFixed(
                                  1
                                )} km away`}
                          </p>
                        )}

                      {/* =================================================
                          GPS NOT VERIFIED
                      ================================================= */}

                      {userLocation &&
                        centre.distance ===
                          null && (
                          <p className="centre-distance">
                            📍 Distance unavailable —
                            facility GPS coordinates
                            not yet verified.
                          </p>
                        )}

                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <div className="centre-actions">

                        <button
                          type="button"
                          onClick={() =>
                            handleCall(
                              centre.phone
                            )
                          }
                          disabled={!centre.phone}
                        >
                          {centre.phone
                            ? "📞 Call"
                            : "📞 Phone unavailable"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDirections(
                              centre
                            )
                          }
                        >
                          🧭 Directions
                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          ) : (

            /* =================================================
               NO RESULTS
            ================================================= */

            <div className="no-health-centres">

              <div>
                🔍
              </div>

              <h3>
                No health centre found
              </h3>

              <p>
                There are currently no
                facilities matching your
                search or selected filters.
              </p>

              <button
                type="button"
                onClick={
                  handleResetFilters
                }
              >
                Clear Filters
              </button>

            </div>

          )}

        </section>

        {/* =================================================
            EMERGENCY
        ================================================= */}

        <section className="health-centres-notice">

          <span>
            💡
          </span>

          <div>

            <h3>
              Need urgent help?
            </h3>

            <p>
              For a serious emergency,
              use the Emergency / SOS
              service instead of waiting
              to locate a facility.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/emergency")
              }
            >
              🚨 Emergency / SOS
            </button>

          </div>

        </section>

      </main>

      {/* =================================================
          BOTTOM NAV
      ================================================= */}

      <nav className="health-centres-bottom-nav">

        <button
          type="button"
          onClick={() =>
            navigate(
              "/citizen-dashboard"
            )
          }
        >
          🏠
          <span>
            Home
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/health-education"
            )
          }
        >
          ❤️
          <span>
            Health
          </span>
        </button>

        <button
          type="button"
          className="active"
        >
          🏥
          <span>
            Services
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/notifications"
            )
          }
        >
          🔔
          <span>
            Alerts
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/profile"
            )
          }
        >
          👤
          <span>
            Profile
          </span>
        </button>

      </nav>

    </div>
  );
}