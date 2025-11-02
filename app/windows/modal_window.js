'use client'
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, useDraggable } from "@heroui/react";

export default function Modal_window({ username, setUsername }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  function handleSignIn() {
    console.log("Введённое имя:", username);
    onClose(); 
  }

  return (
    <div className="flex justify-center bg-black relative">
      <Modal ref={targetRef} isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleSignIn}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
