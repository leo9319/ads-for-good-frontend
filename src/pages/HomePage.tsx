import React from 'react';
import './HomePage.css';
import { Image, Button, Heading, Text } from '@world-vision/wv360-core-library';


import logo from "../../src/assets/images/logo.png";
import fallbackImage from "../../src/assets/images/FallbackImage.svg";

const HomePage: React.FC = () => {
  return (
    <div className='home-page'>
      <div className='stat-overlay'>
      <Heading size={{ initial: "6", md: "8" }} weight="bold">$1280.40</Heading>
      <Text size="4" weight="regular">Collectively Raised</Text>
      </div>
      <div className='logo-button'>
        <Image 
          src={logo} 
          alt="" 
          fallbackSrc={fallbackImage}
          width="205px"
          className='logo' />
          <div className='sign-up'>
          <Button text="Log in/ Sign up" size="lg" mode="primary" />
          </div>
      </div>
    </div>
    
  );
};

export default HomePage;
