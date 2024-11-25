import { Button } from 'primereact/button';

export default function HeroComponent() {
    return (
        <div
            id="hero"
            className="flex flex-column pt-7 px-4 lg:px-8 overflow-hidden"
            style={{
                background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%)',
                clipPath: 'ellipse(150% 87% at 93% 13%)'
            }}
        >
            <div className="mx-4 md:mx-8 mt-0 md:mt-4">
                <h1 className="text-6xl font-bold text-gray-900 line-height-2">
                    <span className="font-light block">Strengthening Early Warning Systems</span>for Anticipatory Action
                </h1>
                <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">
                    The Strengthening Early Warning Systems for Anticipatory Action (SEWAA) Project is an innovative project that aims at provision of early warning systems that can be utilized in improving the decision-making process by the
                    different stakeholders over Eastern Africa. Eastern Africa has experienced extreme events that have had a significant impact on the region. These events, such as droughts, floods, and tropical cyclones, have posed challenges to
                    the communities living in this part of the continent. The scarcity of rainfall during droughts has affected water and food availability, increases the levels of food insecurity over the region. On the other hand, heavy rains and
                    floods have led to infrastructure and crop damage, displacement of communities and loss of biodiversity. Coping with these extreme events requires collective efforts and resilient strategies to mitigate their adverse effects on
                    the well-being of Eastern African populations thus the need for Anticipatory Actions in order to preserve the resilience of the communities. The scientific work in the SEWAA project is ambitious and aims to break new ground along
                    two thematic areas by utilizing the state of the art Machine learning techniques. These themes include (i) National stakeholders benefit from improved historical weather observation data sets and capacity to collect
                    non-traditional weather observations, (ii) National and regional stakeholders benefit from improved capacity to generate high-resolution calibrated probabilistic weather forecasts.
                </p>
                <Button type="button" label="Learn More" rounded className="text-xl border-none mt-3 bg-blue-500 font-normal line-height-3 px-3 text-white"></Button>
            </div>
            <div className="flex justify-content-center md:justify-content-end">
                <img src="/images/layout/cgan-forecast-model-pipeline.png" alt="Hero Image" className="w-9 md:w-auto" />
            </div>
        </div>
    );
}
