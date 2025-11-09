import { useState } from 'react'
import QuestionGenerator from './components/QuestionGenerator'
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Auto Physics Question Generator
            </h1>
            <p className="text-gray-600">
              AI-powered automatic math question generation for high school level
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Developed by <span className="text-primary-600 font-medium">Viane</span>
            </p>
          </div>
          <QuestionGenerator />
        </div>
      </main>
    </div>
  )
}

export default App