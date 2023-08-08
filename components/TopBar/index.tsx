import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
} from "@chakra-ui/react";
import { HiMenuAlt1 } from "react-icons/hi";

const Topbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateWindowSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial isMobile value and listen for window resize events
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return (
    <Box bg="blue.500" p={4}>
      <Flex align="center">
        <Box>
          <Button
            as="a"
            href="#"
            color="white"
            fontWeight="bold"
            fontSize="lg"
            _hover={{ textDecoration: "none" }}
          >
            Your Logo
          </Button>
        </Box>
        <Spacer />
        {isMobile ? (
          <IconButton
            icon={<HiMenuAlt1 />}
            colorScheme="white"
            aria-label="Menu"
            onClick={onOpen}
          />
        ) : (
          <List display="flex" alignItems="center">
            <ListItem>
              <Button
                as="a"
                href="#"
                color="white"
                _hover={{ textDecoration: "none" }}
              >
                Home
              </Button>
            </ListItem>
            <ListItem>
              <Button
                as="a"
                href="#"
                color="white"
                _hover={{ textDecoration: "none" }}
              >
                About
              </Button>
            </ListItem>
            <ListItem>
              <Button
                as="a"
                href="#"
                color="white"
                _hover={{ textDecoration: "none" }}
              >
                Services
              </Button>
            </ListItem>
            <ListItem>
              <Button
                as="a"
                href="#"
                color="white"
                _hover={{ textDecoration: "none" }}
              >
                Contact
              </Button>
            </ListItem>
          </List>
        )}
      </Flex>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <List>
              <ListItem>
                <Button as="a" href="#" onClick={onClose} w="100%">
                  Home
                </Button>
              </ListItem>
              <ListItem>
                <Button as="a" href="#" onClick={onClose} w="100%">
                  About
                </Button>
              </ListItem>
              <ListItem>
                <Button as="a" href="#" onClick={onClose} w="100%">
                  Services
                </Button>
              </ListItem>
              <ListItem>
                <Button as="a" href="#" onClick={onClose} w="100%">
                  Contact
                </Button>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Topbar;