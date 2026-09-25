import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is this tax reduction strategy legal and recognized by the Canada Revenue Agency (CRA)?',
      a: 'Yes, 100%. Flow-through shares have been an explicit feature of the Canadian Income Tax Act since the 1970s (subsections 66(12.6) and 66.1(2)). The 30% Critical Mineral Exploration Tax Credit (CMETC) was enacted in Federal Budget 2022 and extended in Budget 2024 specifically to encourage private Canadian capital to finance domestic exploration of minerals like lithium, cobalt, nickel, and copper for clean technology and national security.'
    },
    {
      q: 'Why does the liquidity provider buy my shares at a discount to market price?',
      a: 'Under Canadian provincial securities laws, newly issued flow-through shares carry a mandatory 4-month resale restriction (hold period). An individual investor cannot sell them on the public stock exchange during this time. The pre-arranged institutional liquidity provider agrees to buy your shares immediately on Day 1 and assume the 4-month market volatility risk. The discount (~33%) is their fee for taking all downside stock market risk off your shoulders.'
    },
    {
      q: 'What is the Alternative Minimum Tax (AMT) and how does it protect or affect me?',
      a: 'The AMT is a parallel tax system enacted to ensure high-income taxpayers pay a minimum rate of tax. In 2024, Bill C-69 raised the exemption to $173,205 and the rate to 20.5%. If you are in the green "Safe Zone" on this calculator, your regular tax bill easily covers the minimum, so you receive 100% of your tax refund in Year 1. If you trigger AMT, the extra tax paid is not lost—it is banked with the CRA as a credit that reduces your taxes over the next 7 years.'
    },
    {
      q: 'What happens in Year 2 (2027) with the ITC income inclusion tax?',
      a: 'When you claim a 30% federal investment tax credit in Year 1, CRA rules require that the dollar credit amount be included in your taxable income in Year 2, creating a tax liability at your top marginal rate. You have two choices in Year 2: (1) Pay the tax and walk away with an overall 26.5% after-tax return (equivalent to a 57% guaranteed pre-tax GIC), or (2) Repeat the program with a new flow-through purchase to shelter the income inclusion and keep your full 63.4% return.'
    },
    {
      q: 'What income level do I need for flow-through shares to make sense?',
      a: 'Flow-through shares are most effective for Canadian tax residents in high tax brackets (ideally earning over $220,000 to $250,000+), where the combined marginal tax rate reaches 53.53% in Ontario. At lower income brackets (under $150,000), tax write-offs save tax at lower percentages, and you are more likely to run into non-refundable tax credit limits or AMT thresholds.'
    }
  ];

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">First-Time Investor FAQ</h2>
        </div>
        <span className="text-xs text-slate-400">Everything you need to know</span>
      </div>

      <div className="divide-y divide-slate-800">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-3">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex items-center justify-between w-full text-left text-xs font-semibold text-slate-200 hover:text-emerald-300 transition-colors gap-3"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="mt-2.5 text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
