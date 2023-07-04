import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export const Header = () => {
  const headerStyle = {
    padding: '20px 0',
    lineHeight: '1.5em',
    color: '#aeadad',
    textAlign: 'center',
  };

  return (
    <>
    <header style={headerStyle} className={"header"}>
      <h1>chess-tree-viewer (WIP)</h1>  
    </header>
    </>
  )
}
