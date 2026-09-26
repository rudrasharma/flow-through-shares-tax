import { useState, useMemo } from 'react';
import { CalculatorInputs, FlowThroughOutputs } from './calculator/types';
import { calculateFlowThrough, DEFAULT_FEE_RATE, DEFAULT_LIQUIDITY_FACTOR } from './calculator/flowThroughEngine';
import { Header } from './components/Header';
import { StepProgressBar } from './components/StepProgressBar';
import { WizardSteps } from './components/WizardSteps';
import { SimpleResultScreen } from './components/SimpleResultScreen';
import { AdvancedMathModal } from './components/AdvancedMathModal';
import { ShieldAlert } from 'lucide-react';

const DEFAULT_INPUTS: CalculatorInputs = {
  estimatedIncome: 350000,
  province: 'ON',
  purchaseAmount: 105000.00,
  creditType: 'critical_mineral',
  liquidityFactor: DEFAULT_LIQUIDITY_FACTOR,
  feeRate: DEFAULT_FEE_RATE,
  liquidityProceedsOverride: 70000.00,
  feeAmountOverride: 10735.73,
};

export function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  
  // Wizard state: 1 (Income/Prov), 2 (Amount), 3 (Result)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);

  const outputs: FlowThroughOutputs = useMemo(() => {
    return calculateFlowThrough(inputs);
  }, [inputs]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <Header onReset={handleReset} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        <StepProgressBar currentStep={step} onStepClick={setStep} />

        {step === 1 && (
          <WizardSteps 
            step={1} 
            inputs={inputs} 
            onChange={setInputs} 
            onNext={() => setStep(2)} 
            onBack={() => {}} 
          />
        )}
        
        {step === 2 && (
          <WizardSteps 
            step={2} 
            inputs={inputs} 
            onChange={setInputs} 
            onNext={() => setStep(3)} 
            onBack={() => setStep(1)} 
          />
        )}

        {step === 3 && (
          <SimpleResultScreen 
            outputs={outputs} 
            onReset={handleReset}
            onShowAdvanced={() => setIsAdvancedModalOpen(true)}
          />
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 text-slate-400 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center text-center">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Based on Canadian Income Tax Act flow-through provisions (ss. 66(12.6), 127(9), 127.5 Bill C-69). Results are estimates.
            </span>
          </div>
        </div>
      </footer>

      <AdvancedMathModal 
        isOpen={isAdvancedModalOpen} 
        onClose={() => setIsAdvancedModalOpen(false)} 
        outputs={outputs} 
      />
    </div>
  );
}

export default App;
