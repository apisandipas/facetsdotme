import { NavBar } from "./NavBar";
export const Layout = ({ children }: { children: React.ReactChild }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};
