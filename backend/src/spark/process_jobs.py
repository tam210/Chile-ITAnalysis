from pyspark.sql import SparkSession
from pyspark.sql.functions import regexp_extract, col, lower

# Crear la sesión de Spark
spark = SparkSession.builder.appName("Extraccion de Tecnologias").getOrCreate()

# Cargar el archivo CSV generado por el scraping
df = spark.read.csv("empleos.csv", header=True)

# Crear la expresión regular con las tecnologías a buscar
tecnologias_regex = r"(JavaScript|Python|Java|Go|Rust|TypeScript|Kotlin|React|Vue|Angular|Node.js|Docker|Kubernetes|AWS|GCP|Azure)"

# Usar regexp_extract para buscar las tecnologías en la columna 'description'
df = df.withColumn("tecnologias", regexp_extract(lower(col("description")), tecnologias_regex, 0))

# Mostrar el resultado
df.select("title", "company", "tecnologias").show(truncate=False)

# Guardar el resultado en un nuevo archivo CSV
df.write.csv("empleos_con_tecnologias.csv", header=True)

# Cerrar la sesión de Spark
spark.stop()
