import { partners, pages } from '../tools/store';

export default function FooterComponent() {
    return (
        <div className="footer-panel">
            <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
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
                            <h3 className="text-white mb-2 text-3xl">Important Resources</h3>
                            {pages &&
                                pages.map((page) => (
                                    <a href={page.url} target="_blank" key={page.name}>
                                        <span className="text-white text-xl">{page.name}</span>
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
