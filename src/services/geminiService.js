/**
 * Gemini API Service
 * Direct integration with Google Gemini API from frontend
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

class GeminiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp';
  }

  /**
   * Generate physics question using Gemini API
   */
  async generateQuestion(instruction, cognitiveLevel = 'C1 (Remember)', questionType = 'Essay') {
    if (!this.apiKey) {
      throw new Error('VITE_GEMINI_API_KEY not found. Please add your Gemini API key to .env file');
    }

    const prompt = this.buildPhysicsPrompt(instruction, cognitiveLevel, questionType);
    
    try {
      const response = await fetch(`${GEMINI_API_URL}/${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            topK: 64,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error (${response.status}): ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      // Extract text from response
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts[0].text;
      }
      
      throw new Error('Unexpected response format from Gemini API');
      
    } catch (error) {
      console.error('Gemini API call failed:', error);
      throw error;
    }
  }

  /**
   * Build enhanced prompt for physics questions optimized for Gemini 2.0 Flash
   */
  buildPhysicsPrompt(instruction, cognitiveLevel, questionType) {
    return `Anda adalah guru fisika SMA yang berpengalaman dan ahli dalam pembuatan soal. Buatlah soal fisika SMA yang berkualitas tinggi berdasarkan spesifikasi berikut:

📋 SPESIFIKASI SOAL:
• INSTRUKSI: ${instruction}
• LEVEL KOGNITIF: ${cognitiveLevel}
• TIPE SOAL: ${questionType}

🎯 PANDUAN PEMBUATAN:
1. Pastikan soal sesuai kurikulum Merdeka fisika SMA Indonesia
2. Gunakan bahasa Indonesia yang baku, jelas, dan mudah dipahami
3. Sertakan konteks nyata yang relevan dengan kehidupan sehari-hari siswa
4. Tingkat kesulitan sesuai dengan level kognitif yang diminta
5. Untuk soal pilihan ganda: berikan 5 opsi (A-E) dengan 1 jawaban benar dan distractor yang masuk akal
6. Untuk soal essay: buat pertanyaan yang mendorong penalaran dan penjelasan konsep
7. Untuk soal numerik: sertakan data lengkap dan satuan yang jelas

📝 FORMAT OUTPUT YANG DIINGINKAN:

**SOAL:**
[Tulis soal lengkap dengan konteks yang menarik dan data yang diperlukan]

${questionType === 'Multiple Choice' ? `**PILIHAN JAWABAN:**
A. [Opsi A dengan penjelasan yang masuk akal]
B. [Opsi B dengan penjelasan yang masuk akal]  
C. [Opsi C dengan penjelasan yang masuk akal]
D. [Opsi D dengan penjelasan yang masuk akal]
E. [Opsi E dengan penjelasan yang masuk akal]` : ''}

**KUNCI JAWABAN:**
[Jawaban yang benar dengan alasan singkat]

**PEMBAHASAN:**
[Penjelasan step-by-step yang detail dan mudah dipahami, termasuk rumus fisika yang digunakan, perhitungan (jika ada), dan konsep fisika yang terlibat]

**KONSEP FISIKA:**
[Sebutkan konsep/materi fisika utama yang diuji dalam soal ini]

Buatlah soal sekarang berdasarkan instruksi di atas. Pastikan soal menantang namun fair untuk level SMA:`;
  }

  /**
   * Check if API key is configured
   */
  isConfigured() {
    return !!this.apiKey;
  }

  /**
   * Get configuration status
   */
  getStatus() {
    return {
      hasApiKey: !!this.apiKey,
      model: this.model,
      ready: !!this.apiKey
    };
  }
}

// Export singleton instance
export const geminiService = new GeminiService();
export default geminiService;