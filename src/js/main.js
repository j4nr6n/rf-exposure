// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { RFExposureCalculator } from 'rf-exposure-calculator';

const themeSwitcher = new ThemeSwitcher();
const themeSelector = document.querySelector('#js-theme-selector');

themeSelector.addEventListener('click', (event) => {
    event.preventDefault();

    const el = event.target.closest('li');
    const selectedTheme = el.dataset.theme;

    themeSwitcher.setTheme(selectedTheme);
});

const calculator = new RFExposureCalculator();
const formElem = document.querySelector('#params');

formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!formElem.checkValidity()) {
        e.stopPropagation();
        formElem.classList.add('was-validated');

        return;
    } else {
        formElem.classList.remove('was-validated');
    }

    const powerInWatts = parseFloat(formElem.querySelector('#power').value);
    const modeDutyCycle = parseFloat(formElem.querySelector('#mode-duty-cycle').value);
    const txDutyCycle = {
        tx: parseFloat(formElem.querySelector('#tx-duty-cycle\\[tx\\]').value),
        rx: parseFloat(formElem.querySelector('#tx-duty-cycle\\[rx\\]').value)
    };
    const antennaGainInDbi = parseFloat(formElem.querySelector('#antenna-gain').value);
    const operatingFrequencyInMhz = parseFloat(formElem.querySelector('#operating-frequency').value);
    const includeGroundReflectionEffects = formElem.querySelector('#ground-reflection-effects').checked;

    const controlled = calculator.calculateRFExposure(
        powerInWatts,
        modeDutyCycle,
        txDutyCycle,
        antennaGainInDbi,
        operatingFrequencyInMhz,
        true,
        includeGroundReflectionEffects
    );

    const uncontrolled = calculator.calculateRFExposure(
        powerInWatts,
        modeDutyCycle,
        txDutyCycle,
        antennaGainInDbi,
        operatingFrequencyInMhz,
        false,
        includeGroundReflectionEffects
    );

    const resultsElem = document.querySelector('#results');

    // Controlled
    resultsElem.querySelector('#controlled-max-allowed-power-density').innerText = controlled.max_allowed_power_density;
    resultsElem.querySelector('#controlled-min-safe-distance').innerText = controlled.min_safe_distance_in_feet;

    // Uncontrolled
    resultsElem.querySelector('#uncontrolled-max-allowed-power-density').innerText = uncontrolled.max_allowed_power_density;
    resultsElem.querySelector('#uncontrolled-min-safe-distance').innerText = uncontrolled.min_safe_distance_in_feet;
});
