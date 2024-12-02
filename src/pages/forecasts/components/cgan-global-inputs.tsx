import LabeledTextInput from './text-input';
import CascadeSelect from './cascade-select';
import ToggleButton from './toggle-button';
import NumericInput from './numeric-input';
import SelectInput from './select-input';
import { InputValue } from '@/pages/tools/types';
import data from '@/assets/ea-major-towns-reorganized.json';

function onValueChange(value: InputValue) {
    console.log(value);
}

export default function GANGlobalInputs() {
    return (
        <div className="card shadow-2 pb-4 px-4">
            <div className="flex flex-wrap gap-6 align-items-left justify-content-start">
                <LabeledTextInput {...{ label: 'Enter Name', inputId: 'name', helpText: 'Your full name as it appears on ID', onChange: onValueChange }} />
                <CascadeSelect {...{ label: 'Histogram Location', inputId: 'hist-location', helpText: 'Location for which histogram is plotted', onChange: onValueChange, data: data }} />
                <ToggleButton {...{ label: 'Show Ensemble Forecast?', inputId: 'show-ensemble', helpText: 'Toggle Ensemble Member plots', onChange: onValueChange }} />
                <NumericInput {...{ label: 'Enter a Number', inputId: 'mynumber', helpText: 'Guess a Number', onChange: onValueChange }} />
                <SelectInput {...{ label: 'Select Model', inputId: 'model', helpText: 'Forecasting Model', onChange: onValueChange }} />
            </div>
        </div>
    );
}
