
import matplotlib.pyplot as plt

# Garcia Aguilera Gael


# Datos de la gráfica
x = [a for a in range(10)]
y = [b ** 2 for b in x]


# Creamos y etiquetámos la gráfica
plt.plot(x, y, color='orange')
plt.xlabel('x')
plt.ylabel('f(x)=x²')
plt.title('Gráfica f(x)=x²')

# Generamos cuadrícula y mostramos la gráfica
plt.grid(True)
plt.show()
