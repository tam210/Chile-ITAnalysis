import time
from pyspark.sql import SparkSession
from pyspark.sql.functions import explode, lower, col, count, when, array

# Medir tiempo de ejecución de Spark
startSparkTime = time.time()
# Crear u
# Crear la sesión de Spark
spark = SparkSession.builder.appName("Extraccion y Analisis de Tecnologias").getOrCreate()

# Cargar el archivo CSV generado por el scraping con el delimitador ';'
df = spark.read.csv("../../empleos.csv", header=True, sep=';')

# Crear una lista de tecnologías
tecnologias = [
    "JavaScript", "Python", "Java", "Go", "Rust",
    "TypeScript", "Kotlin", "React", "Vue", "Angular",
    "Node", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
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
    "Scikit-learn", "Keras", "NLP", "ML"
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
    "DevSecOps", "SRE", "API", 
    ]

# Inicializar columnas para cada tecnología
for tech in tecnologias:
    df = df.withColumn(tech, when(lower(col("description")).contains(tech.lower()), 1).otherwise(0))

# Crear una lista para contar las tecnologías presentes
tecnologias_columns = [when(col(tech) == 1, tech).alias("tecnologia") for tech in tecnologias]

# Explode para dividir las tecnologías en filas individuales
df_exploded = df.select("title", "company", explode(array(*tecnologias_columns)).alias("tecnologia"))

# Filtrar las filas donde 'tecnologia' no es nulo y contar
top_tecnologias = df_exploded.filter(col("tecnologia").isNotNull()).groupBy("tecnologia").agg(count("*").alias("count")).orderBy(col("count").desc())

# Mostrar el resultado
top_tecnologias.show(truncate=False)

# Guardar el resultado en un nuevo archivo CSV
top_tecnologias.write.csv("top_tecnologias.csv", header=True)

endSparkTime = time.time()
sparkElapsedTime = endSparkTime - startSparkTime
print(f"------------------------------------------------------------------------------------------------------------Tiempo de ejecución de Spark: {sparkElapsedTime} segundos")

# Cerrar la sesión de Spark
spark.stop()


