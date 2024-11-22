import { Outlet } from 'react-router-dom';
import HeaderComponent from './header';
import FooterComponent from './footer';

export default function LandingPage() {
    return (
        <div className="surface-0 flex justify-content-center layout-main">
            <div id="home" className="landing-wrapper overflow-hidden">
                <HeaderComponent />
                <Outlet />
                <FooterComponent />
            </div>
        </div>
    );
}
