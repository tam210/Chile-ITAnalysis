# Chile-ITAnalysis

## Herramientas 
- Thunder Client para realizar peticiones HTTP
- MongoDB Compass para interactuar con la BD
- API KEY de OpenAI (secret key)
- Apache Spark 

## Tareas completadas
- [x] Creación y conexión a BD
- [x] Ruta **api/scrape** para obtener trabajos de página y guardarlos en la BD
- [x] Ruta **api/scrape-tech-test** para testear función de obtención de tecnologías vía descripción *(reevaluar función)*
- [x] Script de conteo de tecnologías
- [x] Script de procesamiento del CSV con Apache Spark, con configuraciones varias (filtrado, nº particiones)


### Errores, problemas, limitaciones
- [ ] Uso de API limitado, ver otra alternativa o contramedida para obtener las tecnologías
- [ ] Evaluar si va muy lento y optimizar el programa
- [ ] Promedio de 60s por cada 30 registros de scraping

### Planteamiento 
**1. Obtención de datos vía scraping con Puppeteer y guardado en CSV** 
**2. **Lectura del CSV y extracción de tecnologías con Apache Spark** 
**2. **CSV con la frecuencia de las tecnologías**

# Registro de Tiempos de Ejecución según Hiperparámetros

| Hiperparámetro       | Valor   | Cantidad de registros | Tiempo de Ejecución (segundos) |
|----------------------|---------|-----------------------|--------------------------------|
| Número de Particiones| 100     |        300            |             12.43              |
| Número de Particiones| 2       |        300            |             11.35              |

# Registro de Tiempos de Ejecución de Scraping

| Cantidad de registros | Tiempo de Ejecución (segundos) |
|-----------------------|--------------------------------|
|       300             |             562.86             |
|       1000            |               ?                |
