import { resources } from '../tools/store';

export default function ResourcesComponent() {
    return (
        <div id="features" className="py-2 px-4 lg:px-8 mt-2 mx-0 lg:mx-8">
            <div className="grid justify-content-center">
                <div className="col-12 text-center mt-4 mb-2">
                    <h2 className="text-900 font-normal mb-2">Resources, Articles and Publications</h2>
                    <span className="text-600 text-2xl">A list of featured resources, articles and publications</span>
                </div>
                {resources &&
                    resources.map((resource) => (
                        <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0" key={resource.title}>
                            <div
                                style={{
                                    padding: '2px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))'
                                }}
                            >
                                <a href={resource.link} target="_blank">
                                    <div className="p-3 h-full" style={{ borderRadius: '8px' }}>
                                        <div
                                            className={resource.bg_color + ' flex align-items-center justify-content-center mb-3'}
                                            style={{
                                                width: '3.5rem',
                                                height: '3.5rem',
                                                borderRadius: '10px'
                                            }}
                                        >
                                            <i className={resource.icon}></i>
                                        </div>
                                        <h5 className="mb-2 text-900">{resource.title}</h5>
                                        <span className="text-600">{resource.text}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
