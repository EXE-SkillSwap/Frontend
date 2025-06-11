import logo from "@/assets/newLogo.png";
import NotificationSheet from "@/components/common/NotificationSheet";
import UserPopover from "@/components/common/UserPopover";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/utils/auth.utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Bạn Bè", href: "/friends" },
  { name: "Trò Chuyện", href: "/groups" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const nav = useNavigate();
  const location = window.location.pathname;

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
                        ? "bg-gradient-to-l from-[#6246ea] to-blue-400 text-white "
                        : "text-indigo-700 hover:bg-[#d1d1e9] hover:text-gray-700",
                      "rounded-full px-3 py-2 text-sm font-medium hover:cursor-pointer transition-all duration-100 ease-in-out"
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
              <NotificationSheet />

              {/* Profile dropdown */}
              <div className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden ml-8">
                <UserPopover />
              </div>
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
