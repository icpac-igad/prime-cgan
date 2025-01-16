import { useEffect } from 'react';
import * as plotLib from '@/pages/tools/plotsLib';

export default function IframeForecasts() {
    useEffect(() => {
        // Load vanilla JavaScript code here
        // const script = document.createElement('script');
        // script.src = '/scripts/plotForecasts2Min.js';
        // document.body.appendChild(script);

        // initialize plots library
        plotLib.init();
    }, []);

    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-2xl text-left font-semibold">East African rainfall forecasts. (Click for local distribution.)</h1>
            <div className="card">
                <p className="font-medium line-height-3">
                    Model:
                    <select id="modelSelect" onChange={() => plotLib.modelSelect()}>
                        <option value="Jurre brishti">Jurre brishti</option>
                        <option value="Mvua kubwa">Mvua kubwa</option>
                    </select>
                    <span id="modelInfo">
                        : The{' '}
                        <a href="https://www.ecmwf.int/" target="_blank">
                            ECMWF
                        </a>
                        <a href="https://confluence.ecmwf.int/display/FUG/Section+2+The+ECMWF+Integrated+Forecasting+System+-+IFS" target="_blank">
                            IFS
                        </a>
                        output is post-processed using
                        <a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2022MS003120" target="_blank">
                            cGAN
                        </a>
                        trained on
                        <a href="https://gpm.nasa.gov/data/imerg" target="_blank">
                            {' '}
                            IMERG
                        </a>
                        v6 to produce forecasts of 6h rainfall intervals.
                    </span>
                </p>

                <p className="font-medium line-height-3">
                    Region:
                    <select id="regionSelect" onChange={() => plotLib.regionSelect()}>
                        <option value="East Africa">East Africa</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Sudan">South Sudan</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Uganda">Uganda</option>
                    </select>
                    Initialisation:
                    <select id="initYearSelect" onChange={() => plotLib.initTimeSelect()} title="Forecast initialisation year">
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                    <select id="initMonthSelect" onChange={() => plotLib.initTimeSelect()} title="Forecast initialisation month">
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    <select id="initDaySelect" onChange={() => plotLib.initTimeSelect()} title="Forecast initialisation day">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                    </select>
                    <select id="initTimeSelect" onChange={() => plotLib.initTimeSelect()} title="Forecast initialisation time">
                        <option value="0">00:00 UTC</option>
                        <option value="6">06:00 UTC</option>
                    </select>
                    Valid:
                    <select id="validTimeSelect" onChange={() => plotLib.validTimeSelect()} title="Start of the time we are forecasting">
                        <option value="30">2024-11-23 12:00 UTC (+30h)</option>
                        <option value="36">2024-11-23 18:00 UTC (+36h)</option>
                        <option value="42">2024-11-24 00:00 UTC (+42h)</option>
                        <option value="48">2024-11-24 06:00 UTC (+48h)</option>
                    </select>
                    Style:
                    <select id="styleSelect" onChange={() => plotLib.styleSelect()}>
                        <option value="Default">Default</option>
                        <option value="ICPAC">ICPAC</option>
                        <option value="KMD">KMD</option>
                        <option value="EMI">EMI</option>
                    </select>
                </p>

                <p className="font-medium line-height-3">
                    Plot:
                    <select id="plotSelect" onChange={() => plotLib.plotSelect()}>
                        <option value="Probability">Probability to exceed value</option>
                        <option value="Values">Values below probability</option>
                    </select>
                    Value threshold:
                    <input type="text" id="thresholdValueSelect" style={{ width: 6, rowGap: 6, columnGap: 6 }} title="Show the chance of rainfall above this value" />
                    <span id="unitsDescription">mm/6h</span>.
                    <select id="percentagesSelect" onChange={() => plotLib.percentagesSelect()}>
                        <option value="Percentages">Show percentages</option>
                        <option value="Words">Show words</option>
                    </select>
                    Probability threshold:
                    <input type="text" id="thresholdProbabilitySelect" title="Change this number and look at the plot description" />
                    %. Units:
                    <select id="unitsSelect" onChange={() => plotLib.unitsSelect()}>
                        <option value="mm/h">mm/h</option>
                        <option value="mm/6h">mm/6h</option>
                        <option value="mm/day">mm/day</option>
                        <option value="mm/week">mm/week</option>
                    </select>
                </p>

                <p className="font-medium line-height-3" id="statusText" style={{ color: 'rgb(204, 0, 0)' }}>
                    Loading borders ...
                </p>

                <canvas id="myCanvas" width="1024" height="504">
                    Your browser does not support the HTML canvas tag.
                </canvas>
            </div>
        </div>
    );
}
