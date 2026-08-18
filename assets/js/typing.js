(() => {
  const h2 = document.querySelector("#hero h2");
  if (!h2) return;

  // Textos a mostrar en el efecto de typing
  const textos = [
    "Ingeniero en Sistemas Computacionales",
    "Desarrollador Web Frontend",
    "Desarrollador React"
  ];

  let indexTexto = 0;
  let indexCaracter = 0;
  let borrando = false;
  let pausado = false;

  const velocidadEscritura = 70; // ms por carácter
  const velocidadBorrado = 30; // ms por carácter
  const pausaAlFinal = 2000; // ms de pausa al terminar de escribir
  const pausaAlComenzar = 500; // ms de pausa antes de borrar

  function escribir() {
    const textoActual = textos[indexTexto];
    
    if (!borrando) {
      // Modo escritura
      if (indexCaracter < textoActual.length) {
        h2.textContent = textoActual.substring(0, indexCaracter + 1);
        indexCaracter++;
        setTimeout(escribir, velocidadEscritura);
      } else {
        // Terminó de escribir, pausa antes de borrar
        pausado = true;
        setTimeout(() => {
          borrando = true;
          pausado = false;
          escribir();
        }, pausaAlFinal);
      }
    } else {
      // Modo borrado
      if (indexCaracter > 0) {
        indexCaracter--;
        h2.textContent = textoActual.substring(0, indexCaracter);
        setTimeout(escribir, velocidadBorrado);
      } else {
        // Terminó de borrar, cambiar al siguiente texto
        indexTexto = (indexTexto + 1) % textos.length;
        borrando = false;
        pausado = true;
        setTimeout(() => {
          pausado = false;
          escribir();
        }, pausaAlComenzar);
      }
    }
  }

  // Iniciar la animación
  escribir();
})();
