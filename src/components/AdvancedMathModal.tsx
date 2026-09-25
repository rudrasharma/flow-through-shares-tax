import { FlowThroughOutputs } from '../calculator/types';
import { PlainEnglishMath } from './PlainEnglishMath';
import { X } from 'lucide-react';

interface AdvancedMathModalProps {
  isOpen: boolean;
  onClose: () => void;
  outputs: FlowThroughOutputs;
}

export function AdvancedMathModal({ isOpen, onClose, outputs }: AdvancedMathModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div>
            <h3 className="text-xl font-bold text-white">The Math Explained</h3>
            <p className="text-sm text-slate-400 mt-1">A simple breakdown of where your money goes</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <PlainEnglishMath outputs={outputs} />
        </div>
      </div>
    </div>
  );
}
