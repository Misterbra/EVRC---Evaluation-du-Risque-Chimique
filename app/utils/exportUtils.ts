import { type EvaluationResult } from '../types';
import * as XLSX from 'xlsx';

export const formatDataForExport = (results: EvaluationResult[]) => {
  return results.map(result => {
    const workConditions = result.workConditions;
    const product = result.product;
    const protectionDetails = result.protectionIndex.details;

    return {
      'N° CAS': product.cas,
      'Produit': product.name,
      'État Physique': product.physicalState || 'Liquide',
      'Utilisation': workConditions.usage || '-',
      'CMR': product.cmr ? 'Oui' : 'Non',
      'Mentions H': product.mentions.join(', '),
      'VLEP': product.vlep,
      'Type VLEP': 'ppm',  // Valeur par défaut
      'Type de ventilation': getConfinementText(workConditions.confinement),
      'IC': protectionDetails.IC,
      'Temps d\'utilisation': getDurationText(workConditions.duration),
      'ID': protectionDetails.ID,
      'Fréquence': getFrequencyText(workConditions.frequency),
      'IF': protectionDetails.IF,
      'Température': getTemperatureText(workConditions.temperature),
      'Tension de vapeur (hPa)': product.vaporPressure,
      'IPC': protectionDetails.IPC,
      'Indice de risque': result.riskLevel,
      'Contrôle atmosphérique': result.needsMonitoring ? 'Requis' : 'Non requis'
    };
  });
};

// Fonctions utilitaires pour convertir les valeurs en texte lisible
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

export const exportToExcel = (data: EvaluationResult[], filename = 'evrc_evaluation.xlsx'): void => {
  const formattedData = formatDataForExport(data);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formattedData);

  // Définir la largeur des colonnes
  const colWidths = [
    { wch: 12 }, // N° CAS
    { wch: 20 }, // Produit
    { wch: 15 }, // État Physique
    { wch: 25 }, // Utilisation (augmenté pour plus de texte)
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
    { wch: 15 }, // Indice de risque
    { wch: 25 }  // Contrôle atmosphérique
  ];
  
  ws['!cols'] = colWidths;

  // Ajouter le titre avec la zone dans la première ligne si elle existe
  if (data[0]?.workConditions.zone) {
    const zone = data[0].workConditions.zone;
    const currentDate = new Date().toLocaleDateString('fr-FR');
    XLSX.utils.sheet_add_aoa(ws, [[`Évaluation du Risque Chimique - ${zone} - ${currentDate}`]], { origin: 'A1' });
    
    // Ajouter un espace entre le titre et les données
    XLSX.utils.sheet_add_aoa(ws, [['']], { origin: 'A2' });
  }
  
  // Ajouter le worksheet au workbook
  XLSX.utils.book_append_sheet(wb, ws, "EVRC");
  
  // Générer le fichier Excel
  XLSX.writeFile(wb, filename);
};