const ProcessLoader = ( { size, className, color }) => {
  return (
    <div style={{ width:size?size:'20px', height:size?size:'20px' }} className={`loader ${className}`}>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar1"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar2"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar3"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar4"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar5"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar6"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar7"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar8"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar9"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar10"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar11"></div>
        <div style={{ backgroundColor:color?color:'gray'}} className="bar12"></div>
    </div>
  );
}

export default ProcessLoader;
// This Loader component renders a loading animation using a series of div elements styled as bars.