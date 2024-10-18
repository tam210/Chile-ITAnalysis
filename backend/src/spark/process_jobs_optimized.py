import time
from pyspark.sql import SparkSession
from pyspark.sql.functions import explode, lower, col, count, when, array, broadcast

# Medir tiempo de ejecución de Spark
startSparkTime = time.time()

# Crear la sesión de Spark
spark = SparkSession.builder \
    .appName("Extraccion y Analisis de Tecnologias") \
    .config("spark.sql.shuffle.partitions", "2") \
    .getOrCreate()
1
# Cargar el archivo CSV generado por el scraping con el delimitador ';'
df = spark.read.csv("../../empleos.csv", header=True, sep=';')

# Filtrar filas con descripciones vacías
df = df.filter(col("description").isNotNull() & (col("description") != ""))

# Seleccionar solo la columna 'description' y eliminar el resto
df = df.select("description")

# Crear una lista de tecnologías
tecnologias = [
    "JavaScript", "Python", "Java", "Go", "Rust",
    "TypeScript", "Kotlin", "React", "Vue", "Angular",
    "Node.js", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
    "C#", "PHP", "Ruby", "Swift", "Scala", "Elixir",
    "Perl", "C++", "C", "R", "MATLAB",
    "HTML", "CSS", "Sass", "Tailwind CSS",
    "GraphQL", "gRPC", "Microservicios", "Sin servidor",
    "Next", "Nuxt", "Django", "Flask", "Spring",
    "Ruby on Rails", "Laravel", "Express", "FastAPI",
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra",
    "Elasticsearch", "Firebase", "Apache Kafka", "RabbitMQ",
    "Terraform", "Ansible", "Jenkins", "Git", "GitHub",
    "Bitbucket", "Prometheus", "Grafana",
    "Aprendizaje Automático", "Aprendizaje Profundo", "TensorFlow", "PyTorch",
    "Scikit-learn", "Keras", "NLP", "ML",
    "Ciencia de Datos", "Big Data", "Hadoop", "Apache Spark",
    "Lagos de Datos", "Almacenamiento de Datos", "ETL", "Inteligencia Empresarial",
    "DevOps", "Ágil", "Scrum", "Kanban", "JIRA", "Power Automate", "Power Apps",
    "SQL", "NoSQL",
    "Redis", "Memcached",
    "Virtualización", "Docker Swarm", "OpenShift",
    "CI/CD", "GitOps",
    "WebSockets", "APIs RESTful", "SOAP",
    "Grafos", "Neo4j", "InfluxDB", "Apache Flink",
    "Minería de Datos", "Análisis de Datos",
    "MLOps", "DataOps",
    "Service Mesh", "Istio", "Linkerd", "Infraestructura como Código (IaC)",
    "Blockchain", "IoT", "5G", "UX/UI",
    "DevSecOps", "SRE", "API"
]

# Crear un DataFrame de tecnologías usando broadcast
tecnologias_df = broadcast(spark.createDataFrame([(t,) for t in tecnologias], ["tecnologia"]))

# Marcar las tecnologías presentes en la descripción
df_with_tech = df.crossJoin(tecnologias_df) \
    .withColumn("present", when(lower(col("description")).contains(lower(col("tecnologia"))), 1).otherwise(0))

# Contar las tecnologías presentes
top_tecnologias = df_with_tech.filter(col("present") == 1) \
    .groupBy("tecnologia").agg(count("*").alias("count")).orderBy(col("count").desc())

# Mostrar el resultado
top_tecnologias.show(truncate=False)

# Guardar el resultado en un nuevo archivo CSV
top_tecnologias.write.csv("top_tecnologias_op.csv", header=True)

endSparkTime = time.time()
sparkElapsedTime = endSparkTime - startSparkTime
print(f"Tiempo de ejecución de Spark: {sparkElapsedTime:.2f} segundos")

# Cerrar la sesión de Spark
spark.stop()