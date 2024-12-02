import { Link } from 'react-router-dom';
import { partners, pages } from '@/pages/tools/store';

export default function FooterComponent() {
    return (
        <div className="footer-panel absolute z-5">
            <div className="footer-panel-navs py-4 px-4 mx-0 mt-8 lg:mx-8">
                <div className="grid">
                    <div className="col-12 md:col-8 lg:col-9">
                        <div className="flex flex-wrap justify-content-center column-gap-4 row-gap-6 justify-content-center text-center">
                            {partners &&
                                partners.map((partner) => (
                                    <a href={partner.url} target="_blank" key={partner.name}>
                                        <img src={partner.logo} alt={partner.name} width={partner.width} />
                                    </a>
                                ))}
                        </div>
                    </div>

                    <div className="col-12 md:col-4 lg:col-3">
                        <div className="flex flex-column text-left text-center">
                            <h3 className="text-white mb-0 text-4xl font-bold">Important Resources</h3>
                            <ul className="list-none white-space-nowrap line-height-3 pl-2 font-medium text-2xl">
                                {pages &&
                                    pages.map((page) => (
                                        <li key={page.name}>
                                            <Link to={page.url}>
                                                <i className="pi pi-angle-right mr-3" style={{ fontSize: '1.5rem', color: 'slateblue' }}></i>
                                                <span className="text-white text-xl">{page.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
