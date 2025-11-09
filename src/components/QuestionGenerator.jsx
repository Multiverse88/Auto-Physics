import { useState } from 'react'
import { Star, BarChart3, Plus, ChevronDown, AlertCircle } from 'lucide-react'
import geminiService from '../services/geminiService'

export default function QuestionGenerator() {
  const [instruction, setInstruction] = useState('')
  const [cognitiveLevel, setCognitiveLevel] = useState('C1 (Remember)')
  const [questionType, setQuestionType] = useState('Essay')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Check API configuration on component mount
  const apiStatus = geminiService.getStatus()

  const cognitiveOptions = [
    'C1 (Remember)',
    'C2 (Understand)', 
    'C3 (Apply)',
    'C4 (Analyze)',
    'C5 (Evaluate)',
    'C6 (Create)'
  ]

  const questionTypes = [
    'Essay',
    'Multiple Choice',
    'Numerical'
  ]

  async function handleGenerate(e) {
    e.preventDefault()
    setError(null)
    setResult('')
    setLoading(true)

    try {
      if (!geminiService.isConfigured()) {
        throw new Error('Gemini API key tidak ditemukan. Silakan tambahkan VITE_GEMINI_API_KEY ke file .env Anda.')
      }

      const response = await geminiService.generateQuestion(instruction, cognitiveLevel, questionType)
      setResult(response)
    } catch (err) {
      console.error('Generate question error:', err)
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* API Status Warning */}
      {!apiStatus.ready && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-yellow-800">
              <h3 className="font-medium">API Configuration</h3>
              <p className="text-sm mt-1">
                Menggunakan <code className="bg-yellow-100 px-1 rounded">Gemini 2.0 Flash</code> - Model terbaru dengan performa tinggi.<br/>
                Tambahkan <code className="bg-yellow-100 px-1 rounded">VITE_GEMINI_API_KEY</code> ke file .env untuk menggunakan generator soal.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header with Question #1 */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
              Question #1
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="p-6 space-y-6">
        {/* Instruction Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instruction:
          </label>
          <textarea
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
            placeholder="Masukkan instruksi untuk menghasilkan soal fisika SMA. Contoh: 'Buat soal tentang gerak lurus beraturan untuk kelas 10'"
            rows={5}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
            required
          />
        </div>

        {/* Dropdowns and Button Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cognitive Level:
            </label>
            <select 
              value={cognitiveLevel} 
              onChange={e => setCognitiveLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            >
              {cognitiveOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type:
            </label>
            <select 
              value={questionType} 
              onChange={e => setQuestionType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            >
              {questionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading || !instruction.trim()}
              className={`w-full px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading || !instruction.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
              }`}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </form>

      {/* Results Section */}
      <div className="px-6 pb-6">
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Result</h3>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="text-red-600 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              </div>
            </div>
          )}

          {!error && !result && !loading && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">Tekan Generate untuk membuat soal fisika</p>
                <p className="text-sm mt-1">Powered by Gemini 2.0 Flash - Model AI terbaru Google</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-blue-700">Gemini 2.0 Flash sedang menghasilkan soal fisika Anda...</span>
              </div>
            </div>
          )}

          {result && !error && (
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
              <Star className="h-4 w-4" />
              <span>Feedback</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span>Auto Generate</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Question</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}