import time
from pyspark.sql import SparkSession
from pyspark.sql.functions import explode, lower, col, count, when, array, broadcast, regexp_extract

# Medir tiempo de ejecución de Spark
startSparkTime = time.time()

# Crear la sesión
spark = SparkSession.builder \
    .appName("Extraccion y Analisis de Tecnologias") \
    .config("spark.sql.shuffle.partitions", "2") \
    .getOrCreate()
# Configurar para evitar truncado
spark.conf.set("spark.sql.debug.maxToStringFields", "1000")

# Cargar el archivo CSV generado por el scraping con el delimitador ';'
df = spark.read.csv("../../empleos.csv", header=True, sep=';')

# Filtrar filas con descripciones vacías
df = df.filter(col("description").isNotNull() & (col("description") != ""))

# Seleccionar solo la columna 'description' y eliminar el resto (por ahora, pues más adelante
# se usarán las demás)
df = df.select("description")
# Crear una lista de tecnologías
tecnologias = [
    "JavaScript", "Python", "Java", "Go", "Rust", "NET", "Microsoft"
    "TypeScript", "Kotlin", "React", "Vue", "Angular",
    "Node", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
    "PHP", "Ruby", "Swift", "Scala", "Elixir",
    "Perl", "C", "R", "MATLAB",
    "HTML", "CSS", "Sass", "Tailwind",
    "GraphQL", "gRPC", "Microservicios",
    "Next", "Nuxt", "Django", "Flask", "Spring",
    "Laravel", "Express", "FastAPI",
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra",
    "Elasticsearch", "Firebase", "Kafka", "RabbitMQ",
    "Terraform", "Ansible", "Jenkins", "Git", "GitHub",
    "Bitbucket", "Prometheus", "Grafana",
    "Deep", "TensorFlow", "PyTorch",
    "Scikit", "Keras", "NLP", "ML", "Hadoop", "Spark",
    "Datalake", "ETL",
    "DevOps", "Agile", "Scrum", "Kanban", "JIRA", "Automate", "Apps",
    "SQL", "NoSQL",
    "Memcached", "OpenShift",
    "CI", "GitOps", "Database"
    "WebSockets", "RESTful", "SOAP",
    "Grafos", "Neo4j", "InfluxDB", "Flink",
    "MLOps", "DataOps", "Istio", "Linkerd", "IaC",
    "Blockchain", "IoT", "5G", "UX", "UI",
    "DevSecOps", "SRE", "API"
]

# Calcular el conteo de tecnologías presentes usando rlike directamente
conteos_tecnologias = [
    count(when(lower(col("description")).rlike(r"\b" + tech.lower() + r"\b"), tech)).alias(tech)
    for tech in tecnologias
]

# Seleccionamos el conteo de cada tecnología
df_summed = df.select(conteos_tecnologias)

# Ajustar la construcción del `stack`
# En lugar de usar comas directamente en el stack, vamos a usar una lista de pares 'tecnología', valor
stack_expression = ', '.join([f"'{tech}', {tech}" for tech in tecnologias])

# Transponer las columnas de tecnologías en filas
df_transposed = df_summed.selectExpr(f"stack({len(tecnologias)}, {stack_expression}) as (tecnologia, count)")

# Ordenar por las tecnologías más presentes
df_sorted = df_transposed.orderBy(col("count").desc())

# Mostrar el resultado
df_sorted.show(truncate=False)

# Guardar el resultado en un nuevo archivo CSV
df_sorted.write.csv("top_tecnologias_op_2.csv", header=True)

# Tracking del tiempo de ejecución
endSparkTime = time.time()
sparkElapsedTime = endSparkTime - startSparkTime
print(f"Tiempo de ejecución de Spark: {sparkElapsedTime:.2f} segundos")

# Cerrar la sesión de Spark
spark.stop()