let currentLang = localStorage.getItem('selectedLanguage') || 'en'; // Varsayılan dil

function changeLang(lang) {
  currentLang = lang;
  localStorage.setItem('selectedLanguage', lang); // Dil seçimini kaydet
  fetch(`lang/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (data[key]) {
          if (element.classList.contains('button')) {
            // Buton elementi için özel işlem
            const icon = element.querySelector('i');
            const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
            if (textNode) {
              textNode.nodeValue = data[key];
            }
            if (icon) {
              element.innerHTML = '';
              element.appendChild(icon);
              element.appendChild(document.createTextNode(data[key]));
            } else {
              element.textContent = data[key];
            }
          } else {
            // Diğer elementler için normal işlem
            element.textContent = data[key];
          }
        }
      });
    })
    .catch(error => console.error('Error loading language file:', error));
}

// DOMContentLoaded event listener'ı ekleyelim
document.addEventListener('DOMContentLoaded', function() {
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    // Kaydedilmiş dili select elementinde ayarla
    languageSelect.value = currentLang;
    
    languageSelect.addEventListener('change', function() {
      changeLang(this.value);
    });
    
    // Sayfa yüklendiğinde kaydedilmiş dili yükle
    changeLang(currentLang);
  } else {
    console.error('Language select element not found');
  }
});

