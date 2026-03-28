/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Infographic from './components/Infographic';
import ImageGenerator from './components/ImageGenerator';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <h1 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Ad Concept Preview</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Review your premium LinkedIn ad concept below. Use the AI generator at the bottom to iterate on visual styles.
          </p>
        </header>

        <main>
          <Infographic />
          <ImageGenerator />
        </main>

        <footer className="text-center text-slate-400 text-sm pt-12 border-t border-slate-200">
          <p>&copy; 2026 Mental Health Billing Solutions. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

