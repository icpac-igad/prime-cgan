import { Outlet } from 'react-router-dom';
import HeaderComponent from './header';
import FooterComponent from './footer';

export default function LandingPage() {
    return (
        <div className="surface-0 justify-content-center layout-main">
            <HeaderComponent />
            <div id="home" className="landing-wrapper overflow-hidden">
                <Outlet />
            </div>
            <FooterComponent />
        </div>
    );
}
