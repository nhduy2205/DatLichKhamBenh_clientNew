import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Header() {
  const [info, setInfo] = useState<any>()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item: any = JSON.parse(localStorage.getItem('benhnhan')) || ''
      setInfo(item)
    }
  }, [])
  const router = useRouter()

  return (
    <div
      className="relative w-full z-5 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 bg-white bg-indigo-500 
      border-b-2 border-indigo-200"
    >
      <div className="flex flex-wrap items-center justify-between py-3">
        <div className="w-1/2 md:w-auto">
          <a href="/" className="text-blue-600 font-bold text-2xl">
            <img
              src="/logo.png"
              className="h-16 max-w-full rounded-lg"
              alt=""
            />
          </a>
        </div>

        <label className="pointer-cursor md:hidden block">
          <svg
            className="fill-current text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>

        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div className="hidden md:block w-full md:w-auto" id="menu">
          <nav className="w-full bg-white md:bg-transparent rounded shadow-lg px-6 py-4 mt-4 text-center md:p-0 md:mt-0 md:shadow-none">
            <ul className="md:flex items-center">
              <li>
                <a
                  className="py-2 inline-block md:text-blue-600 md:hidden lg:block font-semibold"
                  href="/ho-so-benh-an"
                >
                  Hồ sơ bệnh án
                </a>
              </li>
              <li className="md:ml-4">
                <a
                  className="py-2 inline-block md:text-blue-600 md:px-2 font-semibold"
                  href="#"
                >
                  Tin tức
                </a>
              </li>

              <li className="md:ml-4">
                <a
                  className="py-2 inline-block md:text-blue-600 md:px-2 font-semibold"
                  href="#"
                >
                  Liên hệ
                </a>
              </li>
              {info ?
                <li className="md:ml-4">
                  <Menu as="div" className="relative inline-block text-left z-10">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white 
                      px-4 py-2 text-md font-medium text-indigo-500 border-2 border-indigo-500
                      focus-visible:ring-2 focus-visible:ring-white/75">
                        Xin chào, &nbsp; <b> {info?.sdt}</b>
                        <ChevronDownIcon
                          className="ml-2 -mr-1 h-5 w-5 text-indigo-500 hover:text-violet-700"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 
                      rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">

                        <div className="px1">

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  onClick={()=> {
                                    localStorage.removeItem("benhnhan");
                                    router.push("/")
                                  }}
                              >
                                <MoveActiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                Đăng xuất
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
                : null
              }

            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}