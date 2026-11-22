crear con tu editor un archivo llamado .env con tu clave

OPENAI_API_KEY=<tu clave del curso>
OPENAI_BASE_URL=<url base de tu modelo>
MODELO=<modelo que quieres usar>

    OPENAI_BASE_URL es imprescindible: sin esa línea, la petición va a OpenAI y falla aunque la clave sea correcta.
    La clave va solo en este archivo, nunca en el código.

en el directorio mini-app, ejecuta:

    npm init -y

npm pkg set type=module
npm install openai dotenv
npm install --save-dev tsx

USO:

npx tsx miniApp.ts "Tu texto"
npx tsx miniApp.ts < texto.txt
