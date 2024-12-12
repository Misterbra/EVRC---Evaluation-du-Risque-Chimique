import { Button } from '../../components/ui/button';
import { FileSpreadsheet, Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';
import { cn } from '../../lib/utils';

interface ActionButtonsProps {
  onAdd: () => void;
  onExport: () => void;
  disabled: boolean;
  hasResults: boolean;
}

const ActionButtons = ({ onAdd, onExport, disabled, hasResults }: ActionButtonsProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex gap-4 items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex">
              <Button
                onClick={onAdd}
                disabled={disabled}
                className={cn(
                  "bg-blue-600 hover:bg-blue-700 text-white gap-2 transition-all",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter à l'évaluation</span>
              </Button>
            </span>
          </TooltipTrigger>
          {disabled && (
            <TooltipContent side="bottom" className="bg-gray-800 text-white px-3 py-2">
              <p>Veuillez sélectionner un produit</p>
            </TooltipContent>
          )}
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex">
              <Button
                onClick={onExport}
                disabled={!hasResults}
                variant="outline"
                className={cn(
                  "gap-2 border-gray-300 hover:bg-gray-50 transition-all",
                  !hasResults && "opacity-50 cursor-not-allowed"
                )}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Exporter en Excel</span>
              </Button>
            </span>
          </TooltipTrigger>
          {!hasResults && (
            <TooltipContent side="bottom" className="bg-gray-800 text-white px-3 py-2">
              <p>Ajoutez au moins un produit pour pouvoir exporter</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ActionButtons;