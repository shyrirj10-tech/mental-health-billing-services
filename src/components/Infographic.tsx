import React, { useRef, useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  TrendingDown, 
  Users, 
  Code, 
  Send, 
  Zap,
  Globe,
  Mail,
  Phone,
  Download,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';

const Infographic: React.FC = () => {
  const infographicRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (infographicRef.current === null) return;
    
    setIsDownloading(true);
    try {
      // Small delay to ensure animations are finished
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const dataUrl = await toPng(infographicRef.current, { 
        cacheBust: true,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = 'mental-health-billing-ad.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading infographic:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Preparing Download...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download Ad as Image
            </>
          )}
        </button>
      </div>

      <div 
        ref={infographicRef}
        className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-200 font-sans"
      >
      {/* Header / Hero Section */}
      <div className="relative h-[400px] bg-slate-900 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Clinic" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-center px-12 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded mb-4">
              Industry Insight
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Why Mental Health Billing is <span className="text-blue-400">More Complex</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Navigating the intricacies of behavioral health reimbursement requires more than just standard billing practices. It requires specialization.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-0 border-b border-slate-200">
        {/* Problem Area */}
        <div className="p-10 bg-slate-50 border-r border-slate-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-red-100 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">The Problem Area</h2>
          </div>
          
          <ul className="space-y-6">
            {[
              { icon: Users, title: "Multiple Service Types", desc: "Individual, group, family, and crisis interventions each have unique requirements." },
              { icon: FileText, title: "Strict Documentation Rules", desc: "Payers demand meticulous clinical notes that align perfectly with CPT codes." },
              { icon: AlertCircle, title: "High Denial Risk", desc: "Minor coding errors or missing authorizations lead to immediate claim rejections." },
              { icon: TrendingDown, title: "Complex Reimbursement", desc: "Varying rates across different providers and insurance panels create cash flow gaps." }
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="mt-1">
                  <item.icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Solution Area */}
        <div className="p-10 bg-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">The Solution Area</h2>
          </div>
          
          <ul className="space-y-6">
            {[
              { icon: Zap, title: "Specialized Billing Team", desc: "Experts who understand the nuances of behavioral health and payer policies." },
              { icon: Code, title: "Accurate CPT & ICD-10 Coding", desc: "Ensuring every service is captured with the most precise and compliant codes." },
              { icon: Send, title: "Clean Claim Submission", desc: "Rigorous scrubbing processes that result in 98%+ first-pass acceptance rates." },
              { icon: Globe, title: "Faster Reimbursements", desc: "Streamlined workflows that reduce Days in AR and stabilize your clinic's revenue." }
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="mt-1">
                  <item.icon className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Area */}
      <div className="p-12 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Revenue?</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Stop leaving money on the table. Our specialized team handles the complexity so you can focus on your patients.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
            Book a Free Consultation Today
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>www.mentalhealthbilling.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>contact@clinicbilling.pro</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>(555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Infographic;
