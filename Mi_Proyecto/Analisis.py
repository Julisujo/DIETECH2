import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Función para exportar recetas a un archivo CSV
def exportar_recetas_a_csv(db_path, csv_path):
    conn = sqlite3.connect(db_path)
    query = "SELECT * FROM recetas"
    df = pd.read_sql_query(query, conn)
    df.to_csv(csv_path, index=False)
    conn.close()

# Exporta las recetas a un archivo CSV
exportar_recetas_a_csv('dietech.db', 'recetas.csv')

# Leer el archivo CSV
df = pd.read_csv('recetas.csv')

# Convertir la columna tiempo_coccion a minutos
def convertir_a_minutos(tiempo_coccion):
    if 'minutos' in tiempo_coccion:
        return int(tiempo_coccion.split()[0])
    elif 'horas' in tiempo_coccion:
        return int(tiempo_coccion.split()[0]) * 60
    else:
        return None

df['tiempo_coccion_min'] = df['tiempo_coccion'].apply(convertir_a_minutos)

# Calcular la cantidad de ingredientes por receta
df['cantidad_ingredientes'] = df['ingredientes'].apply(lambda x: len(x.split(',')))

# Mostrar las primeras filas del DataFrame
print("\nPrimeras filas del DataFrame:")
print(df.head())

# Información general del DataFrame
print("\nInformación general del DataFrame:")
print(df.info())

# Estadísticas descriptivas del DataFrame
print("\nEstadísticas descriptivas del DataFrame:")
print(df.describe())

# Histograma de la cantidad de ingredientes por receta
plt.figure(figsize=(10, 6))
plt.hist(df['cantidad_ingredientes'], bins=10, edgecolor='black')
plt.title('Distribución de la Cantidad de Ingredientes por Receta')
plt.xlabel('Cantidad de Ingredientes')
plt.ylabel('Frecuencia')
plt.show()

# Crear el gráfico de caja para la distribución de la cantidad de ingredientes por nivel de dificultad
plt.figure(figsize=(10, 6))
sns.boxplot(x='dificultad', y='cantidad_ingredientes', data=df, order=['facil', 'medio', 'dificil'])

# Añadir título y etiquetas
plt.title('Distribución de la Cantidad de Ingredientes por Nivel de Dificultad')
plt.xlabel('Dificultad')
plt.ylabel('Cantidad de Ingredientes')

# Mostrar el gráfico de caja
plt.show()

# Mostrar la correlación entre la cantidad de ingredientes y la dificultad
correlacion = df[['cantidad_ingredientes', 'dificultad']].copy()
correlacion['dificultad'] = correlacion['dificultad'].map({'fácil': 1, 'medio': 2, 'difícil': 3})

print("\nCorrelación entre cantidad de ingredientes y dificultad:")
print(correlacion.corr())