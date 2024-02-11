
# Garcia Aguilera Gael


# Funcion que cuenta el número de valles en el recorrido del caminante
def contar_valles(recorrido):
    altura = 0
    contador = 0

    for movimiento in recorrido:
        if movimiento == "U":
            altura += 1
        elif movimiento == "D":
            if altura == 0:
                contador += 1
            altura -= 1
    return contador


# Clase Nodo
class Nodo:
    def __init__(self, info):
        self.izquierdo = None
        self.derecho = None
        self.info = info


# Clase Arbol Binario
class ArbolBinario:

    # Constructor de un árbol vacío
    def __init__(self):
        self.raiz = None

    # Insertar elemento en el árbol
    def insertar(self, info):
        self.raiz = self.insertar_aux(self.raiz, info)

    # Auxiliar para insertar elemento en el árbol
    def insertar_aux(self, nodo, info):
        if nodo is None:
            nodo = Nodo(info)
        elif info <= nodo.info:
            if nodo.izquierdo is None:
                nodo.izquierdo = Nodo(info)
            else:
                self.insertar_aux(nodo.izquierdo, info)
        elif info > nodo.info:
            if nodo.derecho is None:
                nodo.derecho = Nodo(info)
            else:
                self.insertar_aux(nodo.derecho, info)
        return nodo

    # Devuelve una lista con un recorrido preorden
    def preorden(self):
        return self.preorden_aux(self.raiz)

    # Auxiliar para crear la lista con un recorrido preorden
    def preorden_aux(self, nodo):
        recorrido = []
        if nodo is not None:
            recorrido.append(nodo.info)
            recorrido += self.preorden_aux(nodo.izquierdo)
            recorrido += self.preorden_aux(nodo.derecho)
        return recorrido

    # Devuelve una lista con un recorrido inorden
    def inorden(self):
        return self.inorden_aux(self.raiz)

    # Auxiliar para crear la lista con un recorrido inorden
    def inorden_aux(self, nodo):
        recorrido = []
        if nodo is not None:
            recorrido += self.inorden_aux(nodo.izquierdo)
            recorrido.append(nodo.info)
            recorrido += self.inorden_aux(nodo.derecho)
        return recorrido

    # Devuelve una lista con un recorrido postorden
    def postorden(self):
        return self.postorden_aux(self.raiz)

    # Auxiliar para crear la lista con un recorrido postorden
    def postorden_aux(self, nodo):
        recorrido = []
        if nodo is not None:
            recorrido += self.postorden_aux(nodo.izquierdo)
            recorrido += self.postorden_aux(nodo.derecho)
            recorrido.append(nodo.info)
        return recorrido


# Ejecucion principal del programa con un ejemplo del problema del caminante y uno de árboles
if __name__ == "__main__":
    print("Ejemplo problema del caminante: \"UDDDUUDUUDDDUDUUUD\":")
    print("Número de valles: " + str(contar_valles("UDDDUUDUUDDDUDUUUD")))

    print("\n********************\n")

    arbol = ArbolBinario()
    arbol.insertar(45)
    arbol.insertar(23)
    arbol.insertar(65)
    arbol.insertar(2)
    arbol.insertar(38)
    arbol.insertar(52)
    arbol.insertar(96)
    arbol.insertar(7)
    arbol.insertar(48)
    print("Ejemplo recorridos en árboles:")
    print("Pre-orden: " + str(arbol.preorden()))
    print("In-orden: " + str(arbol.inorden()))
    print("Post-orden: " + str(arbol.postorden()))
