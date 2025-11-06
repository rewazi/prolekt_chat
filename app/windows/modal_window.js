'use client'
import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@heroui/react";

export default function Modal_window({ username, setUsername }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  function handleSignIn() {
    console.log("Введённое имя:", username);
    onOpenChange();
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent
        style={{
          backgroundColor: "#1e1e1e",
          border: "1px solid #444",
          borderRadius: "15px",
          minWidth: "400px",
          color: "white"
        }}
      >
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Log in
            </ModalHeader>
            <ModalBody>
              <Input
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ backgroundColor: "#2a2a2a", color: "white", borderColor: "#444" }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleSignIn}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}