# import time
# from pyspark.sql import SparkSession
# from pyspark.sql.functions import explode, lower, col, count, when, array

# # Medir tiempo de ejecución de Spark
# startSparkTime = time.time()

# # Crear la sesión de Spark
# spark = SparkSession.builder.appName("Extraccion y Analisis de Tecnologias").getOrCreate()

# # Cargar el archivo CSV generado por el scraping con el delimitador ';'
# df = spark.read.csv("../../empleos.csv", header=True, sep=';')

# # Crear una lista de tecnologías
# tecnologias = [
#     "JavaScript", "Python", "Java", "Go", "Rust",
#     "TypeScript", "Kotlin", "React", "Vue", "Angular",
#     "Node", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
#     "C#", "PHP", "Ruby", "Swift", "Scala", "Elixir",
#     "Perl", "C++", "C", "R", "MATLAB",
#     "HTML", "CSS", "Sass", "Tailwind CSS",
#     "GraphQL", "gRPC", "Microservicios", "Sin servidor",
#     "Next", "Nuxt", "Django", "Flask", "Spring",
#     "Ruby on Rails", "Laravel", "Express", "FastAPI",
#     "PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra",
#     "Elasticsearch", "Firebase", "Apache Kafka", "RabbitMQ",
#     "Terraform", "Ansible", "Jenkins", "Git", "GitHub",
#     "Bitbucket", "Prometheus", "Grafana",
#     "Aprendizaje Automático", "Aprendizaje Profundo", "TensorFlow", "PyTorch",
#     "Scikit-learn", "Keras", "NLP", "ML"
#     "Ciencia de Datos", "Big Data", "Hadoop", "Apache Spark",
#     "Lagos de Datos", "Almacenamiento de Datos", "ETL", "Inteligencia Empresarial",
#     "DevOps", "Ágil", "Scrum", "Kanban", "JIRA", "Power Automate", "Power Apps",
#     "SQL", "NoSQL",
#     "Redis", "Memcached",
#     "Virtualización", "Docker Swarm", "OpenShift",
#     "CI/CD", "GitOps",
#     "WebSockets", "APIs RESTful", "SOAP",
#     "Grafos", "Neo4j", "InfluxDB", "Apache Flink",
#     "Minería de Datos", "Análisis de Datos",
#     "MLOps", "DataOps",
#     "Service Mesh", "Istio", "Linkerd", "Infraestructura como Código (IaC)",
#     "Blockchain", "IoT", "5G", "UX/UI",
#     "DevSecOps", "SRE", "API", 
#     ]

# # Inicializar columnas para cada tecnología
# for tech in tecnologias:
#     df = df.withColumn(tech, when(lower(col("description")).contains(tech.lower()), 1).otherwise(0))

# # Crear una lista para contar las tecnologías presentes
# tecnologias_columns = [when(col(tech) == 1, tech).alias("tecnologia") for tech in tecnologias]

# # Explode para dividir las tecnologías en filas individuales
# df_exploded = df.select("title", "company", explode(array(*tecnologias_columns)).alias("tecnologia"))

# # Filtrar las filas donde 'tecnologia' no es nulo y contar
# top_tecnologias = df_exploded.filter(col("tecnologia").isNotNull()).groupBy("tecnologia").agg(count("*").alias("count")).orderBy(col("count").desc())

# # Mostrar el resultado
# top_tecnologias.show(truncate=False)

# # Guardar el resultado en un nuevo archivo CSV
# top_tecnologias.write.csv("top_tecnologias.csv", header=True)

# endSparkTime = time.time()
# sparkElapsedTime = endSparkTime - startSparkTime
# print(f"------------------------------------------------------------------------------------------------------------Tiempo de ejecución de Spark: {sparkElapsedTime} segundos")

# # Cerrar la sesión de Spark
# spark.stop()


import time
# from pyspark.sql import SparkSession
# from pyspark.sql.functions import explode, lower, col, count, when, array

# # Medir tiempo de ejecución de Spark
# startSparkTime = time.time()

# # Crear la sesión de Spark
# spark = SparkSession.builder.appName("Extraccion y Analisis de Tecnologias").getOrCreate()

# # Cargar el archivo CSV generado por el scraping con el delimitador ';'
# df = spark.read.csv("../../empleos.csv", header=True, sep=';')

# # Crear una lista de tecnologías
# tecnologias = [
#     "JavaScript", "Python", "Java", "Go", "Rust",
#     "TypeScript", "Kotlin", "React", "Vue", "Angular",
#     "Node", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
#     "C#", "PHP", "Ruby", "Swift", "Scala", "Elixir",
#     "Perl", "C++", "C", "R", "MATLAB",
#     "HTML", "CSS", "Sass", "Tailwind CSS",
#     "GraphQL", "gRPC", "Microservicios", "Sin servidor",
#     "Next", "Nuxt", "Django", "Flask", "Spring",
#     "Ruby on Rails", "Laravel", "Express", "FastAPI",
#     "PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra",
#     "Elasticsearch", "Firebase", "Apache Kafka", "RabbitMQ",
#     "Terraform", "Ansible", "Jenkins", "Git", "GitHub",
#     "Bitbucket", "Prometheus", "Grafana",
#     "Aprendizaje Automático", "Aprendizaje Profundo", "TensorFlow", "PyTorch",
#     "Scikit-learn", "Keras", "NLP", "ML"
#     "Ciencia de Datos", "Big Data", "Hadoop", "Apache Spark",
#     "Lagos de Datos", "Almacenamiento de Datos", "ETL", "Inteligencia Empresarial",
#     "DevOps", "Ágil", "Scrum", "Kanban", "JIRA", "Power Automate", "Power Apps",
#     "SQL", "NoSQL",
#     "Redis", "Memcached",
#     "Virtualización", "Docker Swarm", "OpenShift",
#     "CI/CD", "GitOps",
#     "WebSockets", "APIs RESTful", "SOAP",
#     "Grafos", "Neo4j", "InfluxDB", "Apache Flink",
#     "Minería de Datos", "Análisis de Datos",
#     "MLOps", "DataOps",
#     "Service Mesh", "Istio", "Linkerd", "Infraestructura como Código (IaC)",
#     "Blockchain", "IoT", "5G", "UX/UI",
#     "DevSecOps", "SRE", "API", 
#     ]

# # Inicializar columnas para cada tecnología
# for tech in tecnologias:
#     df = df.withColumn(tech, when(lower(col("description")).contains(tech.lower()), 1).otherwise(0))

# # Crear una lista para contar las tecnologías presentes
# tecnologias_columns = [when(col(tech) == 1, tech).alias("tecnologia") for tech in tecnologias]

# # Explode para dividir las tecnologías en filas individuales
# df_exploded = df.select("title", "company", explode(array(*tecnologias_columns)).alias("tecnologia"))

# # Filtrar las filas donde 'tecnologia' no es nulo y contar
# top_tecnologias = df_exploded.filter(col("tecnologia").isNotNull()).groupBy("tecnologia").agg(count("*").alias("count")).orderBy(col("count").desc())

# # Mostrar el resultado
# top_tecnologias.show(truncate=False)

# # Guardar el resultado en un nuevo archivo CSV
# top_tecnologias.write.csv("top_tecnologias.csv", header=True)

# endSparkTime = time.time()
# sparkElapsedTime = endSparkTime - startSparkTime
# print(f"------------------------------------------------------------------------------------------------------------Tiempo de ejecución de Spark: {sparkElapsedTime} segundos")

# # Cerrar la sesión de Spark
# spark.stop()


import time
from pyspark.sql import SparkSession
from pyspark.sql.functions import regexp_extract, col, lower

# Crear la sesión de Spark
spark = SparkSession.builder.appName("Extraccion de Tecnologias").getOrCreate()

# Lista de hiperparámetros
num_partitions = [4, 8, 16]  # Ejemplo de diferentes números de particiones
batch_sizes = [32, 64, 128]  # Ejemplo de diferentes tamaños de lote (no utilizado en este caso)
filter_methods = ['Método A', 'Método B']  # Ejemplos de diferentes métodos de filtrado

# Expresión regular para buscar tecnologías
tecnologias_regex = r"(JavaScript|Python|Java|Go|Rust|TypeScript|Kotlin|React|Vue|Angular|Node.js|Docker|Kubernetes|AWS|GCP|Azure|C#|PHP|Ruby|Swift|Scala|Elixir|Perl|C++|C|R|MATLAB|HTML|CSS|Sass|Less|Tailwind CSS|GraphQL|gRPC|Microservicios|Serverless|Next|Nuxt|Django|Flask|Spring|Ruby on Rails|Laravel|Express|FastAPI|PostgreSQL|MySQL|MongoDB|Redis|Cassandra|Elasticsearch|Firebase|Apache Kafka|RabbitMQ|Terraform|Ansible|Jenkins|Git|GitHub|Bitbucket|Prometheus|Grafana|Machine Learning|Deep Learning|TensorFlow|PyTorch|Scikit-learn|Keras|NLP|Data Science|Big Data|Hadoop|Apache Spark|Data Lakes|Data Warehousing|ETL|Business Intelligence|DevOps|Agile|Scrum|Kanban|JIRA|Power automate|Power Apps|SQL)"

# Almacenar resultados
results = []

# Iterar sobre combinaciones de hiperparámetros
for num_part in num_partitions:
    for filter_method in filter_methods:
        # Iniciar el temporizador
        start_time = time.time()

        # Leer el archivo CSV
        df = spark.read.csv("../../empleos.csv", header=True, sep=';')
        df = df.repartition(num_part)  # Reparticionar según el número de particiones

        # Extraer tecnologías usando regexp_extract
        df = df.withColumn("tecnologias", regexp_extract(lower(col("description")), tecnologias_regex, 0))

        # Simular un método de filtrado
        if filter_method == 'Método A':
            filtered_df = df.filter(df['tecnologias'].isNotNull())
        else:
            filtered_df = df.filter(df['tecnologias'].isNull())

        # Contar las tecnologías
        tecnologias_count = filtered_df.groupBy("tecnologias").count()

        # Guardar el resultado en un nuevo archivo CSV
        tecnologias_count.write.csv(f"empleos_con_tecnologias_{num_part}_{filter_method}.csv", header=True)

        # Detener el temporizador
        end_time = time.time()

        # Calcular el tiempo transcurrido
        elapsed_time = end_time - start_time

        # Almacenar el resultado
        results.append((num_part, filter_method, elapsed_time))

# Mostrar resultados
print("Resultados de Tiempos de Ejecución:")
print("| Número de Particiones | Método de Filtro | Tiempo de Ejecución (segundos) |")
print("|-----------------------|------------------|-------------------------------|")
for num_part, filter_method, elapsed_time in results:
    print(f"| {num_part}                   | {filter_method}         | {elapsed_time:.2f}                       |")

# Cerrar la sesión de Spark
spark.stop()
