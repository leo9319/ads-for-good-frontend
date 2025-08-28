import React, { useState } from "react";
import "./HomePage.scss";
import { Flex, Image, Button, Heading, Text } from "@world-vision/wv360-core-library";
import * as Tooltip from "@radix-ui/react-tooltip";

import logo from "../../src/assets/images/logo.png";
import Star from "../../src/assets/images/Star.svg";
import fallbackImage from "../../src/assets/images/FallbackImage.svg";

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="home-page">
      <div className="header-bar">
        <div className="stat-overlay">
          <div className="flex">
            <div>
              <div className="star-count">
                <Heading size={{ initial: "6", md: "8" }} weight="bold">
                  41
                  <Image
                    src={Star}
                    alt="Star"
                    fallbackSrc={fallbackImage}
                  />
                </Heading>
              </div>
              <Text align="center">
                collected
              </Text>
            </div>
            <div>
              <div className="star-count">
                <Heading size={{ initial: "6", md: "8" }} weight="bold">
                  81
                  <Image
                    src={Star}
                    alt="Star"
                    fallbackSrc={fallbackImage}
                  />
                </Heading>
              </div>
              <Text align="center">
                donated
              </Text>
            </div>
          </div>
          <Text align="center" weight="bold" mt="10px">
            1 ★ is one tab opened
          </Text>
          <Button
            text="Give Stars"
            size="md"
            mode="primary"
            className="full-width-button"
          />
        </div>
        <div className="stat-overlay">
          <Heading size={{ initial: "6", md: "8" }} weight="bold">
            $1280.40
          </Heading>
          <Text size="4" weight="regular">
            Collectively Raised
          </Text>
        </div>

        <div className="logo-button">
          <Image
            src={logo}
            alt="World Vision Logo"
            fallbackSrc={fallbackImage}
            width="205px"
            className="logo"
          />

          <Tooltip.Provider>
            <Tooltip.Root open={open} onOpenChange={setOpen}>
              <Tooltip.Trigger asChild>
                <Button
                  className="sign-up"
                  text="Log in / Sign up"
                  size="lg"
                  mode="primary"
                />
              </Tooltip.Trigger>

              <Tooltip.Content
                side="bottom"
                align="center"
                sideOffset={12} // reduced for better spacing
                className="tooltip-content"
              >
                <button
                  className="tooltip-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  ×
                </button>

                <div className="tooltip-inner">
                  <h4 className="tooltip-heading">Please consider signing up!</h4>
                  <p className="tooltip-text">
                    Make an account to choose where your impact goes. It only takes a minute!
                  </p>
                </div>
                <Tooltip.Arrow className="tooltip-arrow" />
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
