import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/utils/auth.utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Tài Liệu", href: "/documents" },
  { name: "Bạn Bè", href: "/friends" },
  { name: "Nhóm", href: "/groups" },
  { name: "Thành Viên", href: "/membership" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const nav = useNavigate();
  const location = window.location.pathname;

  useEffect(() => {
    console.log(isAuthenticated());
  }, []);

  return (
    <Disclosure
      as="nav"
      className="bg-white/5 shadow-md backdrop-blur-lg top-0 z-50 w-full"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div
              className="flex shrink-0 items-center"
              onClick={() => nav("/")}
            >
              <img
                alt="Your Company"
                src={logo}
                className="h-10 w-auto rounded-xl hover:cursor-pointer"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    onClick={() => nav(item.href)}
                    key={item.name}
                    aria-current={item.href === location ? "page" : undefined}
                    className={classNames(
                      item.href === location
                        ? "bg-[#6246ea] text-white"
                        : "text-indigo-700 hover:bg-[#d1d1e9] hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer transition-all duration-100 ease-in-out"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {isAuthenticated() ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Button className="relative rounded-full bg-[#6246ea] text-[#fffffe] hover:bg-[#d1d1e9] hover:text-[#6246ea] focus:ring-2 focus:ring-white focus:ring-offset- hover:cursor-pointer transition-all duration-100 ease-in-out">
                <BellIcon aria-hidden="true" className="size-6" />
              </Button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <a className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="">
                <Button
                  variant="outline"
                  className="rounded-full bg-[#6246ea] text-[#fffffe] hover:bg-[#d1d1e9] hover:text-[#6246ea] focus:ring-2 focus:ring-white focus:ring-offset- hover:cursor-pointer transition-all duration-100 ease-in-out"
                  onClick={() => nav("/login")}
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className="ml-2">
                <Button
                  variant="outline"
                  className="rounded-full bg-[#e45858] text-[#fffffe] hover:bg-[#d1d1e9] hover:text-[#6246ea] focus:ring-2 focus:ring-white focus:ring-offset- hover:cursor-pointer transition-all duration-100 ease-in-out"
                  onClick={() => nav("/register")}
                >
                  Đăng Ký
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
