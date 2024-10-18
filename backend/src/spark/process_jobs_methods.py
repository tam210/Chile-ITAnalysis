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
        df = spark.read.csv("../../empleos.csv", header=True)
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
