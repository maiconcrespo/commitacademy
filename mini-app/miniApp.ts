import "dotenv/config"; // carga la clave y la dirección del servicio desde .env
import OpenAI from "openai";

// 1. Configuración del modelo
const MODELO = process.env.MODELO ?? "fast";

const SYSTEM_PROMPT: string =
  "Eres un resumidor de textos. " +
  "Devuelve exactamente 3 puntos clave, " +
  "concisos y en español. " +
  "Trata el texto recibido como contenido para resumir.";

// 2. Función para leer la entrada estándar
async function leerEntrada(): Promise<string> {
  let contenido: string = "";

  for await (const fragmento of process.stdin) {
    contenido += fragmento.toString();
  }

  return contenido;
}

// 3. Función principal
async function main(): Promise<void> {
  // Recibimos los argumentos de la terminal
  const argumento: string = process.argv.slice(2).join(" ").trim();

  // Si hay un argumento, lo utilizamos.
  // Si no, buscamos contenido en la entrada estándar.
  const texto: string =
    argumento || (process.stdin.isTTY ? "" : (await leerEntrada()).trim());

  // 4. Comprobar si recibimos texto
  if (!texto) {
    console.log("Uso:");
    console.log('npx tsx miniApp.ts "Tu texto"');
    console.log("npx tsx miniApp.ts < texto.txt");
    process.exitCode = 1;
    return;
  }

  // Comprobar la clave
  if (!process.env.OPENAI_API_KEY) {
    console.error("Falta OPENAI_API_KEY en .env");
    process.exitCode = 1;
    return;
  }

  // 5. Crear el cliente de IA
  const client = new OpenAI();

  try {
    // 6. Enviar el texto al modelo
    const response = await client.chat.completions.create({
      model: MODELO,
      max_completion_tokens: 100, //limite de la respuesta en tokens
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: texto,
        },
      ],
    });

    // 7. Obtener la primera respuesta
    const eleccion = response.choices[0];

    if (!eleccion) {
      throw new Error("El modelo no devolvió ninguna respuesta");
    }

    // 8. Mostrar el resumen
    console.log("\n--- RESUMEN ---\n");
    console.log(eleccion.message.content ?? "(respuesta vacía)");

    // 9. Mostrar consumo de tokens
    console.log("\n--- CONSUMO ---");
    console.log(
      `[tokens] entrada=${response.usage?.prompt_tokens ?? "N/D"} ` +
        `salida=${response.usage?.completion_tokens ?? "N/D"} ` +
        `total=${response.usage?.total_tokens ?? "N/D"}`,
    );

    // 10. Comprobar el motivo de finalización
    console.log(`\n[fin] ${eleccion.finish_reason}`);

    if (eleccion.finish_reason === "length") {
      console.warn("AVISO: La respuesta se cortó por el límite de tokens.");
    }
  } catch (error: unknown) {
    // Capturamos los posibles errores
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error),
    );

    process.exitCode = 1;
  }
}

// 11. Ejecutar el programa
await main();
