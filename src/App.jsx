import React, { useState, useEffect } from 'react';

// 1. Estructura de Datos (Rueda de Plutchik simplificada)
const emocionesDB = [
  // Miedo
  { nombre: "Miedo", capa: "centro", categoria: "miedo" },
  { nombre: "Herido", capa: "medio", categoria: "miedo" },
  { nombre: "Humillado", capa: "medio", categoria: "miedo" },
  { nombre: "Rechazado", capa: "medio", categoria: "miedo" },
  { nombre: "Sumiso", capa: "medio", categoria: "miedo" },
  { nombre: "Inseguro", capa: "medio", categoria: "miedo" },
  { nombre: "Asustado", capa: "medio", categoria: "miedo" },
  { nombre: "Apenado", capa: "exterior", categoria: "miedo" },
  { nombre: "Devastado", capa: "exterior", categoria: "miedo" },
  { nombre: "Ridiculizado", capa: "exterior", categoria: "miedo" }, // Corregido el tipeo
  { nombre: "Irrespetado", capa: "exterior", categoria: "miedo" },
  { nombre: "Perturbado", capa: "exterior", categoria: "miedo" },
  { nombre: "Inadecuado", capa: "exterior", categoria: "miedo" },
  { nombre: "Insignificante", capa: "exterior", categoria: "miedo" },
  { nombre: "Indignado", capa: "exterior", categoria: "miedo" },
  { nombre: "Inferior", capa: "exterior", categoria: "miedo" },
  { nombre: "Pobre", capa: "exterior", categoria: "miedo" },
  { nombre: "Espantado", capa: "exterior", categoria: "miedo" },
  { nombre: "Aterrado", capa: "exterior", categoria: "miedo" },
  // Ira
  { nombre: "Ira", capa: "centro", categoria: "ira" },
  { nombre: "Amenazado", capa: "medio", categoria: "ira" },
  { nombre: "Odioso", capa: "medio", categoria: "ira" },
  { nombre: "Desquiciado", capa: "medio", categoria: "ira" },
  { nombre: "Agresivo", capa: "medio", categoria: "ira" },
  { nombre: "Frustrado", capa: "medio", categoria: "ira" },
  { nombre: "Distante", capa: "medio", categoria: "ira" },
  { nombre: "Inseguro", capa: "exterior", categoria: "ira" },
  { nombre: "Celoso", capa: "exterior", categoria: "ira" },
  { nombre: "Resentido", capa: "exterior", categoria: "ira" },
  { nombre: "Transgredido", capa: "exterior", categoria: "ira" },
  { nombre: "Enfurecido", capa: "exterior", categoria: "ira" },
  { nombre: "Rabioso", capa: "exterior", categoria: "ira" },
  { nombre: "Provocado", capa: "exterior", categoria: "ira" },
  { nombre: "Hostil", capa: "exterior", categoria: "ira" },
  { nombre: "Enfadado", capa: "exterior", categoria: "ira" },
  { nombre: "Irritado", capa: "exterior", categoria: "ira" },
  { nombre: "Retraído", capa: "exterior", categoria: "ira" },
  { nombre: "Sospechoso", capa: "exterior", categoria: "ira" },
  // Tristeza
  { nombre: "Tristeza", capa: "centro", categoria: "tristeza" },
  { nombre: "Ansioso", capa: "medio", categoria: "tristeza" },
  { nombre: "Abandonado", capa: "medio", categoria: "tristeza" },
  { nombre: "Desesperado", capa: "medio", categoria: "tristeza" },
  { nombre: "Deprimido", capa: "medio", categoria: "tristeza" },
  { nombre: "Solitario", capa: "medio", categoria: "tristeza" },
  { nombre: "Aburrido", capa: "medio", categoria: "tristeza" },
  { nombre: "Anhelante", capa: "exterior", categoria: "tristeza" },
  { nombre: "Abrumado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Ignorado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Discriminado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Impotente", capa: "exterior", categoria: "tristeza" },
  { nombre: "Vulnerable", capa: "exterior", categoria: "tristeza" },
  { nombre: "Inferior", capa: "exterior", categoria: "tristeza" },
  { nombre: "Vacío", capa: "exterior", categoria: "tristeza" },
  { nombre: "Apartado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Apático", capa: "exterior", categoria: "tristeza" },
  { nombre: "Indiferente", capa: "exterior", categoria: "tristeza" },
  // Felicidad
  { nombre: "Felicidad", capa: "centro", categoria: "alegria" },
  { nombre: "Orgulloso", capa: "medio", categoria: "alegria" },
  { nombre: "Aceptado", capa: "medio", categoria: "alegria" },
  { nombre: "Poderoso", capa: "medio", categoria: "alegria" },
  { nombre: "Pacífico", capa: "medio", categoria: "alegria" },
  { nombre: "Íntimo", capa: "medio", categoria: "alegria" },
  { nombre: "Optimista", capa: "medio", categoria: "alegria" },
  { nombre: "Importante", capa: "exterior", categoria: "alegria" },
  { nombre: "Confiado", capa: "exterior", categoria: "alegria" },
  { nombre: "Respetado", capa: "exterior", categoria: "alegria" },
  { nombre: "Realizado", capa: "exterior", categoria: "alegria" },
  { nombre: "Provocativo", capa: "exterior", categoria: "alegria" },
  { nombre: "Valiente", capa: "exterior", categoria: "alegria" },
  { nombre: "Amoroso", capa: "exterior", categoria: "alegria" },
  { nombre: "Esperanzado", capa: "exterior", categoria: "alegria" },
  { nombre: "Sensible", capa: "exterior", categoria: "alegria" },
  { nombre: "Juguetón", capa: "exterior", categoria: "alegria" },
  { nombre: "Receptivo", capa: "exterior", categoria: "alegria" },
  { nombre: "Inspirado", capa: "exterior", categoria: "alegria" },
  // Disgusto
  { nombre: "Disgusto", capa: "centro", categoria: "disgusto" },
  { nombre: "Crítico", capa: "medio", categoria: "disgusto" },
  { nombre: "Desaprobado", capa: "medio", categoria: "disgusto" },
  { nombre: "Decepcionado", capa: "medio", categoria: "disgusto" },
  { nombre: "Terrible", capa: "medio", categoria: "disgusto" },
  { nombre: "Evasivo", capa: "medio", categoria: "disgusto" },
  { nombre: "Culpable", capa: "medio", categoria: "disgusto" },
  { nombre: "Sarcástico", capa: "exterior", categoria: "disgusto" },
  { nombre: "Escéptico", capa: "exterior", categoria: "disgusto" },
  { nombre: "Sentencioso", capa: "exterior", categoria: "disgusto" },
  { nombre: "Aborrecido", capa: "exterior", categoria: "disgusto" },
  { nombre: "Repugnante", capa: "exterior", categoria: "disgusto" },
  { nombre: "Rebelado", capa: "exterior", categoria: "disgusto" },
  { nombre: "Repulsivo", capa: "exterior", categoria: "disgusto" },
  { nombre: "Detestable", capa: "exterior", categoria: "disgusto" },
  { nombre: "Aversivo", capa: "exterior", categoria: "disgusto" },
  { nombre: "Indeciso", capa: "exterior", categoria: "disgusto" },
  { nombre: "Atormentado", capa: "exterior", categoria: "disgusto" },
  { nombre: "Avergonzado", capa: "exterior", categoria: "disgusto" },
  // Sorpresa
  { nombre: "Sorpresa", capa: "centro", categoria: "sorpresa" },
  { nombre: "Interesado", capa: "medio", categoria: "sorpresa" },
  { nombre: "Sorprendido", capa: "medio", categoria: "sorpresa" },
  { nombre: "Confundido", capa: "medio", categoria: "sorpresa" },
  { nombre: "Asombrado", capa: "medio", categoria: "sorpresa" },
  { nombre: "Efusivo", capa: "medio", categoria: "sorpresa" },
  { nombre: "Jubiloso", capa: "medio", categoria: "sorpresa" },
  { nombre: "Entretenido", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Curioso", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Impresionado", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Consternado", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Desilucionado", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Perplejo", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Atónito", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Pasmado", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Inquieto", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Enérgico", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Liberado", capa: "exterior", categoria: "sorpresa" },
  { nombre: "Eufórico", capa: "exterior", categoria: "sorpresa" }
];

// Función para mezclar aleatoriamente el array (como un mazo de cartas)
const mezclarArray = (array) => {
  let mezclado = [...array];
  for (let i = mezclado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mezclado[i], mezclado[j]] = [mezclado[j], mezclado[i]];
  }
  return mezclado;
};

export default function App() {
  const [fase, setFase] = useState(1);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [categoriasGanadoras, setCategoriasGanadoras] = useState([]);
  const [veredicto, setVeredicto] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [opcionesFase1, setOpcionesFase1] = useState([]);

  // Cargar historial al iniciar y barajar la primera vez
  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem('historialEmocional')) || [];
    setHistorial(guardado);
    barajarEmociones();
  }, []);

  const barajarEmociones = () => {
    const exteriores = emocionesDB.filter(e => e.capa === "exterior");
    const mezcladas = mezclarArray(exteriores);
    setOpcionesFase1(mezcladas.slice(0, 12));
  };

  const toggleEmocion = (emocion) => {
    if (seleccionadas.find(e => e.nombre === emocion.nombre)) {
      setSeleccionadas(seleccionadas.filter(e => e.nombre !== emocion.nombre));
    } else {
      setSeleccionadas([...seleccionadas, emocion]);
    }
  };

  const avanzarFase2 = () => {
    if (seleccionadas.length === 0) return;
    
    const conteo = {};
    seleccionadas.forEach(e => {
      conteo[e.categoria] = (conteo[e.categoria] || 0) + 1;
    });

    let maxVotos = 0;
    let ganadoras = [];
    for (const cat in conteo) {
      if (conteo[cat] > maxVotos) {
        maxVotos = conteo[cat];
        ganadoras = [cat];
      } else if (conteo[cat] === maxVotos) {
        ganadoras.push(cat);
      }
    }

    setCategoriasGanadoras(ganadoras);
    setSeleccionadas([]);
    setFase(2);
  };

  const finalizarRegistro = () => {
    if (seleccionadas.length === 0) return;

    const conteo = {};
    seleccionadas.forEach(e => {
      conteo[e.categoria] = (conteo[e.categoria] || 0) + 1;
    });

    let maxVotos = 0;
    let categoriaFinal = "";
    for (const cat in conteo) {
      if (conteo[cat] > maxVotos) {
        maxVotos = conteo[cat];
        categoriaFinal = cat;
      }
    }

    const emocionCentral = emocionesDB.find(e => e.capa === "centro" && e.categoria === categoriaFinal);
    
    setVeredicto(emocionCentral);
    setFase(3);

    const nuevoRegistro = {
      fecha: new Date().toLocaleString(),
      emocion: emocionCentral.nombre
    };
    const nuevoHistorial = [nuevoRegistro, ...historial];
    localStorage.setItem('historialEmocional', JSON.stringify(nuevoHistorial));
    setHistorial(nuevoHistorial);
  };

  const reiniciar = () => {
    setFase(1);
    setSeleccionadas([]);
    setVeredicto(null);
    setCategoriasGanadoras([]);
    barajarEmociones();
  };

  const emocionesFase2 = emocionesDB.filter(e => e.capa === "medio" && categoriasGanadoras.includes(e.categoria));

  // --- VARIABLES DE ESTILO UNIFICADAS (Tema Oscuro/Calmo) ---
  const claseBotonEmocion = (emo) => {
    const estaSeleccionada = seleccionadas.find(e => e.nombre === emo.nombre);
    const base = "px-5 py-2.5 rounded-full border transition-all duration-300 shadow-sm font-medium hover:-translate-y-1";
    
    if (estaSeleccionada) {
      // Estilo activo: Índigo suave con resplandor
      return `${base} bg-indigo-500 text-white border-indigo-400 scale-105 shadow-lg ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-800`;
    }
    // Estilo inactivo: Fondo oscuro, borde sutil
    return `${base} bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600 hover:border-slate-400`;
  };

  const claseBotonAccion = "px-10 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:scale-105 transition-all duration-300";

  return (
    // Fondo general oscuro y relajante (Pizarra)
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-8 font-sans flex flex-col items-center">
      <div className="max-w-2xl w-full">
        
        <h1 className="text-3xl font-bold mb-2 text-center text-slate-100">Registro Emocional</h1>
        
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => setMostrarAyuda(true)}
            className="text-sm text-slate-400 underline hover:text-slate-200 transition-colors"
          >
            ¿Cómo funciona el embudo?
          </button>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 mb-8">
          
          {fase === 1 && (
            <div className="animate-fade-in text-center">
              <p className="mb-8 text-slate-300 text-lg">¿Qué sensaciones identificás en este momento?</p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {opcionesFase1.map(emo => (
                  <button
                    key={emo.nombre}
                    onClick={() => toggleEmocion(emo)}
                    className={claseBotonEmocion(emo)}
                  >
                    {emo.nombre}
                  </button>
                ))}
              </div>

              <div className="flex justify-center mb-8">
                <button 
                  onClick={barajarEmociones}
                  className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors px-4 py-2 rounded-lg hover:bg-slate-700/50"
                >
                  ↻ No siento ninguna de estas (Ver otras)
                </button>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={avanzarFase2}
                  disabled={seleccionadas.length === 0}
                  className={claseBotonAccion}
                >
                  Siguiente paso
                </button>
              </div>
            </div>
          )}

          {fase === 2 && (
            <div className="animate-fade-in text-center">
              <p className="mb-8 text-slate-300 text-lg">Profundicemos un poco más. ¿Cuáles resuenan más con tu interior?</p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-10">
                {emocionesFase2.map(emo => (
                  <button
                    key={emo.nombre}
                    onClick={() => toggleEmocion(emo)}
                    className={claseBotonEmocion(emo)}
                  >
                    {emo.nombre}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={finalizarRegistro}
                  disabled={seleccionadas.length === 0}
                  className={claseBotonAccion}
                >
                  Descubrir Emoción
                </button>
              </div>
            </div>
          )}

          {fase === 3 && veredicto && (
            <div className="text-center animate-fade-in py-6">
              <p className="text-slate-400 mb-4 text-lg">Tu emoción predominante en este momento es:</p>
              <h2 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-10 pb-2">
                {veredicto.nombre}
              </h2>
              <button 
                onClick={reiniciar}
                className="px-8 py-3 bg-slate-700 border border-slate-600 text-white rounded-xl text-lg font-semibold hover:bg-slate-600 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Registrar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* HISTORIAL */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-6 text-slate-200">Tu Historial</h3>
          {historial.length === 0 ? (
            <p className="text-slate-500 italic text-center py-4">Aún no hay registros guardados.</p>
          ) : (
            <ul className="space-y-4">
              {historial.map((reg, index) => (
                <li key={index} className="flex justify-between items-center border-b border-slate-700 pb-3 text-sm">
                  <span className="text-slate-400">{reg.fecha}</span>
                  <span className="font-semibold text-slate-200 text-base">{reg.emocion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      {/* VENTANA MODAL DE INSTRUCCIONES */}
      {mostrarAyuda && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-slate-600">
            <button 
              onClick={() => setMostrarAyuda(false)}
              className="absolute top-4 right-5 text-slate-400 hover:text-white font-bold text-2xl transition-colors"
            >
              ×
            </button>
            
            <h3 className="text-xl font-bold mb-6 text-slate-100">¿Cómo usar el registro?</h3>
            
            <div className="space-y-4 text-slate-300 text-sm">
              <p>
                <strong className="text-indigo-400">1. Superficie:</strong> Elegí las palabras con las que te identifiques. No lo pienses demasiado, dejate llevar. Podés barajar las opciones si ninguna encaja.
              </p>
              <p>
                <strong className="text-indigo-400">2. Profundidad:</strong> Según tus elecciones, el sistema filtrará sensaciones más específicas. Seleccioná las que más resuenen.
              </p>
              <p>
                <strong className="text-indigo-400">3. Núcleo:</strong> Finalmente, descubriremos tu emoción central para que puedas guardarla en tu historial.
              </p>
            </div>

            <button 
              onClick={() => setMostrarAyuda(false)}
              className="mt-8 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors font-medium shadow-md"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}