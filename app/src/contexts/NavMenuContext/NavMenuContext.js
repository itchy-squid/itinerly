
const NavMenuContext = createContext();


export const NavMenuProvider = ({ children }) => {
  const [links, setLinks] = useState([]);

  return (
    <NavMenuContext.Provider value={{ 
      links, setLinks
      }}>
      {children}
    </NavMenuContext.Provider>
  );
}

export const useSelectedProject = () => {
  return useContext(NavMenuContext);
}