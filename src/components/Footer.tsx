import React from 'react';
import './Footer.css';


const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
  
        <div className="footer-languages">
          <span className="footer-link">Italia</span>
          <span className="footer-link">English (UK)</span>
        </div>
        
  
        <div className="footer-copyright">
          <p>Copyright © 2024 Apple Inc. Tutti i diritti riservati.</p>
        </div>
        
  
        <div className="footer-links">
          <a href="#" className="footer-link">Condizioni dei servizi internet</a>
          <a href="#" className="footer-link">Apple Music e privacy</a>
          <a href="#" className="footer-link">Avviso sui cookie</a>
          <a href="#" className="footer-link">Supporto</a>
          <a href="#" className="footer-link">Feedback</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;