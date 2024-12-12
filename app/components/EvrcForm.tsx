import React from 'react';
import { type FormData, type ChemicalProduct } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { InfoIcon, ChevronsUpDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';

interface EvrcFormProps {
  formData: FormData;
  selectedCategory: string;
  categories: string[];
  filteredProducts: ChemicalProduct[];
  onFormChange: (field: keyof FormData, value: string) => void;
  onCategoryChange: (value: string) => void;
}

interface ProductSelectProps {
  products: ChemicalProduct[];
  value: string;
  onChange: (value: string) => void;
}

interface CategorySelectProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect = ({ categories, value, onChange }: CategorySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const selectedCategory = categories.find(c => c === value) || 'all';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory === 'all' ? 'Toutes les catégories' : selectedCategory}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <div className="max-h-[300px] overflow-y-auto divide-y">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onChange(category);
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              {category === 'all' ? 'Toutes les catégories' : category}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ProductSelect = ({ products, value, onChange }: ProductSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const selectedProduct = products.find(p => p.cas === value);

  const filteredProducts = React.useMemo(() => 
    products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.cas.toLowerCase().includes(searchQuery.toLowerCase())
    ), [products, searchQuery]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedProduct ? (
            <div className="flex items-center justify-between w-full">
              <span className="truncate">{selectedProduct.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{selectedProduct.cas}</span>
                {selectedProduct.cmr && (
                  <Badge variant="destructive">CMR</Badge>
                )}
              </div>
            </div>
          ) : (
            "Sélectionner un produit..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <div className="w-full">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="max-h-[300px] overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="py-6 text-center text-sm">Aucun produit trouvé.</div>
            ) : (
              <div className="divide-y">
                {filteredProducts.map((product) => (
                  <button
                    key={product.cas}
                    onClick={() => {
                      onChange(product.cas);
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{product.cas}</span>
                      {product.cmr && (
                        <Badge variant="destructive">CMR</Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};


const EvrcForm = ({
  formData,
  selectedCategory,
  categories,
  filteredProducts,
  onFormChange,
  onCategoryChange
}: EvrcFormProps) => {
  const selectedProduct = filteredProducts.find(p => p.cas === formData.product);

  return (
    <div className="space-y-6">
      {/* Champ Zone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Zone / Localisation
        </label>
        <Input
          placeholder="Ex: Bâtiment K1 - Labo L121"
          value={formData.zone || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('zone', e.target.value)}
          className="max-w-lg"
        />
      </div>

      {/* Grille de sélection principale */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie de produit
          </label>
          <CategorySelect 
            categories={categories}
            value={selectedCategory}
            onChange={onCategoryChange}
          />
        </div>

        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Produit chimique
          </label>
          <ProductSelect 
            products={filteredProducts}
            value={formData.product}
            onChange={(value) => onFormChange('product', value)}
          />
        </div>

        {selectedProduct && (
          <>
            {/* Information produit */}
            <div className="lg:col-span-5">
              <Card className="bg-blue-50 border-blue-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-blue-900">Informations produit</h4>
                    <div className="text-sm text-blue-700 space-x-4">
                      <span>État physique: {selectedProduct.physicalState}</span>
                      <span>•</span>
                      <span>VLEP: {selectedProduct.vlep} ppm</span>
                      <span>•</span>
                      <span>Pression de vapeur: {selectedProduct.vaporPressure} hPa</span>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="w-5 h-5 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Mentions de danger: {selectedProduct.mentions.join(', ')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Card>
            </div>

            {/* Champ Utilisation */}
            <div className="lg:col-span-5 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Utilisation
              </label>
              <Input
                placeholder="Ex: Solvant de nettoyage, Réactif, Encre, Spray, Barbotine..."
                value={formData.usage || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('usage', e.target.value)}
              />
            </div>
          </>
        )}

        {/* Conditions d'utilisation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confinement
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {formData.confinement ? 
                  {
                    "1": "Sans ventilation",
                    "2": "Ventilation locale",
                    "3": "Ventilation efficace",
                    "4": "Sorbonne",
                    "5": "Système clos"
                  }[formData.confinement] 
                  : "Niveau de confinement"
                }
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <div className="divide-y">
                {[
                  {value: "1", label: "Sans ventilation"},
                  {value: "2", label: "Ventilation locale (ex: bras aspirant)"},
                  {value: "3", label: "Ventilation efficace (ex: ventilation générale)"},
                  {value: "4", label: "Sorbonne"},
                  {value: "5", label: "Système clos"}
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onFormChange('confinement', option.value)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durée/jour
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {formData.duration ? 
                  {
                    "<5": "< 5 min",
                    "5-45": "5 - 45 min",
                    "45-480": "> 45 min"
                  }[formData.duration] 
                  : "Durée d'utilisation"
                }
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <div className="divide-y">
                {[
                  {value: "<5", label: "< 5 min"},
                  {value: "5-45", label: "5 - 45 min"},
                  {value: "45-480", label: "> 45 min"}
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onFormChange('duration', option.value)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fréquence
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {formData.frequency ? 
                  {
                    "<1/mois": "< 1 fois/mois",
                    "1-3/mois": "1 - 3 fois/mois",
                    ">1/semaine": "> 1 fois/semaine"
                  }[formData.frequency] 
                  : "Fréquence d'utilisation"
                }
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <div className="divide-y">
                {[
                  {value: "<1/mois", label: "< 1 fois/mois"},
                  {value: "1-3/mois", label: "1 - 3 fois/mois"},
                  {value: ">1/semaine", label: "> 1 fois/semaine"}
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onFormChange('frequency', option.value)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Température (°C)
            <span className="text-gray-400 text-xs ml-1">optionnel</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {formData.temperature ? 
                  {
                    "ambient": "Ambiante (~20°C)",
                    "low": "Basse (<10°C)",
                    "high": "Élevée (>30°C)",
                    "very-high": "Très élevée (>50°C)"
                  }[formData.temperature] 
                  : "Température"
                }
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <div className="divide-y">
                {[
                  {value: "ambient", label: "Ambiante (~20°C)"},
                  {value: "low", label: "Basse (<10°C)"},
                  {value: "high", label: "Élevée (>30°C)"},
                  {value: "very-high", label: "Très élevée (>50°C)"}
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onFormChange('temperature', option.value)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default EvrcForm;