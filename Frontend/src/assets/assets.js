import acrylic from './AcrylicLetters.jpg'
import door from './Door.webp'
import window from './Window.webp'
import mirror from './Mirror.jpg'
import binds from './Binds.jpg'
import pillar from './Pillars.jpg'
import railing from './Railing.jpg'
import wardrobe from './Wardrobe.jpg'
import logoimg from './logo.png'

import ssElevationRailing from './product/ss_elevation_railing.png';
import washroomGate from './product/washroom_gate.png';
import al_wardrobe from './product/al_wardrobe.png';
import ventilation from './product/ventillation.png';
import glassPartitionDoor from './product/12mm_glass_parition_door.png';
import mosquitoNetDoor from './product/mosquito_net_door.png';
import railingDesign from './product/railing.png';
import ssFrontGate from './product/ss_front_gate.png';
import domalSectionWindow from './product/domal_section_window.png';
import tuffenGlassRailing from './product/tuffen_glass_railing.png';
import glassBalcony from './product/glass_balcony.png';
import railingFitting from './product/railing_fitting.png';
import railingElevation from './product/railing_elevation.png';
import ssRailing from './product/ss_railing.png';

import businessManPhoto from './businessMan.jpg'

export const category = [
    {
        name: 'Acrylic',
        img_src: acrylic
    },
    {
        name: 'Door',
        img_src: door
    },
    {
        name: 'Window',
        img_src: window
    },
    {
        name: 'Mirror',
        img_src: mirror
    },
    {
        name: 'Binds',
        img_src: binds
    },
    {
        name: 'Pillars',
        img_src: pillar
    },
    {
        name: 'Railing',
        img_src: railing
    },
    {
        name: 'Wardrobe',
        img_src: wardrobe
    },
]




export const menu_items = [
  {
    name: "SS Elevation Railing",
    images: [ssElevationRailing, washroomGate, al_wardrobe, ventilation, glassPartitionDoor, mosquitoNetDoor, acrylic, domalSectionWindow, wardrobe, washroomGate, window, railing, railingDesign, railingElevation],
    rate: 1200,
    category: "Railing"
  },
  {
    name: "Washroom Gate",
    images: [washroomGate],
    rate: 1800,
    category: "Door"
  },
  {
    name: "Wardrobe",
    images: [al_wardrobe],
    rate: 2000,
    category: "Wardrobe"
  },
  {
    name: "Ventilation",
    images: [ventilation],
    rate: 500,
    category: "Window"
  },
  {
    name: "12mm Glass Door",
    images: [glassPartitionDoor],
    rate: 2500,
    category: "Door"
  },
  {
    name: "Mosquito Net Door",
    images: [mosquitoNetDoor],
    rate: 1000,
    category: "Door"
  },
  {
    name: "Railing",
    images: [railingDesign],
    rate: 1100,
    category: "Railing"
  },
  {
    name: "SS Front Gate",
    images: [ssFrontGate],
    rate: 3000,
    category: "Door"
  },
  {
    name: "Domal Section Window",
    images: [domalSectionWindow],
    rate: 1600,
    category: "Window"
  },
  {
    name: "Tuffen Glass Railing",
    images: [tuffenGlassRailing],
    rate: 2100,
    category: "Railing"
  },
  {
    name: "Glass Balcony",
    images: [glassBalcony],
    rate: 2500,
    category: "Railing"
  },
  {
    name: "Railing Fitting",
    images: [railingFitting],
    rate: 400,
    category: "Railing"
  },
  {
    name: "Railing Elevation",
    images: [railingElevation],
    rate: 1500,
    category: "Railing"
  },
  {
    name: "SS Railing",
    images: [ssRailing],
    rate: 1400,
    category: "Railing"
  }
];

export const photo = {
    name: "Photo Of Owner",
    image: businessManPhoto
}

export const logo = {
  image: logoimg
}