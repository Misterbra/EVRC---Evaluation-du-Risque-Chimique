import { type EvaluationResult } from '../types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Trash2, AlertCircle } from 'lucide-react';

interface ResultsTableProps {
  results: EvaluationResult[];
  onRemove: (id: number) => void;
}

const getRiskLevelStyle = (level: number): string => {
  switch(level) {
    case 0: return 'bg-green-100 text-green-800';
    case 1: return 'bg-yellow-100 text-yellow-800';
    case 2: return 'bg-orange-100 text-orange-800';
    case 3: return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getRiskLevelText = (level: number): string => {
  switch(level) {
    case 0: return 'Négligeable';
    case 1: return 'Faible';
    case 2: return 'Modéré';
    case 3: return 'Élevé';
    default: return 'Non évalué';
  }
};

const ResultsTable = ({ results, onRemove }: ResultsTableProps) => {
  return (
    <Table>
      <TableCaption>Liste des produits évalués</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Produit</TableHead>
          <TableHead className="text-center">Catégorie</TableHead>
          <TableHead className="text-center">Indice de danger</TableHead>
          <TableHead className="text-center">Protection</TableHead>
          <TableHead className="text-center">Niveau de risque</TableHead>
          <TableHead className="text-center">Contrôle requis</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.id}>
            <TableCell>
              <div>
                <span className="font-medium">{result.product.name}</span>
                {result.product.cmr && (
                  <Badge variant="destructive" className="ml-2">CMR</Badge>
                )}
                <div className="text-sm text-gray-500">
                  {result.product.cas}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="outline">{result.product.category}</Badge>
            </TableCell>
            <TableCell className="text-center font-medium">
              {result.dangerIndex}
            </TableCell>
            <TableCell className="text-center">
              <div className="font-medium">{result.protectionIndex.total}</div>
              <div className="text-xs text-gray-500">
                IC:{result.protectionIndex.details.IC} | 
                ID:{result.protectionIndex.details.ID} | 
                IF:{result.protectionIndex.details.IF} | 
                IPC:{result.protectionIndex.details.IPC}
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Badge className={getRiskLevelStyle(result.riskLevel)}>
                {getRiskLevelText(result.riskLevel)}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              {result.needsMonitoring ? (
                <div className="flex items-center justify-center text-amber-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>Requis</span>
                </div>
              ) : (
                <span className="text-green-600">Non requis</span>
              )}
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(result.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResultsTable;