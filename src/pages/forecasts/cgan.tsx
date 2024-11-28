import LabeledTextInput from './components/text-input';
import CascadeSelect from './components/cascade-select';
import ToggleButton from './components/toggle-button';
import NumericInput from './components/numeric-input';
import SelectInput from './components/select-input';
import { InputValue } from '../tools/types';
import data from '../../assets/ea-major-towns-reorganized.json';

function onValueChange(value: InputValue) {
    console.log(value);
}

export default function CGANForecasts() {
    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-2xl text-left font-semibold">cGAN Forecasting System</h1>
            <div className="card shadow-2 pb-4 px-4">
                <div className="flex flex-wrap gap-6 align-items-left justify-content-start">
                    <LabeledTextInput {...{ label: 'Enter Name', inputId: 'name', helpText: 'Your full name as it appears on ID', onChange: onValueChange }} />
                    <CascadeSelect {...{ label: 'Histogram Location', inputId: 'hist-location', helpText: 'Location for which histogram is plotted', onChange: onValueChange, data: data }} />
                    <ToggleButton {...{ label: 'Show Ensemble Forecast?', inputId: 'show-ensemble', helpText: 'Toggle Ensemble Member plots', onChange: onValueChange }} />
                    <NumericInput {...{ label: 'Enter a Number', inputId: 'mynumber', helpText: 'Guess a Number', onChange: onValueChange }} />
                    <SelectInput {...{ label: 'Select Model', inputId: 'model', helpText: 'Forecasting Model', onChange: onValueChange }} />
                </div>
            </div>
        </div>
    );
}
