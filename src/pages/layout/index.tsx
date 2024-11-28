import { Outlet } from 'react-router-dom';
import HeaderComponent from './header';
import FooterComponent from './footer';

export default function LandingPage() {
    return (
        <div className="surface-0 justify-content-center layout-main">
            <HeaderComponent />
            <div className="landing-wrapper overflow-hidden mt-8 pt-2">
                <div className="py-2 px-2 lg:px-8 mt-2 mx-0 lg:mx-8">
                    <Outlet />
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}
