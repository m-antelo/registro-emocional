import React, { useState, useEffect } from 'react';

// 1. Estructura de Datos (Rueda de Plutchik simplificada para el embudo)
const emocionesDB = [
  // Miedo
  { nombre: "Miedo", capa: "centro", categoria: "miedo" },
  //medio
  { nombre: "Herido", capa: "medio", categoria: "miedo" },
  { nombre: "Humillado", capa: "medio", categoria: "miedo" },
  { nombre: "Rechazado", capa: "medio", categoria: "miedo" },
  { nombre: "Sumiso", capa: "medio", categoria: "miedo" },
  { nombre: "Inseguro", capa: "medio", categoria: "miedo" },
  { nombre: "Asustado", capa: "medio", categoria: "miedo" },
  //exterior
  { nombre: "Apenado", capa: "exterior", categoria: "miedo" },
  { nombre: "Devastado", capa: "exterior", categoria: "miedo" },
  { nombre: "Rudiculizado", capa: "exterior", categoria: "miedo" },
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
  //Medio
  { nombre: "Amenazado", capa: "medio", categoria: "ira" },
  { nombre: "Odioso", capa: "medio", categoria: "ira" },
  { nombre: "Desquiciado", capa: "medio", categoria: "ira" },
  { nombre: "Agresivo", capa: "medio", categoria: "ira" },
  { nombre: "Frustrado", capa: "medio", categoria: "ira" },
  { nombre: "Distante", capa: "medio", categoria: "ira" },
  //Exterior
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
  { nombre: "Retraido", capa: "exterior", categoria: "ira" },
  { nombre: "Sospechoso", capa: "exterior", categoria: "ira" },
  // Tristeza
  { nombre: "Tristeza", capa: "centro", categoria: "tristeza" },
  //medio
  { nombre: "Ansioso", capa: "medio", categoria: "tristeza" },
  { nombre: "Abandonado", capa: "medio", categoria: "tristeza" },
  { nombre: "Desesperado", capa: "medio", categoria: "tristeza" },
  { nombre: "Deprimido", capa: "medio", categoria: "tristeza" },
  { nombre: "Solitario", capa: "medio", categoria: "tristeza" },
  { nombre: "Aburrido", capa: "medio", categoria: "tristeza" },
  //exterior
  { nombre: "Anhelante", capa: "exterior", categoria: "tristeza" },
  { nombre: "Abrumado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Ignorado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Discriminado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Impotente", capa: "exterior", categoria: "tristeza" },
  { nombre: "Vulnerable", capa: "exterior", categoria: "tristeza" },
  { nombre: "Inferior", capa: "exterior", categoria: "tristeza" },
  { nombre: "Vacio", capa: "exterior", categoria: "tristeza" },
  { nombre: "Abandonado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Apartado", capa: "exterior", categoria: "tristeza" },
  { nombre: "Apático", capa: "exterior", categoria: "tristeza" },
  { nombre: "Indiferente", capa: "exterior", categoria: "tristeza" },
  // Felicidad
  { nombre: "Felicidad", capa: "centro", categoria: "alegria" },
  //medio
  { nombre: "Orgulloso", capa: "medio", categoria: "alegria" },
  { nombre: "Aceptado", capa: "medio", categoria: "alegria" },
  { nombre: "Poderoso", capa: "medio", categoria: "alegria" },
  { nombre: "Pacífico", capa: "medio", categoria: "alegria" },
  { nombre: "Íntimo", capa: "medio", categoria: "alegria" },
  { nombre: "Optimista", capa: "medio", categoria: "alegria" },
  //exterior
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
  //Disgusto
  { nombre: "Disgusto", capa: "centro", categoria: "disgusto" },
  //medio
  { nombre: "Crítico", capa: "medio", categoria: "disgusto" },
  { nombre: "Desaprobado", capa: "medio", categoria: "disgusto" },
  { nombre: "Decepcionado", capa: "medio", categoria: "disgusto" },
  { nombre: "Terrible", capa: "medio", categoria: "disgusto" },
  { nombre: "Evasivo", capa: "medio", categoria: "disgusto" },
  { nombre: "Culpable", capa: "medio", categoria: "disgusto" },
  //exterior
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
  //Sorpresa
  { nombre: "Sorpresa", capa: "centro", categoria: "sorpresa" },
  //medio
  { nombre: "Interesado", capa: "medio", categoria: "sorpresa" },
  { nombre: "Sorprendido", capa: "medio", categoria: "sorpresa" },
  { nombre: "Confundido", capa: "medio", categoria: "sorpresa" },
  { nombre: "Asombrado", capa: "medio", categoria: "sorpresa" },
  { nombre: "Efusivo", capa: "medio", categoria: "sorpresa" },
  { nombre: "Jubiloso", capa: "medio", categoria: "sorpresa" },
  //exterior
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
  { nombre: "Eufórico", capa: "exterior", categoria: "sorpresa" },
];

export default function App() {
  const [fase, setFase] = useState(1);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [categoriasGanadoras, setCategoriasGanadoras] = useState([]);
  const [veredicto, setVeredicto] = useState(null);
  const [historial, setHistorial] = useState([]);

  // Cargar historial al iniciar
  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem('historialEmocional')) || [];
    setHistorial(guardado);
  }, []);

  const toggleEmocion = (emocion) => {
    if (seleccionadas.find(e => e.nombre === emocion.nombre)) {
      setSeleccionadas(seleccionadas.filter(e => e.nombre !== emocion.nombre));
    } else {
      setSeleccionadas([...seleccionadas, emocion]);
    }
  };

  const avanzarFase2 = () => {
    if (seleccionadas.length === 0) return;
    
    // Contar categorías elegidas
    const conteo = {};
    seleccionadas.forEach(e => {
      conteo[e.categoria] = (conteo[e.categoria] || 0) + 1;
    });

    // Encontrar la(s) categoría(s) con más selecciones
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
    setSeleccionadas([]); // Limpiar selección para la siguiente fase
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

    // Buscar la emoción central correspondiente a la categoría ganadora
    const emocionCentral = emocionesDB.find(e => e.capa === "centro" && e.categoria === categoriaFinal);
    
    setVeredicto(emocionCentral);
    setFase(3);

    // Guardar en LocalStorage
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
  };

  // Filtrar emociones según la fase
  const emocionesMostrar = fase === 1 
    ? emocionesDB.filter(e => e.capa === "exterior")
    : emocionesDB.filter(e => e.capa === "medio" && categoriasGanadoras.includes(e.categoria));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Registro Emocional</h1>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          
          {fase === 1 && (
            <div>
              <p className="mb-4 text-gray-600 text-center">¿Qué sensaciones identificás en este momento? (Podés elegir varias)</p>
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {emocionesMostrar.map(emo => (
                  <button
                    key={emo.nombre}
                    onClick={() => toggleEmocion(emo)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      seleccionadas.find(e => e.nombre === emo.nombre)
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {emo.nombre}
                  </button>
                ))}
              </div>
              <button 
                onClick={avanzarFase2}
                disabled={seleccionadas.length === 0}
                className="w-full py-3 bg-gray-900 text-white rounded-lg disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}

          {fase === 2 && (
            <div>
              <p className="mb-4 text-gray-600 text-center">Profundicemos un poco más. De estas palabras, ¿cuáles resuenan más con lo que sentís?</p>
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {emocionesMostrar.map(emo => (
                  <button
                    key={emo.nombre}
                    onClick={() => toggleEmocion(emo)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      seleccionadas.find(e => e.nombre === emo.nombre)
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {emo.nombre}
                  </button>
                ))}
              </div>
              <button 
                onClick={finalizarRegistro}
                disabled={seleccionadas.length === 0}
                className="w-full py-3 bg-gray-900 text-white rounded-lg disabled:opacity-50"
              >
                Descubrir Emoción
              </button>
            </div>
          )}

          {fase === 3 && veredicto && (
            <div className="text-center">
              <p className="text-gray-500 mb-2">Tu emoción predominante en este momento parece ser:</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{veredicto.nombre}</h2>
              <button 
                onClick={reiniciar}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Registrar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* HISTORIAL */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Tu Historial</h3>
          {historial.length === 0 ? (
            <p className="text-gray-500 italic">Aún no hay registros.</p>
          ) : (
            <ul className="space-y-3">
              {historial.map((reg, index) => (
                <li key={index} className="flex justify-between border-b pb-2 text-sm">
                  <span className="text-gray-500">{reg.fecha}</span>
                  <span className="font-medium text-gray-900">{reg.emocion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}