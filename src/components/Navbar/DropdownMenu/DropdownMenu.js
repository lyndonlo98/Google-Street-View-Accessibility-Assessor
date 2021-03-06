import React, { useState, useEffect, useRef } from 'react';

import { ReactComponent as CogIcon } from '../../../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../../icons/cog.svg';
import { ReactComponent as ArrowIcon } from '../../../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../../icons/cog.svg';

import { CSSTransition } from 'react-transition-group';

import SearchLocationInput from '../../SearchLocationInput/SearchLocationInput'
import About from '../../About/About';

const DropdownMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
    function DropdownItem(props) {
      return (
        <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    }
  
    return (
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem
              leftIcon="🙋‍♀️"
              rightIcon={<ChevronIcon />}
              goToMenu="about-me"
            >About</DropdownItem>
            <DropdownItem
              leftIcon="🎯"
              rightIcon={<ChevronIcon />}
              goToMenu="directions">
              Directions
            </DropdownItem>
  
          </div>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu === 'about-me'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>About</h2>
            </DropdownItem>
            <About/>
            {/* <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem> */}
          </div>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu === 'directions'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>Directions</h2>
            </DropdownItem>
            <SearchLocationInput 
              onChange={() => null}
            />
          </div>
        </CSSTransition>
      </div>
    );
}
export default DropdownMenu;