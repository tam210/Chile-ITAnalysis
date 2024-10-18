# Chile-ITAnalysis

## Herramientas 
- [x] Thunder Client para realizar peticiones HTTP
- [x] MongoDB Compass para interactuar con la BD
- [x] API KEY de OpenAI (secret key)

## Tareas completadas
- [x] Creación y conexión a BD
- [x] Ruta **api/scrape** para obtener trabajos de página y guardarlos en la BD
- [x] Ruta **api/scrape-tech-test** para testear función de obtención de tecnologías vía descripción *(reevaluar función)*


### Errores, problemas, limitaciones
- [ ] Uso de API limitado, ver otra alternativa o contramedida para obtener las tecnologías
- [ ] Evaluar si va muy lento y optimizar el programa

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
