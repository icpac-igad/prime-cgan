import * as plots from './plotForecasts';
// Models: "Jurre brishti", "Muva kubwa"
let modelName = 'Jurre brishti';
// Regions: Burundi, Djibouti, Eritrea, Ethiopia, Kenya, Rwanda, Somalia, South Sudan,
//          Sudan, Tanzania, Uganda, ICPAC, East Africa, All.
let regionName = 'East Africa';
let units = 'mm/6h'; // Can be mm/h, mm/6h, mm/day, mm/week
let style = 'ICPAC'; // Can be "Default", "ICPAC", "KMD", "EMI"
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

// Called a cGAN model is selected
export async function showModelPlot(model, forecast_date, start_time, valid_time) {
    modelName = model;
    await loadForecast(forecast_date, start_time, valid_time); // Load the currently selected forecast
    drawMarker = false; // No longer draw the histograms
    drawPlots();
}

// Called by the regionSelect menu
export function setRegionSelect(region) {
    regionName = region;
    drawMarker = false; // No longer draw the histograms
    drawPlots();
}

// Called by the initYearSelect, initMonthSelect,initDaySelect and initTimeSelect menus
export async function initTimeSelect(forecast_date, start_time, valid_time) {
    await loadForecast(forecast_date, start_time, valid_time);
    drawPlots();
}

// Called by the validTimeSelect menu
export async function validTimeSelect(forecast_date, start_time, valid_time) {
    await loadForecast(forecast_date, start_time, valid_time);
    drawPlots();
}

// Called by the styleSelect menu
export function setStyleSelect(value) {
    style = value;
    drawPlots();
}

// Called by the plotSelect menu
export function plotSelect(plot) {
    plotType = plot;
    if (plotType == 'Probability') {
        document.getElementById('percentagesSelect').removeAttribute('disabled', '');
    } else {
        document.getElementById('percentagesSelect').setAttribute('disabled', '');
    }
    drawPlots();
}

// Called by the percentagesSelect menu
export function percentagesSelect(value) {
    if (value === 'Percentages') {
        showPercentages = true;
    } else {
        showPercentages = false;
    }
    drawPlots();
}

// Called by the unitsSelect menu
export function unitsSelect(value) {
    // Get the unitsSelect menu's value
    units = value;
    // Set the units in the description to the selected units
    document.getElementById('unitsDescription').innerHTML = units;
    // Update the value threshold to display in the current units
    let norm = plots.getPlotNormalisation(units);
    document.getElementById('threshold-value').value = plots.roundSF(maxRain * norm, 3);
    // Draw plots with the new units
    drawPlots();
}

function padNumber(n, width) {
    n = n + '';
    return n.length >= width ? n.toString() : new Array(width - n.length + 1).join('0') + n;
}

// Loads and plots the currently selected forecast
export async function loadForecast(forecast_date, start_time, valid_time) {
    let year = 2024;
    let month = 12;
    let day = 11;
    let time = start_time || 18;
    let validTime = valid_time || '30';
    if (forecast_date) {
        let date = new Date(forecast_date);
        year = date.getFullYear();
        month = padNumber(date.getMonth() + 1, 2);
        day = padNumber(date.getDate(), 2);
    }

    // The directory name depends upon which model we are looking at
    let countsDir;
    let accumulationHours;
    if (modelName == 'Jurre brishti') {
        countsDir = 'jurre-brishti';
        accumulationHours = 6;
    } else if (modelName == 'Mvua kubwa') {
        countsDir = 'mvua-kubwa';
        accumulationHours = 24;
    }
    // The cGAN forecast file to load
    let fileName = `${import.meta.env.VITE_FTP_DATA_URL || '/ftp/'}${countsDir}/${year}/${month}/counts_${year}${month}${day}_${time.toString().padStart(2, '0')}_${validTime}h.nc`;

    // Load data into the forecastDataObject
    await GANForecast.loadGANForecast(fileName, modelName, accumulationHours);
}

export function initControls() {
    // XXX Actually should keep the settings on reload and reload the correct plots

    // Need to get the units correct
    let norm = plots.getPlotNormalisation(units);
    document.getElementById('threshold-value').value = plots.roundSF(maxRain * norm, 3);

    // if (showPercentages) {
    //     document.getElementById('percentagesSelect').value = 'Percentages';
    // } else {
    //     document.getElementById('percentagesSelect').value = 'Words';
    // }

    // if (plotType == 'Probability') {
    //     document.getElementById('percentagesSelect').removeAttribute('disabled', '');
    // } else {
    //     document.getElementById('percentagesSelect').setAttribute('disabled', '');
    // }
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

export async function init(forecast_date, start_time, valid_time) {
    // Set the default values of the plot controls
    initControls();

    // Specify the function to call to inform the user what is going on
    plots.setStatusUpdateFunction(showLoadingStatus);

    // If the region names are not loaded yet, then load them and wait for them to be loaded
    // First argument is the directory, second argument is the file name.
    await GANForecast.regionSpec.loadRegionNames('boundaries', 'regional_names.json');

    // Load the currently selected forecast
    await loadForecast(forecast_date, start_time, valid_time);

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
    let inputField = document.getElementById('threshold-value');
    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            let norm = plots.getPlotNormalisation(units);
            let maxRain = document.getElementById('threshold-value').value / norm;
            drawPlots();
        }
    });

    // Detect if the enter or return key is pressed in the probability threshold input field
    inputField = document.getElementById('threshold-chance');
    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            let probability = document.getElementById('threshold-chance').value / 100.0;
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
