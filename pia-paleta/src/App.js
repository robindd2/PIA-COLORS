import { useState, useEffect } from 'react';
import './App.css';
import Columna from './components/Columna';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const ColorAletorio = () => {
  const hexChars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [colors, setColors] = useState([]);
  const [view, setView] = useState('generator');
  const [formNombre, setFormNombre] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMensaje, setFormMensaje] = useState(''); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const generarNuevaPaleta = () => {
    const newColors = [];
    for (let i = 0; i < 5; i++) {
      newColors.push(ColorAletorio());
    }
    setColors(newColors); 
  };
  
  useEffect(() => {
    generarNuevaPaleta();
  }, []);
  
  useEffect(() => {
    const TeclaPresionada = (event) => {
      if (event.code === 'Space' && view === 'generator' && !isMobileMenuOpen) { 
        event.preventDefault(); 
        generarNuevaPaleta(); 
      }
    };
    window.addEventListener('keydown', TeclaPresionada);
    return () => {
      window.removeEventListener('keydown', TeclaPresionada);
    };
  }, [view, isMobileMenuOpen]);

  const enviar = (event) => {
    event.preventDefault(); 
    alert(`Gracias por tu mensaje, ${formNombre}. Te contactaremos pronto.`);
    setFormNombre('');
    setFormEmail('');
    setFormMensaje('');
  };

  
  const handleNavClick = (targetView) => {
    setView(targetView);
    setIsMobileMenuOpen(false);
  };
 

  return (
    <div className="App">
      <nav className="main-nav">
        <div className='izq'>
          <p className='c'>C</p>
          <p className='o'>O</p>
          <p className='l'>L</p>
          <p className='o2'>O</p>
          <p className='r'>R</p>
          <p className='s'>S</p>
          <img className="logo" src="/img/palette.png" alt="Logo Colors" />
        </div>
    
        <div className='der desktop-nav-links'> 
          <button className={view === 'generator' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavClick('generator')}>Generador</button>
          <button className={view === 'about' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavClick('about')}>Noticias</button>
          <button className={view === 'help' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavClick('help')}>Ayuda</button>
        </div>
    
        <div className="hamburger-icon-container">
          <FaBars className="hamburger-icon" onClick={() => setIsMobileMenuOpen(true)} />
        </div>
    
      </nav>

      <div className={isMobileMenuOpen ? "mobile-menu active" : "mobile-menu"}>
        <FaTimes className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)} />
          <div className='botones-mobile'>
        <button className='nav-mobile' onClick={() => handleNavClick('generator')}>Generador</button>
        <button className='nav-mobile' onClick={() => handleNavClick('about')}>Noticias</button>
        <button className='nav-mobile' onClick={() => handleNavClick('help')}>Ayuda</button>
        </div>
      </div>
    

      {view === 'generator' && (
        <>
          <div className="palette">
            {colors.map(colorHex => (
              <Columna key={colorHex} color={colorHex} />
            ))}
          </div>
          <div className="controls">
            <button className='botonp' onClick={generarNuevaPaleta}>Generar Paleta</button>
          </div>
          
        </>
      )}

      {view === 'about' && (
        <div className="view-container">
          <div className='noticias'>
            <div className='notas'>
              <div className='nota'> 
                <div className='textos'>
                  <h1 className='ttex' >Colores de moda para este verano 2025</h1> 
                  <p className='texto1'>Para que estés a la moda este verano, te compartimos algunos de los colores que serán tendencia.</p>
                </div>
                <div className='boton'>
                  <button className='botonn'>
                    <a className="texbot" href="https://elimparcial-elimparcial-prod.web.arc-cdn.net/locurioso/2025/05/26/colores-de-moda-para-este-verano-2025/"> Ver más </a>
                  </button>
                </div>
              </div>
              <div className='nota'> 
                <div className='textos'>
                  <h1 className='ttex' >Los 5 colores que le ayudarán a descansar mejor</h1> 
                  <p className='texto2'>El Feng Shui busca que la armonía y las buenas energías lleguen a su hogar. Si en este momento está necesitando un descanso renovador.</p>
                </div>
                <div className='boton'>
                  <button className='botonn'>
                    <a className="texbot" href="https://elimparcial-elimparcial-prod.web.arc-cdn.net/locurioso/2025/05/26/colores-de-moda-para-este-verano-2025/"> Ver más </a>
                  </button>
                </div>
              </div>
              <div className='nota'> 
                <div className='textos'>
                  <h1 className='ttex'>Cómo llevar el color marrón de tendencia en 2025</h1> 
                  <p className='texto3'>Confirmado: el Mocha Mousse será el nuevo color Pantone 2025. Así lo llevaremos en nuestros looks de tendencia de temporada según el 'street style'..</p>
                </div>
                <div className='boton'>
                  <button className='botonn'>
                    <a className="texbot" href="https://www.elle.com/es/moda/noticias/a63106182/mocha-mousse-pantone-2025-como-llevar-looks-inspiracion-expertas-moda/"> Ver más </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {view === 'help' && (
        <div className="view-container">
          <h2>Contacto de Soporte</h2>
          <p>¿Tienes alguna duda o sugerencia? ¡Envíanos un mensaje!</p>
          <form className="contact-form" onSubmit={enviar}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" rows="5" value={formMensaje} onChange={(e) => setFormMensaje(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="submit-btn">Enviar Mensaje</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;