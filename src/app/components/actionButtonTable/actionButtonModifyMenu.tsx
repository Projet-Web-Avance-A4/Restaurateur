import React, { useState } from "react";
import { Button, Link, NextUIProvider, Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";

export default function ActionButtonModifyMenu(item: any) {

  return (
    <NextUIProvider>
      <Tooltip className="text-black" content="Valider">
        <Button
          as={Link}
          isIconOnly
          radius="full"
          size="sm"
          variant="light"
            href={`/modify_menu?id=${item.id}`}
        >
            <FaCheck className="text-default-400 fill-green-500" />
        </Button>
      </Tooltip>
    </NextUIProvider>
  );
}
