import React, { useState, useRef, useEffect } from 'react';
import { Shield, AlertCircle, Clock, CheckCircle2, ImagePlus, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult("Benign melanocytic nevus (98% confidence)");
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
      >
        {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
      </motion.button>

      <div className="container mx-auto px-4 py-12">
        {/* Logo and Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6"
          >
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-12 h-12 text-blue-500 dark:text-blue-400" />
              <h1 className="text-4xl font-bold text-blue-500 dark:text-blue-400">DermAI Guard</h1>
            </div>
          </motion.div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Advanced skin analysis powered by cutting-edge AI technology. Early detection for better protection.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: <Shield className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />,
              title: "Highly Accurate",
              description: "Advanced deep learning model trained on thousands of cases"
            },
            {
              icon: <Clock className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />,
              title: "Instant Results",
              description: "Get analysis results within seconds"
            },
            {
              icon: <AlertCircle className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />,
              title: "Early Detection",
              description: "Identify potential issues before they become serious"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Upload Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className={`border-4 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600'
            } dark:bg-gray-800`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <AnimatePresence mode="wait">
              {!selectedImage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ImagePlus className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Upload Skin Image</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Drag and drop your image here or click to select</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Select Image
                  </motion.button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.img
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    src={selectedImage}
                    alt="Uploaded skin"
                    className="max-w-full max-h-64 mx-auto rounded-lg mb-4"
                  />
                  {isAnalyzing ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <p className="text-gray-600 dark:text-gray-300">Analyzing image...</p>
                    </motion.div>
                  ) : result ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-2 justify-center mb-2">
                        <CheckCircle2 className="text-green-500" />
                        <h4 className="font-semibold text-green-800 dark:text-green-400">Analysis Complete</h4>
                      </div>
                      <p className="text-green-700 dark:text-green-400">{result}</p>
                    </motion.div>
                  ) : null}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                    }}
                    className="mt-4 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                  >
                    Upload a different image
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm"
        >
          <p>
            This tool is for preliminary screening only and should not replace professional medical advice.
            Always consult with a healthcare provider for proper diagnosis.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;