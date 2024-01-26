import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Trans } from 'react-i18next';
import { Button } from "./ui/button";
import { RotateCcw, ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react"

/**
 * increasing: number increases game harder
 * decreasing: number decreases game harder
 * independence: depending on game play
 */
type DifficultyType = "increasing" | "decreasing" | "independence"

function SliderInput(props: {
    id: string;
    name: string;
    value: number;
    defaultValue: number;
    minValue: number;
    maxValue: number;
    step: number;
    onValueChange: (value: number[]) => void;
    type?: string;
    disabled?: boolean;
    difficultyType?: DifficultyType;
}) {
    const {
        id,
        name,
        value,
        defaultValue,
        minValue,
        maxValue,
        step,
        onValueChange,
        type,
        disabled,
        difficultyType = 'independence'
    } = props;

    let valueStr = `${value}`;
    if (type === "integer") {
        valueStr = value.toString();
    } else if (type === "float") {
        valueStr = `${+value.toFixed(1)}`;
    }

    const difficultyTypeArrowRenderer = (difficultyType: DifficultyType) => {
        switch (difficultyType) {
            case "increasing":
                return (
                    <div className="flex flex-row mt-1.5 mx-5 w-full">
                        <div className="basis-1/2 flex flex-row space-x-1">
                            <ArrowBigLeftDash color="#31A46C" size={20} />
                            <Trans i18nKey={'easier'}>easier</Trans>
                        </div>
                        <div className="basis-1/2 flex flex-row-reverse space-x-1">
                            <ArrowBigRightDash color="#E5474D" size={20} />
                            <Trans i18nKey={'harder'}>harder</Trans>
                        </div>
                    </div>
                )
            case "decreasing":
                return (
                    <div className="flex flex-row mt-1.5 mx-5 w-full">
                        <div className="basis-1/2 flex flex-row space-x-1">
                            <ArrowBigLeftDash color="#E5474D" size={20} />
                            <Trans i18nKey={'harder'}>harder</Trans>
                        </div>
                        <div className="basis-1/2 flex flex-row-reverse space-x-1">
                            <ArrowBigRightDash color="#31A46C" size={20} />
                            <Trans i18nKey={'easier'}>easier</Trans>
                        </div>
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex">
                <Label className="leading-8 whitespace-nowrap" htmlFor={name}>{name}</Label>
                {difficultyTypeArrowRenderer(difficultyType)}
                <Button variant="ghost" className="ml-auto h-8 px-1" onClick={() => {
                    onValueChange([defaultValue]);
                }} disabled={disabled}>
                    <RotateCcw />
                </Button>
            </div>
            <div className="flex">
                <Label className="px-4">{valueStr}</Label>
                <Slider className="max-w-[95%]" id={id} value={[value]} max={maxValue} min={minValue} step={step} onValueChange={onValueChange} disabled={disabled}/>
            </div>
        </div>
    );
}

export { SliderInput };