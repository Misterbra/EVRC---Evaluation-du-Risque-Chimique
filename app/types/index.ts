export interface ChemicalProduct {
  cas: string;
  name: string;
  physicalState: 'Liquide' | 'Solide';
  vlep: number;
  vlepType?: string;
  vaporPressure: number;
  cmr?: boolean;
  mentions: string[];
  category: string;
}

export interface FormData {
  product: string;
  confinement: string;
  duration: string;
  frequency: string;
  temperature?: string;
  zone?: string;
  usage?: string;  // Nouveau champ pour l'utilisation
}

export interface ProtectionDetails {
  IC: number;
  ID: number;
  IF: number;
  IPC: number;
}

export interface EvaluationResult {
  id: number;
  product: ChemicalProduct;
  workConditions: FormData;
  dangerIndex: number;
  protectionIndex: {
    total: number;
    details: ProtectionDetails;
  };
  riskLevel: number;
  needsMonitoring: boolean;
}