# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

## Project-specific: Auto Physics Question (starter)

This repo now includes a simple front-end UI (`src/components/QuestionForm.js`) and a small Express proxy (`server/index.js`) that demonstrates how to forward prompts to Google Gemini / Vertex AI.

Quick steps:

1. Copy `.env.example` to `.env` and set your `GEMINI_API_KEY`.
2. In one terminal run the React dev server:

```powershell
npm start
```

3. In another terminal run the backend proxy:

```powershell
npm run server
```

The front-end will send POST /api/generate which is handled by the Express proxy.

Security notes:
- Do NOT commit your real API key. Keep it in environment variables or secret manager.
- For production use, prefer a service account flow / server-side auth instead of embedding an API key.

Gemini / Vertex AI integration notes:
- The included `server/index.js` shows a simple example calling the Generative Language endpoint.
- Depending on the exact API version and authentication method you use, you may need to adjust the endpoint, request body shape, and auth (OAuth2/service account).

Prompt tips for physics questions:
- Provide topic, desired difficulty, cognitive level (C1-C6), and expected format (essay/mcq/numeric).
- Example prompt: "Buat 3 soal fisika kelas 11 tentang gerak lurus, tingkat kesulitan sedang, tipe Multiple Choice, sertakan kunci dan pembahasan singkat."

Next steps you might want me to do:
- Wire a nicer UI, allow multiple questions, or save generated questions.
- Add proper error handling and retries for the backend.

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# Auto-Physics
