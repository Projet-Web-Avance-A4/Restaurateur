import React, { useState } from "react";
import { Button, Link, NextUIProvider, Tooltip } from "@nextui-org/react";
import { FaTrashCan } from "react-icons/fa6";
import { deleteMenu } from "./utils";

export default function ActionButtonDeleteMenu(item: any) {

    function deteleMenu(){
        deleteMenu(item.id)
        window.location.reload();
    }

  return (
      <Tooltip className="text-black" content="Êtes-vous sûr de vouloir supprimer ce menu?">
        <Button
          isIconOnly
          radius="full"
          size="sm"
          variant="light"
          onClick={deteleMenu}>
            <FaTrashCan className="text-default-400 fill-red" />
        </Button>
      </Tooltip>
  );
}
