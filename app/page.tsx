'use client';

import { useState } from 'react';
import { type FormData, type ChemicalProduct, type EvaluationResult } from './types';
import EvrcForm from './components/EvrcForm';
import ResultsTable from './components/ResultsTable';
import ActionButtons from './components/ActionButtons';
import { ChemicalDatabaseService } from './database/chemicalDatabase';
import { exportToExcel } from './utils/exportUtils';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Database, FileSpreadsheet, Mail, Globe, Github } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';

const dbService = new ChemicalDatabaseService();

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    product: '',
    confinement: '4',
    duration: '45-480',
    frequency: '>1/semaine',
    usage: '',            
    temperature: '',      
    zone: ''  
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedResults, setSavedResults] = useState<EvaluationResult[]>([]);

  const categories = dbService.getCategories();
  const filteredProducts = dbService.getProductsByCategory(selectedCategory);

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateRiskLevel = (
    product: ChemicalProduct, 
    conditions: FormData
  ): Omit<EvaluationResult, 'id' | 'product' | 'workConditions'> => {
    const IC = parseInt(conditions.confinement);
    
    let ID = 0;
    switch(conditions.duration) {
      case '<5': ID = 2; break;
      case '5-45': ID = 1; break;
      case '45-480': ID = 0; break;
      default: ID = 0;
    }
    
    let IF = 0;
    switch(conditions.frequency) {
      case '<1/mois': IF = 2; break;
      case '1-3/mois': IF = 1; break;
      case '>1/semaine': IF = 0; break;
      default: IF = 0;
    }
    
    let IPC = 0;
    if(product.vaporPressure > 70) IPC = -1;
    else if(product.vaporPressure >= 1) IPC = 0;
    else IPC = 1;

    const protectionIndex = {
      total: IC + ID + IF + IPC,
      details: { IC, ID, IF, IPC }
    };

    const dangerIndex = product.cmr ? 5 : 
      product.vlep >= 100 ? 1 :
      product.vlep >= 10 ? 2 :
      product.vlep >= 1 ? 3 :
      product.vlep >= 0.1 ? 4 : 5;

    let riskLevel;
    if(product.cmr) {
      riskLevel = protectionIndex.total <= 3 ? 3 : 2;
    } else {
      if(protectionIndex.total <= 1) riskLevel = 3;
      else if(protectionIndex.total <= 3) riskLevel = 2;
      else if(protectionIndex.total <= 4) riskLevel = 1;
      else riskLevel = 0;
    }

    const needsMonitoring = Boolean(riskLevel >= 2 || product.cmr);

    return {
      dangerIndex,
      protectionIndex,
      riskLevel,
      needsMonitoring
    };
  };

  const handleAdd = () => {
    console.log('Adding product:', formData.product);
    const selectedProduct = dbService.getProduct(formData.product);
    if (!selectedProduct) {
      console.log('No product selected');
      return;
    }

    const results = calculateRiskLevel(selectedProduct, formData);
    
    setSavedResults(prev => [...prev, {
      id: Date.now(),
      product: selectedProduct,
      workConditions: {...formData},
      ...results
    }]);

    setFormData(prev => ({ ...prev, product: '' }));
  };

  const handleExport = () => {
    if (savedResults.length === 0) return;
    const filename = `evaluation_risque_chimique_${new Date().toISOString().split('T')[0]}.xlsx`;
    exportToExcel(savedResults, filename);
  };

  const handleRemove = (id: number) => {
    setSavedResults(prev => prev.filter(result => result.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Évaluation du Risque Chimique
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Assistant intelligent d'évaluation des risques chimiques selon la méthode INRS
          </p>
          <p className="text-sm text-amber-600 max-w-3xl mx-auto leading-relaxed mt-2">🧪 Version beta - On fait de notre mieux, blâmez l'animateur sécurité s'il y a des erreus ! 🔬</p>

          {/* Stats rapides avec animation au hover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <Database className="h-6 w-6 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-900">{dbService.getAllProducts().length}</div>
              <div className="text-sm text-blue-700">Produits en base</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <FileSpreadsheet className="h-6 w-6 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-900">{categories.length - 1}</div>
              <div className="text-sm text-purple-700">Catégories</div>
            </div>
          </div>
        </div>

        {/* Carte principale */}
        <Card className="backdrop-blur-sm bg-white/95 shadow-xl rounded-xl overflow-hidden border border-indigo-100">
          <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Nouvelle évaluation
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Complétez le formulaire ci-dessous pour évaluer un produit
                </p>
              </div>
              {savedResults.length > 0 && (
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm">
                  {savedResults.length} produit{savedResults.length > 1 ? 's' : ''} ajouté{savedResults.length > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8 bg-gradient-to-br from-white to-blue-50/30">
            <div className="bg-white p-8 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
              <EvrcForm
                formData={formData}
                selectedCategory={selectedCategory}
                categories={categories}
                filteredProducts={filteredProducts}
                onFormChange={handleFormChange}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {formData.product && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Un produit est sélectionné. Cliquez sur "Ajouter à l'évaluation" pour l'inclure dans votre analyse.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end gap-4">
              <ActionButtons
                onAdd={handleAdd}
                onExport={handleExport}
                disabled={formData.product === ''}
                hasResults={savedResults.length > 0}
              />
            </div>

            {savedResults.length > 0 && (
              <>
                <div className="relative my-8">
                  <Separator className="my-4" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                    <h3 className="text-gray-500 text-sm font-medium">
                      Résultats de l'évaluation
                    </h3>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-indigo-100 shadow-sm overflow-hidden">
                  <ResultsTable
                    results={savedResults}
                    onRemove={handleRemove}
                  />
                </div>
              </>
            )}

            {savedResults.length === 0 && (
              <div className="text-center py-12 space-y-3">
                <div className="text-gray-400 flex justify-center">
                  <AlertCircle className="h-12 w-12" />
                </div>
                <p className="text-gray-600 font-medium">Aucune évaluation enregistrée</p>
                <p className="text-sm text-gray-500">
                  Sélectionnez un produit et ses conditions d'utilisation pour commencer l'évaluation
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer avec dégradé subtil */}
        <footer className="rounded-lg bg-gradient-to-br from-gray-50 to-blue-50 shadow-sm border border-blue-100 p-8 mt-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* À propos */}
              <div className="hover:bg-white/50 p-4 rounded-lg transition-colors">
                <h3 className="font-semibold text-gray-900 mb-3">À propos</h3>
                <p className="text-sm text-gray-600">
                  Base de données non exhaustive mise à jour régulièrement. Version 2024.
                </p>
              </div>

              {/* Contact */}
              <div className="hover:bg-white/50 p-4 rounded-lg transition-colors">
                <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
                <div className="space-y-2">
                  <Link href="mailto:contact@example.com" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
                    <Mail className="h-4 w-4" />
                    nabil.brag@cea.fr
                  </Link>
                </div>
              </div>

              {/* Liens */}
              <div className="hover:bg-white/50 p-4 rounded-lg transition-colors">
                <h3 className="font-semibold text-gray-900 mb-3">Liens utiles</h3>
                <div className="space-y-2">
                  <Link href="https://www.inrs.fr/publications/bdd/fichetox.html" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
                    <Globe className="h-4 w-4" />
                    INRS - Fiches toxicologiques
                  </Link>
                  <Link href="https://github.com/votre-repo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
                    <Github className="h-4 w-4" />
                    Documentation
                  </Link>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="text-center text-sm text-gray-600">
              <p>© 2024 - Tous droits réservés</p>
              <p className="mt-1">Utilisez cet outil comme support à votre évaluation professionnelle des risques</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}