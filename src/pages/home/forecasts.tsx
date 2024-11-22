import { Link } from 'react-router-dom';
import { products } from '../tools/store';

export default function ForecastsComponent() {
    return (
        <div id="forecast-products" className="py-2 px-2 lg:px-8 mt-2 mx-0 lg:mx-8">
            <div className="grid justify-content-center">
                <div className="surface-0 text-center">
                    <div className="mb-3 font-bold text-3xl">
                        <span className="text-900">Explore </span>
                        <span className="text-blue-600">Forecast Systems</span>
                    </div>
                    <div className="text-700 mb-6 text-xl">
                        This section provides quick visualization and exploration options for various weather and climate forecasting models evaluated during project lifetime. Considered models include onces that are capable of producing
                        deterministic and probabilistic ensemble forecasts at improved accuracy in a timely and cost effective manner.
                    </div>
                    <div className="grid">
                        {products &&
                            products.map((product) => (
                                <div className="col-12 md:col-4 mb-4 px-5" key={product.title}>
                                    <Link to={product.url}>
                                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                            <i className={product.icon + ' text-4xl text-blue-500'}></i>
                                        </span>
                                        <div className="text-900 text-xl mb-3 font-medium">{product.title}</div>
                                        <p className="text-left text-700 line-height-3">{product.text}</p>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
