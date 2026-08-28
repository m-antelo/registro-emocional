import React, { useState, useEffect } from 'react';

// 1. Estructura de Datos (Rueda de Plutchik simplificada para el embudo)
const emocionesDB = [
  // Miedo
  { nombre: "Terror", capa: "centro", categoria: "miedo" },
  { nombre: "Miedo", capa: "medio", categoria: "miedo" },
  { nombre: "Aprensión", capa: "exterior", categoria: "miedo" },
  // Ira
  { nombre: "Furia", capa: "centro", categoria: "ira" },
  { nombre: "Enojo", capa: "medio", categoria: "ira" },
  { nombre: "Molestia", capa: "exterior", categoria: "ira" },
  // Tristeza
  { nombre: "Pena", capa: "centro", categoria: "tristeza" },
  { nombre: "Tristeza", capa: "medio", categoria: "tristeza" },
  { nombre: "Melancolía", capa: "exterior", categoria: "tristeza" },
  // Alegría
  { nombre: "Éxtasis", capa: "centro", categoria: "alegria" },
  { nombre: "Alegría", capa: "medio", categoria: "alegria" },
  { nombre: "Serenidad", capa: "exterior", categoria: "alegria" },
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