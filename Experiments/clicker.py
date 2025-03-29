from pynput import mouse

click_count = 0

def on_click(x, y, button, pressed):
    global click_count
    if pressed:
        click_count += 1
        print(f"Total de clics: {click_count}")

# Iniciar el listener del mouse
with mouse.Listener(on_click=on_click) as listener:
    print("Presiona Ctrl+C para detener el contador de clics")
    try:
        listener.join()
    except KeyboardInterrupt:
        print(f"\nTotal de clics: {click_count}")
        listener.stop()
