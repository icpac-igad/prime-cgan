import { Button } from 'primereact/button';
import { SubmitButtonProps } from '@/pages/tools/types';

export default function SubmitButton(props: SubmitButtonProps) {
    return (
        <div className="flex flex-column gap-1">
            <Button
                label={props.label}
                severity={props.severity}
                rounded={props?.rounded}
                outlined={props?.outline}
                loading={props?.loading}
                disabled={props.disabled}
                icon={props?.icon}
                iconPos={props?.iconPos}
                onClick={props.onClick}
                size="large"
            />
        </div>
    );
}
