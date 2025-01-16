import * as plots from './plotForecasts';
// Models: "Jurre brishti", "Muva kubwa"
let modelName = 'Jurre brishti';
// Regions: Burundi, Djibouti, Eritrea, Ethiopia, Kenya, Rwanda, Somalia, South Sudan,
//          Sudan, Tanzania, Uganda, ICPAC, East Africa, All.
let regionName = 'East Africa';
let units = 'mm/6h'; // Can be mm/h, mm/6h, mm/day, mm/week
let style = 'Default'; // Can be "Default", "ICPAC", "KMD", "EMI"
let plotType = 'Probability'; // Can be "Probability" or "Values"
let showPercentages = false; // On the colour scale
let maxRain = 1; // Rainfall threshold in mm/h
let probability = 0.95; // Between 0 and 1

let drawMarker = false; // Draw the marker corresponding to the histogram location
let locationChanged = false; // Did the lon/lat location of the histogram change?
let canvasClickX = 0; // Where in the canvas the click was registered
let canvasClickY = 0;
let longitudeIdx = 0; // Which location are we plotting
let latitudeIdx = 0;

let availableDates; // An object containing the dates we can use
let GANForecast = new plots.countsData(); // Create a countsData object

// Called by the modelSelect menu
export async function modelSelect() {
    modelName = document.getElementById('modelSelect').value;

    // Set the model description
    if (modelName == 'Jurre brishti') {
        document.getElementById('modelInfo').innerHTML =
            ': The <a href="https://www.ecmwf.int/" target="_blank">ECMWF</a> <a href="https://confluence.ecmwf.int/display/FUG/Section+2+The+ECMWF+Integrated+Forecasting+System+-+IFS" target="_blank">IFS</a> output is post-processed using <a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2022MS003120" target="_blank">cGAN</a> trained on <a href="https://gpm.nasa.gov/data/imerg" target="_blank"> IMERG</a> v6 from 2018 and 2019 to produce forecasts of 6h rainfall intervals.';
    } else if (modelName == 'Mvua kubwa') {
        document.getElementById('modelInfo').innerHTML =
            ': The <a href="https://www.ecmwf.int/" target="_blank">ECMWF</a> <a href="https://confluence.ecmwf.int/display/FUG/Section+2+The+ECMWF+Integrated+Forecasting+System+-+IFS" target="_blank">IFS</a> output is post-processed using <a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2022MS003120" target="_blank">cGAN</a> trained on <a href="https://gpm.nasa.gov/data/imerg" target="_blank"> IMERG</a> v7 from 2018 and 2019 to produce forecasts of 24h rainfall intervals.';
    }
    await loadDates(); // Each model has it's own set of available dates
    await loadForecast(); // Load the currently selected forecast
    drawMarker = false; // No longer draw the histograms
    drawPlots();
}

// Called by the regionSelect menu
export function regionSelect() {
    regionName = document.getElementById('regionSelect').value;
    drawMarker = false; // No longer draw the histograms
    drawPlots();
}

// Called by the initYearSelect, initMonthSelect,initDaySelect and initTimeSelect menus
export async function initTimeSelect() {
    updateDateMenus();
    await loadForecast();
    drawPlots();
}

// Called by the validTimeSelect menu
export async function validTimeSelect() {
    await loadForecast();
    drawPlots();
}

// Called by the styleSelect menu
export function styleSelect() {
    style = document.getElementById('styleSelect').value;
    drawPlots();
}

// Called by the plotSelect menu
export function plotSelect() {
    plotType = document.getElementById('plotSelect').value;
    if (plotType == 'Probability') {
        document.getElementById('percentagesSelect').removeAttribute('disabled', '');
    } else {
        document.getElementById('percentagesSelect').setAttribute('disabled', '');
    }
    drawPlots();
}

// Called by the percentagesSelect menu
export function percentagesSelect() {
    if (document.getElementById('percentagesSelect').value == 'Percentages') {
        showPercentages = true;
    } else {
        showPercentages = false;
    }
    drawPlots();
}

// Called by the unitsSelect menu
export function unitsSelect() {
    // Get the unitsSelect menu's value
    units = document.getElementById('unitsSelect').value;

    // Set the units in the description to the selected units
    document.getElementById('unitsDescription').innerHTML = units;

    // Update the value threshold to display in the current units
    norm = plots.getPlotNormalisation(units);
    document.getElementById('thresholdValueSelect').value = plots.roundSF(maxRain * norm, 3);

    // Draw plots with the new units
    drawPlots();
}

// Loads and plots the currently selected forecast
export async function loadForecast() {
    let year = document.getElementById('initYearSelect').value;
    let month = document.getElementById('initMonthSelect').value;
    let day = document.getElementById('initDaySelect').value;
    let time = document.getElementById('initTimeSelect').value;
    let validTime = document.getElementById('validTimeSelect').value;

    // The directory name depends upon which model we are looking at
    let countsDir;
    let accumulationHours;
    if (modelName == 'Jurre brishti') {
        countsDir = 'Jurre_brishti_counts';
        accumulationHours = 6;
    } else if (modelName == 'Mvua kubwa') {
        countsDir = 'Mvua_kubwa_counts';
        accumulationHours = 24;
    }

    // The cGAN forecast file to load
    let fileName = '/data/' + countsDir + '/' + year + '/counts_' + year + month.padStart(2, '0') + day.padStart(2, '0') + '_' + time.padStart(2, '0') + '_' + validTime + 'h.nc';

    // Load data into the forecastDataObject
    await GANForecast.loadGANForecast(fileName, modelName, accumulationHours);
}

// Update an HTML select menu with dates that are available.
// dateObject - Can be a years, months, day or time object (from the global
//              availableDates).
// dateText   - An array containing the menu item strings to use. If empty the dateObject
//              keys are used as menu items.
// id         - The id of the select menu element in the HTML.
export function updateMenu(dateObject, datesText, id) {
    let dates;
    if (dateObject instanceof Array) {
        // dateObject is an array of numbers. Convert it to an array of strings
        dates = new Array(dateObject.length);
        for (let i = 0; i < dates.length; i++) {
            dates[i] = String(dateObject[i]);
        }
    } else {
        // dateObject's keys are a list of strings
        dates = Object.keys(dateObject);
    }

    // Select the HTML select menu that we are updating
    let dateSelect = document.getElementById(id);

    // Record the menu's value before we remove it
    let date = dateSelect.value;

    // Remove all of the current menu items
    while (dateSelect.hasChildNodes()) {
        dateSelect.removeChild(dateSelect.firstChild);
    }

    // Add the menu items specified in dates
    for (let i = 0; i < dates.length; i++) {
        let option = document.createElement('option');
        option.value = dates[i];
        if (datesText.length > 0) {
            option.innerHTML = datesText[i];
        } else {
            option.innerHTML = dates[i];
        }
        dateSelect.appendChild(option);
    }

    // If the specified year/month/day/time/valid time does not exist.
    if (!dates.includes(date)) {
        date = dates[dates.length - 1]; // Pick the final one
    }

    // Set the menu to the value it should be
    dateSelect.value = date;

    // Return the value set
    return date;
}

export function updateDateMenus() {
    // The available months are listed in availableDates
    let year = updateMenu(availableDates, [], 'initYearSelect');

    // The available months depend upon the year
    let yearObject = availableDates[String(year)];
    let month = updateMenu(yearObject, [], 'initMonthSelect');

    // The available days depend upon the year and month
    let monthObject = yearObject[String(month)];
    let day = updateMenu(monthObject, [], 'initDaySelect');

    // The available times depend upon the year, month and day
    let daysObject = monthObject[String(day)];
    // We use a custom string for the time menu elements
    let times = Object.keys(daysObject);
    let timeStrings = new Array(times.length);
    for (let i = 0; i < times.length; i++) {
        timeStrings[i] = times[i].padStart(2, '0') + ':00 UTC';
    }
    let time = updateMenu(daysObject, timeStrings, 'initTimeSelect');

    // The available valid times depend upon the year, month, day and time.
    let validTimes = daysObject[String(time)]; // validTimes is an Array
    // We use a custom string for the valid time menu elements
    let validTimeStrings = new Array(validTimes.length);
    for (let i = 0; i < validTimes.length; i++) {
        // What's the valid date? (YYYY-MM-DD)
        let validDate = plots.timeOffsetToDate(validTimes[i] + parseInt(time), year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0'));

        validTimeStrings[i] =
            validDate.getUTCFullYear() +
            '-' +
            String(validDate.getUTCMonth() + 1).padStart(2, '0') +
            '-' +
            String(validDate.getUTCDate()).padStart(2, '0') +
            ' ' +
            String(validDate.getUTCHours()).padStart(2, '0') +
            ':00 UTC (+' +
            validTimes[i] +
            'h)';
    }
    updateMenu(validTimes, validTimeStrings, 'validTimeSelect');
}

export async function loadDates() {
    // Fetch a remote file
    let fileName;
    if (modelName == 'Jurre brishti') {
        fileName = '/data/Jurre_brishti_counts/available_dates.json';
    } else if (modelName == 'Mvua kubwa') {
        fileName = '/data/Mvua_kubwa_counts/available_dates.json';
    }
    const response = await fetch(fileName);

    // Parse the JSON arrayBuffer of the file and return the resulting object
    availableDates = await response.json();

    // Pick the final date to load
    let years = Object.keys(availableDates);
    let year = years[years.length - 1];
    let yearObject = availableDates[year];
    let months = Object.keys(yearObject);
    let month = months[months.length - 1];
    let monthObject = yearObject[month];
    let days = Object.keys(monthObject);
    let day = days[days.length - 1];
    let daysObject = monthObject[day];
    let times = Object.keys(daysObject);
    let time = times[times.length - 1];
    let validTimes = daysObject[time];
    let validTime = validTimes[validTimes.length - 1];

    // Set the menus to match the loaded dates
    document.getElementById('initYearSelect').value = year;
    document.getElementById('initMonthSelect').value = month;
    document.getElementById('initDaySelect').value = day;
    document.getElementById('initTimeSelect').value = time;
    document.getElementById('validTimeSelect').value = String(validTime);
    updateDateMenus();
}

export function initControls() {
    // XXX Actually should keep the settings on reload and reload the correct plots

    // Following the HTML elements in order

    document.getElementById('modelSelect').value = modelName;

    document.getElementById('regionSelect').value = regionName;

    document.getElementById('styleSelect').value = style;

    document.getElementById('plotSelect').value = plotType;

    // Need to get the units correct
    let norm = plots.getPlotNormalisation(units);
    document.getElementById('thresholdValueSelect').value = plots.roundSF(maxRain * norm, 3);

    document.getElementById('unitsDescription').innerHTML = units;

    if (showPercentages) {
        document.getElementById('percentagesSelect').value = 'Percentages';
    } else {
        document.getElementById('percentagesSelect').value = 'Words';
    }

    if (plotType == 'Probability') {
        document.getElementById('percentagesSelect').removeAttribute('disabled', '');
    } else {
        document.getElementById('percentagesSelect').setAttribute('disabled', '');
    }

    document.getElementById('thresholdProbabilitySelect').value = plots.roundSF(probability * 100, 4);

    document.getElementById('unitsSelect').value = units;
}

// Function to inform the user what is going on
//    code - 0 = Not waiting
//           1 = Waiting for data to load
//           2 = Waiting for calculations
//           3 = Waiting for plots to draw
// message - A description of what we are waiting for
export function showLoadingStatus(code, message) {
    if (code == 0) {
        // We are not waiting
        document.getElementById('statusText').style.color = 'black';
    } else {
        // We are waiting
        document.getElementById('statusText').style.color = '#cc0000'; // dark red
    }

    // Inform the user what is going on
    document.getElementById('statusText').innerHTML = message;
}

export async function init() {
    // Set the default values of the plot controls
    initControls();

    // Specify the function to call to inform the user what is going on
    plots.setStatusUpdateFunction(showLoadingStatus);

    // If the region names are not loaded yet, then load them and wait for them to be loaded
    // First argument is the directory, second argument is the file name.
    await GANForecast.regionSpec.loadRegionNames('boundaries', 'regional_names.json');

    // Load a list of the available forecasts
    await loadDates();

    // Load the currently selected forecast
    await loadForecast();

    // Draw everything
    let plotRect = await drawPlots();

    // Get canvas for events
    const canvas = document.getElementById('myCanvas');

    // Detect the mouse location when it is within the canvas element
    canvas.addEventListener('mousedown', function (evt) {
        // Get the mouse position in the canvas element
        let canvasRect = canvas.getBoundingClientRect();
        let clickX = evt.clientX - canvasRect.left;
        let clickY = evt.clientY - canvasRect.top;

        // Get the mouse location within the plot image boundary
        let xMouse = Math.floor(clickX) - Math.round(plotRect[0]);
        let yMouse = Math.floor(clickY) - Math.round(plotRect[1]);

        // Width and height of the plot rectangle
        let width = Math.round(plotRect[2] - plotRect[0]);
        let height = Math.round(plotRect[3] - plotRect[1]);

        // If the mouse is within the plot rectangle
        if (xMouse >= 0 && yMouse >= 0 && xMouse < width && yMouse < height) {
            // Save the click location for other functions
            canvasClickX = clickX;
            canvasClickY = clickY;

            // When the plots are drawn, also draw the marker
            drawMarker = true;

            // The lon/lat location changes with a mouse click
            locationChanged = true;

            // Draw the plots
            requestAnimationFrame(drawPlots);
        }
    });

    // Detect if the enter or return key is pressed in the value threshold input field
    let inputField = document.getElementById('thresholdValueSelect');
    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            let norm = plots.getPlotNormalisation(units);
            let maxRain = document.getElementById('thresholdValueSelect').value / norm;
            drawPlots();
        }
    });

    // Detect if the enter or return key is pressed in the probability threshold input field
    inputField = document.getElementById('thresholdProbabilitySelect');
    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            let probability = document.getElementById('thresholdProbabilitySelect').value / 100.0;
            drawPlots();
        }
    });
}

export async function drawPlots() {
    // Get the context for plotting
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Erase the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = 2,
        y = 2; // Location of plot from top left
    let width = 500; // Width of plot in pixels
    let height = 500; // Height of plot in pixels

    // Must use await unless all of the region shape data is loaded in advance
    // otherwise the region shape data could be loaded multiple times and corrupted.

    let plotRect;
    if (plotType == 'Probability') {
        plotRect = await GANForecast.plotExceedenceProbability(ctx, x, y, width, height, maxRain, units, style, showPercentages, regionName);
    } else if (plotType == 'Values') {
        plotRect = await GANForecast.plotExceedenceValue(ctx, x, y, width, height, probability, units, style, regionName);
    }

    // Plot the marker and associated histogram
    if (drawMarker) {
        // Need the longitude range in the current plot
        let [minLatIdx, maxLatIdx, minLonIdx, maxLonIdx] = GANForecast.computeLatLonIdxBounds(regionName);

        // If the location has changed (set the latitude and longitude indices)
        if (locationChanged) {
            // Get the mouse location within the plot image boundary
            let xMouse = Math.floor(canvasClickX) - Math.round(plotRect[0]);
            let yMouse = Math.floor(canvasClickY) - Math.round(plotRect[1]);

            // Find the corresponding latitude and longitude indices
            longitudeIdx = minLonIdx + Math.round((xMouse * (maxLonIdx - minLonIdx)) / (plotRect[2] - plotRect[0]));
            latitudeIdx = maxLatIdx - Math.round((yMouse * (maxLatIdx - minLatIdx)) / (plotRect[3] - plotRect[1]));

            // By default the location hasn't changed so set this flag now
            locationChanged = false;
        } else {
            // The location has not changed (set click location from the lat/lon indices)
            canvasClickX = ((longitudeIdx - minLonIdx) * (plotRect[2] - plotRect[0])) / (maxLonIdx - minLonIdx) + plotRect[0];
            canvasClickY = ((maxLatIdx - latitudeIdx) * (plotRect[3] - plotRect[1])) / (maxLatIdx - minLatIdx) + plotRect[1];
        }

        let markerWidth = 10; // Width of the plot marker in pixels

        // Thick black cross
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.moveTo(canvasClickX - markerWidth / 2, canvasClickY - markerWidth / 2);
        ctx.lineTo(canvasClickX + markerWidth / 2, canvasClickY + markerWidth / 2);
        ctx.moveTo(canvasClickX + markerWidth / 2, canvasClickY - markerWidth / 2);
        ctx.lineTo(canvasClickX - markerWidth / 2, canvasClickY + markerWidth / 2);
        ctx.stroke();

        // Thin white cross
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.moveTo(canvasClickX - markerWidth / 2, canvasClickY - markerWidth / 2);
        ctx.lineTo(canvasClickX + markerWidth / 2, canvasClickY + markerWidth / 2);
        ctx.moveTo(canvasClickX + markerWidth / 2, canvasClickY - markerWidth / 2);
        ctx.lineTo(canvasClickX - markerWidth / 2, canvasClickY + markerWidth / 2);
        ctx.stroke();

        // Put a line dividing the two plots
        ctx.strokeStyle = '#b6b6b6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(512, 25);
        ctx.lineTo(512, 504 - 25);
        ctx.stroke();

        // Create a new histogram specification
        let barChartSpec = new plots.barChartSpecification();

        let y2 = y;
        let x2 = 522; // Change the location of the second plot

        // Plot the histogram and wait for it to finish
        await GANForecast.plotHistogram(ctx, x2, y2, width, height, maxRain, probability, latitudeIdx, longitudeIdx, units, barChartSpec);
    }

    // Return the rectangle used for mouse detection
    return plotRect;
}
