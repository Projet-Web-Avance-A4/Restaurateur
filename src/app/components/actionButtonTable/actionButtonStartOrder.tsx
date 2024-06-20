import React, { useState } from "react";
import { Button, NextUIProvider, Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";
import { updateStatusToInProgress } from "./utils";

export default function ActionButtonValidationOrder(item: any) {

  function handleClick() {
    updateStatusToInProgress(item.id);
    window.location.reload();
  }

  return (
    <Tooltip className="text-black" content="Valider">
      <Button
        isIconOnly
        radius="full"
        size="sm"
        variant="light"
        onClick={() => handleClick()}
        isDisabled={item.status !== "Commande reçue"}
      >
        <FaCheck className="text-default-400 fill-green-500" />
      </Button>
    </Tooltip>
  );
}
