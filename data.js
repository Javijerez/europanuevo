// Datos de países europeos con información completa
const europeCountries = {
  'Albania': {
    spanish: 'Albania',
    capital: 'Tirana',
    hints: [
      'País balcánico al oeste de Grecia',
      'Capital: Tirana',
      'Tiene costa en el mar Adriático'
    ],
    alternatives: ['albania']
  },
  'Andorra': {
    spanish: 'Andorra',
    capital: 'Andorra la Vieja',
    hints: [
      'Pequeño país entre España y Francia',
      'Capital: Andorra la Vieja',
      'Conocido por sus pistas de esquí'
    ],
    alternatives: ['andorra']
  },
  'Austria': {
    spanish: 'Austria',
    capital: 'Viena',
    hints: [
      'País de Mozart y Beethoven',
      'Capital: Viena',
      'Famoso por sus valses y montañas alpinas'
    ],
    alternatives: ['austria']
  },
  'Belarus': {
    spanish: 'Bielorrusia',
    capital: 'Minsk',
    hints: [
      'País entre Rusia y Polonia',
      'Capital: Minsk',
      'También conocido como Belarús'
    ],
    alternatives: ['bielorrusia', 'belarus', 'belarús', 'rusia blanca']
  },
  'Belgium': {
    spanish: 'Bélgica',
    capital: 'Bruselas',
    hints: [
      'País del chocolate y las cervezas',
      'Capital: Bruselas (sede de la UE)',
      'Famoso por sus gofres'
    ],
    alternatives: ['bélgica', 'belgica']
  },
  'Bosnia and Herzegovina': {
    spanish: 'Bosnia y Herzegovina',
    capital: 'Sarajevo',
    hints: [
      'País balcánico con dos regiones principales',
      'Capital: Sarajevo',
      'Sede de los Juegos Olímpicos de Invierno 1984'
    ],
    alternatives: ['bosnia y herzegovina', 'bosnia', 'herzegovina']
  },
  'Bulgaria': {
    spanish: 'Bulgaria',
    capital: 'Sofía',
    hints: [
      'País balcánico famoso por sus rosas',
      'Capital: Sofía',
      'Produce el aceite de rosa más fino del mundo'
    ],
    alternatives: ['bulgaria']
  },
  'Croatia': {
    spanish: 'Croacia',
    capital: 'Zagreb',
    hints: [
      'País con forma de boomerang',
      'Capital: Zagreb',
      'Famoso por su costa dálmata y mil islas'
    ],
    alternatives: ['croacia']
  },
  'Czech Republic': {
    spanish: 'República Checa',
    capital: 'Praga',
    hints: [
      'Antigua Checoslovaquia',
      'Capital: Praga',
      'Famoso por su cerveza y castillos'
    ],
    alternatives: ['república checa', 'republica checa', 'chequia', 'chequia']
  },
  'Denmark': {
    spanish: 'Dinamarca',
    capital: 'Copenhague',
    hints: [
      'País de los vikingos y LEGO',
      'Capital: Copenhague',
      'Hogar de Hans Christian Andersen'
    ],
    alternatives: ['dinamarca']
  },
  'Estonia': {
    spanish: 'Estonia',
    capital: 'Tallin',
    hints: [
      'País báltico más al norte',
      'Capital: Tallin',
      'Pionero en gobierno digital'
    ],
    alternatives: ['estonia']
  },
  'Finland': {
    spanish: 'Finlandia',
    capital: 'Helsinki',
    hints: [
      'País de mil lagos y saunas',
      'Capital: Helsinki',
      'Hogar de Nokia y Angry Birds'
    ],
    alternatives: ['finlandia']
  },
  'France': {
    spanish: 'Francia',
    capital: 'París',
    hints: [
      'País de la Torre Eiffel y el Louvre',
      'Capital: París',
      'Famoso por su gastronomía y vinos'
    ],
    alternatives: ['francia']
  },
  'Germany': {
    spanish: 'Alemania',
    capital: 'Berlín',
    hints: [
      'País más poblado de la UE',
      'Capital: Berlín',
      'Conocido por su industria automotriz'
    ],
    alternatives: ['alemania']
  },
  'Greece': {
    spanish: 'Grecia',
    capital: 'Atenas',
    hints: [
      'Cuna de la democracia',
      'Capital: Atenas',
      'Hogar del Partenón y los dioses olímpicos'
    ],
    alternatives: ['grecia']
  },
  'Hungary': {
    spanish: 'Hungría',
    capital: 'Budapest',
    hints: [
      'País dividido por el río Danubio',
      'Capital: Budapest',
      'Famoso por sus aguas termales'
    ],
    alternatives: ['hungría', 'hungria']
  },
  'Iceland': {
    spanish: 'Islandia',
    capital: 'Reikiavik',
    hints: [
      'Isla nórdica de hielo y fuego',
      'Capital: Reikiavik',
      'Famosa por sus géiseres y auroras boreales'
    ],
    alternatives: ['islandia']
  },
  'Ireland': {
    spanish: 'Irlanda',
    capital: 'Dublín',
    hints: [
      'La Isla Esmeralda',
      'Capital: Dublín',
      'Famosa por el trébol y San Patricio'
    ],
    alternatives: ['irlanda']
  },
  'Italy': {
    spanish: 'Italia',
    capital: 'Roma',
    hints: [
      'País con forma de bota',
      'Capital: Roma',
      'Cuna del Renacimiento y la pizza'
    ],
    alternatives: ['italia']
  },
  'Latvia': {
    spanish: 'Letonia',
    capital: 'Riga',
    hints: [
      'País báltico central',
      'Capital: Riga',
      'Famoso por su arquitectura Art Nouveau'
    ],
    alternatives: ['letonia']
  },
  'Lithuania': {
    spanish: 'Lituania',
    capital: 'Vilna',
    hints: [
      'País báltico más al sur',
      'Capital: Vilna',
      'Primer país en independizarse de la URSS'
    ],
    alternatives: ['lituania']
  },
  'Luxembourg': {
    spanish: 'Luxemburgo',
    capital: 'Luxemburgo',
    hints: [
      'Pequeño país muy rico',
      'Capital: Luxemburgo',
      'Centro financiero europeo'
    ],
    alternatives: ['luxemburgo']
  },
  'Malta': {
    spanish: 'Malta',
    capital: 'La Valeta',
    hints: [
      'Pequeño archipiélago en el Mediterráneo',
      'Capital: La Valeta',
      'Famoso por sus templos megalíticos'
    ],
    alternatives: ['malta']
  },
  'Moldova': {
    spanish: 'Moldavia',
    capital: 'Chisinau',
    hints: [
      'País entre Rumanía y Ucrania',
      'Capital: Chisinau',
      'Famoso por sus vinos'
    ],
    alternatives: ['moldavia', 'moldova']
  },
  'Monaco': {
    spanish: 'Mónaco',
    capital: 'Mónaco',
    hints: [
      'Principado en la Riviera francesa',
      'Capital: Mónaco',
      'Famoso por su Gran Premio de F1'
    ],
    alternatives: ['mónaco', 'monaco']
  },
  'Montenegro': {
    spanish: 'Montenegro',
    capital: 'Podgorica',
    hints: [
      'Pequeño país balcánico',
      'Capital: Podgorica',
      'Significa "montaña negra"'
    ],
    alternatives: ['montenegro']
  },
  'Netherlands': {
    spanish: 'Países Bajos',
    capital: 'Ámsterdam',
    hints: [
      'País de tulipanes y molinos',
      'Capital: Ámsterdam',
      'También conocido como Holanda'
    ],
    alternatives: ['países bajos', 'paises bajos', 'holanda']
  },
  'North Macedonia': {
    spanish: 'Macedonia del Norte',
    capital: 'Skopje',
    hints: [
      'Antigua República Yugoslava de Macedonia',
      'Capital: Skopje',
      'Hogar de Alejandro Magno'
    ],
    alternatives: ['macedonia del norte', 'macedonia', 'norte de macedonia']
  },
  'Norway': {
    spanish: 'Noruega',
    capital: 'Oslo',
    hints: [
      'País de los fiordos',
      'Capital: Oslo',
      'Rica en petróleo y gas'
    ],
    alternatives: ['noruega']
  },
  'Poland': {
    spanish: 'Polonia',
    capital: 'Varsovia',
    hints: [
      'País de Chopin y Copérnico',
      'Capital: Varsovia',
      'Famoso por sus pierogi'
    ],
    alternatives: ['polonia']
  },
  'Portugal': {
    spanish: 'Portugal',
    capital: 'Lisboa',
    hints: [
      'País atlántico al oeste de España',
      'Capital: Lisboa',
      'Famoso por el fado y el vino de Oporto'
    ],
    alternatives: ['portugal']
  },
  'Romania': {
    spanish: 'Rumanía',
    capital: 'Bucarest',
    hints: [
      'País de Transilvania',
      'Capital: Bucarest',
      'Hogar del mito de Drácula'
    ],
    alternatives: ['rumanía', 'rumania', 'romania']
  },
  'Russia': {
    spanish: 'Rusia',
    capital: 'Moscú',
    hints: [
      'País más grande del mundo',
      'Capital: Moscú',
      'Se extiende por Europa y Asia'
    ],
    alternatives: ['rusia']
  },
  'San Marino': {
    spanish: 'San Marino',
    capital: 'San Marino',
    hints: [
      'Microestado rodeado por Italia',
      'Capital: San Marino',
      'Una de las repúblicas más antiguas'
    ],
    alternatives: ['san marino']
  },
  'Serbia': {
    spanish: 'Serbia',
    capital: 'Belgrado',
    hints: [
      'País balcánico en el Danubio',
      'Capital: Belgrado',
      'Famoso por su música y deporte'
    ],
    alternatives: ['serbia']
  },
  'Slovakia': {
    spanish: 'Eslovaquia',
    capital: 'Bratislava',
    hints: [
      'Antigua Checoslovaquia',
      'Capital: Bratislava',
      'País montañoso en Europa Central'
    ],
    alternatives: ['eslovaquia']
  },
  'Slovenia': {
    spanish: 'Eslovenia',
    capital: 'Liubliana',
    hints: [
      'Pequeño país alpino',
      'Capital: Liubliana',
      'Entre Italia, Austria y Croacia'
    ],
    alternatives: ['eslovenia']
  },
  'Spain': {
    spanish: 'España',
    capital: 'Madrid',
    hints: [
      'País de la península ibérica',
      'Capital: Madrid',
      'Famoso por el flamenco y la paella'
    ],
    alternatives: ['españa', 'espana']
  },
  'Sweden': {
    spanish: 'Suecia',
    capital: 'Estocolmo',
    hints: [
      'País escandinavo de IKEA',
      'Capital: Estocolmo',
      'Famoso por los premios Nobel'
    ],
    alternatives: ['suecia']
  },
  'Switzerland': {
    spanish: 'Suiza',
    capital: 'Berna',
    hints: [
      'País alpino neutral',
      'Capital: Berna',
      'Famoso por relojes y chocolate'
    ],
    alternatives: ['suiza']
  },
  'Ukraine': {
    spanish: 'Ucrania',
    capital: 'Kiev',
    hints: [
      'País más grande completamente en Europa',
      'Capital: Kiev',
      'Conocido como el granero de Europa'
    ],
    alternatives: ['ucrania']
  },
  'United Kingdom': {
    spanish: 'Reino Unido',
    capital: 'Londres',
    hints: [
      'Islas británicas',
      'Capital: Londres',
      'Hogar del Big Ben y la Reina'
    ],
    alternatives: ['reino unido', 'gran bretaña', 'gran bretana', 'inglaterra', 'uk']
  },
  'Vatican City': {
    spanish: 'Vaticano',
    capital: 'Ciudad del Vaticano',
    hints: [
      'Estado más pequeño del mundo',
      'Capital: Ciudad del Vaticano',
      'Hogar del Papa'
    ],
    alternatives: ['vaticano', 'ciudad del vaticano']
  }
};

// Configuración del mapa y colores
const mapConfig = {
  center: [54.5260, 15.2551], // Centro de Europa
  zoom: 4,
  minZoom: 3,
  maxZoom: 7,
  bounds: [[35.0, -10.0], [71.0, 40.0]], // Límites de Europa
  colors: {
    default: '#e2e8f0',
    hover: '#cbd5e0', 
    selected: '#fbbf24',
    correct: '#10b981',
    incorrect: '#ef4444',
    stroke: '#4a5568'
  }
};