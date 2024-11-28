export default function ActionCallComponent() {
    return (
        <div className="grid justify-content-center">
            <div
                className="col-12 mt-2 mb-2 p-2 md:p-8"
                style={{
                    borderRadius: '20px',
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EFE1AF 0%, #C3DCFA 100%)'
                }}
            >
                <div className="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                    <h3 className="text-gray-900 mb-2 text-3xl">Inception Steering Commeetee Meeting</h3>
                    <span className="text-gray-600 text-2xl">Held On April 29, 2024, in Nairobi, Kenya</span>
                    <p className="text-gray-900 text-left sm:line-height-2 md:line-height-4 text-2xl mt-4">
                        The IGAD Climate Prediction and Applications Centre (ICPAC) took a significant stride towards bolstering disaster preparedness and response capabilities. Today, the Center announced the reception of support from the United
                        Nations World Food Programme (WFP) for the implementation of a pioneering project titled "Strengthening Early Warning Systems for Anticipatory Actions." This initiative, aimed at leveraging machine learning to enhance early
                        warning information systems, marks a collaborative effort involving leading weather and climate research institutions, a university, and a humanitarian organization.
                    </p>
                    <p className="text-gray-900 text-left sm:line-height-2 md:line-height-4 text-2xl mt-4">
                        The funding provided by WFP will also benefit the Kenya Meteorological Department and Ethiopian Meteorological Institute, aiding in the enhancement of their national and sub-national forecasts. By transforming the quality of
                        early warning information available to communities in disaster-prone regions, the project endeavors to facilitate proactive responses to critical alerts.
                    </p>
                    <img src="/images/layout/sewaa-final-landscape.png" className="mt-4" width="60%" alt="Sewa Landscape logo" />
                </div>
            </div>
        </div>
    );
}
