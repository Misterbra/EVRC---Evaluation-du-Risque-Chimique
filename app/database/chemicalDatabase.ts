import { type ChemicalProduct } from '../types';

export class ChemicalDatabaseService {
  private products: Map<string, ChemicalProduct>;

  constructor() {
    this.products = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const productsDB = [
      // Solvants organiques
      {
        cas: '67-64-1',
        name: 'Acétone',
        vlep: 500,
        mentions: ['H225', 'H319', 'H336'],
        vaporPressure: 240,
        category: 'Solvants organiques',
        physicalState: 'Liquide'
      },
      {
        cas: '67-66-3',
        name: 'Chloroforme',
        vlep: 2,
        mentions: ['H302', 'H315', 'H351', 'H373'],
        vaporPressure: 211,
        category: 'Solvants organiques',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '109-99-9',
        name: 'Tétrahydrofurane',
        vlep: 50,
        mentions: ['H225', 'H319', 'H335', 'H351'],
        vaporPressure: 200,
        category: 'Solvants organiques',
        physicalState: 'Liquide'
      },

      // Hydrocarbures aromatiques
      {
        cas: '71-43-2',
        name: 'Benzène',
        vlep: 1,
        mentions: ['H225', 'H350', 'H340', 'H372'],
        vaporPressure: 100,
        cmr: true,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Liquide'
      },
      {
        cas: '108-88-3',
        name: 'Toluène',
        vlep: 20,
        mentions: ['H225', 'H361d', 'H304', 'H373', 'H315', 'H336'],
        vaporPressure: 29,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Liquide'
      },
      {
        cas: '1330-20-7',
        name: 'Xylène',
        vlep: 50,
        mentions: ['H226', 'H312', 'H332', 'H315', 'H319'],
        vaporPressure: 8.9,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Liquide'
      },
      {
        cas: '100-42-5',
        name: 'Styrène',
        vlep: 23.3,
        mentions: ['H226', 'H315', 'H319', 'H332', 'H361d', 'H372'],
        vaporPressure: 6.7,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Liquide'
      },

      // Cétones
      {
        cas: '78-93-3',
        name: 'Méthyléthylcétone',
        vlep: 200,
        mentions: ['H225', 'H319', 'H336', 'EUH066'],
        vaporPressure: 105,
        category: 'Cétones',
        physicalState: 'Liquide'
      },
      {
        cas: '108-10-1',
        name: 'Méthylisobutylcétone',
        vlep: 20,
        mentions: ['H225', 'H319', 'H332', 'H335'],
        vaporPressure: 19.9,
        category: 'Cétones',
        physicalState: 'Liquide'
      },

      // Alcools
      {
        cas: '67-56-1',
        name: 'Méthanol',
        vlep: 200,
        mentions: ['H225', 'H301', 'H311', 'H331', 'H370'],
        vaporPressure: 128,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '67-63-0',
        name: 'Isopropanol',
        vlep: 400,
        mentions: ['H225', 'H319', 'H336'],
        vaporPressure: 44,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '64-17-5',
        name: 'Éthanol',
        vlep: 1000,
        mentions: ['H225', 'H319'],
        vaporPressure: 59,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '71-36-3',
        name: 'n-Butanol',
        vlep: 50,
        mentions: ['H226', 'H302', 'H315', 'H318', 'H335', 'H336'],
        vaporPressure: 6.7,
        category: 'Alcools',
        physicalState: 'Liquide'
      },

      // Esters
      {
        cas: '141-78-6',
        name: 'Acétate d\'éthyle',
        vlep: 400,
        mentions: ['H225', 'H319', 'H336', 'EUH066'],
        vaporPressure: 97,
        category: 'Esters',
        physicalState: 'Liquide'
      },
      {
        cas: '123-86-4',
        name: 'Acétate de n-butyle',
        vlep: 150,
        mentions: ['H226', 'H336', 'EUH066'],
        vaporPressure: 15,
        category: 'Esters',
        physicalState: 'Liquide'
      },
      {
        cas: '108-21-4',
        name: 'Acétate d\'isopropyle',
        vlep: 250,
        mentions: ['H225', 'H319', 'H336'],
        vaporPressure: 61,
        category: 'Esters',
        physicalState: 'Liquide'
      },

      // Solvants chlorés
      {
        cas: '75-09-2',
        name: 'Dichlorométhane',
        vlep: 50,
        mentions: ['H351', 'H336'],
        vaporPressure: 470,
        category: 'Solvants chlorés',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '79-01-6',
        name: 'Trichloréthylène',
        vlep: 75,
        mentions: ['H350', 'H341', 'H319', 'H315', 'H336', 'H412'],
        vaporPressure: 77,
        category: 'Solvants chlorés',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '127-18-4',
        name: 'Perchloroéthylène',
        vlep: 20,
        mentions: ['H351', 'H411'],
        vaporPressure: 18.5,
        category: 'Solvants chlorés',
        physicalState: 'Liquide',
        cmr: true
      },

      // Acides
      {
        cas: '7664-93-9',
        name: 'Acide sulfurique',
        vlep: 0.05,
        mentions: ['H314', 'H335'],
        vaporPressure: 0.001,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        cas: '7697-37-2',
        name: 'Acide nitrique',
        vlep: 2.6,
        mentions: ['H272', 'H314'],
        vaporPressure: 48,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        cas: '7647-01-0',
        name: 'Acide chlorhydrique',
        vlep: 7.6,
        mentions: ['H314', 'H335'],
        vaporPressure: 84,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        cas: '64-19-7',
        name: 'Acide acétique',
        vlep: 10,
        mentions: ['H226', 'H314'],
        vaporPressure: 15.7,
        category: 'Acides',
        physicalState: 'Liquide'
      },

      // Aldéhydes
      {
        cas: '50-00-0',
        name: 'Formaldéhyde',
        vlep: 0.3,
        mentions: ['H350', 'H341', 'H301', 'H311', 'H331', 'H314', 'H317'],
        vaporPressure: 440,
        cmr: true,
        category: 'Aldéhydes',
        physicalState: 'Liquide'
      },
      {
        cas: '123-73-9',
        name: 'Crotonaldéhyde',
        vlep: 2,
        mentions: ['H225', 'H301', 'H315', 'H319', 'H335', 'H341', 'H373'],
        vaporPressure: 30,
        category: 'Aldéhydes',
        physicalState: 'Liquide'
      },
      {
        cas: '111-30-8',
        name: 'Glutaraldéhyde',
        vlep: 0.1,
        mentions: ['H301', 'H314', 'H317', 'H331', 'H335', 'H400'],
        vaporPressure: 17,
        category: 'Aldéhydes',
        physicalState: 'Liquide'
      },

      // Hydrocarbures aliphatiques
      {
        cas: '110-54-3',
        name: 'n-Hexane',
        vlep: 20,
        mentions: ['H225', 'H361f', 'H304', 'H373', 'H315', 'H336', 'H411'],
        vaporPressure: 160,
        category: 'Hydrocarbures aliphatiques',
        physicalState: 'Liquide'
      },
      {
        cas: '142-82-5',
        name: 'n-Heptane',
        vlep: 500,
        mentions: ['H225', 'H304', 'H315', 'H336', 'H410'],
        vaporPressure: 48,
        category: 'Hydrocarbures aliphatiques',
        physicalState: 'Liquide'
      },
      {
        cas: '111-65-9',
        name: 'n-Octane',
        vlep: 300,
        mentions: ['H225', 'H304', 'H315', 'H336', 'H410'],
        vaporPressure: 14,
        category: 'Hydrocarbures aliphatiques',
        physicalState: 'Liquide'
      },

      // Amines
      {
        cas: '75-04-7',
        name: 'Éthylamine',
        vlep: 5,
        mentions: ['H220', 'H319', 'H335'],
        vaporPressure: 1000,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '108-91-8',
        name: 'Cyclohexylamine',
        vlep: 10,
        mentions: ['H226', 'H302', 'H311', 'H314', 'H361f'],
        vaporPressure: 14,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '121-44-8',
        name: 'Triéthylamine',
        vlep: 2,
        mentions: ['H225', 'H302', 'H312', 'H314', 'H332'],
        vaporPressure: 69,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '75-25-2',
        name: 'Bromoforme',
        vlep: 5,
        mentions: ['H302', 'H315', 'H319', 'H335'],
        vaporPressure: 22,
        category: 'Solvants chlorés',
        physicalState: 'Liquide'
      },
      {
        cas: '98-07-7',
        name: 'Chlorure de benzoyle',
        vlep: 2,
        mentions: ['H314', 'H330', 'H335'],
        vaporPressure: 1.3,
        category: 'Composés organiques halogénés',
        physicalState: 'Liquide'
      },

      // Composés organométalliques
      {
        cas: '75-00-3',
        name: 'Chlorure d\'éthyle',
        vlep: 50,
        mentions: ['H220', 'H280', 'H351'],
        vaporPressure: 4500,
        category: 'Composés organométalliques',
        physicalState: 'Gaz'
      },
      {
        cas: '74-87-3',
        name: 'Chlorométhane',
        vlep: 50,
        mentions: ['H220', 'H351', '332', 'H412'],
        vaporPressure: 5330,
        category: 'Composés organométalliques',
        physicalState: 'Gaz'
      },

      // Nitro-composés
      {
        cas: '98-95-3',
        name: 'Nitrobenzène',
        vlep: 5,
        mentions: ['H302', 'H312', 'H332', 'H351', '373'],
        vaporPressure: 0.6,
        category: 'Nitro-composés',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '79-46-9',
        name: '2-Nitropropane',
        vlep: 10,
        mentions: ['H225', '351', '360D'],
        vaporPressure: 220,
        category: 'Nitro-composés',
        physicalState: 'Liquide',
        cmr: true
      },

      // Éthers
      {
        cas: '60-29-7',
        name: 'Éther diéthylique',
        vlep: 100,
        mentions: ['H224', 'H302', 'H336', 'EUH019'],
        vaporPressure: 589,
        category: 'Éthers',
        physicalState: 'Liquide'
      },
      {
        cas: '109-93-3',
        name: 'Éther méthylique',
        vlep: 50,
        mentions: ['H225', 'H319', 'H336'],
        vaporPressure: 1880,
        category: 'Éthers',
        physicalState: 'Liquide'
      },

      // Sulfures
      {
        cas: '75-33-2',
        name: 'Méthylmercaptan',
        vlep: 1,
        mentions: ['H220', 'H331', 'H311', 'H301', 'H410'],
        vaporPressure: 1900,
        category: 'Sulfures',
        physicalState: 'Gaz'
      },
      {
        cas: '463-58-1',
        name: 'Sulfure de carbonyle',
        vlep: 5,
        mentions: ['H332', 'H312', 'H302'],
        vaporPressure: 2400,
        category: 'Sulfures',
        physicalState: 'Gaz'
      },
      {
        cas: '127-18-5',
        name: 'Hexachloroéthane',
        vlep: 1,
        mentions: ['H351', 'H410', 'H373'],
        vaporPressure: 1.33,
        category: 'Composés perchlorés',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '76-01-7',
        name: 'Pentachloroéthane',
        vlep: 5,
        mentions: ['H351', 'H412', 'H332'],
        vaporPressure: 4.5,
        category: 'Composés perchlorés',
        physicalState: 'Liquide',
        cmr: true
      },

      // Nouveaux composés aromatiques
      {
        cas: '91-20-3',
        name: 'Naphtalène',
        vlep: 10,
        mentions: ['H302', 'H351', 'H400', 'H410'],
        vaporPressure: 0.08,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Solide'
      },
      {
        cas: '120-12-7',
        name: 'Anthracène',
        vlep: 0.1,
        mentions: ['H351', 'H410'],
        vaporPressure: 0.001,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Solide'
      },

      // Nouveaux composés organiques
      {
        cas: '96-33-3',
        name: 'Acrylate de méthyle',
        vlep: 20,
        mentions: ['H225', 'H302', 'H312', 'H315', 'H319', 'H335'],
        vaporPressure: 143,
        category: 'Composés organiques',
        physicalState: 'Liquide'
      },
      {
        cas: '106-92-3',
        name: 'Allyle glycidyléther',
        vlep: 10,
        mentions: ['H225', 'H315', 'H317', 'H319', 'H335', 'H336'],
        vaporPressure: 42,
        category: 'Composés organiques',
        physicalState: 'Liquide'
      },

      // Nouveaux composés halogénés
      {
        cas: '75-69-4',
        name: 'Trichlorofluorométhane',
        vlep: 1000,
        mentions: ['H280', 'H412'],
        vaporPressure: 6800,
        category: 'Composés halogénés',
        physicalState: 'Gaz'
      },
      {
        cas: '124-73-2',
        name: 'Bromochlorométhane',
        vlep: 200,
        mentions: ['H351', 'H412'],
        vaporPressure: 160,
        category: 'Composés halogénés',
        physicalState: 'Liquide'
      },

      // Nouveaux composés azotés
      {
        cas: '628-63-7',
        name: 'Acétate de n-amyle',
        vlep: 100,
        mentions: ['H226', 'H336'],
        vaporPressure: 16,
        category: 'Composés azotés',
        physicalState: 'Liquide'
      },
      {
        cas: '142-96-1',
        name: 'Dibutyl éther',
        vlep: 50,
        mentions: ['H225', 'H302', 'H336'],
        vaporPressure: 80,
        category: 'Composés azotés',
        physicalState: 'Liquide'
      },

      // Nouveaux composés organométalliques
      {
        cas: '75-31-0',
        name: 'Isopropylamine',
        vlep: 5,
        mentions: ['H220', 'H314', 'H332'],
        vaporPressure: 320,
        category: 'Composés organométalliques',
        physicalState: 'Liquide'
      },
      {
        cas: '557-20-0',
        name: 'Chlorure de diméthylzinc',
        vlep: 0.01,
        mentions: ['H250', 'H260', 'H314'],
        vaporPressure: 2400,
        category: 'Composés organométalliques',
        physicalState: 'Liquide'
      },

      // Nouveaux composés soufrés
      {
        cas: '110-18-9',
        name: 'Diisopropylamine',
        vlep: 5,
        mentions: ['H225', 'H302', 'H312', 'H314', 'H332'],
        vaporPressure: 120,
        category: 'Composés soufrés',
        physicalState: 'Liquide'
      },
      {
        cas: '96-77-5',
        name: 'Tétraméthylthiurame disulfure',
        vlep: 1,
        mentions: ['H302', 'H317', 'H411'],
        vaporPressure: 0.013,
        category: 'Composés soufrés',
        physicalState: 'Solide'
      },

      // Nouveaux aldéhydes
      {
        cas: '97-53-0',
        name: 'Eugénol',
        vlep: 10,
        mentions: ['H315', 'H317', 'H319'],
        vaporPressure: 0.4,
        category: 'Aldéhydes',
        physicalState: 'Liquide'
      },
      {
        cas: '1818-58-8',
        name: 'Décylaldéhyde',
        vlep: 5,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0.13,
        category: 'Aldéhydes',
        physicalState: 'Liquide'
      },

      // Nouveaux esters
      {
        cas: '622-62-8',
        name: 'Propionate d\'éthyle',
        vlep: 200,
        mentions: ['H225', 'H319', 'H336'],
        vaporPressure: 160,
        category: 'Esters',
        physicalState: 'Liquide'
      },
      {
        cas: '140-88-5',
        name: 'Acrylate d\'éthyle',
        vlep: 20,
        mentions: ['H225', 'H302', 'H315', 'H317', 'H319', 'H335'],
        vaporPressure: 80,
        category: 'Esters',
        physicalState: 'Liquide'
      },

      // Nouveaux composés nitro
      {
        cas: '100-00-5',
        name: 'Chloronitrobenzène',
        vlep: 5,
        mentions: ['H302', 'H312', 'H332', 'H351', 'H410'],
        vaporPressure: 0.3,
        category: 'Nitro-composés',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '88-72-2',
        name: 'Nitrotoluène',
        vlep: 5,
        mentions: ['H302', 'H312', 'H332', 'H341', 'H351'],
        vaporPressure: 0.6,
        category: 'Nitro-composés',
        physicalState: 'Liquide',
        cmr: true
      },
      // Nouveaux anhydrides
      {
        cas: '89-32-7',
        name: 'Pyromellitic dianhydride',
        category: 'Anhydrides',
        physicalState: 'Solide',
        mentions: ['H314', 'H334', 'H317'], 
        vlep: 0.1
      },
      {
        cas: '19438-60-9',
        name: 'Anhydre hexahydro-4-methylphtalic',
        category: 'Anhydrides',
        physicalState: 'Solide',
        mentions: ['H314', 'H334', 'H317'],
        vlep: 0.1
      },
      {
        cas: '108-31-6',
        name: 'Anhydride maleic',
        category: 'Anhydrides',
        physicalState: 'Solide',
        mentions: ['H302', 'H314', 'H334', 'H317'],
        vlep: 0.1
      },
      {
        cas: '2421-28-5',
        name: 'Anhydride carbonyldiphtalic',
        category: 'Anhydrides',
        physicalState: 'Solide',
        mentions: ['H314', 'H334', 'H317'],
        vlep: 0.1
      },

      // Nouveaux acides
      {
        cas: '112-38-9',
        name: 'Acide 10-undecenoique',
        category: 'Acides',
        physicalState: 'Liquide',
        mentions: ['H315', 'H319'],
        vlep: 5
      },
      {
        cas: '334-48-5',
        name: 'Acide decanoique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H315', 'H319', 'H335'],
        vlep: 5
      },
      {
        cas: '124-04-9',
        name: 'Acide adipique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H319'],
        vlep: 5
      },
      {
        cas: '123-99-9',
        name: 'Acide azelaïque',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H319'],
        vlep: 5
      },
      {
        cas: '50-21-5',
        name: 'Acide lactique',
        category: 'Acides',
        physicalState: 'Liquide',
        mentions: ['H315', 'H318'],
        vlep: 5
      },
      {
        cas: '121-47-1',
        name: 'Acide 3-aminobenzensulfonique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H315', 'H319', 'H335'],
        vlep: 5
      },
      {
        cas: '6192-52-5',
        name: 'Acide paratoluenesulfonique (APTS) monohydrate',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H314'],
        vlep: 5
      },
      {
        cas: '116-63-2',
        name: 'Acide 4-amino-3-hydroxy-1-naphtalensulfonique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H315', 'H319', 'H335'],
        vlep: 5
      },
      {
        cas: '88-63-1',
        name: 'Acide 2,4-diaminobenzenesulfonique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H315', 'H319', 'H335'],
        vlep: 5
      },
      {
        cas: '1571-33-1',
        name: 'Acide phenylphosphonique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H314'],
        vlep: 5
      },
      {
        cas: '72-92-9',
        name: 'Acide citrique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H319'],
        vlep: 5
      },
      {
        cas: '110-15-8',
        name: 'Acide succinique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H319'],
        vlep: 5
      },
      {
        cas: '100-29-0',
        name: 'Acide terephtalique',
        category: 'Acides',
        physicalState: 'Solide',
        mentions: ['H319'],
        vlep: 5
      },
      {
        cas: '75-75-2',
        name: 'Acide methanesulfonique',
        category: 'Acides',
        physicalState: 'Liquide',
        mentions: ['H314', 'H335'],
        vlep: 1
      },
      {
        cas: '123-76-2',
        name: 'Acide levulinique',
        category: 'Acides',
        physicalState: 'Liquide',
        mentions: ['H314'],
        vlep: 5
      },
      {
        cas: '7722-84-1',
        name: 'Peroxyde d\'hydrogène',
        vlep: 1,
        mentions: ['H271', 'H302', 'H314', 'H332'],
        vaporPressure: 3,
        category: 'Oxydants',
        physicalState: 'Liquide'
      },
      {
        cas: '67-68-5',
        name: 'Diméthylsulfoxyde (DMSO)',
        vlep: 50,
        mentions: ['H315', 'H319'],
        vaporPressure: 0.6,
        category: 'Solvants organiques',
        physicalState: 'Liquide'
      },
      {
        cas: '75-05-8',
        name: 'Acétonitrile',
        vlep: 40,
        mentions: ['H225', 'H302', 'H312', 'H319', 'H332'],
        vaporPressure: 97,
        category: 'Nitriles',
        physicalState: 'Liquide'
      },
      {
        cas: '141-43-5',
        name: 'Éthanolamine',
        vlep: 3,
        mentions: ['H302', 'H312', 'H314', 'H332'],
        vaporPressure: 0.5,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '1310-73-2',
        name: 'Hydroxyde de sodium',
        vlep: 2,
        mentions: ['H314'],
        vaporPressure: 0,
        category: 'Bases',
        physicalState: 'Solide'
      },
      {
        cas: '7664-41-7',
        name: 'Ammoniaque',
        vlep: 10,
        mentions: ['H221', 'H280', 'H314', 'H331', 'H400'],
        vaporPressure: 8573,
        category: 'Bases',
        physicalState: 'Gaz'
      },
      {
        cas: '7782-50-5',
        name: 'Chlore',
        vlep: 0.5,
        mentions: ['H270', 'H315', 'H319', 'H331', 'H335', 'H400'],
        vaporPressure: 6800,
        category: 'Halogènes',
        physicalState: 'Gaz'
      },
      {
        cas: '7664-38-2',
        name: 'Acide phosphorique',
        vlep: 1,
        mentions: ['H314'],
        vaporPressure: 0.03,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        cas: '7681-52-9',
        name: 'Hypochlorite de sodium',
        vlep: 0.5,
        mentions: ['H314', 'H400'],
        vaporPressure: 17.5,
        category: 'Oxydants',
        physicalState: 'Liquide'
      },
      {
        cas: '100-51-6',
        name: 'Alcool benzylique',
        vlep: 10,
        mentions: ['H302', 'H332'],
        vaporPressure: 0.13,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '108-95-2',
        name: 'Phénol',
        vlep: 2,
        mentions: ['H301', 'H311', 'H314', 'H331', 'H341', 'H373'],
        vaporPressure: 0.4,
        category: 'Composés phénoliques',
        physicalState: 'Solide'
      },
      {
        cas: '584-84-9',
        name: 'Toluène diisocyanate',
        vlep: 0.005,
        mentions: ['H315', 'H317', 'H319', 'H330', 'H334', 'H335', 'H351'],
        vaporPressure: 0.03,
        category: 'Isocyanates',
        physicalState: 'Liquide'
      },
      {
        cas: '110-82-7',
        name: 'Cyclohexane',
        vlep: 200,
        mentions: ['H225', 'H304', 'H315', 'H336', 'H410'],
        vaporPressure: 104,
        category: 'Hydrocarbures aliphatiques',
        physicalState: 'Liquide'
      },
      {
        cas: '107-06-2',
        name: 'Dichloroéthane',
        vlep: 10,
        mentions: ['H225', 'H302', 'H315', 'H319', 'H335', 'H350'],
        vaporPressure: 87,
        category: 'Solvants chlorés',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '68-12-2',
        name: 'N,N-Diméthylformamide',
        vlep: 10,
        mentions: ['H312', 'H319', 'H332', 'H360D'],
        vaporPressure: 3.77,
        category: 'Amides',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7440-22-4',
        name: 'Argent (nanoparticules)',
        vlep: 0.1,
        mentions: ['H400', 'H410'],
        vaporPressure: 0,
        category: 'Métaux',
        physicalState: 'Solide'
      },
      {
        cas: '78-87-5',
        name: 'Dichloropropane',
        vlep: 75,
        mentions: ['H225', 'H302', 'H332', 'H350'],
        vaporPressure: 53.3,
        category: 'Solvants chlorés',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7775-09-9',
        name: 'Chlorate de sodium',
        vlep: 5,
        mentions: ['H271', 'H302', 'H411'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide'
      },
      {
        cas: '108-94-1',
        name: 'Cyclohexanone',
        vlep: 40.8,
        mentions: ['H226', 'H332'],
        vaporPressure: 4.5,
        category: 'Cétones',
        physicalState: 'Liquide'
      },
      {
        cas: '7446-70-0',
        name: 'Chlorure d\'aluminium',
        vlep: 2,
        mentions: ['H314', 'H402'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide'
      },
      {
        cas: '10028-15-6',
        name: 'Ozone',
        vlep: 0.1,
        mentions: ['H270', 'H330', 'H372', 'H400'],
        vaporPressure: 5000,
        category: 'Oxydants',
        physicalState: 'Gaz'
      },
      {
        cas: '7803-51-2',
        name: 'Phosphine',
        vlep: 0.1,
        mentions: ['H220', 'H314', 'H330', 'H400'],
        vaporPressure: 34800,
        category: 'Composés phosphorés',
        physicalState: 'Gaz'
      },
      {
        cas: '108-83-8',
        name: 'Diisobutylcétone',
        vlep: 25,
        mentions: ['H226', 'H335'],
        vaporPressure: 1.7,
        category: 'Cétones',
        physicalState: 'Liquide'
      },
      {
        cas: '79-20-9',
        name: 'Acétate de méthyle',
        vlep: 200,
        mentions: ['H225', 'H319', 'H336'],
        vaporPressure: 220,
        category: 'Esters',
        physicalState: 'Liquide'
      },
      {
        cas: '1310-58-3',
        name: 'Hydroxyde de potassium',
        vlep: 2,
        mentions: ['H302', 'H314'],
        vaporPressure: 0,
        category: 'Bases',
        physicalState: 'Solide'
      },
      {
        cas: '7553-56-2',
        name: 'Iode',
        vlep: 0.1,
        mentions: ['H312', 'H332', 'H400'],
        vaporPressure: 0.3,
        category: 'Halogènes',
        physicalState: 'Solide'
      },
      {
        cas: '106-99-0',
        name: '1,3-Butadiène',
        vlep: 2,
        mentions: ['H220', 'H340', 'H350'],
        vaporPressure: 2100,
        category: 'Hydrocarbures',
        physicalState: 'Gaz',
        cmr: true
      },
      {
        cas: '7782-41-4',
        name: 'Fluor',
        vlep: 0.1,
        mentions: ['H270', 'H314', 'H330'],
        vaporPressure: 4160,
        category: 'Halogènes',
        physicalState: 'Gaz'
      },
      {
        cas: '7440-38-2',
        name: 'Arsenic',
        vlep: 0.01,
        mentions: ['H301', 'H331', 'H350', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Métaux',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7440-43-9',
        name: 'Cadmium',
        vlep: 0.004,
        mentions: ['H330', 'H341', 'H350', 'H361fd', 'H372', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Métaux',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '106-93-4',
        name: 'Dibromure d\'éthylène',
        vlep: 0.1,
        mentions: ['H301', 'H311', 'H331', 'H350', 'H411'],
        vaporPressure: 11,
        category: 'Solvants halogénés',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '75-21-8',
        name: 'Oxyde d\'éthylène',
        vlep: 1,
        mentions: ['H220', 'H340', 'H350', 'H331', 'H319', 'H315'],
        vaporPressure: 1460,
        category: 'Époxydes',
        physicalState: 'Gaz',
        cmr: true
      },
      {
        cas: '10026-13-8',
        name: 'Pentachlorure de phosphore',
        vlep: 0.1,
        mentions: ['H300', 'H314', 'H330'],
        vaporPressure: 0.1,
        category: 'Composés phosphorés',
        physicalState: 'Solide'
      },
      {
        cas: '7783-06-4',
        name: 'Sulfure d\'hydrogène',
        vlep: 5,
        mentions: ['H220', 'H330', 'H400'],
        vaporPressure: 18750,
        category: 'Composés soufrés',
        physicalState: 'Gaz'
      },
      {
        cas: '101-77-9',
        name: '4,4\'-Méthylènedianiline',
        vlep: 0.01,
        mentions: ['H350', 'H341', 'H373', 'H411'],
        vaporPressure: 0.01,
        category: 'Amines aromatiques',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '95-53-4',
        name: 'o-Toluidine',
        vlep: 0.1,
        mentions: ['H301', 'H319', 'H350', 'H400'],
        vaporPressure: 0.3,
        category: 'Amines aromatiques',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7440-41-7',
        name: 'Béryllium',
        vlep: 0.0002,
        mentions: ['H301', 'H315', 'H317', 'H319', 'H330', 'H335', 'H350i', 'H372'],
        vaporPressure: 0,
        category: 'Métaux',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '111-15-9',
        name: 'Acétate d\'éthylglycol',
        vlep: 2,
        mentions: ['H226', 'H312', 'H332', 'H360FD'],
        vaporPressure: 2.7,
        category: 'Éthers de glycol',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '98-00-0',
        name: 'Alcool furfurylique',
        vlep: 10,
        mentions: ['H302', 'H312', 'H319', 'H332', 'H335', 'H351'],
        vaporPressure: 1.3,
        category: 'Alcools',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '107-21-1',
        name: 'Éthylène glycol',
        vlep: 20,
        mentions: ['H302', 'H373'],
        vaporPressure: 0.123,
        category: 'Glycols',
        physicalState: 'Liquide'
      },
      {
        // Caractérisation des polymères
        cas: '109-66-0',
        name: 'Pentane',
        vlep: 1000,
        mentions: ['H225', 'H304', 'H336', 'H411'],
        vaporPressure: 573,
        category: 'Solvants pour polymères',
        physicalState: 'Liquide'
      },
      {
        cas: '872-50-4',
        name: 'N-Méthyl-2-pyrrolidone',
        vlep: 10,
        mentions: ['H315', 'H319', 'H335', 'H360D'],
        vaporPressure: 0.29,
        category: 'Solvants pour polymères',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '98-56-6',
        name: '4-Chlorobenzotrifluorure',
        vlep: 20,
        mentions: ['H226', 'H317', 'H411'],
        vaporPressure: 5.3,
        category: 'Solvants pour polymères',
        physicalState: 'Liquide'
      },
      {
        cas: '7647-01-0',
        name: 'Acide chlorhydrique',
        vlep: 5,
        mentions: ['H314', 'H335'],
        vaporPressure: 84,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        cas: '7440-50-8',
        name: 'Cuivre (nanoparticules)',
        vlep: 0.2,
        mentions: ['H400', 'H410'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '1333-86-4',
        name: 'Noir de carbone',
        vlep: 3.5,
        mentions: ['H351'],
        vaporPressure: 0,
        category: 'Charges',
        physicalState: 'Solide',
        cmr: true
      },
      
      // Électrochimie
      {
        cas: '7439-89-6',
        name: 'Fer (nanoparticules)',
        vlep: 1,
        mentions: ['H228', 'H251'],
        vaporPressure: 0,
        category: 'Électrodes',
        physicalState: 'Solide'
      },
      {
        cas: '7782-42-5',
        name: 'Graphite',
        vlep: 2,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Électrodes',
        physicalState: 'Solide'
      },
      {
        cas: '21324-40-3',
        name: 'LiPF6',
        vlep: 0.1,
        mentions: ['H314', 'H318', 'H372'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7790-93-4',
        name: 'Perchlorate de lithium',
        vlep: 0.1,
        mentions: ['H272', 'H302', 'H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      
      // CO2 supercritique
      {
        cas: '124-38-9',
        name: 'Dioxyde de carbone',
        vlep: 5000,
        mentions: ['H280', 'H281'],
        vaporPressure: 57300,
        category: 'Fluides supercritiques',
        physicalState: 'Gaz'
      },
      {
        cas: '64-17-5',
        name: 'Éthanol (co-solvant)',
        vlep: 1000,
        mentions: ['H225', 'H319'],
        vaporPressure: 59,
        category: 'Co-solvants',
        physicalState: 'Liquide'
      },
      
      // Caractérisation
      {
        cas: '7726-95-6',
        name: 'Brome',
        vlep: 0.1,
        mentions: ['H330', 'H314', 'H400'],
        vaporPressure: 23,
        category: 'Réactifs analytiques',
        physicalState: 'Liquide'
      },
      {
        cas: '7553-56-2',
        name: 'Iode',
        vlep: 0.1,
        mentions: ['H312', 'H332', 'H400'],
        vaporPressure: 0.3,
        category: 'Réactifs analytiques',
        physicalState: 'Solide'
      },
      {
        cas: '7601-89-0',
        name: 'Perchlorate de sodium',
        vlep: 0.1,
        mentions: ['H271', 'H302', 'H319'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      
      // Procédés chimiques
      {
        cas: '7440-02-0',
        name: 'Nickel (catalyseur)',
        vlep: 0.1,
        mentions: ['H317', 'H351', 'H372'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7440-47-3',
        name: 'Chrome (catalyseur)',
        vlep: 0.005,
        mentions: ['H317', 'H350', 'H372'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7440-48-4',
        name: 'Cobalt (catalyseur)',
        vlep: 0.02,
        mentions: ['H317', 'H334', 'H350i', 'H361f'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      
      // Solvants spécifiques
      {
        cas: '108-32-7',
        name: 'Carbonate de propylène',
        vlep: 2,
        mentions: ['H319'],
        vaporPressure: 0.039,
        category: 'Solvants pour batteries',
        physicalState: 'Liquide'
      },
      {
        cas: '616-38-6',
        name: 'Carbonate de diméthyle',
        vlep: 100,
        mentions: ['H225'],
        vaporPressure: 5.4,
        category: 'Solvants pour batteries',
        physicalState: 'Liquide'
      },
      {
        cas: '623-53-0',
        name: 'Carbonate d\'éthylène méthyle',
        vlep: 20,
        mentions: ['H226', 'H332'],
        vaporPressure: 2.1,
        category: 'Solvants pour batteries',
        physicalState: 'Liquide'
      },
      
      // Agents de modification
      {
        cas: '7775-27-1',
        name: 'Persulfate de sodium',
        vlep: 0.1,
        mentions: ['H272', 'H302', 'H315', 'H317', 'H319', 'H334', 'H335'],
        vaporPressure: 0,
        category: 'Initiateurs',
        physicalState: 'Solide'
      },
      {
        cas: '75-65-0',
        name: 'tert-Butanol (Alcool)',
        vlep: 100,
        mentions: ['H225', 'H319', 'H332', 'H335'],
        vaporPressure: 41,
        category: 'Modificateurs',
        physicalState: 'Liquide'
      },
      
      // Gaz spéciaux
      {
        cas: '7440-59-7',
        name: 'Hélium',
        vlep: 1000,
        mentions: ['H280'],
        vaporPressure: 0,
        category: 'Gaz vecteurs',
        physicalState: 'Gaz'
      },
      {
        cas: '7727-37-9',
        name: 'Azote',
        vlep: 1000,
        mentions: ['H280'],
        vaporPressure: 0,
        category: 'Gaz inertes',
        physicalState: 'Gaz'
      },
      {
        cas: '7440-37-1',
        name: 'Argon',
        vlep: 1000,
        mentions: ['H280'],
        vaporPressure: 0,
        category: 'Gaz inertes',
        physicalState: 'Gaz'
      },
      
      // Composés pour électrolytes
      {
        cas: '105-58-8',
        name: 'Carbonate de diéthyle',
        vlep: 50,
        mentions: ['H226', 'H319'],
        vaporPressure: 1.2,
        category: 'Solvants pour batteries',
        physicalState: 'Liquide'
      },
      {
        cas: '96-49-1',
        name: 'Carbonate d\'éthylène',
        vlep: 5,
        mentions: ['H319'],
        vaporPressure: 0.01,
        category: 'Solvants pour batteries',
        physicalState: 'Solide'
      },
      
      // Additifs spéciaux
      {
        cas: '7789-20-0',
        name: 'Eau deutérée',
        vlep: 1000,
        mentions: ['H320'],
        vaporPressure: 23.8,
        category: 'Solvants isotopiques',
        physicalState: 'Liquide'
      },
      {
        cas: '7440-57-5',
        name: 'Or (nanoparticules)',
        vlep: 0.1,
        mentions: ['H400', 'H410'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      
      // Réactifs spécifiques
      {
        cas: '7681-49-4',
        name: 'Fluorure de sodium',
        vlep: 2.5,
        mentions: ['H301', 'H315', 'H319'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7447-40-7',
        name: 'Chlorure de potassium',
        vlep: 10,
        mentions: ['H319'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      
      // Composés organométalliques
      {
        cas: '100-99-2',
        name: 'n-Butyllithium',
        vlep: 0.1,
        mentions: ['H250', 'H260', 'H304', 'H314', 'H336'],
        vaporPressure: 0,
        category: 'Réactifs organométalliques',
        physicalState: 'Liquide'
      },
      {
        cas: '1317-70-0',
        name: 'Dioxyde de titane (anatase)',
        vlep: 10,
        mentions: ['H351'],
        vaporPressure: 0,
        category: 'Photocatalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      
      // Composés pour synthèse
      {
        cas: '7550-45-0',
        name: 'Tétrachlorure de titane',
        vlep: 0.1,
        mentions: ['H314', 'H330', 'H335'],
        vaporPressure: 1.3,
        category: 'Précurseurs',
        physicalState: 'Liquide'
      },
      {
        cas: '1310-65-2',
        name: 'Hydroxyde de lithium',
        vlep: 1,
        mentions: ['H302', 'H314'],
        vaporPressure: 0,
        category: 'Bases',
        physicalState: 'Solide'
      },
      
      // Additifs pour polymères
      {
        cas: '13463-67-7',
        name: 'Dioxyde de titane (rutile)',
        vlep: 10,
        mentions: ['H351'],
        vaporPressure: 0,
        category: 'Charges',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7631-86-9',
        name: 'Silice (nanopoudre)',
        vlep: 4,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Charges',
        physicalState: 'Solide'
      },
      
      // Gaz réactifs
      {
        cas: '7782-44-7',
        name: 'Oxygène',
        vlep: 1000,
        mentions: ['H270', 'H280'],
        vaporPressure: 0,
        category: 'Gaz oxydants',
        physicalState: 'Gaz'
      },
      {
        cas: '1333-74-0',
        name: 'Hydrogène',
        vlep: 1000,
        mentions: ['H220', 'H280'],
        vaporPressure: 0,
        category: 'Gaz réducteurs',
        physicalState: 'Gaz'
      },
      {
        cas: '102-71-6',
        name: 'Triéthanolamine',
        vlep: 5,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0.0006,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '7783-28-0',
        name: 'Hydrogénophosphate de diammonium',
        vlep: 10,
        mentions: ['H319'],
        vaporPressure: 0,
        category: 'Sels inorganiques',
        physicalState: 'Solide'
      },
      {
        cas: '108-46-3',
        name: 'Résorcinol',
        vlep: 10,
        mentions: ['H302', 'H315', 'H319', 'H400'],
        vaporPressure: 0.0065,
        category: 'Composés phénoliques',
        physicalState: 'Solide'
      },
      {
        cas: '100-97-0',
        name: 'Hexaméthylènetétramine',
        vlep: 5,
        mentions: ['H228', 'H317'],
        vaporPressure: 0,
        category: 'Agents de réticulation',
        physicalState: 'Solide'
      },
      {
        cas: '822-06-0',
        name: 'Diisocyanate d\'hexaméthylène',
        vlep: 0.034,
        mentions: ['H315', 'H317', 'H319', 'H331', 'H334', 'H335'],
        vaporPressure: 0.7,
        category: 'Isocyanates',
        physicalState: 'Liquide'
      },
      {
        cas: '7789-21-1',
        name: 'Eau oxygénée 90%',
        vlep: 1,
        mentions: ['H271', 'H332', 'H314', 'H335'],
        vaporPressure: 0.2,
        category: 'Oxydants',
        physicalState: 'Liquide'
      },
      {
        cas: '124-04-7',
        name: 'Acide adipique',
        vlep: 5,
        mentions: ['H319'],
        vaporPressure: 0.097,
        category: 'Acides organiques',
        physicalState: 'Solide'
      },
      {
        cas: '60-00-4',
        name: 'EDTA',
        vlep: 1,
        mentions: ['H319'],
        vaporPressure: 0,
        category: 'Agents complexants',
        physicalState: 'Solide'
      },
      {
        cas: '25322-68-3',
        name: 'PEG-400',
        vlep: 10,
        mentions: ['H319'],
        vaporPressure: 0.0001,
        category: 'Polymères',
        physicalState: 'Liquide'
      },
      {
        cas: '1310-66-3',
        name: 'Hydroxyde de lithium monohydrate',
        vlep: 1,
        mentions: ['H302', 'H314'],
        vaporPressure: 0,
        category: 'Bases',
        physicalState: 'Solide'
      },
      {
        cas: '75-97-8',
        name: 'Pinacolone',
        vlep: 25,
        mentions: ['H225', 'H319', 'H335'],
        vaporPressure: 35.5,
        category: 'Cétones',
        physicalState: 'Liquide'
      },
      {
        cas: '7757-79-1',
        name: 'Nitrate de potassium',
        vlep: 5,
        mentions: ['H272'],
        vaporPressure: 0,
        category: 'Sels inorganiques',
        physicalState: 'Solide'
      },
      {
        cas: '108-78-1',
        name: 'Mélamine',
        vlep: 3,
        mentions: ['H373'],
        vaporPressure: 0,
        category: 'Agents de réticulation',
        physicalState: 'Solide'
      },
      {
        cas: '7785-87-7',
        name: 'Sulfate de manganèse',
        vlep: 0.2,
        mentions: ['H373', 'H411'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide'
      },
      {
        cas: '107-98-2',
        name: '1-Méthoxy-2-propanol',
        vlep: 100,
        mentions: ['H226', 'H336'],
        vaporPressure: 12,
        category: 'Éthers de glycol',
        physicalState: 'Liquide'
      },
      {
        cas: '7727-54-0',
        name: 'Persulfate d\'ammonium',
        vlep: 0.1,
        mentions: ['H272', 'H302', 'H315', 'H317', 'H319', 'H334', 'H335'],
        vaporPressure: 0,
        category: 'Initiateurs',
        physicalState: 'Solide'
      },
      {
        cas: '6834-92-0',
        name: 'Métasilicate de sodium',
        vlep: 3,
        mentions: ['H314', 'H335'],
        vaporPressure: 0,
        category: 'Bases',
        physicalState: 'Solide'
      },
      {
        cas: '1310-62-7',
        name: 'Borohydrure de sodium',
        vlep: 1,
        mentions: ['H260', 'H301', 'H314'],
        vaporPressure: 0,
        category: 'Réducteurs',
        physicalState: 'Solide'
      },
      {
        cas: '7784-27-2',
        name: 'Nitrate d\'aluminium',
        vlep: 2,
        mentions: ['H272', 'H314'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide'
      },
      {
        cas: '75-28-5',
        name: 'Isobutane',
        vlep: 800,
        mentions: ['H220', 'H280'],
        vaporPressure: 3000,
        category: 'Gaz comprimés',
        physicalState: 'Gaz'
      },
      {
        cas: '554-13-2',
        name: 'Carbonate de lithium',
        vlep: 0.075,
        mentions: ['H302', 'H319'],
        vaporPressure: 0,
        category: 'Composants batteries',
        physicalState: 'Solide'
      },
      {
        cas: '1313-13-9',
        name: 'Dioxyde de manganèse',
        vlep: 0.2,
        mentions: ['H302', 'H332'],
        vaporPressure: 0,
        category: 'Composants batteries',
        physicalState: 'Solide'
      },
      {
        cas: '7439-93-2',
        name: 'Lithium métallique',
        vlep: 0.025,
        mentions: ['H260', 'H314', 'H412'],
        vaporPressure: 0,
        category: 'Composants batteries',
        physicalState: 'Solide'
      },
      {
        cas: '110-63-4',
        name: '1,4-Butanediol',
        vlep: 50,
        mentions: ['H302', 'H336'],
        vaporPressure: 0.015,
        category: 'Monomères',
        physicalState: 'Liquide'
      },
      {
        cas: '110-98-5',
        name: 'Dipropylène glycol',
        vlep: 100,
        mentions: ['H319'],
        vaporPressure: 0.0003,
        category: 'Monomères',
        physicalState: 'Liquide'
      },
      {
        cas: '96-48-0',
        name: 'γ-Butyrolactone',
        vlep: 50,
        mentions: ['H302', 'H336'],
        vaporPressure: 0.15,
        category: 'Solvants batteries',
        physicalState: 'Liquide'
      },
      {
        cas: '7440-23-5',
        name: 'Sodium métallique',
        vlep: 2,
        mentions: ['H260', 'H314'],
        vaporPressure: 0,
        category: 'Réducteurs',
        physicalState: 'Solide'
      },
      {
        cas: '1310-32-3',
        name: 'Hydrure de lithium',
        vlep: 0.025,
        mentions: ['H260', 'H314'],
        vaporPressure: 0,
        category: 'Réducteurs',
        physicalState: 'Solide'
      },
      {
        cas: '1318-23-6',
        name: 'Boehmite',
        vlep: 1,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Charges',
        physicalState: 'Solide'
      },
      {
        cas: '7733-02-0',
        name: 'Sulfate de zinc',
        vlep: 1,
        mentions: ['H302', 'H318', 'H410'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '10043-35-3',
        name: 'Acide borique',
        vlep: 2,
        mentions: ['H360FD'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7439-96-5',
        name: 'Manganèse métallique',
        vlep: 0.2,
        mentions: ['H228', 'H373'],
        vaporPressure: 0,
        category: 'Composants batteries',
        physicalState: 'Solide'
      },
      {
        cas: '7782-49-2',
        name: 'Sélénium',
        vlep: 0.2,
        mentions: ['H301', 'H331', 'H373', 'H413'],
        vaporPressure: 0,
        category: 'Semi-conducteurs',
        physicalState: 'Solide'
      },
      {
        cas: '1333-82-0',
        name: 'Trioxyde de chrome',
        vlep: 0.05,
        mentions: ['H271', 'H301', 'H311', 'H314', 'H317', 'H330', 'H334', 'H340', 'H350', 'H361f', 'H372', 'H410'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '110-49-6',
        name: 'Acétate de 2-méthoxyéthyle',
        vlep: 5,
        mentions: ['H226', 'H302', 'H312', 'H332', 'H360FD'],
        vaporPressure: 9,
        category: 'Solvants polymères',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7783-20-2',
        name: 'Sulfate d\'ammonium',
        vlep: 10,
        mentions: ['H319'],
        vaporPressure: 0,
        category: 'Agents dopage',
        physicalState: 'Solide'
      },
      {
        cas: '13463-40-6',
        name: 'Pentacarbonyle de fer',
        vlep: 0.1,
        mentions: ['H225', 'H330', 'H400'],
        vaporPressure: 30,
        category: 'Précurseurs',
        physicalState: 'Liquide'
      },
      {
        cas: '7803-62-5',
        name: 'Silane',
        vlep: 5,
        mentions: ['H220', 'H400'],
        vaporPressure: 300,
        category: 'Précurseurs',
        physicalState: 'Gaz'
      },
      {
        cas: '10545-99-0',
        name: 'Dichlorure de soufre',
        vlep: 1,
        mentions: ['H301', 'H314', 'H330', 'H335'],
        vaporPressure: 75,
        category: 'Agents de sulfuration',
        physicalState: 'Liquide'
      },
      {
        cas: '7783-61-1',
        name: 'Tétrafluorure de silicium',
        vlep: 0.1,
        mentions: ['H280', 'H314', 'H318', 'H330'],
        vaporPressure: 320,
        category: 'Dopants',
        physicalState: 'Gaz'
      },
      {
        cas: '7697-91-2',
        name: 'Cobalt(III) nitrate',
        vlep: 0.02,
        mentions: ['H272', 'H302', 'H317', 'H334', 'H341', 'H350i', 'H360F', 'H410'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7440-31-5',
        name: 'Étain métallique',
        vlep: 2,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Composants batteries',
        physicalState: 'Solide'
      },
      {
        cas: '7783-66-6',
        name: 'Tétraiodure d\'étain',
        vlep: 0.1,
        mentions: ['H314', 'H341', 'H372'],
        vaporPressure: 0,
        category: 'Dopants',
        physicalState: 'Solide'
      },
      {
        cas: '65-85-0',
        name: 'Acide benzoïque',
        vlep: 5,
        mentions: ['H315', 'H318', 'H372'],
        vaporPressure: 0.0009,
        category: 'Additifs polymères',
        physicalState: 'Solide'
      },
      {
        cas: '111-77-3',
        name: '2-(2-Méthoxyéthoxy)éthanol',
        vlep: 50.1,
        mentions: ['H361d'],
        vaporPressure: 0.2,
        category: 'Solvants polymères',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7758-02-3',
        name: 'Bromure de potassium',
        vlep: 10,
        mentions: ['H319'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '1303-96-4',
        name: 'Tétraborate de sodium décahydraté',
        vlep: 1,
        mentions: ['H319', 'H360FD'],
        vaporPressure: 0,
        category: 'Agents de flux',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7789-38-0',
        name: 'Bromate de sodium',
        vlep: 0.1,
        mentions: ['H271', 'H301', 'H350', 'H400'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7637-07-2',
        name: 'Trifluorure de bore',
        vlep: 1,
        mentions: ['H330', 'H314'],
        vaporPressure: 200,
        category: 'Dopants',
        physicalState: 'Gaz'
      },
      {
        cas: '109-87-5',
        name: 'Diméthoxyméthane',
        vlep: 1000,
        mentions: ['H225', 'H336'],
        vaporPressure: 440,
        category: 'Solvants batteries',
        physicalState: 'Liquide'
      },
      {
        cas: '7784-18-1',
        name: 'Trifluorure d\'aluminium',
        vlep: 2.5,
        mentions: ['H314', 'H318'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7803-49-8',
        name: 'Hydroxylamine',
        vlep: 1,
        mentions: ['H290', 'H302', 'H312', 'H315', 'H317', 'H319', 'H351', 'H373', 'H400'],
        vaporPressure: 0.1,
        category: 'Réducteurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '108-80-5',
        name: 'Acide cyanurique',
        vlep: 5,
        mentions: ['H319'],
        vaporPressure: 0,
        category: 'Agents de réticulation',
        physicalState: 'Solide'
      },
      {
        cas: '7681-55-2',
        name: 'Periodate de sodium',
        vlep: 0.1,
        mentions: ['H271', 'H302', 'H372'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide'
      },
      {
        cas: '7783-70-2',
        name: 'Pentafluorure d\'antimoine',
        vlep: 0.1,
        mentions: ['H300', 'H314', 'H330'],
        vaporPressure: 400,
        category: 'Catalyseurs',
        physicalState: 'Liquide'
      },
      {
        cas: '75-79-6',
        name: 'Méthyltrichlorosilane',
        vlep: 5,
        mentions: ['H225', 'H314', 'H335'],
        vaporPressure: 150,
        category: 'Agents de silanisation',
        physicalState: 'Liquide'
      },
      {
        cas: '7758-01-2',
        name: 'Bromate de potassium',
        vlep: 0.1,
        mentions: ['H271', 'H301', 'H350'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7790-94-5',
        name: 'Acide chlorosulfonique',
        vlep: 1,
        mentions: ['H314', 'H335'],
        vaporPressure: 1,
        category: 'Agents de sulfonation',
        physicalState: 'Liquide'
      },
      {
        cas: '1333-74-0',
        name: 'Hydrogène (comprimé)',
        vlep: 1000,
        mentions: ['H220', 'H280'],
        vaporPressure: 0,
        category: 'Gaz réducteurs',
        physicalState: 'Gaz'
      },
      {
        cas: '75-73-0',
        name: 'Tétrafluorure de carbone',
        vlep: 2,
        mentions: ['H280', 'H420'],
        vaporPressure: 3700,
        category: 'Gaz de gravure',
        physicalState: 'Gaz'
      },
      {
        cas: '7439-92-1',
        name: 'Plomb (nanoparticules)',
        vlep: 0.1,
        mentions: ['H360FD', 'H362', 'H372', 'H410'],
        vaporPressure: 0,
        category: 'Composants batteries',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7446-11-9',
        name: 'Trioxyde de soufre',
        vlep: 0.05,
        mentions: ['H314', 'H330'],
        vaporPressure: 433,
        category: 'Agents de sulfonation',
        physicalState: 'Liquide'
      },
      {
        cas: '7784-42-1',
        name: 'Arsine',
        vlep: 0.005,
        mentions: ['H220', 'H330', 'H373', 'H400'],
        vaporPressure: 15000,
        category: 'Dopants',
        physicalState: 'Gaz'
      },
      {
        cas: '7726-95-6',
        name: 'Brome liquide',
        vlep: 0.1,
        mentions: ['H330', 'H314', 'H400'],
        vaporPressure: 23,
        category: 'Halogènes',
        physicalState: 'Liquide'
      },
      {
        cas: '7664-39-3',
        name: 'Acide fluorhydrique',
        vlep: 1.8,
        mentions: ['H300', 'H310', 'H314', 'H330'],
        vaporPressure: 103,
        category: 'Agents de gravure',
        physicalState: 'Liquide'
      },
      {
        cas: '7790-91-2',
        name: 'Trifluorure de chlore',
        vlep: 0.1,
        mentions: ['H270', 'H314', 'H330', 'H373'],
        vaporPressure: 1200,
        category: 'Agents de gravure',
        physicalState: 'Gaz'
      },
      {
        cas: '1313-99-1',
        name: 'Oxyde de nickel',
        vlep: 0.1,
        mentions: ['H317', 'H350i', 'H372', 'H413'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7440-67-7',
        name: 'Zirconium (poudre)',
        vlep: 5,
        mentions: ['H250', 'H260'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '98-88-4',
        name: 'Chlorure de benzoyle',
        vlep: 0.5,
        mentions: ['H314', 'H332'],
        vaporPressure: 1.2,
        category: 'Agents d\'acylation',
        physicalState: 'Liquide'
      },
      {
        cas: '7789-33-5',
        name: 'Iodure de lithium',
        vlep: 1,
        mentions: ['H302', 'H315', 'H319'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7783-53-1',
        name: 'Trifluorure de scandium',
        vlep: 0.1,
        mentions: ['H314', 'H331'],
        vaporPressure: 0,
        category: 'Dopants',
        physicalState: 'Solide'
      },
      {
        cas: '7791-25-5',
        name: 'Chlorure de thionyle',
        vlep: 1,
        mentions: ['H314', 'H330', 'H372'],
        vaporPressure: 127,
        category: 'Agents de chloration',
        physicalState: 'Liquide'
      },
      {
        cas: '110-71-4',
        name: '1,2-Diméthoxyéthane',
        vlep: 10,
        mentions: ['H225', 'H360FD'],
        vaporPressure: 70,
        category: 'Solvants batteries',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7440-36-0',
        name: 'Antimoine (poudre)',
        vlep: 0.5,
        mentions: ['H317', 'H373', 'H411'],
        vaporPressure: 0,
        category: 'Dopants',
        physicalState: 'Solide'
      },
      {
        cas: '7718-54-9',
        name: 'Chlorure de nickel (II)',
        vlep: 0.1,
        mentions: ['H301', 'H331', 'H315', 'H317', 'H334', 'H341', 'H350i', 'H360D', 'H372', 'H410'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7784-34-1',
        name: 'Trichlorure d\'arsenic',
        vlep: 0.2,
        mentions: ['H301', 'H314', 'H331', 'H373', 'H410'],
        vaporPressure: 10,
        category: 'Dopants',
        physicalState: 'Liquide'
      },
      {
        cas: '7440-66-6',
        name: 'Zinc (poudre)',
        vlep: 10,
        mentions: ['H250', 'H260', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '7785-23-1',
        name: 'Bromure d\'argent',
        vlep: 0.01,
        mentions: ['H400', 'H410'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7803-57-8',
        name: 'Hydrazine monohydrate',
        vlep: 0.013,
        mentions: ['H301', 'H311', 'H314', 'H317', 'H331', 'H350', 'H400', 'H410'],
        vaporPressure: 14.4,
        category: 'Réducteurs',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7580-67-8',
        name: 'Hydrure de lithium',
        vlep: 0.025,
        mentions: ['H260', 'H314'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '109-69-3',
        name: '1-Chlorobutane',
        vlep: 50,
        mentions: ['H225', 'H332', 'H412'],
        vaporPressure: 100,
        category: 'Solvants polymères',
        physicalState: 'Liquide'
      },
      {
        cas: '7783-60-0',
        name: 'Tétrafluorure de soufre',
        vlep: 0.1,
        mentions: ['H280', 'H300', 'H314', 'H330'],
        vaporPressure: 1670,
        category: 'Agents de fluoration',
        physicalState: 'Gaz'
      },
      {
        cas: '7782-79-8',
        name: 'Azoture d\'hydrogène',
        vlep: 0.1,
        mentions: ['H300', 'H400'],
        vaporPressure: 1150,
        category: 'Réactifs de synthèse',
        physicalState: 'Liquide'
      },
      {
        cas: '7787-71-5',
        name: 'Tribromure de bore',
        vlep: 1,
        mentions: ['H300', 'H314', 'H330'],
        vaporPressure: 133,
        category: 'Dopants',
        physicalState: 'Liquide'
      },
      {
        cas: '7784-45-4',
        name: 'Triiodure de bore',
        vlep: 0.1,
        mentions: ['H314', 'H330'],
        vaporPressure: 40,
        category: 'Dopants',
        physicalState: 'Solide'
      },
      {
        cas: '7783-64-4',
        name: 'Tétrafluorure de hafnium',
        vlep: 0.2,
        mentions: ['H314', 'H330'],
        vaporPressure: 0,
        category: 'Précurseurs',
        physicalState: 'Solide'
      },
      {
        cas: '7789-23-3',
        name: 'Fluorure de potassium',
        vlep: 2.5,
        mentions: ['H301', 'H319'],
        vaporPressure: 0,
        category: 'Agents de fluoration',
        physicalState: 'Solide'
      },
      {
        cas: '7789-29-9',
        name: 'Bifluorure de potassium',
        vlep: 2.5,
        mentions: ['H301', 'H314'],
        vaporPressure: 0,
        category: 'Agents de fluoration',
        physicalState: 'Solide'
      },
      {
        cas: '13768-60-0',
        name: 'Chlorure de lithium anhydre',
        vlep: 1,
        mentions: ['H302', 'H315', 'H319'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7783-33-7',
        name: 'Tétrachloroaurate de potassium',
        vlep: 0.1,
        mentions: ['H314', 'H317'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '7786-30-3',
        name: 'Chlorure de magnésium anhydre',
        vlep: 5,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7439-95-4',
        name: 'Magnésium (poudre)',
        vlep: 10,
        mentions: ['H250', 'H260', 'H228'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '7440-70-2',
        name: 'Calcium métallique',
        vlep: 2,
        mentions: ['H250', 'H260', 'H314'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '1333-86-4',
        name: 'Noir de carbone (nanopoudre)',
        vlep: 3.5,
        mentions: ['H351'],
        vaporPressure: 0,
        category: 'Additifs conducteurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7440-21-3',
        name: 'Silicium (poudre)',
        vlep: 10,
        mentions: ['H228'],
        vaporPressure: 0,
        category: 'Semi-conducteurs',
        physicalState: 'Solide'
      },
      {
        cas: '7782-42-5',
        name: 'Graphite (nanopoudre)',
        vlep: 2,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '12057-17-9',
        name: 'Oxyde de lithium manganèse',
        vlep: 0.2,
        mentions: ['H302', 'H332'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '182442-95-1',
        name: 'Phosphate de fer lithié',
        vlep: 1,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '7790-86-5',
        name: 'Chlorure de cérium',
        vlep: 1,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '7440-65-5',
        name: 'Yttrium (poudre)',
        vlep: 1,
        mentions: ['H228', 'H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Dopants',
        physicalState: 'Solide'
      },
      {
        cas: '112945-52-5',
        name: 'Silice pyrogénée',
        vlep: 4,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Additifs rhéologiques',
        physicalState: 'Solide'
      },
      {
        cas: '7429-90-5',
        name: 'Aluminium (nanopoudre)',
        vlep: 5,
        mentions: ['H228', 'H261'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '7440-50-8',
        name: 'Cuivre (nanopoudre)',
        vlep: 0.2,
        mentions: ['H400', 'H410'],
        vaporPressure: 0,
        category: 'Conducteurs électriques',
        physicalState: 'Solide'
      },
      {
        cas: '7697-37-2',
        name: 'Acide nitrique fumant',
        vlep: 2.6,
        mentions: ['H272', 'H314', 'H331'],
        vaporPressure: 48,
        category: 'Agents de gravure',
        physicalState: 'Liquide'
      },
      {
        cas: '143-33-9',
        name: 'Cyanure de sodium',
        vlep: 5,
        mentions: ['H300', 'H310', 'H330', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Agents de complexation',
        physicalState: 'Solide'
      },
      {
        cas: '7803-55-6',
        name: 'Vanadate d\'ammonium',
        vlep: 0.05,
        mentions: ['H301', 'H330', 'H373', 'H411'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '7789-24-4',
        name: 'Fluorure de lithium',
        vlep: 2.5,
        mentions: ['H301', 'H315', 'H319'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7803-49-8',
        name: 'Hydroxylamine',
        vlep: 1,
        mentions: ['H290', 'H302', 'H312', 'H315', 'H317', 'H319', 'H351', 'H373', 'H400'],
        vaporPressure: 0.1,
        category: 'Réducteurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '10043-01-3',
        name: 'Sulfate d\'aluminium',
        vlep: 2,
        mentions: ['H318'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7722-64-7',
        name: 'Permanganate de potassium',
        vlep: 0.2,
        mentions: ['H272', 'H302', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide'
      },
      {
        cas: '7632-00-0',
        name: 'Nitrite de sodium',
        vlep: 5,
        mentions: ['H272', 'H301', 'H400'],
        vaporPressure: 0,
        category: 'Agents de nitrosation',
        physicalState: 'Solide'
      },
      {
        cas: '7783-70-2',
        name: 'Pentafluorure d\'antimoine',
        vlep: 0.1,
        mentions: ['H300', 'H314', 'H330'],
        vaporPressure: 400,
        category: 'Catalyseurs',
        physicalState: 'Liquide'
      },
      {
        cas: '7440-42-8',
        name: 'Bore amorphe',
        vlep: 10,
        mentions: ['H228'],
        vaporPressure: 0,
        category: 'Dopants',
        physicalState: 'Solide'
      },
      {
        cas: '7646-78-8',
        name: 'Tétrachlorure d\'étain',
        vlep: 2,
        mentions: ['H314', 'H332', 'H372', 'H411'],
        vaporPressure: 2.1,
        category: 'Précurseurs',
        physicalState: 'Liquide'
      },
      {
        cas: '7785-70-8',
        name: 'α-Pinène',
        vlep: 20,
        mentions: ['H226', 'H304', 'H315', 'H317', 'H400', 'H410'],
        vaporPressure: 4.75,
        category: 'Solvants verts',
        physicalState: 'Liquide'
      },
      {
        cas: '111-96-6',
        name: 'Diéthylène glycol diméthyl éther',
        vlep: 10,
        mentions: ['H226', 'H360FD'],
        vaporPressure: 0.6,
        category: 'Solvants batteries',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7550-35-8',
        name: 'Bromure de lithium',
        vlep: 1,
        mentions: ['H314'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '1633-05-2',
        name: 'Carbonate de strontium',
        vlep: 10,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '7439-88-5',
        name: 'Iridium (poudre)',
        vlep: 1,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '7789-00-6',
        name: 'Chromate de potassium',
        vlep: 0.05,
        mentions: ['H340', 'H350i', 'H315', 'H317', 'H319', 'H335', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7803-58-9',
        name: 'Sulfamate d\'ammonium',
        vlep: 10,
        mentions: ['H302'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '7787-32-8',
        name: 'Fluorure de baryum',
        vlep: 0.5,
        mentions: ['H301', 'H332'],
        vaporPressure: 0,
        category: 'Agents de fluoration',
        physicalState: 'Solide'
      },
      {
        cas: '7803-63-6',
        name: 'Sulfate d\'hydrazinium',
        vlep: 0.013,
        mentions: ['H301', 'H311', 'H314', 'H317', 'H331', 'H350', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Réducteurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7757-93-9',
        name: 'Hydrogénophosphate de calcium',
        vlep: 10,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Précurseurs',
        physicalState: 'Solide'
      },
      {
        cas: '1344-28-1',
        name: 'Alumine activée',
        vlep: 10,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Supports catalytiques',
        physicalState: 'Solide'
      },
      {
        cas: '13463-67-7',
        name: 'Dioxyde de titane (P25)',
        vlep: 10,
        mentions: ['H351'],
        vaporPressure: 0,
        category: 'Photocatalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7440-33-7',
        name: 'Tungstène (poudre)',
        vlep: 5,
        mentions: ['H228'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '12136-45-7',
        name: 'Superoxyde de potassium',
        vlep: 2,
        mentions: ['H271', 'H314'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide'
      },
      {
        cas: '7440-25-7',
        name: 'Tantale (poudre)',
        vlep: 5,
        mentions: ['H228'],
        vaporPressure: 0,
        category: 'Matériaux batteries',
        physicalState: 'Solide'
      },
      {
        cas: '1313-82-2',
        name: 'Sulfure de sodium',
        vlep: 1,
        mentions: ['H290', 'H314', 'H400'],
        vaporPressure: 0,
        category: 'Agents de sulfuration',
        physicalState: 'Solide'
      },
      {
        cas: '7790-98-9',
        name: 'Perchlorate d\'ammonium',
        vlep: 1,
        mentions: ['H271', 'H302', 'H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide'
      },
      {
        cas: '7782-89-0',
        name: 'Amidure de lithium',
        vlep: 1,
        mentions: ['H260', 'H314'],
        vaporPressure: 0,
        category: 'Réactifs organométalliques',
        physicalState: 'Solide'
      },
      {
        cas: '7440-45-1',
        name: 'Cérium (poudre)',
        vlep: 2,
        mentions: ['H228', 'H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Terres rares',
        physicalState: 'Solide'
      },
      {
        cas: '7439-91-0',
        name: 'Lanthane (poudre)',
        vlep: 1,
        mentions: ['H228', 'H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Terres rares',
        physicalState: 'Solide'
      },
      {
        cas: '75-52-5',
        name: 'Nitrométhane',
        vlep: 20,
        mentions: ['H226', 'H302', 'H332', 'H351'],
        vaporPressure: 36,
        category: 'Solvants',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '79-06-1',
        name: 'Acrylamide',
        vlep: 0.03,
        mentions: ['H301', 'H312', 'H315', 'H317', 'H319', 'H332', 'H340', 'H350', 'H361f', 'H372'],
        vaporPressure: 0.007,
        category: 'Monomères',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '302-01-2',
        name: 'Hydrazine',
        vlep: 0.013,
        mentions: ['H301', 'H311', 'H314', 'H317', 'H331', 'H350', 'H400', 'H410'],
        vaporPressure: 14.4,
        category: 'Réducteurs',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '10043-92-2',
        name: 'Radon',
        vlep: 0.1,
        mentions: ['H330', 'H350'],
        vaporPressure: 0,
        category: 'Radioactifs',
        physicalState: 'Gaz',
        cmr: true
      },
      {
        cas: '62-75-9',
        name: 'N-Nitrosodiméthylamine',
        vlep: 0.001,
        mentions: ['H301', 'H311', 'H331', 'H350', 'H370', 'H372'],
        vaporPressure: 2.7,
        category: 'Cancérogènes',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '593-70-4',
        name: 'Chlorofluorométhane',
        vlep: 10,
        mentions: ['H280', 'H351', 'H412'],
        vaporPressure: 4350,
        category: 'Réfrigérants',
        physicalState: 'Gaz',
        cmr: true
      },
      {
        cas: '7789-00-6',
        name: 'Chromate de potassium',
        vlep: 0.05,
        mentions: ['H340', 'H350i', 'H315', 'H317', 'H319', 'H335', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide',
        cmr: true
      },
      {
        // Produits quotidiens mais dangereux
        cas: '67-56-1',
        name: 'Méthanol (grade HPLC)',
        vlep: 200,
        mentions: ['H225', 'H301', 'H311', 'H331', 'H370'],
        vaporPressure: 128,
        category: 'Solvants analytiques',
        physicalState: 'Liquide'
      },
      {
        cas: '7722-84-1',
        name: 'Peroxyde d\'hydrogène 90%',
        vlep: 1,
        mentions: ['H271', 'H302', 'H314', 'H332'],
        vaporPressure: 3,
        category: 'Oxydants',
        physicalState: 'Liquide'
      },
      {
        cas: '7601-90-3',
        name: 'Acide perchlorique 70%',
        vlep: 0.1,
        mentions: ['H271', 'H314', 'H332'],
        vaporPressure: 6.8,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {  
        cas: '7664-93-9',
        name: 'Acide sulfurique fumant',
        vlep: 0.05,
        mentions: ['H314', 'H335', 'H330'],
        vaporPressure: 0.001,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        // Réactifs sensibilisants peu utilisés
        cas: '593-60-2',
        name: 'Bromure de vinyle',
        vlep: 5,
        mentions: ['H220', 'H350', 'H400'],
        vaporPressure: 1420,
        category: 'Monomères',
        physicalState: 'Gaz',
        cmr: true
      },
      {
        cas: '542-88-1',
        name: 'Éther bis(chlorométhylique)',
        vlep: 0.001,
        mentions: ['H225', 'H302', 'H311', 'H330', 'H350'],
        vaporPressure: 30,
        category: 'Cancérogènes',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '106-89-8',
        name: 'Épichlorhydrine',
        vlep: 1.9,
        mentions: ['H226', 'H301', 'H311', 'H314', 'H317', 'H331', 'H350'],
        vaporPressure: 16,
        category: 'Époxydes',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        // Catalyseurs spéciaux
        cas: '7646-79-9',
        name: 'Chlorure de cobalt(II)',
        vlep: 0.02,
        mentions: ['H302', 'H317', 'H334', 'H341', 'H350i', 'H360F', 'H410'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '10108-64-2',
        name: 'Chlorure de cadmium',
        vlep: 0.004,
        mentions: ['H301', 'H330', 'H340', 'H350', 'H360FD', 'H372', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Dopants',
        physicalState: 'Solide',
        cmr: true
      },
      {
        // Gaz toxiques
        cas: '7784-42-1',
        name: 'Arsine',
        vlep: 0.005,
        mentions: ['H220', 'H330', 'H373', 'H400'],
        vaporPressure: 15000,
        category: 'Dopants',
        physicalState: 'Gaz'
      },
      {
        cas: '19287-45-7',
        name: 'Diborane',
        vlep: 0.1,
        mentions: ['H220', 'H330', 'H400'],
        vaporPressure: 34450,
        category: 'Dopants',
        physicalState: 'Gaz'
      },
      {
        // Métaux lourds
        cas: '7758-97-6',
        name: 'Chromate de plomb',
        vlep: 0.05,
        mentions: ['H350', 'H360Df', 'H373', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Pigments',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7487-94-7',
        name: 'Chlorure de mercure(II)',
        vlep: 0.02,
        mentions: ['H300', 'H314', 'H341', 'H361f', 'H372', 'H400', 'H410'],
        vaporPressure: 0.0001,
        category: 'Réactifs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        // Composés instables
        cas: '75-91-2',
        name: 'Hydroperoxyde de tert-butyle',
        vlep: 0.1,
        mentions: ['H242', 'H302', 'H311', 'H314', 'H331', 'H373'],
        vaporPressure: 0.3,
        category: 'Initiateurs',
        physicalState: 'Liquide'
      },
      {
        cas: '614-45-9',
        name: 'Perbenzoate de tert-butyle',
        vlep: 5,
        mentions: ['H242', 'H317', 'H373', 'H411'],
        vaporPressure: 0.0027,
        category: 'Initiateurs',
        physicalState: 'Liquide'
      },
      {
        // Précurseurs explosifs
        cas: '7722-64-7',
        name: 'Permanganate de potassium',
        vlep: 0.2,
        mentions: ['H272', 'H302', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide'
      },
      {
        cas: '7601-89-0',
        name: 'Perchlorate de sodium',
        vlep: 0.1,
        mentions: ['H271', 'H302', 'H319'],
        vaporPressure: 0,
        category: 'Oxydants',
        physicalState: 'Solide'
      },
      {
        // Acides concentrés
        cas: '7697-37-2',
        name: 'Acide nitrique fumant',
        vlep: 2.6,
        mentions: ['H272', 'H314', 'H331'],
        vaporPressure: 48,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        cas: '7664-39-3',
        name: 'Acide fluorhydrique 70%',
        vlep: 1.8,
        mentions: ['H300', 'H310', 'H314', 'H330'],
        vaporPressure: 103,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        // Composés hautement réactifs
        cas: '75-44-5',
        name: 'Phosgène',
        vlep: 0.08,
        mentions: ['H330', 'H314'],
        vaporPressure: 1215,
        category: 'Réactifs de synthèse',
        physicalState: 'Gaz'
      },
      {
        cas: '7550-45-0',
        name: 'Tétrachlorure de titane',
        vlep: 0.1,
        mentions: ['H314', 'H330', 'H335'],
        vaporPressure: 1.3,
        category: 'Précurseurs',
        physicalState: 'Liquide'
      },
      {
        // Solvants spéciaux
        cas: '106-94-5',
        name: '1-Bromopropane',
        vlep: 10,
        mentions: ['H225', 'H315', 'H319', 'H335', 'H360FD', 'H373'],
        vaporPressure: 146.5,
        category: 'Solvants',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '109-86-4',
        name: '2-Méthoxyéthanol',
        vlep: 5,
        mentions: ['H226', 'H302', 'H312', 'H332', 'H360FD'],
        vaporPressure: 10,
        category: 'Solvants',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        // Réactifs de laboratoire quotidiens mais dangereux
        cas: '67-66-3',
        name: 'Chloroforme stabilisé',
        vlep: 2,
        mentions: ['H302', 'H315', 'H351', 'H373'],
        vaporPressure: 211,
        category: 'Solvants analytiques',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '7664-42-1',
        name: 'Phosphine pure',
        vlep: 0.1,
        mentions: ['H220', 'H314', 'H330', 'H400'],
        vaporPressure: 34800,
        category: 'Dopants',
        physicalState: 'Gaz'
        },
        {
        cas: '7726-95-6',
        name: 'Brome liquide',
        vlep: 0.1,
        mentions: ['H330', 'H314', 'H400'],
        vaporPressure: 23,
        category: 'Halogènes',
        physicalState: 'Liquide'
        },
        {
        cas: '7550-35-8',
        name: 'Bromure de lithium anhydre',
        vlep: 1,
        mentions: ['H314'],
        vaporPressure: 0,
        category: 'Desséchants',
        physicalState: 'Solide'
        },
        {
        cas: '10026-13-8',
        name: 'Pentachlorure de phosphore',
        vlep: 0.1,
        mentions: ['H300', 'H314', 'H330'],
        vaporPressure: 0.1,
        category: 'Agents de chloration',
        physicalState: 'Solide'
        },
        {
        cas: '2699-79-8',
        name: 'Fluorure de sulfuryle',
        vlep: 5,
        mentions: ['H331', 'H373', 'H420'],
        vaporPressure: 17900,
        category: 'Fumigants',
        physicalState: 'Gaz'
        },
        {
        cas: '56-23-5',
        name: 'Tétrachlorure de carbone',
        vlep: 3,
        mentions: ['H301', 'H311', 'H331', 'H351', 'H372', 'H420'],
        vaporPressure: 119.6,
        category: 'Solvants',
        physicalState: 'Liquide',
        cmr: true
        },
        {
        cas: '151-50-8',
        name: 'Cyanure de potassium',
        vlep: 5,
        mentions: ['H300', 'H310', 'H330', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Agents de cyanuration',
        physicalState: 'Solide'
        },
        {
        cas: '7789-59-5',
        name: 'Tribromure de bore',
        vlep: 1,
        mentions: ['H300', 'H314', 'H330'],
        vaporPressure: 133,
        category: 'Agents de bromation',
        physicalState: 'Liquide'
        },
        {
        cas: '7783-54-2',
        name: 'Trifluorure d\'azote',
        vlep: 10,
        mentions: ['H270', 'H280', 'H332', 'H373'],
        vaporPressure: 6000,
        category: 'Gaz de gravure',
        physicalState: 'Gaz'
        },
        {
        cas: '10025-78-2',
        name: 'Trichlorosilane',
        vlep: 5,
        mentions: ['H224', 'H314', 'H335', 'EUH014'],
        vaporPressure: 750,
        category: 'Précurseurs silicium',
        physicalState: 'Liquide'
        },
        {
          cas: '1132-61-2', 
          name: 'Acide 6-Maléimidohexanoïque',
          vlep: 0.1,
          mentions: ['H315', 'H317', 'H319', 'H334'],
          vaporPressure: 0.001,
          category: 'Agents de couplage',
          physicalState: 'Solide'
        },
        {
          cas: '100-66-3',
          name: 'Anisole',
          vlep: 50,
          mentions: ['H226', 'H302', 'H319'],
          vaporPressure: 3.7,
          category: 'Solvants éthérés',
          physicalState: 'Liquide'
        },
        {
          cas: '6192-52-5',
          name: 'APTS (Acide p-toluènesulfonique)',
          vlep: 5,
          mentions: ['H314'],
          vaporPressure: 0,
          category: 'Acides',
          physicalState: 'Solide'
        },
        {
          cas: '13676-54-5',
          name: 'Bismaléimide',
          vlep: 0.1,
          mentions: ['H315', 'H317', 'H319', 'H334'],
          vaporPressure: 0,
          category: 'Agents de réticulation',
          physicalState: 'Solide'
        },
        {
          cas: '1675-54-3',
          name: 'Bisphénol A diglycidyl éther',
          vlep: 0.1,
          mentions: ['H315', 'H317', 'H319', 'H411'],
          vaporPressure: 0.000004,
          category: 'Résines époxy',
          physicalState: 'Liquide'
        },
        {
          cas: '110-69-0',
          name: 'Butanone oxime',
          vlep: 10,
          mentions: ['H312', 'H318', 'H351'],
          vaporPressure: 1.3,
          category: 'Additifs',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '156-62-7',
          name: 'Cystamine',
          vlep: 1,
          mentions: ['H301', 'H314', 'H317'],
          vaporPressure: 0.1,
          category: 'Agents de réticulation',
          physicalState: 'Solide'
        },
        {
          cas: '123-42-2',
          name: 'Dibutylétin dilaurate',
          vlep: 50,
          mentions: ['H302', 'H315', 'H319', 'H361', 'H372', 'H410'],
          vaporPressure: 0.0015,
          category: 'Catalyseurs',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '75-09-2',
          name: 'Dichlorométhane',
          vlep: 50,
          mentions: ['H351', 'H336'],
          vaporPressure: 470,
          category: 'Solvants chlorés',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '98-00-0',
          name: 'Furfurylamine',
          vlep: 10,
          mentions: ['H302', 'H312', 'H319', 'H332', 'H335', 'H351'],
          vaporPressure: 1.3,
          category: 'Amines',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '920-66-1',
          name: 'HFIP (Hexafluoroisopropanol)',
          vlep: 5,
          mentions: ['H301', 'H314', 'H332'],
          vaporPressure: 158,
          category: 'Solvants fluorés',
          physicalState: 'Liquide'
        },
        {
          cas: '101-77-9',
          name: 'MDI (4,4\'-Méthylènedianiline)',
          vlep: 0.01,
          mentions: ['H350', 'H341', 'H373', 'H411'],
          vaporPressure: 0.01,
          category: 'Amines aromatiques',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '82667-45-6',
          name: 'Methyl butylimidazolium chloride',
          vlep: 1,
          mentions: ['H302', 'H314', 'H412'],
          vaporPressure: 0.001,
          category: 'Liquides ioniques',
          physicalState: 'Liquide'
        },
        {
          cas: '102-71-6',
          name: 'Triéthanolamine',
          vlep: 5,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0.0006,
          category: 'Amines',
          physicalState: 'Liquide'
        },
        {
          cas: '7550-35-8',
          name: 'Bromure de lithium',
          vlep: 1,
          mentions: ['H314'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '75-15-0',
          name: 'Disulfure de carbone',
          vlep: 5,
          mentions: ['H225', 'H315', 'H319', 'H361fd', 'H372', 'H411'],
          vaporPressure: 400,
          category: 'Solvants',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '123-86-4',
          name: 'Acétate de n-butyle',
          vlep: 150,
          mentions: ['H226', 'H336'],
          vaporPressure: 15,
          category: 'Solvants',
          physicalState: 'Liquide'
        },
        {
          cas: '7440-62-2',
          name: 'Vanadium (poudre)',
          vlep: 0.05,
          mentions: ['H335', 'H341', 'H372', 'H411'],
          vaporPressure: 0,
          category: 'Métaux',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '1310-84-5',
          name: 'Hydroxyde de rubidium',
          vlep: 2,
          mentions: ['H314'],
          vaporPressure: 0,
          category: 'Bases',
          physicalState: 'Solide'
        },
        {
          cas: '7637-07-2',
          name: 'Trifluorure de bore',
          vlep: 1,
          mentions: ['H330', 'H314'],
          vaporPressure: 200,
          category: 'Dopants',
          physicalState: 'Gaz'
        },
        {
          cas: '75-44-5',
          name: 'Phosgène',
          vlep: 0.08,
          mentions: ['H330', 'H314'],
          vaporPressure: 1215,
          category: 'Agents de chloration',
          physicalState: 'Gaz'
        },
        {
          cas: '137-26-8',
          name: 'Thirame',
          vlep: 1,
          mentions: ['H302', 'H332', 'H373', 'H410'],
          vaporPressure: 0.0002,
          category: 'Pesticides',
          physicalState: 'Solide'
        },
        {
          cas: '75-74-1',
          name: 'Tétraméthylplomb',
          vlep: 0.05,
          mentions: ['H300', 'H310', 'H330', 'H373', 'H410'],
          vaporPressure: 18,
          category: 'Organométalliques',
          physicalState: 'Liquide'
        },
        {
          cas: '7789-30-2',
          name: 'Pentafluorure de brome',
          vlep: 0.1,
          mentions: ['H271', 'H314', 'H330'],
          vaporPressure: 344,
          category: 'Oxydants',
          physicalState: 'Gaz'
        },
        {
          cas: '7783-81-5',
          name: 'Hexafluorure d\'uranium',
          vlep: 0.2,
          mentions: ['H300', 'H310', 'H314', 'H330', 'H373'],
          vaporPressure: 115,
          category: 'Composés uranium',
          physicalState: 'Solide'
        },
        {
          cas: '7784-36-3',
          name: 'Trichlorure d\'aluminium',
          vlep: 2,
          mentions: ['H314', 'H335'],
          vaporPressure: 0.001,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '55-38-9',
          name: 'Fenthion',
          vlep: 0.2,
          mentions: ['H301', 'H311', 'H331', 'H373', 'H410'],
          vaporPressure: 0.00037,
          category: 'Pesticides',
          physicalState: 'Liquide'
        },
        {
          cas: '7784-35-2',
          name: 'Trichlorure d\'arsenic',
          vlep: 0.2,
          mentions: ['H301', 'H331', 'H373', 'H410'],
          vaporPressure: 10,
          category: 'Dopants',
          physicalState: 'Liquide'
        },
        {
          cas: '7789-25-5',
          name: 'Fluorure de nitrosyle',
          vlep: 0.5,
          mentions: ['H270', 'H314', 'H330'],
          vaporPressure: 2900,
          category: 'Agents de fluoration',
          physicalState: 'Gaz'
        },
        {
          cas: '7803-52-3',
          name: 'Stibine',
          vlep: 0.1,
          mentions: ['H220', 'H330', 'H373', 'H411'],
          vaporPressure: 2900,
          category: 'Dopants',
          physicalState: 'Gaz'
        },
        {
          cas: '7783-80-4',
          name: 'Tétrafluorure de tellure',
          vlep: 0.1,
          mentions: ['H300', 'H310', 'H314', 'H330'],
          vaporPressure: 400,
          category: 'Dopants',
          physicalState: 'Gaz'
        },
        {
          cas: '7784-41-0',
          name: 'Arséniate de potassium',
          vlep: 0.01,
          mentions: ['H300', 'H350', 'H410'],
          vaporPressure: 0,
          category: 'Dopants',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7790-91-2',
          name: 'Trifluorure de chlore',
          vlep: 0.1,
          mentions: ['H270', 'H314', 'H330'],
          vaporPressure: 1200,
          category: 'Agents de fluoration',
          physicalState: 'Gaz'
        },
        {
          cas: '7784-46-5',
          name: 'Arsenite de sodium',
          vlep: 0.01,
          mentions: ['H300', 'H410', 'H350'],
          vaporPressure: 0,
          category: 'Dopants',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '1344-37-2',
          name: 'Jaune de sulfochromate de plomb',
          vlep: 0.05,
          mentions: ['H350', 'H360Df', 'H373', 'H410'],
          vaporPressure: 0,
          category: 'Pigments',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '12656-85-8',
          name: 'Rouge de chromate de plomb',
          vlep: 0.05,
          mentions: ['H350', 'H360Df', 'H373', 'H410'],
          vaporPressure: 0,
          category: 'Pigments',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '78-87-5',
          name: '1,2-Dichloropropane',
          vlep: 75,
          mentions: ['H225', 'H302', 'H332', 'H350'],
          vaporPressure: 53.3,
          category: 'Solvants chlorés',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '106-89-8',
          name: 'Épichlorhydrine',
          vlep: 1.9,
          mentions: ['H226', 'H301', 'H311', 'H314', 'H317', 'H331', 'H350'],
          vaporPressure: 16,
          category: 'Époxydes',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '111-15-9',
          name: 'Acétate d\'éthylglycol',
          vlep: 2,
          mentions: ['H226', 'H302', 'H312', 'H332', 'H360FD'],
          vaporPressure: 2.7,
          category: 'Solvants',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '110-80-5',
          name: '2-Éthoxyéthanol',
          vlep: 2,
          mentions: ['H226', 'H302', 'H331', 'H360FD'],
          vaporPressure: 5.3,
          category: 'Solvants',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '127-19-5',
          name: 'N,N-Diméthylacétamide',
          vlep: 10,
          mentions: ['H312', 'H332', 'H360D'],
          vaporPressure: 3.3,
          category: 'Solvants',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '109-86-4',
          name: '2-Méthoxyéthanol',
          vlep: 1,
          mentions: ['H226', 'H302', 'H312', 'H332', 'H360FD'],
          vaporPressure: 10,
          category: 'Solvants',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '110-49-6',
          name: 'Acétate de 2-méthoxyéthyle',
          vlep: 1,
          mentions: ['H226', 'H302', 'H312', 'H332', 'H360FD'],
          vaporPressure: 9,
          category: 'Solvants',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '107-13-1',
          name: 'Acrylonitrile',
          vlep: 2,
          mentions: ['H225', 'H301', 'H311', 'H315', 'H317', 'H318', 'H331', 'H350', 'H411'],
          vaporPressure: 115,
          category: 'Monomères',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '7719-12-2',
          name: 'Trichlorure de phosphore',
          vlep: 0.2,
          mentions: ['H300', 'H314', 'H330', 'H373'],
          vaporPressure: 129.7,
          category: 'Agents de chloration',
          physicalState: 'Liquide'
        },
        {
          cas: '10026-04-7',
          name: 'Tétrachlorure de silicium',
          vlep: 0.5,
          mentions: ['H314', 'H332', 'EUH014'],
          vaporPressure: 200,
          category: 'Précurseurs silicium',
          physicalState: 'Liquide'
        },
        {
          cas: '7782-39-0',
          name: 'Deutérium',
          vlep: 1000,
          mentions: ['H220', 'H280'],
          vaporPressure: 0,
          category: 'Isotopes',
          physicalState: 'Gaz'
        },
        {
          cas: '7440-64-4',
          name: 'Holmium (poudre)',
          vlep: 1,
          mentions: ['H228', 'H261'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7439-94-3',
          name: 'Lutécium (poudre)',
          vlep: 1,
          mentions: ['H228', 'H261'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7439-91-0',
          name: 'Lanthane (poudre)',
          vlep: 1,
          mentions: ['H228', 'H261'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7440-27-9',
          name: 'Terbium (poudre)',
          vlep: 1,
          mentions: ['H228', 'H261'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7440-60-0',
          name: 'Praseodyme (poudre)',
          vlep: 1,
          mentions: ['H228', 'H261'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '13966-94-4',
          name: 'Borohydrure de zinc',
          vlep: 0.1,
          mentions: ['H260', 'H301', 'H311', 'H314', 'H331'],
          vaporPressure: 0,
          category: 'Réducteurs',
          physicalState: 'Solide'
        },
        {
          cas: '7783-07-5',
          name: 'Séléniure d\'hydrogène',
          vlep: 0.02,
          mentions: ['H220', 'H280', 'H330', 'H400', 'H410'],
          vaporPressure: 9120,
          category: 'Dopants',
          physicalState: 'Gaz'
        },
        {
          cas: '10102-18-8',
          name: 'Sélénite de sodium',
          vlep: 0.2,
          mentions: ['H301', 'H331', 'H373', 'H413'],
          vaporPressure: 0,
          category: 'Sels inorganiques',
          physicalState: 'Solide'
        },
        {
          cas: '7784-44-3',
          name: 'Arséniate de calcium',
          vlep: 0.01,
          mentions: ['H301', 'H331', 'H350', 'H373', 'H410'],
          vaporPressure: 0,
          category: 'Sels inorganiques',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7784-33-0',
          name: 'Tribromure d\'arsenic',
          vlep: 0.2,
          mentions: ['H300', 'H314', 'H330', 'H373'],
          vaporPressure: 1,
          category: 'Dopants',
          physicalState: 'Solide'
        },
        {
          cas: '7789-43-7',
          name: 'Bromure de cuivre(II)',
          vlep: 1,
          mentions: ['H301', 'H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '7758-89-6',
          name: 'Chlorure de cuivre(I)',
          vlep: 1,
          mentions: ['H302', 'H400', 'H410'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '5989-27-5',
          name: 'D-Limonène',
          vlep: 20,
          mentions: ['H226', 'H304', 'H315', 'H317', 'H400', 'H410'],
          vaporPressure: 1.9,
          category: 'Solvants verts',
          physicalState: 'Liquide'
        },
        {
          cas: '101-84-8',
          name: 'Oxyde de diphényle',
          vlep: 1,
          mentions: ['H319', 'H411'],
          vaporPressure: 0.02,
          category: 'Fluides caloporteurs',
          physicalState: 'Solide'
        },
        {
          cas: '75-03-6',
          name: 'Iodure d\'éthyle',
          vlep: 5,
          mentions: ['H302', 'H332', 'H335', 'H351'],
          vaporPressure: 160,
          category: 'Agents d\'alkylation',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '593-51-1',
          name: 'Méthylamine en solution',
          vlep: 10,
          mentions: ['H225', 'H332', 'H335'],
          vaporPressure: 295,
          category: 'Amines',
          physicalState: 'Liquide'
        },
        {
          cas: '10035-10-6',
          name: 'Bromure d\'hydrogène',
          vlep: 2,
          mentions: ['H314', 'H335'],
          vaporPressure: 2150,
          category: 'Acides',
          physicalState: 'Gaz'
        },
        {
          cas: '7783-40-6',
          name: 'Fluorure de magnésium',
          vlep: 2.5,
          mentions: ['H301', 'H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7783-47-3',
          name: 'Fluorure de strontium',
          vlep: 2.5,
          mentions: ['H301', 'H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7789-75-5',
          name: 'Fluorure de calcium',
          vlep: 2.5,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '10049-04-4',
          name: 'Dioxyde de chlore',
          vlep: 0.1,
          mentions: ['H270', 'H301', 'H314', 'H400'],
          vaporPressure: 1000,
          category: 'Oxydants',
          physicalState: 'Gaz'
        },
        {
          cas: '7790-89-8',
          name: 'Chlorure de cérium(III)',
          vlep: 1,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7758-88-5',
          name: 'Fluorure de cérium(III)',
          vlep: 1,
          mentions: ['H301', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7758-19-2',
          name: 'Chlorite de sodium',
          vlep: 0.1,
          mentions: ['H271', 'H301', 'H310', 'H373', 'H400'],
          vaporPressure: 0,
          category: 'Oxydants',
          physicalState: 'Solide'
        },
        {
          cas: '13770-40-6',
          name: 'Luminol',
          vlep: 1,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Réactifs analytiques',
          physicalState: 'Solide'
        },
        {
          cas: '7790-86-5',
          name: 'Chlorure de cérium(III)',
          vlep: 1,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '10025-91-9',
          name: 'Trichlorure d\'antimoine',
          vlep: 0.5,
          mentions: ['H314', 'H411'],
          vaporPressure: 0,
          category: 'Dopants',
          physicalState: 'Solide'
        },
        {
          cas: '7789-33-5',
          name: 'Iodure de lithium',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7783-32-4',
          name: 'Fluorure de lithium',
          vlep: 2.5,
          mentions: ['H301', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7783-48-4',
          name: 'Fluorure de zirconium',
          vlep: 2.5,
          mentions: ['H301', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7789-20-0',
          name: 'Eau deutérée',
          vlep: 1000,
          mentions: ['H320'],
          vaporPressure: 23.8,
          category: 'Solvants isotopiques',
          physicalState: 'Liquide'
        },
        {
          cas: '13453-69-5',
          name: 'Alun de chrome',
          vlep: 0.05,
          mentions: ['H317', 'H350i', 'H335'],
          vaporPressure: 0,
          category: 'Sels métalliques',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '151-67-7',
          name: 'Halothane',
          vlep: 2,
          mentions: ['H302', 'H351', 'H361d', 'H373'],
          vaporPressure: 243,
          category: 'Anesthésiques',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '7784-23-8',
          name: 'Iodure d\'aluminium',
          vlep: 2,
          mentions: ['H314', 'EUH014'],
          vaporPressure: 0,
          category: 'Halogénures',
          physicalState: 'Solide'
        },
        {
          cas: '75-61-6',
          name: 'Dibromofluorométhane',
          vlep: 100,
          mentions: ['H280', 'H420'],
          vaporPressure: 194,
          category: 'Réfrigérants',
          physicalState: 'Gaz'
        },
        {
          cas: '7789-23-3',
          name: 'Fluorure de potassium',
          vlep: 2.5,
          mentions: ['H301', 'H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7783-82-6',
          name: 'Hexafluorure de tungstène',
          vlep: 0.1,
          mentions: ['H314', 'H330'],
          vaporPressure: 900,
          category: 'Précurseurs',
          physicalState: 'Gaz'
        },
        {
          cas: '7758-02-3',
          name: 'Bromure de potassium',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7784-09-0',
          name: 'Phosphate d\'argent',
          vlep: 0.01,
          mentions: ['H400', 'H410'],
          vaporPressure: 0,
          category: 'Sels métalliques',
          physicalState: 'Solide'
        },
        {
          cas: '7783-55-3',
          name: 'Trifluorure de fer',
          vlep: 1,
          mentions: ['H314', 'H318'],
          vaporPressure: 0,
          category: 'Agents de fluoration',
          physicalState: 'Solide'
        },
        {
          cas: '420-46-2',
          name: 'Trifluorométhane',
          vlep: 1000,
          mentions: ['H280'],
          vaporPressure: 48300,
          category: 'Fluides frigorigènes',
          physicalState: 'Gaz'
        },
        {
          cas: '7722-76-1',
          name: 'Phosphate d\'ammonium monobasique',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Tampons',
          physicalState: 'Solide'
        },
        {
          cas: '7783-28-0',
          name: 'Phosphate d\'ammonium dibasique',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Tampons',
          physicalState: 'Solide'
        },
        {
          cas: '7785-70-8',
          name: '(+)-α-Pinène',
          vlep: 20,
          mentions: ['H226', 'H304', 'H315', 'H317', 'H400', 'H410'],
          vaporPressure: 4.75,
          category: 'Solvants verts',
          physicalState: 'Liquide'
        },
        {
          cas: '98-83-9',
          name: 'α-Méthylstyrène',
          vlep: 50,
          mentions: ['H226', 'H319', 'H335', 'H411'],
          vaporPressure: 1.9,
          category: 'Monomères',
          physicalState: 'Liquide'
        },
        {
          cas: '1310-62-3',
          name: 'Peroxyde de nickel',
          vlep: 0.1,
          mentions: ['H317', 'H334', 'H341', 'H350i', 'H372'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7783-36-0',
          name: 'Sulfate d\'hydroxylamine',
          vlep: 1,
          mentions: ['H302', 'H312', 'H315', 'H317', 'H319', 'H351', 'H373'],
          vaporPressure: 0,
          category: 'Réducteurs',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7783-00-8',
          name: 'Acide sélénieux',
          vlep: 0.2,
          mentions: ['H301', 'H331', 'H373', 'H413'],
          vaporPressure: 0,
          category: 'Agents de sélénation',
          physicalState: 'Solide'
        },
        {
          cas: '10025-78-2',
          name: 'Trichlorosilane',
          vlep: 5,
          mentions: ['H224', 'H314', 'H335', 'EUH014'],
          vaporPressure: 750,
          category: 'Précurseurs silicium',
          physicalState: 'Liquide'
        },
        {
          cas: '75-77-4',
          name: 'Chlorure de triméthylsilyle',
          vlep: 5,
          mentions: ['H225', 'H314', 'EUH014'],
          vaporPressure: 200,
          category: 'Agents de silylation',
          physicalState: 'Liquide'
        },
        {
          cas: '7440-19-9',
          name: 'Samarium (poudre)',
          vlep: 1,
          mentions: ['H228', 'H261'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7789-03-7',
          name: 'Bromure d\'yttrium',
          vlep: 1,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7784-85-0',
          name: 'Chlorure d\'europium(III)',
          vlep: 1,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '10045-89-3',
          name: 'Sel de Mohr',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Réactifs analytiques',
          physicalState: 'Solide'
        },
        {
          cas: '7758-98-7',
          name: 'Sulfate de cuivre anhydre',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319', 'H400', 'H410'],
          vaporPressure: 0,
          category: 'Desséchants',
          physicalState: 'Solide'
        },
        {
          cas: '7446-09-5',
          name: 'Dioxyde de soufre',
          vlep: 2,
          mentions: ['H331', 'H314', 'H280'],
          vaporPressure: 3300,
          category: 'Agents de sulfuration',
          physicalState: 'Gaz'
        },
        {
          cas: '6100-20-5',
          name: 'Oxalate de samarium',
          vlep: 1,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7439-98-7',
          name: 'Molybdène (poudre)',
          vlep: 5,
          mentions: ['H228', 'H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '7697-46-1',
          name: 'Nitrate d\'yttrium',
          vlep: 1,
          mentions: ['H272', 'H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Terres rares',
          physicalState: 'Solide'
        },
        {
          cas: '7789-04-0',
          name: 'Bromure de thorium',
          vlep: 0.05,
          mentions: ['H302', 'H332'],
          vaporPressure: 0,
          category: 'Matériaux radioactifs',
          physicalState: 'Solide'
        },
        {
          cas: '7785-23-1',
          name: 'Bromure d\'argent',
          vlep: 0.01,
          mentions: ['H400', 'H410'],
          vaporPressure: 0,
          category: 'Photochimie',
          physicalState: 'Solide'
        },
        {
          cas: '7784-09-0',
          name: 'Phosphate d\'argent',
          vlep: 0.01,
          mentions: ['H400', 'H410'],
          vaporPressure: 0,
          category: 'Photochimie',
          physicalState: 'Solide'
        },
        {
          cas: '7789-45-9',
          name: 'Bromure de cuivre(I)',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '7722-88-5',
          name: 'Pyrophosphate de sodium',
          vlep: 5,
          mentions: ['H318'],
          vaporPressure: 0,
          category: 'Tampons',
          physicalState: 'Solide'
        },
        {
          cas: '7783-28-0',
          name: 'Phosphate de diammonium',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Tampons',
          physicalState: 'Solide'
        },
        {
          cas: '7758-16-9',
          name: 'Pyrophosphate acide de sodium',
          vlep: 5,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Tampons',
          physicalState: 'Solide'
        },
        {
          cas: '7757-82-6',
          name: 'Sulfate de sodium anhydre',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Desséchants',
          physicalState: 'Solide'
        },
        {
          cas: '10101-97-0',
          name: 'Sulfate de nickel hexahydraté',
          vlep: 0.1,
          mentions: ['H302', 'H317', 'H332', 'H334', 'H341', 'H350i', 'H360D', 'H372', 'H410'],
          vaporPressure: 0,
          category: 'Sels métalliques',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7758-89-6',
          name: 'Chlorure de cuivre(I)',
          vlep: 1,
          mentions: ['H302', 'H400', 'H410'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '7758-95-4',
          name: 'Chlorure de plomb(II)',
          vlep: 0.15,
          mentions: ['H302', 'H332', 'H360Df', 'H373', 'H410'],
          vaporPressure: 0,
          category: 'Sels métalliques',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7790-69-4',
          name: 'Nitrate de lithium',
          vlep: 1,
          mentions: ['H272', 'H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7783-90-6',
          name: 'Chlorure d\'argent',
          vlep: 0.01,
          mentions: ['H400', 'H410'],
          vaporPressure: 0,
          category: 'Électrodes de référence',
          physicalState: 'Solide'
        },
        {
          cas: '7790-92-3',
          name: 'Acide hypochloreux',
          vlep: 0.5,
          mentions: ['H314', 'H400'],
          vaporPressure: 20,
          category: 'Oxydants',
          physicalState: 'Liquide'
        },
        {
          cas: '7789-38-0',
          name: 'Bromate de sodium',
          vlep: 0.1,
          mentions: ['H271', 'H301', 'H350', 'H400'],
          vaporPressure: 0,
          category: 'Oxydants',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7647-14-5',
          name: 'Chlorure de sodium ultra pur',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7791-18-6',
          name: 'Chlorure de magnésium hexahydraté',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Électrolytes',
          physicalState: 'Solide'
        },
        {
          cas: '7758-05-6',
          name: 'Iodate de potassium',
          vlep: 0.1,
          mentions: ['H272', 'H319'],
          vaporPressure: 0,
          category: 'Oxydants',
          physicalState: 'Solide'
        },
        {
          cas: '7783-85-9',
          name: 'Sulfate de fer(II) heptahydraté',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Réducteurs',
          physicalState: 'Solide'
        },
        {
          cas: '7778-50-9',
          name: 'Dichromate de potassium',
          vlep: 0.05,
          mentions: ['H272', 'H301', 'H312', 'H314', 'H317', 'H330', 'H334', 'H340', 'H350', 'H360FD', 'H372', 'H410'],
          vaporPressure: 0,
          category: 'Oxydants',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7784-27-2',
          name: 'Nitrate d\'aluminium',
          vlep: 2,
          mentions: ['H272', 'H314'],
          vaporPressure: 0,
          category: 'Sels métalliques',
          physicalState: 'Solide'
        },
        {
          cas: '7782-68-5',
          name: 'Métavanadate de sodium',
          vlep: 0.05,
          mentions: ['H301', 'H317', 'H330', 'H341', 'H361', 'H372', 'H411'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7758-01-2',
          name: 'Bromate de potassium',
          vlep: 0.1,
          mentions: ['H271', 'H301', 'H350'],
          vaporPressure: 0,
          category: 'Oxydants',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7718-54-9',
          name: 'Chlorure de nickel(II)',
          vlep: 0.1,
          mentions: ['H301', 'H315', 'H317', 'H331', 'H334', 'H341', 'H350i', 'H360D', 'H372', 'H410'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7784-13-6',
          name: 'Chlorure d\'aluminium hexahydraté',
          vlep: 2,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '7553-56-2',
          name: 'Diiode',
          vlep: 0.1,
          mentions: ['H312', 'H332', 'H400'],
          vaporPressure: 0.3,
          category: 'Halogènes',
          physicalState: 'Solide'
        },
        {
          cas: '7758-19-2',
          name: 'Chlorite de sodium',
          vlep: 0.1,
          mentions: ['H271', 'H301', 'H310', 'H373', 'H400'],
          vaporPressure: 0,
          category: 'Oxydants',
          physicalState: 'Solide'
        },
        {
          cas: '7681-49-4',
          name: 'Fluorure de sodium',
          vlep: 2.5,
          mentions: ['H301', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Agents de fluoration',
          physicalState: 'Solide'
        },
        {
          cas: '7440-22-4',
          name: 'Argent (nanoparticules)',
          vlep: 0.1,
          mentions: ['H400', 'H410'],
          vaporPressure: 0,
          category: 'Nanomatériaux',
          physicalState: 'Solide'
        },
        {
          cas: '7783-28-0',
          name: 'Phosphate de diammonium',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Tampons',
          physicalState: 'Solide'
        },
        {
          cas: '7783-20-2',
          name: 'Sulfate d\'ammonium',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Sels inorganiques',
          physicalState: 'Solide'
        },
        {
          cas: '10026-24-1',
          name: 'Sulfate de cobalt heptahydraté',
          vlep: 0.02,
          mentions: ['H302', 'H317', 'H334', 'H341', 'H350i', 'H360F', 'H410'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '7758-94-3',
          name: 'Chlorure de fer(II)',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '7758-99-8',
          name: 'Sulfate de cuivre pentahydraté',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319', 'H400', 'H410'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '7783-92-8',
          name: 'Chlorure d\'indium(III)',
          vlep: 0.1,
          mentions: ['H314'],
          vaporPressure: 0,
          category: 'Dopants',
          physicalState: 'Solide'
        },
        {
          cas: '10102-17-7',
          name: 'Thiosulfate de sodium pentahydraté',
          vlep: 10,
          mentions: ['H319'],
          vaporPressure: 0,
          category: 'Réducteurs',
          physicalState: 'Solide'
        },
        {
          cas: '7772-99-8',
          name: 'Chlorure d\'étain(II)',
          vlep: 2,
          mentions: ['H302', 'H314', 'H317', 'H411'],
          vaporPressure: 0,
          category: 'Réducteurs',
          physicalState: 'Solide'
        },
        {
          cas: '121-43-7',
          name: 'Triméthylborate',
          vlep: 5,
          mentions: ['H225', 'H302', 'H315', 'H319', 'H335'],
          vaporPressure: 120,
          category: 'Composés du bore',
          physicalState: 'Liquide'
        },
        {
          cas: '98-80-6',
          name: 'Acide phénylboronique',
          vlep: 2,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0.001,
          category: 'Composés du bore',
          physicalState: 'Solide'
        },
        {
          cas: '5419-55-6',
          name: 'Triisopropyl borate',
          vlep: 5,
          mentions: ['H226', 'H315', 'H319', 'H335'],
          vaporPressure: 15,
          category: 'Composés du bore',
          physicalState: 'Liquide'
        },
        // Réactifs de Grignard
        {
          cas: '75-16-1',
          name: 'Bromure de méthylmagnésium',
          vlep: 2,
          mentions: ['H250', 'H260', 'H314', 'H336'],
          vaporPressure: 0,
          category: 'Réactifs de Grignard',
          physicalState: 'Liquide'
        },
        {
          cas: '2386-64-3',
          name: 'Chlorure d\'éthylmagnésium',
          vlep: 2,
          mentions: ['H250', 'H260', 'H314', 'H336'],
          vaporPressure: 0,
          category: 'Réactifs de Grignard',
          physicalState: 'Liquide'
        },
        {
          cas: '100-58-3',
          name: 'Bromure de phénylmagnésium',
          vlep: 2,
          mentions: ['H250', 'H260', 'H314', 'H336'],
          vaporPressure: 0,
          category: 'Réactifs de Grignard',
          physicalState: 'Liquide'
        },
        // Composés organiques
        {
          cas: '75-07-0',
          name: 'Acétaldéhyde',
          vlep: 25,
          mentions: ['H224', 'H319', 'H335', 'H351'],
          vaporPressure: 1006,
          category: 'Aldéhydes',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '107-02-8',
          name: 'Acroléine',
          vlep: 0.1,
          mentions: ['H225', 'H301', 'H311', 'H314', 'H330', 'H341', 'H400'],
          vaporPressure: 293,
          category: 'Aldéhydes',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '110-86-1',
          name: 'Pyridine',
          vlep: 5,
          mentions: ['H225', 'H302', 'H312', 'H319', 'H332'],
          vaporPressure: 20,
          category: 'Composés azotés',
          physicalState: 'Liquide'
        },
        // Composés phosphorés
        {
          cas: '603-35-0',
          name: 'Triphénylphosphine',
          vlep: 3,
          mentions: ['H317', 'H373'],
          vaporPressure: 0.001,
          category: 'Composés phosphorés',
          physicalState: 'Solide'
        },
        {
          cas: '680-31-9',
          name: 'Hexaméthylphosphoramide',
          vlep: 0.05,
          mentions: ['H350', 'H360F'],
          vaporPressure: 0.03,
          category: 'Composés phosphorés',
          physicalState: 'Liquide',
          cmr: true
        },
        {
          cas: '998-40-3',
          name: 'Tributylphosphine',
          vlep: 0.2,
          mentions: ['H250', 'H314', 'H411'],
          vaporPressure: 0.3,
          category: 'Composés phosphorés',
          physicalState: 'Liquide'
        },
        // Catalyseurs de transfert de phase
        {
          cas: '1112-67-0',
          name: 'Chlorure de tétrabutylammonium',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Catalyseurs de transfert de phase',
          physicalState: 'Solide'
        },
        {
          cas: '1643-19-2',
          name: 'Bromure de tétrabutylammonium',
          vlep: 1,
          mentions: ['H302', 'H315', 'H319'],
          vaporPressure: 0,
          category: 'Catalyseurs de transfert de phase',
          physicalState: 'Solide'
        },
        // Réactifs de couplage
        {
          cas: '538-75-0',
          name: 'N,N\'-Dicyclohexylcarbodiimide',
          vlep: 0.005,
          mentions: ['H301', 'H315', 'H317', 'H318', 'H334'],
          vaporPressure: 0.001,
          category: 'Réactifs de couplage',
          physicalState: 'Solide'
        },
        {
          cas: '25952-53-8',
          name: '1-Éthyl-3-(3-diméthylaminopropyl)carbodiimide',
          vlep: 0.005,
          mentions: ['H315', 'H317', 'H319', 'H334'],
          vaporPressure: 0.001,
          category: 'Réactifs de couplage',
          physicalState: 'Solide'
        },
        {
          cas: '6066-82-6',
          name: 'N-Hydroxysuccinimide',
          vlep: 1,
          mentions: ['H315', 'H319', 'H335'],
          vaporPressure: 0,
          category: 'Réactifs de couplage',
          physicalState: 'Solide'
        },
        // Composés organométalliques
        {
          cas: '14024-61-4',
          name: 'Acétylacétonate de palladium(II)',
          vlep: 0.1,
          mentions: ['H317', 'H341', 'H350', 'H410'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide',
          cmr: true
        },
        {
          cas: '14898-67-0',
          name: 'Chlorure de ruthénium(III) hydraté',
          vlep: 0.1,
          mentions: ['H314', 'H410'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide'
        },
        {
          cas: '14221-01-3',
          name: 'Tétrakis(triphénylphosphine)palladium(0)',
          vlep: 0.1,
          mentions: ['H317', 'H341', 'H350', 'H410'],
          vaporPressure: 0,
          category: 'Catalyseurs',
          physicalState: 'Solide',
          cmr: true
        },
        // Polymères et monomères
        {
          cas: '80-62-6',
          name: 'Méthacrylate de méthyle',
          vlep: 50,
          mentions: ['H225', 'H315', 'H317', 'H335'],
          vaporPressure: 36,
          category: 'Monomères',
          physicalState: 'Liquide'
        },
        {
          cas: '2210-25-5',
          name: 'N-Isopropylacrylamide',
          vlep: 0.3,
          mentions: ['H301', 'H312', 'H315', 'H317', 'H319', 'H332'],
          vaporPressure: 0.001,
          category: 'Monomères',
          physicalState: 'Solide'
        },
        // Réactifs de deutération
        {
          cas: '811-98-3',
          name: 'Méthanol-d4',
          vlep: 200,
          mentions: ['H225', 'H301', 'H311', 'H331', 'H370'],
          vaporPressure: 128,
          category: 'Solvants deutérés',
          physicalState: 'Liquide'
        },
        {
          cas: '1186-52-3',
          name: 'Acide acétique-d4',
          vlep: 10,
          mentions: ['H226', 'H314'],
          vaporPressure: 15.7,
          category: 'Solvants deutérés',
          physicalState: 'Liquide'
        },
        {
          cas: '865-49-6',
          name: 'Chloroforme-d',
          vlep: 2,
          mentions: ['H302', 'H315', 'H351', 'H373'],
          vaporPressure: 211,
          category: 'Solvants deutérés',
          physicalState: 'Liquide',
          cmr: true
        },
        {
        cas: '108-93-0',
        name: 'Cyclohexanol',
        vlep: 50,
        mentions: ['H302', 'H315', 'H332', 'H335'],
        vaporPressure: 0.9,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '123-91-1',
        name: '1,4-Dioxane',
        vlep: 20,
        mentions: ['H225', 'H319', 'H335', 'H351'],
        vaporPressure: 41,
        category: 'Éthers',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '121-44-8',
        name: 'Triéthylamine',
        vlep: 2,
        mentions: ['H225', 'H302', 'H312', 'H314', 'H332'],
        vaporPressure: 69,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '75-12-7',
        name: 'Formamide',
        vlep: 20,
        mentions: ['H360D'],
        vaporPressure: 0.08,
        category: 'Amides',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '108-39-4',
        name: 'm-Crésol',
        vlep: 5,
        mentions: ['H301', 'H311', 'H314', 'H341', 'H373'],
        vaporPressure: 0.1,
        category: 'Composés phénoliques',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '109-73-9',
        name: 'Butylamine',
        vlep: 5,
        mentions: ['H225', 'H302', 'H312', 'H314', 'H332'],
        vaporPressure: 82,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '110-91-8',
        name: 'Morpholine',
        vlep: 20,
        mentions: ['H226', 'H302', 'H312', 'H314', 'H332'],
        vaporPressure: 10.1,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '100-47-0',
        name: 'Benzonitrile',
        vlep: 10,
        mentions: ['H302', 'H312', 'H332'],
        vaporPressure: 1,
        category: 'Nitriles',
        physicalState: 'Liquide'
      },
      {
        cas: '79-10-7',
        name: 'Acide acrylique',
        vlep: 2,
        mentions: ['H226', 'H302', 'H312', 'H314', 'H332', 'H400'],
        vaporPressure: 3.8,
        category: 'Acides organiques',
        physicalState: 'Liquide'
      },
      {
        cas: '108-90-7',
        name: 'Chlorobenzène',
        vlep: 10,
        mentions: ['H226', 'H315', 'H332', 'H411'],
        vaporPressure: 11.8,
        category: 'Solvants halogénés',
        physicalState: 'Liquide'
      },
      {
        cas: '111-27-3',
        name: '1-Hexanol',
        vlep: 50,
        mentions: ['H302', 'H315', 'H319', 'H332', 'H335'],
        vaporPressure: 0.9,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '106-42-3',
        name: 'p-Xylène',
        vlep: 100,
        mentions: ['H226', 'H312', 'H315', 'H332'],
        vaporPressure: 8.7,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Liquide'
      },
      {
        cas: '126-33-0',
        name: 'Sulfolane',
        vlep: 10,
        mentions: ['H302', 'H312', 'H319', 'H332'],
        vaporPressure: 0.1,
        category: 'Solvants polaires',
        physicalState: 'Liquide'
      },
      {
        cas: '110-01-0',
        name: 'Tétrahydrothiophène',
        vlep: 50,
        mentions: ['H225', 'H302', 'H315', 'H319', 'H332'],
        vaporPressure: 19.1,
        category: 'Composés soufrés',
        physicalState: 'Liquide'
      },
      {
        cas: '108-48-5',
        name: '2,6-Lutidine',
        vlep: 5,
        mentions: ['H225', 'H302', 'H315', 'H319'],
        vaporPressure: 6.5,
        category: 'Bases organiques',
        physicalState: 'Liquide'
      },
      {
        cas: '110-86-1',
        name: 'Pyridine',
        vlep: 5,
        mentions: ['H225', 'H302', 'H312', 'H332'],
        vaporPressure: 20.8,
        category: 'Bases organiques',
        physicalState: 'Liquide'
      },
      {
        cas: '123-51-3',
        name: 'Alcool isoamylique',
        vlep: 100,
        mentions: ['H226', 'H332', 'H335'],
        vaporPressure: 2.5,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '106-88-7',
        name: '1,2-Époxybutane',
        vlep: 5,
        mentions: ['H225', 'H302', 'H332', 'H335', 'H351'],
        vaporPressure: 129,
        category: 'Époxydes',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '108-98-5',
        name: 'Thiophénol',
        vlep: 0.5,
        mentions: ['H301', 'H311', 'H314', 'H331', 'H410'],
        vaporPressure: 1.8,
        category: 'Composés soufrés',
        physicalState: 'Liquide'
      },
      {
        cas: '108-18-9',
        name: 'Diisopropylamine',
        vlep: 5,
        mentions: ['H225', 'H302', 'H314', 'H332'],
        vaporPressure: 96,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '868-77-9',
        name: 'HEMA (Méthacrylate d\'hydroxyéthyle)',
        vlep: 0.5,
        mentions: ['H315', 'H317', 'H319'],
        vaporPressure: 0.01,
        category: 'Monomères',
        physicalState: 'Liquide'
      },
      {
        cas: '80-05-7',
        name: 'Bisphénol A',
        vlep: 2,
        mentions: ['H317', 'H318', 'H335', 'H360F'],
        vaporPressure: 0.0000004,
        category: 'Composés phénoliques',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '77-73-6',
        name: 'Dicyclopentadiène',
        vlep: 5,
        mentions: ['H226', 'H302', 'H315', 'H319', 'H332', 'H411'],
        vaporPressure: 2.3,
        category: 'Monomères',
        physicalState: 'Liquide'
      },
      {
        cas: '123-31-9',
        name: 'Hydroquinone',
        vlep: 2,
        mentions: ['H302', 'H317', 'H318', 'H341', 'H351', 'H400'],
        vaporPressure: 0.000001,
        category: 'Composés phénoliques',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '71-36-3',
        name: '1-Butanol',
        vlep: 20,
        mentions: ['H226', 'H302', 'H315', 'H318', 'H335', 'H336'],
        vaporPressure: 6.7,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '96-33-3',
        name: 'Acrylate de méthyle',
        vlep: 2,
        mentions: ['H225', 'H302', 'H312', 'H315', 'H317', 'H319', 'H332', 'H335'],
        vaporPressure: 89,
        category: 'Monomères',
        physicalState: 'Liquide'
      },
      {
        cas: '7553-56-2',
        name: 'Diiode',
        vlep: 0.1,
        mentions: ['H312', 'H332', 'H400'],
        vaporPressure: 0.3,
        category: 'Halogènes',
        physicalState: 'Solide'
      },
      {
        cas: '7440-57-5',
        name: 'Or colloïdal',
        vlep: 0.1,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Nanoparticules',
        physicalState: 'Solide'
      },
      {
        cas: '75-36-5',
        name: 'Chlorure d\'acétyle',
        vlep: 2,
        mentions: ['H225', 'H314', 'EUH014'],
        vaporPressure: 30.7,
        category: 'Agents d\'acylation',
        physicalState: 'Liquide'
      },
      {
        cas: '62-53-3',
        name: 'Aniline',
        vlep: 2,
        mentions: ['H301', 'H311', 'H317', 'H318', 'H331', 'H341', 'H351', 'H372', 'H400'],
        vaporPressure: 0.7,
        category: 'Amines aromatiques',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '121-69-7',
        name: 'N,N-Diméthylaniline',
        vlep: 5,
        mentions: ['H301', 'H311', 'H331', 'H351', 'H411'],
        vaporPressure: 1.3,
        category: 'Amines aromatiques',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '95-48-7',
        name: 'o-Crésol',
        vlep: 5,
        mentions: ['H301', 'H311', 'H314'],
        vaporPressure: 0.3,
        category: 'Composés phénoliques',
        physicalState: 'Solide'
      },
      {
        cas: '100-51-6',
        name: 'Alcool benzylique',
        vlep: 10,
        mentions: ['H302', 'H332'],
        vaporPressure: 0.13,
        category: 'Alcools',
        physicalState: 'Liquide'
      },
      {
        cas: '110-89-4',
        name: 'Pipéridine',
        vlep: 1,
        mentions: ['H225', 'H311', 'H314'],
        vaporPressure: 32,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '109-89-7',
        name: 'Diéthylamine',
        vlep: 10,
        mentions: ['H225', 'H302', 'H314', 'H332'],
        vaporPressure: 256,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '108-20-3',
        name: 'Éther diisopropylique',
        vlep: 250,
        mentions: ['H225', 'H336', 'EUH019'],
        vaporPressure: 160,
        category: 'Éthers',
        physicalState: 'Liquide'
      },
      {
        cas: '7440-22-4',
        name: 'Nanoparticules d\'argent',
        vlep: 0.1,
        mentions: ['H400', 'H410'],
        vaporPressure: 0,
        category: 'Nanoparticules',
        physicalState: 'Solide'
      },
      {
        cas: '7761-88-8',
        name: 'Nitrate d\'argent',
        vlep: 0.01,
        mentions: ['H272', 'H314', 'H410'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide'
      },
      {
        cas: '544-92-3',
        name: 'Chlorure de cuivre(I)',
        vlep: 1,
        mentions: ['H302', 'H410'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide'
      },
      {
        cas: '7758-89-6',
        name: 'Bromure de cuivre(II)',
        vlep: 1,
        mentions: ['H302', 'H315', 'H319', 'H410'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide'
      },
      {
        cas: '7440-38-2',
        name: 'Arsenic (poudre)',
        vlep: 0.01,
        mentions: ['H301', 'H331', 'H350', 'H400', 'H410'],
        vaporPressure: 0,
        category: 'Métaux',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7789-27-7',
        name: 'Chlorure d\'iridium(III)',
        vlep: 0.1,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '7705-07-9',
        name: 'Chlorure de chrome(III)',
        vlep: 0.5,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide'
      },
      {
        cas: '7775-11-3',
        name: 'Chromate de sodium',
        vlep: 0.05,
        mentions: ['H301', 'H312', 'H314', 'H317', 'H330', 'H334', 'H340', 'H350i', 'H360F', 'H372', 'H410'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '7646-85-7',
        name: 'Chlorure de zinc',
        vlep: 1,
        mentions: ['H302', 'H314', 'H410'],
        vaporPressure: 0,
        category: 'Sels métalliques',
        physicalState: 'Solide'
      },
      {
        cas: '108-03-2',
        name: '1-Nitropropane',
        vlep: 25,
        mentions: ['H226', 'H302', 'H312', 'H332', 'H373'],
        vaporPressure: 13,
        category: 'Nitro-composés',
        physicalState: 'Liquide'
      },
      {
        cas: '75-50-3',
        name: 'Triméthylamine',
        vlep: 5,
        mentions: ['H220', 'H315', 'H318', 'H332', 'H335'],
        vaporPressure: 1900,
        category: 'Amines',
        physicalState: 'Gaz'
      },
      {
        cas: '67-66-3',
        name: 'Chloroforme stabilisé',
        vlep: 2,
        mentions: ['H302', 'H315', 'H319', 'H351', 'H373'],
        vaporPressure: 211,
        category: 'Solvants halogénés',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '76-01-7',
        name: 'Pentachloroéthane',
        vlep: 5,
        mentions: ['H302', 'H312', 'H332', 'H351', 'H411'],
        vaporPressure: 4.5,
        category: 'Solvants halogénés',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '123-63-7',
        name: 'Paraldéhyde',
        vlep: 10,
        mentions: ['H226', 'H302'],
        vaporPressure: 25,
        category: 'Aldéhydes',
        physicalState: 'Liquide'
      },
      {
        cas: '108-24-7',
        name: 'Anhydride acétique',
        vlep: 5,
        mentions: ['H226', 'H302', 'H314', 'H332'],
        vaporPressure: 4,
        category: 'Anhydrides',
        physicalState: 'Liquide'
      },
      {
        cas: '123-72-8',
        name: 'Butyraldéhyde',
        vlep: 25,
        mentions: ['H225', 'H319', 'H335'],
        vaporPressure: 121,
        category: 'Aldéhydes',
        physicalState: 'Liquide'
      },
      {
        cas: '107-87-9',
        name: '2-Pentanone',
        vlep: 150,
        mentions: ['H225', 'H302', 'H332', 'H335'],
        vaporPressure: 47,
        category: 'Cétones',
        physicalState: 'Liquide'
      },
      {
        cas: '75-98-9',
        name: 'Acide pivalique',
        vlep: 5,
        mentions: ['H314'],
        vaporPressure: 0.5,
        category: 'Acides organiques',
        physicalState: 'Solide'
      },
      {
        cas: '541-73-1',
        name: '1,3-Dichlorobenzène',
        vlep: 20,
        mentions: ['H302', 'H332', 'H411'],
        vaporPressure: 2.3,
        category: 'Solvants halogénés',
        physicalState: 'Liquide'
      },
      {
        cas: '100-41-4',
        name: 'Éthylbenzène',
        vlep: 100,
        mentions: ['H225', 'H304', 'H332', 'H373'],
        vaporPressure: 9.3,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Liquide'
      },
      {
        cas: '103-84-4',
        name: 'Acétanilide',
        vlep: 10,
        mentions: ['H302', 'H319', 'H335'],
        vaporPressure: 0.0004,
        category: 'Amides',
        physicalState: 'Solide'
      },
      {
        cas: '60-35-5',
        name: 'Acétamide',
        vlep: 5,
        mentions: ['H351'],
        vaporPressure: 0.003,
        category: 'Amides',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '57-13-6',
        name: 'Urée',
        vlep: 10,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Amides',
        physicalState: 'Solide'
      },
       // Nouveaux acides et bases
       {
        cas: '144-62-7',
        name: 'Acide oxalique',
        vlep: 1,
        mentions: ['H302', 'H312', 'H314'],
        vaporPressure: 0,
        category: 'Acides',
        physicalState: 'Solide'
      },
      {
        cas: '64-18-6',
        name: 'Acide formique',
        vlep: 5,
        mentions: ['H226', 'H302', 'H314', 'H331'],
        vaporPressure: 42,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      {
        cas: '21351-79-1',
        name: 'Hydroxyde de césium',
        vlep: 2,
        mentions: ['H314'],
        vaporPressure: 0,
        category: 'Bases',
        physicalState: 'Solide'
      },
      // Nouveaux solvants
      {
        cas: '142-68-7',
        name: 'Tétrahydropyrane',
        vlep: 50,
        mentions: ['H225', 'H319', 'H335'],
        vaporPressure: 121,
        category: 'Éthers cycliques',
        physicalState: 'Liquide'
      },
      {
        cas: '109-02-4',
        name: 'N-Méthylmorpholine',
        vlep: 20,
        mentions: ['H225', 'H302', 'H314', 'H332'],
        vaporPressure: 96,
        category: 'Amines cycliques',
        physicalState: 'Liquide'
      },
      {
        cas: '96-47-9',
        name: '2-Méthyltétrahydrofurane',
        vlep: 50,
        mentions: ['H225', 'H302', 'H319', 'H335'],
        vaporPressure: 136,
        category: 'Éthers cycliques',
        physicalState: 'Liquide'
      },
      // Nouveaux réactifs organiques
      {
        cas: '616-38-6',
        name: 'Diméthylcarbonate',
        vlep: 100,
        mentions: ['H225', 'H319'],
        vaporPressure: 56,
        category: 'Carbonates',
        physicalState: 'Liquide'
      },
      {
        cas: '75-64-9',
        name: 'tert-Butylamine',
        vlep: 5,
        mentions: ['H225', 'H302', 'H314', 'H332'],
        vaporPressure: 285,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      {
        cas: '110-18-9',
        name: 'N,N,N\',N\'-Tétraméthyléthylènediamine',
        vlep: 2,
        mentions: ['H225', 'H302', 'H314', 'H332'],
        vaporPressure: 35,
        category: 'Amines',
        physicalState: 'Liquide'
      },
      // Nouveaux sels
      {
        cas: '7791-03-9',
        name: 'Perchlorate de lithium',
        vlep: 0.1,
        mentions: ['H272', 'H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '16925-29-8',
        name: 'Hexafluoroantimonate de sodium',
        vlep: 0.5,
        mentions: ['H301', 'H314', 'H332'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      {
        cas: '13755-29-8',
        name: 'Tetrafluoroborate de sodium',
        vlep: 2,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Électrolytes',
        physicalState: 'Solide'
      },
      // Nouveaux catalyseurs
      {
        cas: '14050-79-4',
        name: 'Tétrakis(acétonitrile)cuivre(I) tétrafluoroborate',
        vlep: 0.1,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '3264-82-2',
        name: 'Bis(acétylacétonato)nickel(II)',
        vlep: 0.1,
        mentions: ['H317', 'H334', 'H341', 'H350i', 'H372'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '14284-89-0',
        name: 'Acétylacétonate de manganèse(III)',
        vlep: 0.2,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '78-93-3',
        name: '2-Butanone',
        vlep: 200,
        mentions: ['H225', 'H319', 'H336'],
        vaporPressure: 105,
        category: 'Cétones',
        physicalState: 'Liquide'
      },
      {
        cas: '108-32-7',
        name: 'Propylène carbonate',
        vlep: 2,
        mentions: ['H319'],
        vaporPressure: 0.039,
        category: 'Carbonates',
        physicalState: 'Liquide'
      },
      {
        cas: '96-29-7',
        name: '2-Butanone oxime',
        vlep: 10,
        mentions: ['H312', 'H318', 'H351', 'H373'],
        vaporPressure: 1.3,
        category: 'Oximes',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '920-66-1',
        name: 'Dimethyl isosorbide',
        vlep: 50,
        mentions: ['H319'],
        vaporPressure: 0.1,
        category: 'Éthers',
        physicalState: 'Liquide'
      },
      {
        cas: '102-76-1',
        name: 'Triacétine',
        vlep: 5,
        mentions: ['H319'],
        vaporPressure: 0.0033,
        category: 'Esters',
        physicalState: 'Liquide'
      },
      {
        cas: '499-75-2',
        name: 'Carvacrol',
        vlep: 5,
        mentions: ['H302', 'H315', 'H319'],
        vaporPressure: 0.023,
        category: 'Composés phénoliques',
        physicalState: 'Liquide'
      },
      
      // Acides et anhydrides importants
      {
        cas: '2314-21-8',
        name: 'Methyl nadic anhydride',
        vlep: 0.1,
        mentions: ['H302', 'H315', 'H318', 'H317', 'H331', 'H334'],
        vaporPressure: 0.001,
        category: 'Anhydrides',
        physicalState: 'Solide'
      },
      {
        cas: '108-31-6',
        name: 'Anhydride maléique',
        vlep: 0.1,
        mentions: ['H302', 'H314', 'H334', 'H317'],
        vaporPressure: 0.2,
        category: 'Anhydrides',
        physicalState: 'Solide'
      },
      {
        cas: '123-99-9',
        name: 'Acide azélaïque',
        vlep: 5,
        mentions: ['H319'],
        vaporPressure: 0,
        category: 'Acides',
        physicalState: 'Solide'
      },
      {
        cas: '112-38-9',
        name: 'Acide 10-undécénoïque',
        vlep: 5,
        mentions: ['H315', 'H319'],
        vaporPressure: 0.001,
        category: 'Acides',
        physicalState: 'Liquide'
      },
      
      // Réactifs courants
      {
        cas: '110-00-9',
        name: 'Furane',
        vlep: 2,
        mentions: ['H225', 'H302', 'H315', 'H319', 'H335', 'H351'],
        vaporPressure: 600,
        category: 'Composés hétérocycliques',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '98-01-1',
        name: 'Furfural',
        vlep: 2,
        mentions: ['H301', 'H312', 'H315', 'H319', 'H331', 'H335', 'H351'],
        vaporPressure: 2,
        category: 'Aldéhydes',
        physicalState: 'Liquide',
        cmr: true
      },
      {
        cas: '56-17-7',
        name: 'Zinc(II)acétylacétonate',
        vlep: 5,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Catalyseurs',
        physicalState: 'Solide'
      },
      {
        cas: '92-52-4',
        name: 'Diphényle',
        vlep: 1,
        mentions: ['H315', 'H319', 'H335', 'H400', 'H410'],
        vaporPressure: 0.012,
        category: 'Hydrocarbures aromatiques',
        physicalState: 'Solide'
      },
      {
        cas: '101-84-8',
        name: 'Oxyde de diphényle',
        vlep: 1,
        mentions: ['H319', 'H411'],
        vaporPressure: 0.02,
        category: 'Éthers aromatiques',
        physicalState: 'Solide'
      },
      {
        cas: '91-93-0',
        name: 'Diphényle disulfure',
        vlep: 0.5,
        mentions: ['H315', 'H317', 'H319', 'H335'],
        vaporPressure: 0.001,
        category: 'Composés soufrés',
        physicalState: 'Solide'
      },
      {
        cas: '947-42-2',
        name: 'Diphényle phosphate',
        vlep: 1,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Composés phosphorés',
        physicalState: 'Solide'
      },
      {
        cas: '2524-03-0',
        name: 'Diphényle chlorophosphate',
        vlep: 0.1,
        mentions: ['H302', 'H314', 'H317', 'H318', 'H334'],
        vaporPressure: 0.001,
        category: 'Composés phosphorés',
        physicalState: 'Liquide'
      },
      {
        cas: '865-47-4',
        name: 'tert-Butylate de potassium',
        vlep: 0.1,
        mentions: ['H225', 'H250', 'H260', 'H314'],
        vaporPressure: 0,
        category: 'Bases fortes',
        physicalState: 'Solide'
      },
      {
        cas: '1907-33-1',
        name: 'tert-Butylate de sodium',
        vlep: 0.1,
        mentions: ['H225', 'H250', 'H260', 'H314'],
        vaporPressure: 0,
        category: 'Bases fortes',
        physicalState: 'Solide'
      },
      {
        cas: '1445-27-4',
        name: 'tert-Butylate de lithium',
        vlep: 0.1,
        mentions: ['H225', 'H250', 'H260', 'H314'],
        vaporPressure: 0,
        category: 'Bases fortes',
        physicalState: 'Solide'
      },
      {
        cas: '7778-18-9',
        name: 'Drierite',
        vlep: 5,
        mentions: ['H317', 'H334', 'H341', 'H350i', 'H360', 'H319', 'H411'],
        vaporPressure: 0,
        category: 'Desséchants',
        physicalState: 'Solide',
        cmr: true
      },
      {
        cas: '128-08-5',
        name: 'N-Bromosuccinimide',
        vlep: 0.1,
        mentions: ['H314', 'H334', 'H317'],
        vaporPressure: 0,
        category: 'Agents de bromation',
        physicalState: 'Solide'
      },
      {
        cas: '584-08-7',
        name: 'Carbonate de potassium',
        vlep: 10,
        mentions: ['H315', 'H319', 'H335'],
        vaporPressure: 0,
        category: 'Bases',
        physicalState: 'Solide'
      },
      {
        cas: '112926-00-8',
        name: 'Silica gel',
        vlep: 4,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Desséchants',
        physicalState: 'Solide'
      },
      {
        cas: '70955-01-0',
        name: 'Tamis moléculaire 4Å',
        vlep: 10,
        mentions: ['H319', 'H335'],
        vaporPressure: 0,
        category: 'Desséchants',
        physicalState: 'Solide'
      }
    ] as ChemicalProduct[];

    productsDB.forEach(data => {
      this.products.set(data.cas, data);
    });
  }

  public getProduct(cas: string): ChemicalProduct | undefined {
    return this.products.get(cas);
  }

  public getAllProducts(): ChemicalProduct[] {
    return Array.from(this.products.values());
  }

  public getProductsByCategory(category: string): ChemicalProduct[] {
    if (category === 'all') return this.getAllProducts();
    return this.getAllProducts().filter(p => p.category === category);
  }

  public getCategories(): string[] {
    const categories = new Set(this.getAllProducts().map(p => p.category));
    return ['all', ...Array.from(categories)];
  }

  public searchProducts(query: string): ChemicalProduct[] {
    query = query.toLowerCase();
    return this.getAllProducts().filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.cas.includes(query)
    );
  }
}