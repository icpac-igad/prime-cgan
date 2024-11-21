import { useRef, useState } from 'react';

import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';

import { NodeRef } from '../tools/types';
import { pages } from '../tools/store';

export default function HeaderComponent() {
    const [isHidden, setIsHidden] = useState(false);
    const menuRef = useRef<HTMLElement | null>(null);

    const toggleMenuItemClick = () => {
        setIsHidden((prevState) => !prevState);
    };

    return (
        <div className="top-menu relative lg:static">
            <div className="py-2 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
                <div className="flex align-items-center">
                    <img src={`/images/layout/ICPAC_Website_Header_Logo.svg`} alt="cGAN Logo" height="80" className="mr-0 lg:mr-2" />
                </div>
                <StyleClass nodeRef={menuRef as NodeRef} selector="@next" enterFromClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
                    <i ref={menuRef} className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-white"></i>
                </StyleClass>
                <div className={classNames('collapse-menu align-items-center flex-grow-1 hidden align-self-flex-end lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2', { hidden: isHidden })} style={{ top: '100%' }}>
                    <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                        {pages &&
                            pages.map((page) => (
                                <li key={page.name}>
                                    <a href={page.url} onClick={toggleMenuItemClick} className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                        <span>{page.name}</span>
                                        <Ripple />
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
