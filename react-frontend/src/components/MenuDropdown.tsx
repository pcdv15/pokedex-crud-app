import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import cn from "classnames";

interface Props {
  className?: string;
  id: number;
  onClickDelete?: () => void;
}

const MenuDropdown = ({ className, id, onClickDelete }: Props) => {
  return (
    <div className={cn(className)}>
      <Menu
        as="div"
        className="absolute inline-block text-left bottom-1 -right-1"
      >
        <Menu.Button className="inline-flex w-full justify-center p-4 py-2 text-sm">
          ▼
        </Menu.Button>
        <Menu.Items
          className="absolute -right-[6.5rem] -top-1/2 mt-2 w-[6.5rem] rounded-md 
        bg-white z-30 border-solid border-2 border-cyan-700"
        >
          <Menu.Item as="div" className="menu-dropdown-item">
            <Link to={`/pokemon/${id}/update`}>Update</Link>
          </Menu.Item>
          <Menu.Item
            as="div"
            className="menu-dropdown-item text-red-500"
            onClick={onClickDelete}
          >
            <a>Delete</a>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default MenuDropdown;
