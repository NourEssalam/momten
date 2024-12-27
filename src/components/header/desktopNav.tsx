export default function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-6 text-xs">
      {/* {mainMenu.map((menu: mainMenuType) => (
          <Link
            key={menu.name}
            href={menu.href}
            className="text-grey font-base text-lg capitalize transition-colors duration-300 inline-block
           py-[1.2rem] hover:text-accent active:text-shade"
          >
            {menu.name}
          </Link>
        ))} */}
      {/* cta */}
      {/* <Link
          href="/donation"
          className="bg-primary/90 hover:bg-accent text-white uppercase font-base text-lg px-5 py-px border rounded-lg "
        >
          Donate
        </Link>{" "} */}
    </nav>
  )
}
