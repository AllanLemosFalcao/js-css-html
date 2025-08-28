// Seleciona os elementos do HTML
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResultDiv = document.getElementById('weather-result');

// Chave API OpenWeatherMap
const apiKey = 'efaee9957013b865ffb46a7e339d4f74';

// Executa a função ao clicar no botão.
searchBtn.addEventListener('click', () => {
    // Pega o nome da cidade que o usuário digitou no campo de input
    const cityName = cityInput.value;
    // Chama a função que busca os dados do clima
    getWeather(cityName);
});

// Função principal que busca e exibe os dados do clima
async function getWeather(cityName) {
    // Verifica se o usuário digitou algo. Se não, exibe um alerta.
    if (!cityName) {
        alert('Por favor, digite o nome de uma cidade.');
        return; // Para a execução da função
    }

    // Monta a URL da API com a cidade e sua chave.
    // `units=metric` para temperatura em Celsius.
    // `lang=pt_br` para descrição em português.
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        // Tenta fazer a chamada para a API
        const response = await fetch(apiUrl);

        // Se a resposta não for "ok" (ex: erro 404 - cidade não encontrada), exibe um erro.
        if (!response.ok) {
            alert('Não foi possível encontrar o clima para esta cidade. Verifique o nome e tente novamente.');
            return;
        }

        // Converte a resposta da API para o formato JSON 
        const data = await response.json();

        console.log(data); // Ver os dados recebido pelo no console do navegador

        // Limpa resultados anteriores
        weatherResultDiv.innerHTML = '';

        // Cria os elementos HTML para exibir os resultados
        const cityNameEl = document.createElement('h2');
        cityNameEl.textContent = data.name;

        const temperatureEl = document.createElement('p');
        temperatureEl.className = 'temperature';
        temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;

        const descriptionEl = document.createElement('p');
        descriptionEl.className = 'description';
        descriptionEl.textContent = data.weather[0].description;
        
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const iconEl = document.createElement('img');
        iconEl.className = 'weather-icon';
        iconEl.src = iconUrl;
        
        // Adiciona os novos elementos na div de resultados
        weatherResultDiv.appendChild(cityNameEl);
        weatherResultDiv.appendChild(temperatureEl);
        weatherResultDiv.appendChild(iconEl);
        weatherResultDiv.appendChild(descriptionEl);

    } catch (error) {
        // Pega qualquer erro de rede ou outro problema e exibe um alerta
        alert('Ocorreu um erro ao buscar os dados do clima.');
        console.error(error);
    }
}
