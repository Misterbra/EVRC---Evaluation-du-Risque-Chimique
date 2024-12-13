import { type EvaluationResult } from '../types';
import * as XLSX from 'xlsx-js-style';

// Utility functions for text conversion
const getConfinementText = (value: string): string => {
  const confinementMap: Record<string, string> = {
    '1': 'Sans ventilation',
    '2': 'Ventilation locale',
    '3': 'Ventilation efficace',
    '4': 'Sorbonne',
    '5': 'Système clos'
  };
  return confinementMap[value] || value;
};

const getDurationText = (value: string): string => {
  const durationMap: Record<string, string> = {
    '<5': '< 5 min',
    '5-45': '5 - 45 min',
    '45-480': '> 45 min'
  };
  return durationMap[value] || value;
};

const getFrequencyText = (value: string): string => {
  const frequencyMap: Record<string, string> = {
    '<1/mois': '< 1 fois/mois',
    '1-3/mois': '1 - 3 fois/mois',
    '>1/semaine': '> 1 fois/semaine'
  };
  return frequencyMap[value] || value;
};

const getTemperatureText = (value?: string): string => {
  if (!value) return 'Ambiante (~20°C)';
  const temperatureMap: Record<string, string> = {
    'ambient': 'Ambiante (~20°C)',
    'low': 'Basse (<10°C)',
    'high': 'Élevée (>30°C)',
    'very-high': 'Très élevée (>50°C)'
  };
  return temperatureMap[value] || value;
};

// Style configurations
const STYLES = {
  colors: {
    green: '92D050',
    yellow: 'FFFF00',
    orange: 'FFC000',
    red: 'FF0000',
    white: 'FFFFFF',
    header: '4472C4',
    productInfo: 'E9EFF7',
    indices: 'D4E3F4',
    results: 'BDD7EE'
  },
  risk: {
    R0: { bg: '92D050', text: '000000' },
    R1: { bg: 'FFFF00', text: '000000' },
    R2: { bg: 'FFC000', text: '000000' },
    R3: { bg: 'FF0000', text: 'FFFFFF' }
  },
  danger: {
    1: { bg: '92D050', text: '000000' },
    2: { bg: 'FFFF00', text: '000000' },
    3: { bg: 'FFC000', text: '000000' },
    4: { bg: 'FF0000', text: '000000' },
    5: { bg: 'FF0000', text: '000000' }
  },
  protection: {
    ranges: [
      { min: 6, color: '92D050' },
      { min: 4, color: 'FFFF00' },
      { min: 2, color: 'FFC000' },
      { min: -Infinity, color: 'FF0000' }
    ]
  }
};

export const formatDataForExport = (results: EvaluationResult[]) => {
  return results.map(result => {
    const workConditions = result.workConditions;
    const product = result.product;
    const protectionDetails = result.protectionIndex.details;
    const dangerIndex = result.dangerIndex;
    const finalProtectionIndex = (result.protectionIndex.total + dangerIndex);

    return {
      'N° CAS': product.cas,
      'Produit': product.name,
      'État Physique': product.physicalState || 'Liquide',
      'Utilisation': workConditions.usage || '-',
      'CMR': product.cmr ? 'Oui' : 'Non',
      'Mentions H': product.mentions.join(', '),
      'VLEP': product.vlep,
      'Type VLEP': 'ppm',
      'Type de ventilation': getConfinementText(workConditions.confinement),
      'IC': protectionDetails.IC,
      'Temps d\'utilisation': getDurationText(workConditions.duration),
      'ID': protectionDetails.ID,
      'Fréquence': getFrequencyText(workConditions.frequency),
      'IF': protectionDetails.IF,
      'Température': getTemperatureText(workConditions.temperature),
      'Tension de vapeur (hPa)': product.vaporPressure,
      'IPC': protectionDetails.IPC,
      'Indice de danger': dangerIndex,
      'Indice de protection': finalProtectionIndex,
      'Niveau de risque': `R${result.riskLevel}`,
      'Contrôle atmosphérique': result.needsMonitoring ? 'Requis' : 'Non requis'
    };
  });
};

// Function to create cell style
const createCellStyle = (
  bgColor: string,
  textColor: string = '000000',
  isBold: boolean = false
) => ({
  font: { bold: isBold, color: { rgb: textColor } },
  fill: { fgColor: { rgb: bgColor }, type: 'solid' },
  alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
  border: {
    top: { style: 'thin', color: { rgb: '000000' } },
    bottom: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } }
  }
});

// Function to get protection index color
const getProtectionColor = (value: number): string => {
  const range = STYLES.protection.ranges.find(r => value >= r.min);
  return range ? range.color : STYLES.colors.white;
};

// Function to get risk level style
const getRiskStyle = (riskLevel: string) => {
  const level = riskLevel as keyof typeof STYLES.risk;
  return STYLES.risk[level] || { bg: STYLES.colors.white, text: '000000' };
};

export const exportToExcel = (data: EvaluationResult[], filename = 'evrc_evaluation.xlsx'): void => {
  const wb = XLSX.utils.book_new();
  const formattedData = formatDataForExport(data);
  const ws = XLSX.utils.json_to_sheet(formattedData);

  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');

  // Add title if zone exists
  if (data[0]?.workConditions.zone) {
    const zone = data[0].workConditions.zone;
    const currentDate = new Date().toLocaleDateString('fr-FR');
    
    XLSX.utils.sheet_add_aoa(ws, [
      [`Évaluation du Risque Chimique - ${zone} - ${currentDate}`],
      ['']
    ], { origin: 'A1' });

    ws['A1'] = {
      v: `Évaluation du Risque Chimique - ${zone} - ${currentDate}`,
      t: 's',
      s: createCellStyle(STYLES.colors.header, 'FFFFFF', true)
    };

    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 20 } }];
  }

  // Style headers and data
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[cellRef];
      
      if (!cell) continue;

      if (R === range.s.r) {
        // Header style
        cell.s = createCellStyle(STYLES.colors.header, 'FFFFFF', true);
        continue;
      }

      // Data cells
      const value = cell.v;
      let style;

      if (C === 20) { // Niveau de risque column
        const riskStyle = getRiskStyle(value);
        style = createCellStyle(riskStyle.bg, riskStyle.text, true);
      } else if (C === 19) { // Indice de protection column
        style = createCellStyle(getProtectionColor(Number(value)), '000000', true);
      } else if (C === 18) { // Indice de danger column
        const dangerStyle = STYLES.danger[value as keyof typeof STYLES.danger];
        style = createCellStyle(dangerStyle?.bg || STYLES.colors.white, dangerStyle?.text || '000000', true);
      } else if (C === 4 && value === 'Oui') { // CMR column
        style = createCellStyle(STYLES.colors.red, 'FFFFFF', true);
      } else if (C === 21 && value === 'Requis') { // Contrôle atmosphérique column
        style = createCellStyle(STYLES.colors.orange, '000000', true);
      } else {
        // Default section colors
        const sectionColor = C <= 7 ? STYLES.colors.productInfo :
                           C <= 16 ? STYLES.colors.indices :
                           STYLES.colors.results;
        style = createCellStyle(sectionColor, '000000', [9, 11, 13, 16].includes(C));
      }

      cell.s = style;
    }
  }

  // Set column widths
  ws['!cols'] = [
    { wch: 12 }, // N° CAS
    { wch: 25 }, // Produit
    { wch: 15 }, // État Physique
    { wch: 25 }, // Utilisation
    { wch: 8 },  // CMR
    { wch: 30 }, // Mentions H
    { wch: 10 }, // VLEP
    { wch: 12 }, // Type VLEP
    { wch: 20 }, // Type de ventilation
    { wch: 6 },  // IC
    { wch: 20 }, // Temps d'utilisation
    { wch: 6 },  // ID
    { wch: 15 }, // Fréquence
    { wch: 6 },  // IF
    { wch: 20 }, // Température
    { wch: 20 }, // Tension de vapeur
    { wch: 6 },  // IPC
    { wch: 15 }, // Indice de danger
    { wch: 15 }, // Indice de protection
    { wch: 15 }, // Niveau de risque
    { wch: 25 }  // Contrôle atmosphérique
  ];

  XLSX.utils.book_append_sheet(wb, ws, "EVRC");
  XLSX.writeFile(wb, filename);
};