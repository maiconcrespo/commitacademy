| Prueba | TKs entrada | TKs de salida | Resultado |
| --- | --- | --- | --- |
| 1 - Texto Corto | 132 | 134 | ok pero agrego cosas que no estaban en el texto |
| 2 - Texto Medium A | 274 | 177 | ok bien |
| 3- Texto Largo | 637 | 222 | Ok bien |
| 4 - Texto Medium B | 274 | 177 | OK bien |
| 5 - Texto Medium C | 274 | 176 | Ok bien |

**Análisis**

Responder en un párrafo corto a cada pregunta:

**Tokens:  **

**¿cómo crece el consumo con la longitud del texto?**

Aumenta el numero de tokens de entrada

**¿Qué parte del consumo controlas tú con el límite de longitud y qué parte no?**

Controlo el limite de salida de tokens el de entrada no.

**Variabilidad: **

**¿cambió el resultado entre ejecuciones?**

Si ha cambiado, alguna veces ha agregado informacion que no estaba

** ¿Qué cambiarías en las instrucciones para hacerlo más estable?**

La temperatura

**Trade-offs: **

**¿por qué el modelo que has elegido es suficiente para esta tarea?**

Porque son chats , de contexto simples pregunta y respuestas cortas.

** ¿Qué cambiarías si la tarea tuviera que procesar 10.000 textos al día?**

No cambiaria nada si cada texto se procesara de la misma manera, cada texto seria una llamada al app. Entraria en cola.
