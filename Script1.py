
# Garcia Aguilera Gael


# Datos del jugador 1
set_j1 = 0
juegos_j1 = 0
puntos_j1 = 0
nombre_j1 = ""

# Datos del jugador 2
set_j2 = 0
juegos_j2 = 0
puntos_j2 = 0
nombre_j2 = ""

# Datos de la partida
saque = 1

# Imprime el marcador
def marcador():
    print("\n*********************")
    print("Marcador:")
    print("Sets:")
    print(nombre_j1 + " " + str(set_j1) + " - " + str(set_j2) + " " + nombre_j2)
    print("Juegos:")
    print(nombre_j1 + " " + str(juegos_j1) + " - " + str(juegos_j2) + " " + nombre_j2)
    print("Puntos")
    print(nombre_j1 + " " + str(puntos_j1) + " - " + str(puntos_j2) + " " + nombre_j2)
    print("*********************\n")

# Simula el cambio de saque
def cambio_saque():
    global saque
    print("\nCambio de saque")
    if saque == 1:
        saque = 2
    else:
        saque = 1

# Simula el cambio de cancha
def cambio_cancha():
    print("\nCambio de cancha")

# Simula el saque en el juego del jugador que le toca
def sacar():
    if saque == 1:
        print("\nSaca " + nombre_j1)
    else:
        print("\nSaca " + nombre_j2)

# Simula un juego
def juega_juego():
    if (juegos_j1 + juegos_j2) % 2 == 1:
        cambio_cancha()
    print("\nInicia el siguiente juego")
    if juegos_j1 + juegos_j2 != 0 or set_j1 + set_j2 != 0:
        cambio_saque()
    sacar()
    while puntos_j1 != "juego" and puntos_j2 != "juego":
        dec = 0
        while dec != 1 and dec != 2:
            marcador()
            try:
                dec = int(input("Elige anotador:\n" +
                                "1. " + nombre_j1 +
                                "\n2. " + nombre_j2 + "\n"))
                if dec != 1 and dec != 2:
                    print("Opción inválida")
            except Exception as e:
                print("Opción inválida")
        anota_punto(dec)
    fin_juego()

# Simula el fin de un juego
def fin_juego():
    global puntos_j1, puntos_j2, juegos_j1, juegos_j2
    if puntos_j1 == "juego":
        juegos_j1 += 1
        print("\nGanador del juego: " + nombre_j1)
    else:
        juegos_j2 += 1
        print("\nGanador del juego: " + nombre_j2)
    puntos_j1 = 0
    puntos_j2 = 0

# Simula un set
def juega_set():
    while (juegos_j1 < 6 and juegos_j2 < 6) or abs(juegos_j1 - juegos_j2) < 2:
        juega_juego()
    fin_set()

# Simula el fin de un set
def fin_set():
    global juegos_j1, juegos_j2, set_j1, set_j2, set
    if juegos_j1 > juegos_j2:
        set_j1 += 1
        print("\nGanador del set: " + nombre_j1)
    else:
        set_j2 += 1
        print("\nGanador del set: " + nombre_j2)
    juegos_j1 = 0
    juegos_j2 = 0

# Simula la anotación de un jugador, recibe 1 si anota el jugador 1 y 2 si fue el jugador 2
def anota_punto(jugador):
    global puntos_j1, puntos_j2
    if jugador == 1:
        print("\n" + nombre_j1 + " ha anotado")
        if puntos_j1 == 0:
            puntos_j1 = 15
        elif puntos_j1 == 15:
            puntos_j1 = 30
        elif puntos_j1 == 30:
            puntos_j1 = 40
        elif puntos_j1 == 40:
            if puntos_j2 == "vent.":
                puntos_j1, puntos_j2 = 40, 40
            elif puntos_j2 < 40:
                puntos_j1 = "juego"
            elif puntos_j2 == 40:
                puntos_j1 = "vent."
        elif puntos_j1 == "vent.":
            puntos_j1 = "juego"
    elif jugador == 2:
        print("\n" + nombre_j2 + " ha anotado")
        if puntos_j2 == 0:
            puntos_j2 = 15
        elif puntos_j2 == 15:
            puntos_j2 = 30
        elif puntos_j2 == 30:
            puntos_j2 = 40
        elif puntos_j2 == 40:
            if puntos_j1 == "vent.":
                puntos_j2, puntos_j1 = 40, 40
            elif puntos_j1 < 40:
                puntos_j2 = "juego"
            elif puntos_j1 == 40:
                puntos_j2 = "vent."
        elif puntos_j2 == "vent.":
            puntos_j2 = "juego"


# Ejecucion principal del programa, de la simulación de la partida
if __name__ == "__main__":
    print("\nBienvenidos\n")
    while True:
        nombre_j1 = input("Escribe el nombre del jugador 1: ")
        if nombre_j1 != "":
            break
        else:
            print("Por favor, escribe un nombre.\n")
    while True:
        nombre_j2 = input("Escribe el nombre del jugador 2: ")
        if nombre_j2 != "":
            break
        else:
            print("Por favor, escribe un nombre.\n")

    while set_j1 + set_j2 < 3 and abs(set_j1 - set_j2) < 2:
        print("\nInicia set " + str(set_j1 + set_j2 + 1))
        juega_set()
    print("\nFin de la partida")
    marcador()
    if set_j1 > set_j2:
        print("Ganador: " + nombre_j1)
    else:
        print("Ganador: " + nombre_j2)
