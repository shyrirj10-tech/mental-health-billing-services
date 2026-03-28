import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Image as ImageIcon, Sparkles, Download, RefreshCw } from 'lucide-react';
import '../types';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('A modern mental health clinic office, doctor and billing expert reviewing digital claims on a tablet, professional blue and white theme, high quality, cinematic lighting');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    // Check if API key is selected (Required for gemini-3.1-flash-image-preview)
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Proceeding after opening key selection (as per instructions to avoid race conditions)
      }
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      // Create a new instance right before making the call to ensure it uses the latest key
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        },
      });

      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        throw new Error("No image data received from the model.");
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-8 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-800">AI Ad Concept Generator</h2>
      </div>
      
      <p className="text-slate-600 mb-6">
        Use the power of Gemini 3.1 Flash to create custom visual concepts for your mental health billing ads.
      </p>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
        <p className="font-semibold mb-1">Note for Image Generation:</p>
        <p>
          This feature requires a paid Gemini API key. If you haven't selected one, you'll be prompted to do so. 
          Learn more about <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline font-bold">Gemini API billing</a>.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 mb-2">
            Visual Concept Prompt
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-slate-800"
            placeholder="Describe the visual you want to create..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button
          onClick={generateImage}
          disabled={isGenerating || !prompt.trim()}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Concept...
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              Generate Visual
            </>
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="mt-8">
          {generatedImage ? (
            <div className="relative group rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <img 
                src={generatedImage} 
                alt="Generated Concept" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <a 
                  href={generatedImage} 
                  download="ad-concept.png"
                  className="p-3 bg-white text-slate-900 rounded-full hover:bg-blue-50 transition-colors"
                  title="Download Image"
                >
                  <Download className="w-6 h-6" />
                </a>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
              <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
              <p className="text-sm">Your generated visual will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
