import React, { useState, useEffect } from 'react';

// --- BASE DE DATOS DE EMOCIONES COMPLETA ---
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
  { nombre: "Ridiculizado", capa: "exterior", categoria: "miedo" },
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

// --- BASE DE DATOS DE CONSEJOS COMPLETA ---
const consejosDB = {
  miedo: [
    "Intentá la respiración 4-7-8: Inhalá en 4 segundos, retené 7, exhalá en 8. Ayuda a bajar el ritmo cardíaco.",
    "Buscá un 'ancla' en el presente: nombrá 3 cosas que puedas ver, 2 que puedas tocar y 1 que puedas escuchar.",
    "Anotá qué es lo peor que podría pasar y al lado, qué harías en ese caso. Darle forma al miedo le quita poder.",
    "Recordá que el miedo es solo tu mente intentando protegerte. Agradecele, pero recordale que estás a salvo ahora.",
    "Visualizá un lugar que te transmita paz absoluta. Cerrá los ojos y tratá de imaginar los detalles, olores y sonidos de ese lugar.",
    "Recordá una situación pasada donde sentiste mucho miedo y lograste superarlo. Tenés las herramientas para afrontar esto también.",
    "Si el miedo te paraliza, enfocá tu atención en una tarea manual y repetitiva por 5 minutos, como ordenar algo pequeño."
  ],
  ira: [
    "Si sentís que explotás, alejate físicamente de la situación por 10 minutos. Caminar un poco ayuda a descargar.",
    "Escribí todo lo que te da bronca en un papel sin filtro. Cuando termines, rompelo y tiralo a la basura.",
    "Lavate la cara con agua bien fría o agarrá un cubito de hielo. El cambio de temperatura resetea el sistema nervioso.",
    "Canalizá esa energía: ordená un cajón, hacé unas flexiones o escuchá música fuerte por un rato.",
    "Probá la técnica del 'tiempo fuera'. Avisá que necesitás unos minutos, salí del lugar y no vuelvas hasta que las pulsaciones bajen.",
    "Escribí un mensaje o mail diciendo todo lo que pensás, pero NO lo envíes. Dejalo reposar hasta mañana.",
    "Hacé un escaneo corporal rápido: ¿tenés los puños o la mandíbula apretados? Soltá la tensión muscular conscientemente."
  ],
  tristeza: [
    "Llorar está perfecto. Es el mecanismo natural del cuerpo para liberar las hormonas del estrés. Date permiso.",
    "No te exijas estar bien hoy. Tratáte con la misma paciencia con la que tratarías a un amigo que está pasando un mal momento.",
    "Hacé algo mínimo que te reconforte: preparate un té rico, abrigate bien o mirá tu película confort favorita.",
    "Escribir lo que sentís ayuda a sacarlo del cuerpo. A veces, la tristeza solo necesita ser escuchada.",
    "No te aísles por completo. Mandale un mensajito a alguien de confianza; no hace falta hablar del tema, solo conectar.",
    "Establecé una meta minúscula para hoy: bañarte, hacer la cama o dar una vuelta a la manzana. Celebrá ese pequeño logro.",
    "Recordá que las emociones son como olas: suben, llegan a un pico y después bajan. Esta tristeza no es un estado permanente."
  ],
  alegria: [
    "¡Qué bueno! Frená un segundo y registrá en qué parte del cuerpo sentís esta alegría. Guardá esa sensación.",
    "Compartí esto con alguien. Mandale un mensaje a esa persona que sabés que se va a poner feliz por vos.",
    "Usá esta energía a tu favor: es un gran momento para arrancar ese proyecto o tarea que venías pateando.",
    "No sientas culpa por estar bien. Te merecés disfrutar este momento al cien por ciento.",
    "Escribí 3 cosas por las que estás agradecido hoy. La gratitud potencia y alarga la sensación de bienestar.",
    "Hacé algo lindo por otra persona. Compartir la alegría o ayudar a alguien más multiplica la emoción.",
    "Sacá una foto mental de este momento. ¿Qué estás haciendo? ¿Con quién estás? Guardalo como recurso para los días grises."
  ],
  disgusto: [
    "El disgusto suele marcar un límite que fue cruzado. Identificá cuál fue ese límite para poder comunicarlo después.",
    "Tomá distancia de lo que te genera rechazo. Está bien proteger tu espacio y tu energía vital.",
    "Si es una situación inevitable, intentá enfocarte en qué podés controlar vos y soltá lo que hace el otro.",
    "Escribí por qué te sentís así. Ponerlo en palabras ayuda a entender si es un tema de valores profundos o de incomodidad pasajera.",
    "Preguntate: ¿esto choca con mis valores fundamentales? Entender la raíz del rechazo te ayuda a procesarlo más rápido.",
    "Si algo te genera rechazo constante, empezá a armar un plan para poner límites claros o reducir tu exposición a esa situación.",
    "Cambiá el foco: si estás en un ambiente que te desagrada, buscá mentalmente tres cosas neutrales o positivas a tu alrededor."
  ],
  sorpresa: [
    "Date un momento para procesar la nueva información. No tenés que reaccionar ni tomar decisiones ya mismo.",
    "Respirá hondo. La sorpresa descoloca, dale a tu cerebro unos minutos para acomodarse a la nueva realidad.",
    "Si la sorpresa desbarató tus planes, enfocate en recalcular el próximo paso inmediato, no en mirar el mapa entero.",
    "Transformá la sorpresa en curiosidad. Preguntate: '¿qué puedo aprender de esta situación inesperada?'",
    "No saques conclusiones apresuradas. La sorpresa genera incertidumbre; dale tiempo a tu mente para recolectar más información.",
    "Aceptá que no podemos controlarlo todo. La flexibilidad mental es tu mejor herramienta frente a los cambios repentinos."
  ]
};

// Función para mezclar cartas (12 opciones de la periferia)
const mezclarArray = (array) => {
  let mezclado = [...array];
  for (let i = mezclado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mezclado[i], mezclado[j]] = [mezclado[j], mezclado[i]];
  }
  return mezclado;
};

export default function App() {
  // Estados de la app
  const [fase, setFase] = useState(1);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [categoriasGanadoras, setCategoriasGanadoras] = useState([]);
  const [veredicto, setVeredicto] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [opcionesFase1, setOpcionesFase1] = useState([]);
  const [consejoActual, setConsejoActual] = useState("");

  // Estado para controlar el tema (arranca en oscuro por defecto)
  const [temaClaro, setTemaClaro] = useState(false);

  // Al cargar (F5), solo revisamos qué había guardado
  useEffect(() => {
    const temaGuardado = localStorage.getItem('preferenciaTema');
    if (temaGuardado === 'claro') {
      setTemaClaro(true);
    }
  }, []); // El array vacío asegura que esto pase solo al cargar

  // (Acá abajo dejá tu useEffect del historial que ya tenías)
  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem('historialEmocional')) || [];
    setHistorial(guardado);
    barajarEmociones();
  }, []);

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
    seleccionadas.forEach(e => { conteo[e.categoria] = (conteo[e.categoria] || 0) + 1; });
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
    seleccionadas.forEach(e => { conteo[e.categoria] = (conteo[e.categoria] || 0) + 1; });
    let maxVotos = 0;
    let categoriaFinal = "";
    for (const cat in conteo) {
      if (conteo[cat] > maxVotos) {
        maxVotos = conteo[cat];
        categoriaFinal = cat;
      }
    }
    const emocionCentral = emocionesDB.find(e => e.capa === "centro" && e.categoria === categoriaFinal);
    
    // Sortear el consejo
    if (consejosDB[categoriaFinal]) {
      const listaConsejos = consejosDB[categoriaFinal];
      const consejoAleatorio = listaConsejos[Math.floor(Math.random() * listaConsejos.length)];
      setConsejoActual(consejoAleatorio);
    }
    
    setVeredicto(emocionCentral);
    setFase(3);
    
    // Guardar historial
    const nuevoRegistro = { fecha: new Date().toLocaleString(), emocion: emocionCentral.nombre };
    const nuevoHistorial = [nuevoRegistro, ...historial];
    localStorage.setItem('historialEmocional', JSON.stringify(nuevoHistorial));
    setHistorial(nuevoHistorial);
  };

  const reiniciar = () => {
    setFase(1);
    setSeleccionadas([]);
    setVeredicto(null);
    setCategoriasGanadoras([]);
    setConsejoActual("");
    barajarEmociones();
  };

  const emocionesFase2 = emocionesDB.filter(e => e.capa === "medio" && categoriasGanadoras.includes(e.categoria));

  // --- VARIABLES DE ESTILO DINÁMICAS (Responden al tema) ---
  const fondoGeneral = temaClaro 
    ? "bg-gradient-to-br from-teal-200 via-purple-200 to-orange-200 text-slate-800" 
    : "bg-slate-900 text-slate-200";
    
  const fondoTarjeta = temaClaro
    ? "bg-slate-100/50 backdrop-blur-md border-white/40 shadow-xl"
    : "bg-slate-800 border-slate-700 shadow-2xl";

  const claseBotonEmocion = (emo) => {
    const estaSeleccionada = seleccionadas.find(e => e.nombre === emo.nombre);
    const base = "px-5 py-2.5 rounded-full border transition-all duration-300 shadow-sm font-medium hover:-translate-y-1";
    
    if (estaSeleccionada) {
      return temaClaro
        ? `${base} bg-purple-500 text-white border-purple-400 scale-105 shadow-lg ring-2 ring-purple-300 ring-offset-2 ring-offset-slate-100`
        : `${base} bg-indigo-500 text-white border-indigo-400 scale-105 shadow-lg ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-800`;
    }
    return temaClaro
      ? `${base} bg-white/40 text-slate-700 border-white/60 hover:bg-white/80 hover:border-purple-300`
      : `${base} bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600 hover:border-slate-400`;
  };

  const claseBotonAccion = temaClaro
    ? "px-10 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl text-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
    : "px-10 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:scale-105 transition-all duration-300";

  return (
    <div className={`min-h-screen p-4 sm:p-8 font-sans flex flex-col items-center transition-colors duration-500 ${fondoGeneral}`}>
      
      {/* Botón Toggle de Tema */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <button 
          onClick={() => {
            const nuevoTema = !temaClaro;
            setTemaClaro(nuevoTema);
            localStorage.setItem('preferenciaTema', nuevoTema ? 'claro' : 'oscuro');
          }}
          className={`p-3 rounded-full shadow-md transition-all duration-300 hover:scale-110 ${temaClaro ? 'bg-slate-100/80 text-yellow-500 border border-white' : 'bg-slate-800 text-indigo-300 border border-slate-700'}`}
          title="Cambiar tema"
        >
          {temaClaro ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="max-w-2xl w-full mt-4">
        
        <h1 className={`text-3xl font-bold mb-2 text-center transition-colors duration-300 ${temaClaro ? 'text-slate-800' : 'text-slate-100'}`}>Registro Emocional</h1>
        
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => setMostrarAyuda(true)}
            className={`text-sm underline transition-colors duration-300 ${temaClaro ? 'text-slate-600 hover:text-purple-700' : 'text-slate-400 hover:text-slate-200'}`}
          >
            ¿Cómo funciona el embudo?
          </button>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className={`p-8 rounded-2xl border mb-8 transition-all duration-500 ${fondoTarjeta}`}>
          
          {fase === 1 && (
            <div className="animate-fade-in text-center">
              <p className={`mb-8 text-lg transition-colors ${temaClaro ? 'text-slate-700' : 'text-slate-300'}`}>¿Qué sensaciones identificás en este momento?</p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {opcionesFase1.map(emo => (
                  <button key={emo.nombre} onClick={() => toggleEmocion(emo)} className={claseBotonEmocion(emo)}>
                    {emo.nombre}
                  </button>
                ))}
              </div>

              <div className="flex justify-center mb-8">
                <button 
                  onClick={barajarEmociones}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors px-4 py-2 rounded-lg ${temaClaro ? 'text-slate-600 hover:text-slate-900 hover:bg-white/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
                >
                  ↻ No siento ninguna de estas (Ver otras)
                </button>
              </div>

              <div className="flex justify-center">
                <button onClick={avanzarFase2} disabled={seleccionadas.length === 0} className={claseBotonAccion}>
                  Siguiente paso
                </button>
              </div>
            </div>
          )}

          {fase === 2 && (
            <div className="animate-fade-in text-center">
              <p className={`mb-8 text-lg transition-colors ${temaClaro ? 'text-slate-700' : 'text-slate-300'}`}>Profundicemos un poco más. ¿Cuáles resuenan más con tu interior?</p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-10">
                {emocionesFase2.map(emo => (
                  <button key={emo.nombre} onClick={() => toggleEmocion(emo)} className={claseBotonEmocion(emo)}>
                    {emo.nombre}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <button onClick={finalizarRegistro} disabled={seleccionadas.length === 0} className={claseBotonAccion}>
                  Descubrir Emoción
                </button>
              </div>
            </div>
          )}

          {fase === 3 && veredicto && (
            <div className="text-center animate-fade-in py-6">
              <p className={`mb-4 text-lg transition-colors ${temaClaro ? 'text-slate-600' : 'text-slate-400'}`}>Tu emoción predominante en este momento es:</p>
              <h2 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 mb-8 pb-2">
                {veredicto.nombre}
              </h2>
              
              {/* Tarjeta del consejo dinámico */}
              {consejoActual && (
                <div className={`max-w-md mx-auto p-6 rounded-2xl mb-10 text-left shadow-inner border transition-colors ${temaClaro ? 'bg-white/50 border-purple-200/60' : 'bg-indigo-900/20 border-indigo-500/30'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">💡</span>
                    <h4 className={`font-semibold ${temaClaro ? 'text-purple-700' : 'text-indigo-300'}`}>Un consejo para este momento:</h4>
                  </div>
                  <p className={`leading-relaxed text-sm ${temaClaro ? 'text-slate-700' : 'text-slate-300'}`}>
                    {consejoActual}
                  </p>
                </div>
              )}

              <button onClick={reiniciar} className={`px-8 py-3 border rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg ${temaClaro ? 'bg-white/80 text-slate-700 border-white hover:bg-white' : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'}`}>
                Registrar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* HISTORIAL */}
        <div className={`p-6 rounded-2xl border transition-all duration-500 ${fondoTarjeta}`}>
          <h3 className={`text-xl font-semibold mb-6 transition-colors ${temaClaro ? 'text-slate-800' : 'text-slate-200'}`}>Tu Historial</h3>
          {historial.length === 0 ? (
            <p className={`italic text-center py-4 ${temaClaro ? 'text-slate-500' : 'text-slate-500'}`}>Aún no hay registros guardados.</p>
          ) : (
            <ul className="space-y-4">
              {historial.map((reg, index) => (
                <li key={index} className={`flex justify-between items-center border-b pb-3 text-sm ${temaClaro ? 'border-purple-200/50' : 'border-slate-700'}`}>
                  <span className={temaClaro ? 'text-slate-500' : 'text-slate-400'}>{reg.fecha}</span>
                  <span className={`font-semibold text-base ${temaClaro ? 'text-slate-800' : 'text-slate-200'}`}>{reg.emocion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* BOTÓN FLOTANTE DE SUGERENCIAS */}
        <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfP7eura5hSTHudehLmAToAADDP2RbozZXcg6vgPDdDBL6oIg/viewform?usp=header"
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute top-4 left-4 sm:top-8 sm:left-8 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105 font-medium text-sm ${
          temaClaro 
            ? 'bg-slate-100/80 text-slate-700 border border-white hover:bg-white shadow-purple-200/50' 
            : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 shadow-black/40'
        }`}
        title="Dejar una sugerencia"
        >
        <span>💬</span>
        <span className="hidden sm:inline">Sugerencias</span>
      </a>

      </div> {/* <-- Este div cierra el max-w-2xl que envuelve todo */}

      {/* VENTANA MODAL DE INSTRUCCIONES */}
      {mostrarAyuda && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className={`rounded-2xl p-8 max-w-md w-full shadow-2xl relative border ${temaClaro ? 'bg-slate-50 border-white' : 'bg-slate-800 border-slate-600'}`}>
            <button onClick={() => setMostrarAyuda(false)} className="absolute top-4 right-5 text-gray-400 hover:text-gray-800 font-bold text-2xl transition-colors">×</button>
            
            <h3 className={`text-xl font-bold mb-6 ${temaClaro ? 'text-slate-800' : 'text-slate-100'}`}>¿Cómo usar el registro?</h3>
            
            <div className={`space-y-4 text-sm ${temaClaro ? 'text-slate-600' : 'text-slate-300'}`}>
              <p>
                <strong className={temaClaro ? 'text-purple-600' : 'text-indigo-400'}>1. Superficie:</strong> Elegí las palabras con las que te identifiques. No lo pienses demasiado, dejate llevar. Podés barajar las opciones si ninguna encaja.
              </p>
              <p>
                <strong className={temaClaro ? 'text-purple-600' : 'text-indigo-400'}>2. Profundidad:</strong> Según tus elecciones, el sistema filtrará sensaciones más específicas. Seleccioná las que más resuenen.
              </p>
              <p>
                <strong className={temaClaro ? 'text-purple-600' : 'text-indigo-400'}>3. Núcleo:</strong> Finalmente, descubriremos tu emoción central para que puedas guardarla en tu historial.
              </p>
            </div>

            <button onClick={() => setMostrarAyuda(false)} className={`mt-8 w-full py-3 text-white rounded-lg transition-colors font-medium shadow-md ${temaClaro ? 'bg-purple-500 hover:bg-purple-600' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}